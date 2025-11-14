import { useState } from 'react';
import { Wifi, LogOut, Video, Users, ArrowRight, FolderOpen, Share2, MessageSquare, Activity, Mail } from 'lucide-react';
import { Account } from '../App';
import { NotificationCenter } from '../components/NotificationCenter';
import { MeetingInvitation } from '../components/MeetingInvitation';

interface Notification {
    id: string;
    type: 'message' | 'call' | 'global';
    from: string;
    message: string;
    timestamp: number;
    read: boolean;
}

interface HomePageProps {
    account: Account;
    onLogout: () => void;
    onJoinMeeting: (roomId: string) => void;
    onViewUsers: () => void;
    onViewFileServer: () => void;
    onViewSharedWithMe: () => void;
    onViewGlobalChat: () => void;
    onViewIoTData: () => void;
    onViewMessages: () => void;
    notifications: Notification[];
    onClearNotification: (id: string) => void;
    onMarkAsRead: (id: string) => void;
    onClearAll: () => void;
    onAddNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
}

export function HomePage({
                             account,
                             onLogout,
                             onJoinMeeting,
                             onViewUsers,
                             onViewFileServer,
                             onViewSharedWithMe,
                             onViewGlobalChat,
                             onViewIoTData,
                             onViewMessages,
                             notifications,
                             onClearNotification,
                             onMarkAsRead,
                             onClearAll
                         }: HomePageProps) {
    const [roomId, setRoomId] = useState('');
    const [showMeetingInvitation, setShowMeetingInvitation] = useState(false);

    const handleQuickMeeting = () => {
        setShowMeetingInvitation(true);
    };

    const handleStartMeeting = (newRoomId: string) => {
        setShowMeetingInvitation(false);
        onJoinMeeting(newRoomId);
    };

    const handleJoinRoom = (e: React.FormEvent) => {
        e.preventDefault();
        if (roomId.trim()) {
            onJoinMeeting(roomId.trim());
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden flex flex-col">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Wifi className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">LAN Collaboration</h1>
                            <p className="text-sm text-gray-500">Welcome, {account.fullName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <NotificationCenter
                            notifications={notifications}
                            onClear={onClearNotification}
                            onMarkAsRead={onMarkAsRead}
                            onClearAll={onClearAll}
                        />
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-6xl mx-auto p-8">
                    <div className="space-y-6">
                        {/* Row 1: Join a Meeting and Start Meeting */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                    <Video className="w-6 h-6 text-teal-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Join a Meeting</h2>
                                <p className="text-gray-600 mb-6">
                                    Enter a room ID to join an existing meeting
                                </p>
                                <form onSubmit={handleJoinRoom} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={roomId}
                                        onChange={(e) => setRoomId(e.target.value)}
                                        placeholder="Enter room ID"
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!roomId.trim()}
                                        className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Join
                                    </button>
                                </form>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Video className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Meeting</h2>
                                <p className="text-gray-600 mb-6">
                                    Create an instant meeting room and invite others
                                </p>
                                <button
                                    onClick={handleQuickMeeting}
                                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    Start Now
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Row 2: View Users and My Messages */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">View Users</h2>
                                <p className="text-gray-600 mb-6">
                                    See all users and call them directly
                                </p>
                                <button
                                    onClick={onViewUsers}
                                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    Browse Users
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                                    <Mail className="w-6 h-6 text-pink-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">My Messages</h2>
                                <p className="text-gray-600 mb-6">
                                    View your direct message conversations
                                </p>
                                <button
                                    onClick={onViewMessages}
                                    className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    Open Inbox
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Row 3: File Server and Shared with Me */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <FolderOpen className="w-6 h-6 text-purple-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">File Server</h2>
                                <p className="text-gray-600 mb-6">
                                    Upload and share files with everyone
                                </p>
                                <button
                                    onClick={onViewFileServer}
                                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    Open Server
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                    <Share2 className="w-6 h-6 text-orange-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Shared with Me</h2>
                                <p className="text-gray-600 mb-6">
                                    View files others have shared with you
                                </p>
                                <button
                                    onClick={onViewSharedWithMe}
                                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    View Files
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Row 4: Global Chat and IoT Monitor */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                    <MessageSquare className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Global Chat</h2>
                                <p className="text-gray-600 mb-6">
                                    Join the public chatroom with everyone
                                </p>
                                <button
                                    onClick={onViewGlobalChat}
                                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    Open Chat
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                                    <Activity className="w-6 h-6 text-cyan-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">IoT Monitor</h2>
                                <p className="text-gray-600 mb-6">
                                    Monitor and manage your IoT devices
                                </p>
                                <button
                                    onClick={onViewIoTData}
                                    className="w-full px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    Open Monitor
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-6 shadow">
                                <div className="text-3xl mb-2">🎥</div>
                                <h3 className="font-semibold text-gray-900 mb-1">Video Chat</h3>
                                <p className="text-sm text-gray-600">High-quality video calls</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow">
                                <div className="text-3xl mb-2">💬</div>
                                <h3 className="font-semibold text-gray-900 mb-1">Messaging</h3>
                                <p className="text-sm text-gray-600">Real-time chat</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow">
                                <div className="text-3xl mb-2">📁</div>
                                <h3 className="font-semibold text-gray-900 mb-1">File Sharing</h3>
                                <p className="text-sm text-gray-600">Share files instantly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} <span className="font-semibold text-gray-900">LoNE WoLvES</span>. All rights reserved.
                    </p>
                </div>
            </footer>

            {showMeetingInvitation && (
                <MeetingInvitation
                    account={account}
                    onClose={() => setShowMeetingInvitation(false)}
                    onStartMeeting={handleStartMeeting}
                />
            )}
        </div>
    );
}