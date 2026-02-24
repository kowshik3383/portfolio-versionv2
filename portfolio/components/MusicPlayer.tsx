'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  src: string; // audio source
}

const MusicPlayer = ({ src }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Autoplay on mount
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Autoplay might be blocked by browser
          console.log('Autoplay prevented:', error);
          setIsPlaying(false);
        }
      }
    };

    playAudio();
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Fixed control button - bottom right */}
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
            : 'bg-neutral-900/80 hover:bg-neutral-900/95 text-neutral-400'
        }`}
        aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {/* Music beat visualizer */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 h-5">
            <div className="w-0.5 bg-white rounded-full animate-beat-1" style={{ animationDelay: '0ms' }}></div>
            <div className="w-0.5 bg-white rounded-full animate-beat-2" style={{ animationDelay: '150ms' }}></div>
            <div className="w-0.5 bg-white rounded-full animate-beat-3" style={{ animationDelay: '300ms' }}></div>
            <div className="w-0.5 bg-white rounded-full animate-beat-1" style={{ animationDelay: '450ms' }}></div>
          </div>
        )}

        {/* Volume icon */}
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>

      {/* Hidden audio element */}
      <audio ref={audioRef} loop src={src} preload="auto" />

      {/* Custom CSS for beat animations */}
      <style jsx>{`
        @keyframes beat-1 {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
        
        @keyframes beat-2 {
          0%, 100% { height: 50%; }
          50% { height: 80%; }
        }
        
        @keyframes beat-3 {
          0%, 100% { height: 40%; }
          50% { height: 100%; }
        }

        .animate-beat-1 {
          animation: beat-1 0.6s ease-in-out infinite;
        }
        
        .animate-beat-2 {
          animation: beat-2 0.6s ease-in-out infinite;
        }
        
        .animate-beat-3 {
          animation: beat-3 0.6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;