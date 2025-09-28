import React, { useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Card } from './ui/card';

interface VideoPlayerProps {
  videoId: string;
  onProgress: (percentage: number) => void;
  watchPercentage: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  onProgress,
  watchPercentage
}) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const opts: YouTubeProps['opts'] = {
    height: window.innerWidth < 640 ? '200' : window.innerWidth < 768 ? '250' : '400',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      fs: 1,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 1,
      playsinline: 1,
      origin: window.location.origin,
      enablejsapi: 1,
    },
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
  };

  const onPlay = () => {
    setIsPlaying(true);
    // Start tracking progress
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current) {
        const current = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();
        
        if (total > 0) {
          setCurrentTime(current);
          const percentage = (current / total) * 100;
          onProgress(percentage);
        }
      }
    }, 1000);
  };

  const onPause = () => {
    setIsPlaying(false);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const onEnd = () => {
    setIsPlaying(false);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    onProgress(100);
  };

  const onStateChange = (event: any) => {
    // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
    if (event.data === 1) {
      onPlay();
    } else if (event.data === 2) {
      onPause();
    } else if (event.data === 0) {
      onEnd();
    }
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (playerRef.current) {
      const iframe = playerRef.current.getIframe();
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      }
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <Card className="overflow-hidden glass border-glass-border">
        <div className="relative">
          <div className="aspect-video w-full">
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
              className="w-full h-full"
              iframeClassName="w-full h-full rounded-lg"
            />
          </div>
          
          {/* Mobile Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="sm:hidden absolute top-2 right-2 bg-black/70 text-white p-2 rounded-lg hover:bg-black/90 transition-colors z-10"
            aria-label="View in fullscreen"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </Card>

      {/* Video Info */}
      <div className="glass p-3 sm:p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
          <span>Progress: {Math.round(watchPercentage)}% watched</span>
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {watchPercentage >= 95 ? (
            <span className="text-success">✓ Video completed successfully!</span>
          ) : (
            <span>Watch at least 95% of the video to unlock the next activity</span>
          )}
        </div>
      </div>

      {/* Important Note */}
      <div className="glass p-3 sm:p-4 rounded-lg border-l-4 border-primary">
        <h4 className="text-sm sm:text-base font-semibold text-glass-foreground mb-2">
          📚 Learning Tip
        </h4>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Pay close attention to the safety procedures and emergency steps demonstrated in this video. 
          You'll need this knowledge for the interactive activities that follow.
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;