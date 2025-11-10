import { useEffect, useState, useCallback, useRef } from 'react';
import { WebRTCManager, Peer, Message, FileTransfer } from '../utils/webrtc';
import { LocalSignalingServer, SignalingMessage } from '../utils/signaling';

export function useLocalNetwork(userName: string, roomId?: string) {
    const webrtcRef = useRef<WebRTCManager | null>(null);
    const signalingRef = useRef<LocalSignalingServer | null>(null);
    const initializingRef = useRef(false);
    const [localPeerId, setLocalPeerId] = useState('');
    const [localPeerName, setLocalPeerName] = useState('');

    const [peers, setPeers] = useState<Peer[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [fileTransfers, setFileTransfers] = useState<FileTransfer[]>([]);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    useEffect(() => {
        if (!userName) {
            return;
        }

        if (initializingRef.current) {
            return;
        }

        initializingRef.current = true;
        let isActive = true;
        let discoveryInterval: NodeJS.Timeout | null = null;

        const webrtc = new WebRTCManager(userName);
        webrtcRef.current = webrtc;
        setLocalPeerId(webrtc.getLocalPeerId());
        setLocalPeerName(webrtc.getLocalPeerName());

        // Initialize media stream FIRST, then start signaling
        const initializeAndConnect = async () => {
            try {
                console.log('🎥 Initializing local media stream on startup...');
                const stream = await webrtc.initLocalStream(true, true);
                if (isActive) {
                    setLocalStream(stream);
                    console.log('✅ Local media stream ready before peer connections');
                }
            } catch (error) {
                console.error('❌ Failed to initialize media:', error);
                try {
                    const stream = await webrtc.initLocalStream(false, true);
                    if (isActive) {
                        setLocalStream(stream);
                        setIsVideoEnabled(false);
                    }
                } catch (audioError) {
                    console.error('❌ Failed to get audio:', audioError);
                }
            }

            // Only start signaling AFTER media is initialized
            const signaling = new LocalSignalingServer(
                webrtc.getLocalPeerId(),
                userName,
                roomId
            );
            signalingRef.current = signaling;

            const peersRef = new Map<string, Peer>();
            const pendingConnections = new Set<string>();
            const pendingIceCandidates = new Map<string, RTCIceCandidateInit[]>();

            webrtc.setOnPeerUpdate((updatedPeers) => {
                if (!isActive) return;
                setPeers([...updatedPeers]);
                updatedPeers.forEach(p => peersRef.set(p.id, p));
            });

            webrtc.setOnMessage((message) => {
                if (!isActive) return;
                setMessages(prev => [...prev, message]);
            });

            webrtc.setOnFileTransfer((transfer) => {
                if (!isActive) return;
                setFileTransfers(prev => [...prev, transfer]);
            });

            signaling.setOnSignal(async (message: SignalingMessage) => {
                if (!isActive) return;

                if (message.type === 'peer-discovery') {
                    const existingPeer = peersRef.get(message.from);

                    if (message.from === webrtc.getLocalPeerId()) {
                        return;
                    }

                    // ✅ FIXED: Prevent duplicate connections
                    if (existingPeer) {
                        const state = existingPeer.connection.connectionState;
                        if (state === 'connected' || state === 'connecting') {
                            console.log('⏭️ Already connected/connecting to:', message.fromName, 'State:', state);
                            return;
                        }
                    }

                    // ✅ FIXED: Also check if connection is pending
                    if (pendingConnections.has(message.from)) {
                        console.log('⏭️ Connection already pending for:', message.fromName);
                        return;
                    }

                    const shouldInitiate = !existingPeer &&
                        !pendingConnections.has(message.from) &&
                        webrtc.getLocalPeerId() > message.from;

                    if (shouldInitiate) {
                        console.log('🤝 Initiating connection to:', message.fromName);
                        pendingConnections.add(message.from);

                        try {
                            const peerConnection = await webrtc.createPeerConnection(message.from, message.fromName);

                            peerConnection.onicecandidate = (event) => {
                                if (event.candidate && isActive) {
                                    console.log('❄️ Got ICE candidate:', event.candidate.type);
                                    signaling.send({
                                        type: 'ice-candidate',
                                        to: message.from,
                                        data: event.candidate,
                                    });
                                } else if (!event.candidate) {
                                    console.log('✅ ICE gathering complete for offer');
                                }
                            };

                            const offer = await peerConnection.createOffer({
                                offerToReceiveAudio: true,
                                offerToReceiveVideo: true,
                            });
                            await peerConnection.setLocalDescription(offer);

                            console.log('📤 Created and set local description (offer)');

                            signaling.send({
                                type: 'offer',
                                to: message.from,
                                data: offer,
                            });

                            console.log('✅ Sent offer to:', message.fromName);
                        } catch (error) {
                            console.error('❌ Error creating offer:', error);
                            pendingConnections.delete(message.from);
                        }
                    }
                } else if (message.type === 'offer') {
                    console.log('📥 Received offer from:', message.fromName);

                    // ✅ FIXED: Check for existing connection before creating new one
                    const existingPeer = peersRef.get(message.from);
                    if (existingPeer) {
                        const state = existingPeer.connection.connectionState;
                        if (state === 'connected' || state === 'connecting') {
                            console.log('⏭️ Ignoring offer, already connected to:', message.fromName);
                            return;
                        }
                    }

                    try {
                        let peerConnection = existingPeer?.connection;

                        if (!peerConnection) {
                            peerConnection = await webrtc.createPeerConnection(message.from, message.fromName);

                            peerConnection.onicecandidate = (event) => {
                                if (event.candidate && isActive) {
                                    console.log('❄️ Got ICE candidate:', event.candidate.type);
                                    signaling.send({
                                        type: 'ice-candidate',
                                        to: message.from,
                                        data: event.candidate,
                                    });
                                } else if (!event.candidate) {
                                    console.log('✅ ICE gathering complete for answer');
                                }
                            };
                        }

                        console.log('📥 Setting remote description (offer)');
                        await peerConnection.setRemoteDescription(
                            new RTCSessionDescription(message.data as RTCSessionDescriptionInit)
                        );

                        // Add any pending ICE candidates
                        const pending = pendingIceCandidates.get(message.from);
                        if (pending) {
                            console.log(`❄️ Adding ${pending.length} pending ICE candidates`);
                            for (const candidate of pending) {
                                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                            }
                            pendingIceCandidates.delete(message.from);
                        }

                        const answer = await peerConnection.createAnswer({
                            offerToReceiveAudio: true,
                            offerToReceiveVideo: true,
                        });
                        await peerConnection.setLocalDescription(answer);

                        console.log('📤 Created and set local description (answer)');

                        signaling.send({
                            type: 'answer',
                            to: message.from,
                            data: answer,
                        });

                        console.log('✅ Sent answer to:', message.fromName);
                    } catch (error) {
                        console.error('❌ Error handling offer:', error);
                    }
                } else if (message.type === 'answer') {
                    console.log('📥 Received answer from:', message.fromName);

                    const peer = peersRef.get(message.from);
                    if (peer?.connection) {
                        try {
                            if (peer.connection.signalingState === 'have-local-offer') {
                                await peer.connection.setRemoteDescription(
                                    new RTCSessionDescription(message.data as RTCSessionDescriptionInit)
                                );

                                // Add any pending ICE candidates
                                const pending = pendingIceCandidates.get(message.from);
                                if (pending) {
                                    console.log(`❄️ Adding ${pending.length} pending ICE candidates`);
                                    for (const candidate of pending) {
                                        await peer.connection.addIceCandidate(new RTCIceCandidate(candidate));
                                    }
                                    pendingIceCandidates.delete(message.from);
                                }

                                pendingConnections.delete(message.from);
                                console.log('✅ Connected to:', message.fromName);
                            }
                        } catch (error) {
                            console.error('❌ Error setting remote description:', error);
                        }
                    }
                } else if (message.type === 'ice-candidate') {
                    const peer = peersRef.get(message.from);
                    if (peer?.connection) {
                        try {
                            if (peer.connection.remoteDescription) {
                                console.log('❄️ Adding ICE candidate immediately');
                                await peer.connection.addIceCandidate(
                                    new RTCIceCandidate(message.data as RTCIceCandidateInit)
                                );
                            } else {
                                console.log('⏳ Queuing ICE candidate (no remote description yet)');
                                if (!pendingIceCandidates.has(message.from)) {
                                    pendingIceCandidates.set(message.from, []);
                                }
                                pendingIceCandidates.get(message.from)?.push(message.data as RTCIceCandidateInit);
                            }
                        } catch (error) {
                            console.error('❌ Error adding ICE candidate:', error);
                        }
                    } else {
                        console.warn('⚠️ Received ICE candidate for unknown peer:', message.from);
                    }
                }
            });

            discoveryInterval = setInterval(() => {
                if (isActive) {
                    signaling.broadcast('peer-discovery');
                }
            }, 2000);

            signaling.broadcast('peer-discovery');
            setTimeout(() => {
                if (isActive) {
                    signaling.broadcast('peer-discovery');
                }
            }, 500);
        };

        // Start the initialization process
        initializeAndConnect();

        return () => {
            isActive = false;
            initializingRef.current = false;
            if (discoveryInterval) {
                clearInterval(discoveryInterval);
            }
            if (signalingRef.current) {
                signalingRef.current.close();
            }
            if (webrtcRef.current) {
                webrtcRef.current.cleanup();
            }
        };
    }, [userName, roomId]);

    const startVideo = useCallback(async () => {
        if (!webrtcRef.current) return;

        try {
            console.log('🎥 Initializing local media stream...');
            const stream = await webrtcRef.current.initLocalStream(true, true);
            setLocalStream(stream);
            console.log('✅ Local media stream initialized successfully');

            // Add tracks to all existing peer connections and renegotiate
            const peers = Array.from(webrtcRef.current['peers'].values());
            if (peers.length > 0) {
                console.log(`🔄 Adding media tracks to ${peers.length} existing peer connection(s)`);
                for (const peer of peers) {
                    stream.getTracks().forEach(track => {
                        const sender = peer.connection.getSenders().find(s => s.track?.kind === track.kind);
                        if (!sender) {
                            peer.connection.addTrack(track, stream);
                            console.log(`✅ Added ${track.kind} track to peer:`, peer.name);
                        }
                    });

                    // Renegotiate after adding tracks
                    if (peer.connection.signalingState === 'stable') {
                        console.log(`🔄 Renegotiating with ${peer.name}...`);
                        const offer = await peer.connection.createOffer();
                        await peer.connection.setLocalDescription(offer);
                        signalingRef.current?.send({
                            type: 'offer',
                            to: peer.id,
                            data: offer,
                        });
                        console.log(`✅ Sent renegotiation offer to ${peer.name}`);
                    }
                }
            }
        } catch (error) {
            console.error('❌ Failed to start video:', error);
            try {
                console.log('⚠️ Trying audio-only fallback...');
                const stream = await webrtcRef.current.initLocalStream(false, true);
                setLocalStream(stream);
                setIsVideoEnabled(false);
                console.log('✅ Audio-only stream initialized');
            } catch (audioError) {
                console.error('❌ Failed to start audio:', audioError);
            }
        }
    }, []);

    const sendMessage = useCallback((content: string) => {
        if (!webrtcRef.current) return;
        webrtcRef.current.sendMessage(content);

        // Add own message to local state with correct peer info
        const ownMessage: Message = {
            id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            peerId: localPeerId,
            peerName: localPeerName,
            content,
            timestamp: Date.now(),
        };
        setMessages(prev => [...prev, ownMessage]);
    }, [localPeerId, localPeerName]);

    const sendFile = useCallback((file: File) => {
        webrtcRef.current?.sendFile(file);
    }, []);

    const toggleAudio = useCallback(() => {
        if (!webrtcRef.current) return;
        const newState = !isAudioEnabled;
        webrtcRef.current.toggleAudio(newState);
        setIsAudioEnabled(newState);
    }, [isAudioEnabled]);

    const toggleVideo = useCallback(() => {
        if (!webrtcRef.current) return;
        const newState = !isVideoEnabled;
        webrtcRef.current.toggleVideo(newState);
        setIsVideoEnabled(newState);
    }, [isVideoEnabled]);

    const cleanup = useCallback(() => {
        webrtcRef.current?.cleanup();
        signalingRef.current?.close();

        const activeCallId = localStorage.getItem('activeCallId');
        if (activeCallId) {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            fetch(`${API_URL}/api/calls/${activeCallId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'ended' }),
            }).catch(err => console.error('Failed to end call:', err));
            localStorage.removeItem('activeCallId');
        }
    }, []);

    return {
        peers,
        messages,
        fileTransfers,
        localStream,
        isAudioEnabled,
        isVideoEnabled,
        startVideo,
        sendMessage,
        sendFile,
        toggleAudio,
        toggleVideo,
        cleanup,
        localPeerId,
        localPeerName,
    };
}