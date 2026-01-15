import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Music, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef(null);

  // Danh sách nhạc Việt lofi/chill (dùng file từ Internet hoặc local)
  const playlist = [
    {
      title: "Chill Lofi Vietnamese",
      artist: "Background Music",
      url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3", // Placeholder - bạn có thể thay bằng link nhạc Việt
    },
    {
      title: "Study Music",
      artist: "Focus Beats",
      url: "https://cdn.pixabay.com/audio/2022/03/15/audio_c6e0e87c5f.mp3",
    },
    {
      title: "Chill Vibes",
      artist: "Relax Music",
      url: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3",
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio play failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSongEnd = () => {
    // Tự động phát bài tiếp theo
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch((err) => console.log(err));
    }
  };

  const currentSong = playlist[currentSongIndex];

  return (
    <div className="space-y-4">
      {/* Main Header */}
      <div className="text-center space-y-3">
        {/* Logo với animation */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
            <Sparkles
              className="relative size-8 sm:size-10 text-primary animate-bounce"
              style={{ animationDuration: "3s" }}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              TodoX
            </span>
          </h1>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-md mx-auto">
          Bạn quản lý công việc, tôi giúp bạn hoàn thành chúng! ✨
        </p>

        {/* Music Player Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPlayer(!showPlayer)}
          className="mx-auto gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-all"
        >
          <Music className="size-3.5 sm:size-4" />
          {showPlayer ? "Ẩn nhạc nền" : "Phát nhạc nền"}
        </Button>
      </div>

      {/* Music Player */}
      {showPlayer && (
        <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-blue-50/50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-800/50 rounded-lg shadow-lg animate-fade-in">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="shrink-0 size-10 sm:size-11 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-md transition-all hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="size-4 sm:size-5 fill-current" />
              ) : (
                <Play className="size-4 sm:size-5 fill-current ml-0.5" />
              )}
            </Button>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="size-2 rounded-full bg-green-500 animate-pulse"
                  style={{ display: isPlaying ? "block" : "none" }}
                />
                <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                  {currentSong.title}
                </p>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                {currentSong.artist}
              </p>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="size-8 sm:size-9 hover:bg-purple-100 dark:hover:bg-purple-900/30"
              >
                {isMuted ? (
                  <VolumeX className="size-3.5 sm:size-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="size-3.5 sm:size-4 text-purple-600 dark:text-purple-400" />
                )}
              </Button>

              {/* Volume Slider - Desktop only */}
              <div className="hidden sm:flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 h-1.5 bg-purple-200 dark:bg-purple-800 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(168 85 247) 0%, rgb(168 85 247) ${
                      volume * 100
                    }%, rgb(226 232 240) ${
                      volume * 100
                    }%, rgb(226 232 240) 100%)`,
                  }}
                />
                <span className="text-[10px] text-muted-foreground w-8 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={currentSong.url}
            onEnded={handleSongEnd}
            loop={false}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgb(168 85 247);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgb(168 85 247);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Header;
