import { useEffect, useRef, useState } from 'react';
import { Peer } from '../utils/webrtc';
import { MicOff, VideoOff, Maximize, Minimize } from 'lucide-react';

interface VideoGridProps {
  localStream: MediaStream | null;
  peers: Peer[];
  localPeerName: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
}

export function VideoGrid({ localStream, peers, localPeerName, isAudioEnabled, isVideoEnabled }: VideoGridProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <VideoTile
        videoRef={localVideoRef}
        peerName={localPeerName}
        isLocal={true}
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
      />
      {peers.map(peer => (
        <PeerVideoTile key={peer.id} peer={peer} />
      ))}
    </div>
  );
}

interface VideoTileProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  peerName: string;
  isLocal: boolean;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
}

function VideoTile({ videoRef, peerName, isLocal, isAudioEnabled, isVideoEnabled }: VideoTileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  // Listen for fullscreen changes (e.g., user presses ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video group">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
          {peerName} {isLocal && '(You)'}
        </span>
        <div className="flex gap-2">
          {!isAudioEnabled && (
            <div className="bg-red-600 p-2 rounded-full">
              <MicOff className="w-4 h-4 text-white" />
            </div>
          )}
          {!isVideoEnabled && (
            <div className="bg-red-600 p-2 rounded-full">
              <VideoOff className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <Minimize className="w-5 h-5 text-white" />
        ) : (
          <Maximize className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
}

interface PeerVideoTileProps {
  peer: Peer;
}

function PeerVideoTile({ peer }: PeerVideoTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (videoRef.current && peer.stream) {
      videoRef.current.srcObject = peer.stream;
    }
  }, [peer.stream]);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  // Listen for fullscreen changes (e.g., user presses ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video group">
      {peer.stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-3xl text-white font-bold">
              {peer.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}
      <div className="absolute bottom-2 left-2">
        <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
          {peer.name}
        </span>
      </div>
      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <Minimize className="w-5 h-5 text-white" />
        ) : (
          <Maximize className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
}
