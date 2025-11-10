import { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { HomePage } from './pages/HomePage';
import { MeetingRoom } from './pages/MeetingRoom';
import { UsersPage } from './pages/UsersPage';
import { FileServerPage } from './pages/FileServerPage';
import { SharedWithMePage } from './pages/SharedWithMePage';
import { MessagesPage } from './pages/MessagesPage';
import { GlobalChatPage } from './pages/GlobalChatPage';
import { Phone, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const AUTH_STORAGE_KEY = 'lan-collab-auth';

export interface Account {
    id: string;
    username: string;
    fullName: string;
}

interface Call {
    id: string;
    fromAccountId: string;
    toAccountId: string;
    fromName: string;
    toName: string;
    roomId: string;
    status: string;
    type?: 'call' | 'meeting';
    meetingTitle?: string;
    createdAt: number;
}

interface IncomingCall {
    id: string;
    fromAccountId: string;
    fromName: string;
    roomId: string;
    createdAt: number;
    type?: 'call' | 'meeting';
    meetingTitle?: string;
}

interface Notification {
    id: string;
    type: 'message' | 'call' | 'global';
    from: string;
    message: string;
    timestamp: number;
    read: boolean;
}

type Page = 'login' | 'signup' | 'home' | 'meeting' | 'users' | 'fileserver' | 'sharedwithme' | 'messages' | 'globalchat';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('login');
    const [account, setAccount] = useState<Account | null>(null);
    const [roomId, setRoomId] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<Account | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [callRingtone] = useState(() => {
        // Create a more reliable ringtone using Web Audio API oscillator
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        let audioContext: AudioContext | null = null;
        let oscillator: OscillatorNode | null = null;
        let gainNode: GainNode | null = null;
        let isPlaying = false;
        let restartTimeout: NodeJS.Timeout | null = null;
        let isInitialized = false;

        // Initialize audio context on first user interaction
        const initAudioContext = () => {
            if (!isInitialized) {
                audioContext = new AudioContextClass();
                isInitialized = true;
                console.log('✅ AudioContext initialized on user interaction');
            }
        };

        // Add listeners to initialize on first interaction
        const events = ['click', 'touchstart', 'keydown'];
        events.forEach(event => {
            document.addEventListener(event, initAudioContext, { once: true, passive: true });
        });

        const ringtone = {
            play: async () => {
                if (isPlaying) return;

                // Ensure audio context is initialized
                if (!audioContext) {
                    initAudioContext();
                }

                if (!audioContext) {
                    console.warn('AudioContext not available yet');
                    return;
                }

                try {
                    // Resume audio context if suspended (required by browsers)
                    if (audioContext.state === 'suspended') {
                        await audioContext.resume();
                        console.log('🔊 AudioContext resumed');
                    }

                    oscillator = audioContext.createOscillator();
                    gainNode = audioContext.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);

                    // Create a pleasant ringtone sound
                    oscillator.type = 'sine';
                    oscillator.frequency.value = 800;
                    gainNode.gain.value = 0.3;

                    // Create a ringing pattern
                    const now = audioContext.currentTime;
                    const ringDuration = 0.4;
                    const silenceDuration = 0.4;
                    const patternDuration = ringDuration + silenceDuration;

                    // Schedule multiple rings
                    for (let i = 0; i < 10; i++) {
                        const startTime = now + (i * patternDuration);
                        gainNode.gain.setValueAtTime(0.3, startTime);
                        gainNode.gain.setValueAtTime(0, startTime + ringDuration);
                    }

                    oscillator.start(now);
                    isPlaying = true;
                    console.log('🔔 Ringtone started playing');

                    // Restart after pattern completes
                    restartTimeout = setTimeout(() => {
                        if (isPlaying) {
                            ringtone.pause();
                            ringtone.play();
                        }
                    }, patternDuration * 10 * 1000);
                } catch (error) {
                    console.error('Failed to play ringtone:', error);
                }
            },
            pause: () => {
                if (restartTimeout) {
                    clearTimeout(restartTimeout);
                    restartTimeout = null;
                }
                if (oscillator && isPlaying) {
                    try {
                        oscillator.stop();
                    } catch (e) {
                        // Oscillator might already be stopped
                    }
                    oscillator = null;
                    gainNode = null;
                    isPlaying = false;
                    console.log('🔇 Ringtone stopped');
                }
            },
            get currentTime() {
                return 0;
            },
            set currentTime(_value: number) {
                // No-op for compatibility with Audio API
            }
        };

        return ringtone;
    });

    useEffect(() => {
        if (currentPage !== 'meeting') {
            // Don't track processed calls when not in a meeting
        }
    }, [currentPage]);

    useEffect(() => {
        const loadAuth = async () => {
            try {
                const saved = localStorage.getItem(AUTH_STORAGE_KEY);
                if (saved) {
                    const acc: Account = JSON.parse(saved);
                    setAccount(acc);
                    setCurrentPage('home');
                    console.log('✅ Auto-login successful');
                }
            } catch (error) {
                console.error('Error loading auth:', error);
                localStorage.removeItem(AUTH_STORAGE_KEY);
            } finally {
                setIsLoading(false);
            }
        };

        loadAuth();
    }, []);

    useEffect(() => {
        if (!account) return;

        const loadNotifications = async () => {
            try {
                const response = await fetch(`${API_URL}/api/notifications?accountId=${account.id}&unreadOnly=false`);
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                }
            } catch (error) {
                console.error('Failed to load notifications:', error);
            }
        };

        loadNotifications();
        const interval = setInterval(loadNotifications, 3000);

        return () => clearInterval(interval);
    }, [account]);

    useEffect(() => {
        if (!account) return;

        const checkCalls = async () => {
            try {
                const url = `${API_URL}/api/calls?toAccountId=${account.id}`;
                const response = await fetch(url);
                if (response.ok) {
                    const calls: Call[] = await response.json();
                    const ringingCalls = calls.filter((call) => call.status === 'ringing');

                    if (ringingCalls.length > 0) {
                        const latestCall = ringingCalls[0];

                        if (latestCall.toAccountId === account.id && (!incomingCall || incomingCall.id !== latestCall.id)) {
                            const newCall = {
                                id: latestCall.id,
                                fromAccountId: latestCall.fromAccountId,
                                fromName: latestCall.fromName,
                                roomId: latestCall.roomId,
                                createdAt: latestCall.createdAt,
                                type: latestCall.type || 'call',
                                meetingTitle: latestCall.meetingTitle,
                            };

                            setIncomingCall(newCall);
                            callRingtone.play().catch(err => console.error('Failed to play ringtone:', err));

                            if (Notification.permission === 'granted') {
                                new Notification('📞 Incoming Call', {
                                    body: `${latestCall.fromName} is calling you...`,
                                    icon: '/vite.svg',
                                    tag: 'incoming-call',
                                    requireInteraction: true,
                                });
                            }
                        }
                    } else if (ringingCalls.length === 0 && incomingCall) {
                        callRingtone.pause();
                        callRingtone.currentTime = 0;
                        setIncomingCall(null);
                    }
                }
            } catch (error) {
                console.error('Failed to check calls:', error);
            }
        };

        checkCalls();
        const interval = setInterval(checkCalls, 1000);

        return () => {
            clearInterval(interval);
            callRingtone.pause();
            callRingtone.currentTime = 0;
        };
    }, [account, currentPage, incomingCall, callRingtone]);

    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                console.log('Notification permission:', permission);
            });
        }

        // Enable audio on first user interaction (required by browsers)
        const enableAudio = () => {
            setAudioEnabled(true);
            console.log('✅ Audio enabled on user interaction');
        };

        const events = ['click', 'touchstart', 'keydown'];
        events.forEach(event => {
            document.addEventListener(event, enableAudio, { once: true });
        });

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, enableAudio);
            });
        };
    }, []);

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Login failed');
            }

            const data = await response.json();
            setAccount(data.account);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.account));
            setCurrentPage('home');
            return { success: true };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
        }
    };

    const handleSignup = async (username: string, password: string, fullName: string) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, fullName }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Signup failed');
            }

            const data = await response.json();
            setAccount(data.account);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.account));
            setCurrentPage('home');
            return { success: true };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Signup failed' };
        }
    };

    const handleLogout = () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setAccount(null);
        setCurrentPage('login');
    };

    const handleJoinMeeting = (room: string) => {
        setRoomId(room);
        setCurrentPage('meeting');
    };

    const handleCallUser = async (targetAccountId: string, targetName: string) => {
        const callRoomId = `call-${account?.id}-${targetAccountId}-${Date.now()}`;

        try {
            const response = await fetch(`${API_URL}/api/calls`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fromAccountId: account?.id,
                    toAccountId: targetAccountId,
                    fromName: account?.fullName,
                    toName: targetName,
                    roomId: callRoomId,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.call) {
                    localStorage.setItem('activeCallId', data.call.id);
                }
            }
        } catch (error) {
            console.error('Error calling API:', error);
        }

        handleJoinMeeting(callRoomId);
    };

    const handleMessageUser = (user: Account) => {
        setSelectedUser(user);
        setCurrentPage('messages');
    };

    const handleAcceptCall = async () => {
        if (incomingCall) {
            callRingtone.pause();
            callRingtone.currentTime = 0;

            await fetch(`${API_URL}/api/calls/${incomingCall.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'accepted' }),
            });

            localStorage.setItem('activeCallId', incomingCall.id);
            handleJoinMeeting(incomingCall.roomId);
            setIncomingCall(null);
        }
    };

    const handleRejectCall = async () => {
        if (incomingCall) {
            callRingtone.pause();
            callRingtone.currentTime = 0;

            await fetch(`${API_URL}/api/calls/${incomingCall.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'rejected' }),
            });
            setIncomingCall(null);
        }
    };

    const addNotification = async (notification: Omit<Notification, 'id' | 'read'>) => {
        if (!account) return;

        if (notification.type === 'global') {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/notifications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toAccountId: account.id,
                    type: notification.type,
                    from: notification.from,
                    message: notification.message,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setNotifications(prev => [data.notification, ...prev]);

                if (Notification.permission === 'granted') {
                    new Notification(notification.type === 'message' ? '💬 New Message' : '🔔 Notification', {
                        body: `${notification.from}: ${notification.message}`,
                        icon: '/vite.svg',
                    });
                }
            }
        } catch (error) {
            console.error('Failed to save notification:', error);
        }
    };

    const clearNotification = async (id: string) => {
        if (!account) return;

        try {
            await fetch(`${API_URL}/api/notifications/${id}?accountId=${account.id}`, {
                method: 'DELETE',
            });
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const markNotificationAsRead = async (id: string) => {
        if (!account) return;

        try {
            await fetch(`${API_URL}/api/notifications/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accountId: account.id, read: true }),
            });
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const clearAllNotifications = async () => {
        if (!account) return;

        try {
            const deletePromises = notifications.map(n =>
                fetch(`${API_URL}/api/notifications/${n.id}?accountId=${account.id}`, {
                    method: 'DELETE',
                })
            );
            await Promise.all(deletePromises);
            setNotifications([]);
        } catch (error) {
            console.error('Failed to clear all notifications:', error);
        }
    };

    const incomingCallModal = incomingCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Phone className="w-10 h-10 text-green-600 animate-bounce" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Incoming {incomingCall.type === 'meeting' ? 'Meeting' : 'Call'}
                    </h2>
                    {incomingCall.type === 'meeting' && incomingCall.meetingTitle && (
                        <p className="text-sm font-semibold text-blue-600 mb-2">
                            {incomingCall.meetingTitle}
                        </p>
                    )}
                    <p className="text-lg text-gray-600">
                        {incomingCall.fromName} {incomingCall.type === 'meeting' ? 'invited you to a meeting' : 'is calling you'}...
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleAcceptCall}
                        className="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                        <Phone className="w-5 h-5" />
                        Answer
                    </button>
                    <button
                        onClick={handleRejectCall}
                        className="flex-1 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                        <X className="w-5 h-5" />
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (currentPage === 'login') {
        return (
            <LoginPage
                onLogin={handleLogin}
                onSwitchToSignup={() => setCurrentPage('signup')}
            />
        );
    }

    if (currentPage === 'signup') {
        return (
            <SignupPage
                onSignup={handleSignup}
                onSwitchToLogin={() => setCurrentPage('login')}
            />
        );
    }

    if (currentPage === 'meeting' && account) {
        return (
            <>
                <MeetingRoom
                    account={account}
                    roomId={roomId}
                    onLeave={() => setCurrentPage('home')}
                />
                {incomingCallModal}
            </>
        );
    }

    if (currentPage === 'users' && account) {
        return (
            <>
                <UsersPage
                    account={account}
                    onBack={() => setCurrentPage('home')}
                    onCallUser={handleCallUser}
                    onMessageUser={handleMessageUser}
                />
                {incomingCallModal}
            </>
        );
    }

    if (currentPage === 'fileserver' && account) {
        return (
            <>
                <FileServerPage
                    account={account}
                    onBack={() => setCurrentPage('home')}
                />
                {incomingCallModal}
            </>
        );
    }

    if (currentPage === 'sharedwithme' && account) {
        return (
            <>
                <SharedWithMePage
                    account={account}
                    onBack={() => setCurrentPage('home')}
                />
                {incomingCallModal}
            </>
        );
    }

    if (currentPage === 'globalchat' && account) {
        return (
            <>
                <GlobalChatPage
                    account={account}
                    onBack={() => setCurrentPage('home')}
                />
                {incomingCallModal}
            </>
        );
    }

    if (currentPage === 'messages' && account && selectedUser) {
        return (
            <>
                <MessagesPage
                    account={account}
                    targetUser={selectedUser}
                    onBack={() => setCurrentPage('users')}
                    onNewMessage={(from, message) => {
                        addNotification({
                            type: 'message',
                            from: from,
                            message: message,
                            timestamp: Date.now()
                        });
                    }}
                />
                {incomingCallModal}
            </>
        );
    }

    if (account) {
        return (
            <>
                {!audioEnabled && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
                        <div className="animate-pulse">🔔</div>
                        <span className="font-medium">Click anywhere to enable call notifications</span>
                    </div>
                )}
                <HomePage
                    account={account}
                    onLogout={handleLogout}
                    onJoinMeeting={handleJoinMeeting}
                    onViewUsers={() => setCurrentPage('users')}
                    onViewFileServer={() => setCurrentPage('fileserver')}
                    onViewSharedWithMe={() => setCurrentPage('sharedwithme')}
                    onViewGlobalChat={() => setCurrentPage('globalchat')}
                    notifications={notifications}
                    onClearNotification={clearNotification}
                    onMarkAsRead={markNotificationAsRead}
                    onClearAll={clearAllNotifications}
                    onAddNotification={addNotification}
                />
                {incomingCallModal}
            </>
        );
    }

    return null;
}

export default App;