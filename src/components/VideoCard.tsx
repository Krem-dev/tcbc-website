"use client";

import React from "react";

type VideoEl = HTMLVideoElement & {
  webkitPlaysInline?: boolean;
  disablePictureInPicture?: boolean;
};

function VideoCard() {
  const videoRef = React.useRef<VideoEl | null>(null);

  const [showOverlay, setShowOverlay] = React.useState(true);
  const [showControls, setShowControls] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [hasPlayed, setHasPlayed] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    } else {
      mq.addListener(onChange);
      return () => mq.removeListener(onChange);
    }
  }, []);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "true");
    v.webkitPlaysInline = true;
    v.disablePictureInPicture = true;
  }, []);

  const playVideo = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      setError(null);
      v.muted = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "true");
      v.webkitPlaysInline = true;
      await v.play();
      setShowOverlay(false);
      setShowControls(false);
      setHasPlayed(true);
    } catch (err) {
      setShowControls(true);
      setHasPlayed(true);
      console.warn("Playback blocked; showing native controls.", err);
    }
  };

  const onVideoError: React.ReactEventHandler<HTMLVideoElement> = () => {
    setLoading(false);
    setIsPlaying(false);
    setError("Video failed to load. Check file path / hosting / CORS.");
    setShowControls(true);
  };

  return (
    <div
      className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-10
 px-3 sm:px-4 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-indigo-600/5"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)] sm:opacity-60 opacity-40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.06),transparent_50%)] sm:opacity-40 opacity-20"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-satoshi mb-4 text-4xl font-bold text-[#48007e] lg:text-5xl">
            Experience Worship <span className="text-[#7c01cd]">Together</span>
          </h2>
          <p className="text-[15px] sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed px-1">
            Join us for powerful worship services, inspiring messages, and authentic community. 
            Whether in-person or online, experience the presence of God with us every Sunday.
          </p>
        </div>

        <div className="relative group">
          <div
            className="absolute -inset-2 bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-blue-600/15 rounded-2xl blur-xl opacity-0 sm:group-hover:opacity-100 transition-all duration-700"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 via-white/20 to-indigo-400/10 rounded-xl blur opacity-40 sm:opacity-50 sm:group-hover:opacity-75 transition-all duration-500"
            aria-hidden="true"
          />

          <div
            className={`relative border border-white/30 rounded-xl overflow-hidden ${
              isPlaying
                ? "bg-white/10 backdrop-blur-0"
                : "bg-white/80 backdrop-blur-xl"
            }`}
            onClick={() => isMobile && playVideo()}
            onTouchStart={() => isMobile && playVideo()}
          >
            <div className="absolute top-0 left-0 right-0 z-20 p-3 sm:p-6 pointer-events-none hidden sm:block">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-4 w-px bg-white/20" />
                  <span className="text-white/90 text-sm font-medium">
                    TCBC Worship Experience
                  </span>
                </div>
              </div>
            </div>

            <div className="aspect-video relative bg-black">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]"
                playsInline
                muted
                preload={isMobile ? "none" : "metadata"}
                poster="/video-theumbnail.jpg"
                controls={showControls || hasPlayed}
                onLoadedMetadata={() => setLoading(false)}
                onLoadedData={() => setLoading(false)}
                onCanPlay={() => setLoading(false)}
                onCanPlayThrough={() => setLoading(false)}
                onPlaying={() => {
                  setLoading(false);
                  setIsPlaying(true);
                }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setShowOverlay(true);
                  setIsPlaying(false);
                }}
                onWaiting={() => setLoading(true)}
                onStalled={() => setLoading(true)}
                onError={onVideoError}
                onClick={() => playVideo()}
                aria-label="TCBC worship experience video"
              >
                <source src="/videos/chag.mp4" type="video/mp4" />
              </video>

              {loading && !error && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}

              {!isMobile && showOverlay && !isPlaying && !error && (
                <button
                  type="button"
                  aria-label="Play worship experience video"
                  onClick={playVideo}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 w-24 h-24 sm:w-28 sm:h-28 bg-blue-500/30 rounded-full blur-2xl group-hover:bg-blue-500/40 transition-all" />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white/95 rounded-full flex items-center justify-center border-2 border-white/30 group-hover:border-blue-500/30">
                      <div className="w-0 h-0 border-l-[18px] sm:border-l-[20px] border-l-blue-600 border-t-[12px] sm:border-t-[14px] border-t-transparent border-b-[12px] sm:border-b-[14px] border-b-transparent ml-2" />
                    </div>
                  </div>
                </button>
              )}
            </div>

            {error ? (
              <div className="p-4 sm:p-6">
                <p className="text-red-600 text-sm sm:text-base">{error}</p>
                <p className="text-slate-600 text-xs sm:text-sm mt-2">
                  Quick checks: ensure{" "}
                  <code>/public/videos/heartlinkinaction.mp4</code> exists, the
                  filename matches case exactly, and the server serves it with{" "}
                  <code>Content-Type: video/mp4</code>.
                </p>
              </div>
            ) : isMobile ? (
              <div className="p-4">
                <h4 className="text-lg font-extrabold text-slate-900 mb-2">
                  Worship That Transforms Lives
                </h4>
                <p className="text-slate-700 text-[15px] leading-relaxed">
                  Experience authentic worship, powerful messages, and genuine community. 
                  Join us every Sunday as we gather to worship God and grow together in faith.
                </p>
              </div>
            ) : (
              !isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-end justify-between">
                    <div className="flex-1 text-center">
                      <h4 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                        Worship That Transforms Lives
                      </h4>
                      <p className="text-gray-200 text-base leading-relaxed mb-2 max-w-2xl mx-auto">
                        Experience authentic worship, powerful messages, and genuine community. 
                        Join us every Sunday as we gather to worship God and grow together in faith.
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
