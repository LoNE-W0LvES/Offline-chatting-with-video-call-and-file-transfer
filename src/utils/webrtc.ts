export interface Peer {
    id: string;
    name: string;
    connection: RTCPeerConnection;
    dataChannel?: RTCDataChannel;
    stream?: MediaStream;
    screenStream?: MediaStream;
}

export interface Message {
    id: string;
    peerId: string;
    peerName: string;
    content: string;
    timestamp: number;
}

export interface FileTransfer {
    id: string;
    peerId: string;
    peerName: string;
    name: string;
    size: number;
    progress: number;
    data?: ArrayBuffer;
}

export class WebRTCManager {
    private localPeerId: string;
    private localPeerName: string;
    private peers: Map<string, Peer> = new Map();
    private localStream: MediaStream | null = null;
    private localScreenStream: MediaStream | null = null;
    private onPeerUpdate?: (peers: Peer[]) => void;
    private onMessage?: (message: Message) => void;
    private onFileTransfer?: (transfer: FileTransfer) => void;

    constructor(peerName: string) {
        this.localPeerId = this.generatePeerId();
        this.localPeerName = peerName;
        console.log('🔧 WebRTCManager initialized with peer ID:', this.localPeerId);
    }

    private generatePeerId(): string {
        return `peer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    getLocalPeerId(): string {
        return this.localPeerId;
    }

    getLocalPeerName(): string {
        return this.localPeerName;
    }

    setOnPeerUpdate(callback: (peers: Peer[]) => void) {
        this.onPeerUpdate = callback;
    }

    setOnMessage(callback: (message: Message) => void) {
        this.onMessage = callback;
    }

    setOnFileTransfer(callback: (transfer: FileTransfer) => void) {
        this.onFileTransfer = callback;
    }

    async initLocalStream(video: boolean = true, audio: boolean = true): Promise<MediaStream> {
        try {
            // Stop old stream before creating a new one
            if (this.localStream) {
                this.localStream.getTracks().forEach(track => {
                    track.stop();
                    console.log(`🛑 Stopped old ${track.kind} track before creating new stream`);
                });
            }

            const constraints: MediaStreamConstraints = {
                video: video ? { width: { ideal: 1280 }, height: { ideal: 720 } } : false,
                audio: audio
            };

            this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log('✅ Local stream initialized');

            // Add stream to all existing peer connections
            this.peers.forEach(peer => {
                this.localStream?.getTracks().forEach(track => {
                    peer.connection.addTrack(track, this.localStream!);
                });
            });

            return this.localStream;
        } catch (error) {
            console.error('❌ Failed to get user media:', error);
            throw error;
        }
    }

    async startScreenShare(): Promise<MediaStream> {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: 'always',
                    displaySurface: 'monitor'
                } as MediaTrackConstraints,
                audio: false
            });

            this.localScreenStream = screenStream;
            console.log('🖥️ Screen share started');

            // Remove old video track and add screen share track
            const screenVideoTrack = screenStream.getVideoTracks()[0];

            this.peers.forEach(peer => {
                const senders = peer.connection.getSenders();
                const videoSender = senders.find(s => s.track?.kind === 'video');

                if (videoSender && videoSender.track) {
                    // Remove old video track
                    peer.connection.removeTrack(videoSender);
                    console.log(`🗑️ Removed old video track for ${peer.name}`);
                }

                // Add screen share track
                peer.connection.addTrack(screenVideoTrack, screenStream);
                console.log(`✅ Added screen share track for ${peer.name}`);
            });

            // Listen for screen share stop
            screenVideoTrack.onended = () => {
                console.log('🖥️ Screen share stopped');
                this.stopScreenShare();
            };

            return screenStream;
        } catch (error) {
            console.error('❌ Failed to start screen share:', error);
            throw error;
        }
    }

    async stopScreenShare(): Promise<void> {
        if (!this.localScreenStream) return;

        // Stop all screen share tracks
        this.localScreenStream.getTracks().forEach(track => track.stop());
        this.localScreenStream = null;

        // Restore original camera video track
        if (this.localStream) {
            const cameraVideoTrack = this.localStream.getVideoTracks()[0];

            this.peers.forEach(peer => {
                const senders = peer.connection.getSenders();
                // Remove screen share track
                const videoSender = senders.find(s => s.track?.kind === 'video');

                if (videoSender && videoSender.track) {
                    peer.connection.removeTrack(videoSender);
                    console.log(`🗑️ Removed screen share track for ${peer.name}`);
                }

                // Add camera track back
                if (cameraVideoTrack) {
                    peer.connection.addTrack(cameraVideoTrack, this.localStream!);
                    console.log(`✅ Restored camera video for ${peer.name}`);
                }
            });
        }

        console.log('✅ Screen share stopped');
    }

    isScreenSharing(): boolean {
        return this.localScreenStream !== null;
    }

    async createPeerConnection(peerId: string, peerName: string): Promise<RTCPeerConnection> {
        console.log('🔗 Creating peer connection for:', peerName);

        const config: RTCConfiguration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
            ],
            iceCandidatePoolSize: 10,
        };

        const connection = new RTCPeerConnection(config);

        // Add local stream tracks if available (camera or screen share)
        const streamToAdd = this.localScreenStream || this.localStream;
        if (streamToAdd) {
            console.log(`🎵 Adding ${streamToAdd.getTracks().length} tracks to new peer connection with ${peerName}`);
            streamToAdd.getTracks().forEach(track => {
                connection.addTrack(track, streamToAdd!);
                console.log(`  ✅ Added ${track.kind} track (enabled: ${track.enabled})`);
            });
        } else {
            console.warn(`⚠️ No local stream available when creating connection with ${peerName}`);
        }

        // Create data channel
        const dataChannel = connection.createDataChannel('data');
        this.setupDataChannel(dataChannel, peerId, peerName);

        // Handle incoming data channels
        connection.ondatachannel = (event) => {
            console.log('📨 Received data channel from:', peerName);
            this.setupDataChannel(event.channel, peerId, peerName);
        };

        // Handle incoming tracks
        connection.ontrack = (event) => {
            console.log(`🎥 Received ${event.track.kind} track from ${peerName}:`, {
                trackId: event.track.id,
                enabled: event.track.enabled,
                muted: event.track.muted,
                readyState: event.track.readyState,
                streamId: event.streams[0]?.id
            });
            const peer = this.peers.get(peerId);
            if (peer) {
                if (!peer.stream) {
                    peer.stream = event.streams[0];
                    console.log(`✅ Set stream for ${peerName}`);
                } else if (peer.stream.id !== event.streams[0].id) {
                    console.log(`🔄 Updated stream for ${peerName}`);
                    peer.stream = event.streams[0];
                }
                this.notifyPeerUpdate();
            }
        };

        // Handle connection state changes
        connection.onconnectionstatechange = () => {
            console.log(`🔌 Connection state with ${peerName}:`, connection.connectionState);
            if (connection.connectionState === 'failed' || connection.connectionState === 'disconnected') {
                this.removePeer(peerId);
            }
        };

        // Log ICE connection state
        connection.oniceconnectionstatechange = () => {
            console.log(`❄️ ICE connection state with ${peerName}:`, connection.iceConnectionState);
        };

        // Log ICE gathering state
        connection.onicegatheringstatechange = () => {
            console.log(`🔍 ICE gathering state with ${peerName}:`, connection.iceGatheringState);
        };

        // Log signaling state
        connection.onsignalingstatechange = () => {
            console.log(`📡 Signaling state with ${peerName}:`, connection.signalingState);
        };

        // Store peer
        const peer: Peer = {
            id: peerId,
            name: peerName,
            connection,
            dataChannel,
        };

        this.peers.set(peerId, peer);
        this.notifyPeerUpdate();

        return connection;
    }

    private setupDataChannel(channel: RTCDataChannel, peerId: string, peerName: string) {
        channel.onopen = () => {
            console.log('✅ Data channel opened with:', peerName);
            const peer = this.peers.get(peerId);
            if (peer) {
                peer.dataChannel = channel;
                this.notifyPeerUpdate();
            }
        };

        channel.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'message') {
                    const message: Message = {
                        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        peerId,
                        peerName,
                        content: data.content,
                        timestamp: Date.now(),
                    };
                    this.onMessage?.(message);
                } else if (data.type === 'file-meta') {
                    const transfer: FileTransfer = {
                        id: data.id,
                        peerId,
                        peerName,
                        name: data.name,
                        size: data.size,
                        progress: 0,
                    };
                    this.onFileTransfer?.(transfer);
                }
            } catch (error) {
                console.error('Error handling data channel message:', error);
            }
        };

        channel.onerror = (error) => {
            console.error('❌ Data channel error with', peerName, ':', error);
        };

        channel.onclose = () => {
            console.log('🔌 Data channel closed with:', peerName);
        };
    }

    sendMessage(content: string) {
        const message = { type: 'message', content };
        this.peers.forEach(peer => {
            if (peer.dataChannel?.readyState === 'open') {
                peer.dataChannel.send(JSON.stringify(message));
            }
        });
    }

    sendFile(file: File) {
        const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const fileMeta = {
            type: 'file-meta',
            id: fileId,
            name: file.name,
            size: file.size,
        };

        this.peers.forEach(peer => {
            if (peer.dataChannel?.readyState === 'open') {
                peer.dataChannel.send(JSON.stringify(fileMeta));
            }
        });

        // Note: Actual file transfer implementation would go here
        // This is a simplified version
    }

    toggleAudio(enabled: boolean) {
        if (this.localStream) {
            this.localStream.getAudioTracks().forEach(track => {
                track.enabled = enabled;
            });
        }
    }

    toggleVideo(enabled: boolean) {
        if (this.localStream) {
            this.localStream.getVideoTracks().forEach(track => {
                track.enabled = enabled;
            });
        }
    }

    private removePeer(peerId: string) {
        const peer = this.peers.get(peerId);
        if (peer) {
            peer.dataChannel?.close();
            peer.connection.close();
            this.peers.delete(peerId);
            this.notifyPeerUpdate();
            console.log('🗑️ Removed peer:', peer.name);
        }
    }

    private notifyPeerUpdate() {
        const peerArray = Array.from(this.peers.values());
        this.onPeerUpdate?.(peerArray);
    }

    cleanup() {
        console.log('🧹 Cleaning up WebRTC manager');

        this.peers.forEach(peer => {
            peer.dataChannel?.close();
            peer.connection.close();
        });
        this.peers.clear();

        if (this.localScreenStream) {
            this.localScreenStream.getTracks().forEach(track => track.stop());
            this.localScreenStream = null;
        }

        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }

        this.notifyPeerUpdate();
    }
}