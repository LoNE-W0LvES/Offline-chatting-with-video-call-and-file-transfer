import { Mic, MicOff, Video as VideoIcon, VideoOff, MessageSquare, FolderOpen, MonitorUp, Monitor } from 'lucide-react';
import { useState } from 'react';

interface ControlsProps {
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;
    isScreenSharing: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    onStartScreenShare: () => void;
    onStopScreenShare: () => void;
    activeTab: 'chat' | 'files';
    onTabChange: (tab: 'chat' | 'files') => void;
}

export function Controls({
                             isAudioEnabled,
                             isVideoEnabled,
                             isScreenSharing,
                             onToggleAudio,
                             onToggleVideo,
                             onStartScreenShare,
                             onStopScreenShare,
                             activeTab,
                             onTabChange,
                         }: ControlsProps) {
    const [showScreenShareError, setShowScreenShareError] = useState(false);

    // Check if screen sharing is supported
    const isScreenShareSupported = navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices;

    const handleScreenShare = async () => {
        if (!isScreenShareSupported) {
            setShowScreenShareError(true);
            setTimeout(() => setShowScreenShareError(false), 3000);
            return;
        }

        if (isScreenSharing) {
            await onStopScreenShare();
        } else {
            try {
                await onStartScreenShare();
            } catch (error) {
                console.error('Failed to start screen share:', error);
                setShowScreenShareError(true);
                setTimeout(() => setShowScreenShareError(false), 3000);
            }
        }
    };

    return (
        <div className="bg-white border-t border-gray-200 p-4">
            {showScreenShareError && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
                    <p className="font-medium">
                        {!isScreenShareSupported
                            ? '📱 Screen sharing is not supported on this device/browser'
                            : '❌ Failed to start screen sharing'}
                    </p>
                </div>
            )}

            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex gap-3">
                    <button
                        onClick={onToggleAudio}
                        className={`p-4 rounded-full transition-colors ${
                            isAudioEnabled
                                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                        title={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
                    >
                        {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    </button>

                    <button
                        onClick={onToggleVideo}
                        className={`p-4 rounded-full transition-colors ${
                            isVideoEnabled
                                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                        title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
                    >
                        {isVideoEnabled ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                    </button>

                    <button
                        onClick={handleScreenShare}
                        disabled={!isScreenShareSupported}
                        className={`p-4 rounded-full transition-colors relative ${
                            isScreenSharing
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : isScreenShareSupported
                                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        title={
                            !isScreenShareSupported
                                ? 'Screen sharing not available on this device'
                                : isScreenSharing
                                    ? 'Stop sharing screen'
                                    : 'Share screen'
                        }
                    >
                        {isScreenSharing ? (
                            <Monitor className="w-5 h-5" />
                        ) : (
                            <MonitorUp className="w-5 h-5" />
                        )}
                        {!isScreenShareSupported && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                        )}
                    </button>
                </div>

                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => onTabChange('chat')}
                        className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                            activeTab === 'chat'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Chat
                    </button>
                    <button
                        onClick={() => onTabChange('files')}
                        className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                            activeTab === 'files'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <FolderOpen className="w-4 h-4" />
                        Files
                    </button>
                </div>
            </div>
        </div>
    );
}