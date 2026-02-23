import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
} from "remotion";
import React from "react";

interface PersonalityCardProps {
  name: string;
  imageSrc: string;
  date?: string;
}

export const PersonalityCard: React.FC<PersonalityCardProps> = ({
  name,
  imageSrc,
  date,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ... (rest of the animation code)

  // Helper to determine if it's a remote URL or local path
  const resolvedImageSrc = imageSrc.startsWith("http")
    ? imageSrc
    : staticFile(imageSrc);

  // 1. Entry Animation (0 to 1)
  const entry = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60, mass: 1 },
    durationInFrames: 30,
  });

  // 2. Exit Animation (0 to 1)
  const exit = spring({
    frame: frame - (durationInFrames - 20),
    fps,
    config: { damping: 20, stiffness: 60, mass: 1 },
    durationInFrames: 20,
  });

  // Combined Animation Logic
  const scale =
    interpolate(entry, [0, 1], [1.1, 1]) * interpolate(exit, [0, 1], [1, 0.95]);
  const opacity =
    interpolate(entry, [0, 0.5], [0, 1]) * interpolate(exit, [0, 1], [1, 0]);
  const rotate =
    interpolate(entry, [0, 1], [-3, 0]) + interpolate(exit, [0, 1], [0, 2]);
  const blur =
    interpolate(entry, [0, 1], [20, 0]) + interpolate(exit, [0, 1], [0, 10]);

  return (
    <AbsoluteFill className="flex items-center justify-center bg-[#1a140f]">
      {/* Cinematic Background with depth */}
      <AbsoluteFill className="opacity-60">
        <div
          className="w-full h-full bg-[#3d3329]"
          style={{
            backgroundImage: `radial-gradient(circle, #5c4d3d 0%, #1a140f 100%)`,
            boxShadow: "inset 0 0 500px rgba(0,0,0,0.9)",
          }}
        />
      </AbsoluteFill>

      {/* Main Documentary Card */}
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          opacity,
          filter: `blur(${blur}px)`,
        }}
        className="relative max-w-[85%] max-h-[75%] w-fit h-fit bg-[#fffcf5] p-6 shadow-[0_80px_150px_rgba(0,0,0,0.8)] flex flex-col items-center"
      >
        {/* Thick Museum-style Border */}
        <div className="w-full h-full border-[25px] border-white relative flex items-center justify-center overflow-hidden shadow-2xl">
          {/* The Photograph */}
          <div className="w-full h-fit max-h-full relative flex items-center justify-center overflow-hidden">
            <Img
              src={resolvedImageSrc}
              className="w-auto h-auto max-w-full max-h-[60vh] object-contain grayscale brightness-[0.8] contrast-[1.15] sepia-[0.1]"
            />

            {/* Dramatic Lighting (Vignette) */}
            <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.85)]" />

            {/* Grain & Noise Layer */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
              style={{
                backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")`,
              }}
            />
          </div>
        </div>

        {/* Premium Name Tag (Torn Paper Aesthetic) */}
        <div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-fit min-w-[65%] flex flex-col items-center"
          style={{
            filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.5))",
            transform: `translateX(-50%) translateY(${interpolate(entry, [0, 1], [50, 0])}px)`,
          }}
        >
          {/* Yellow Heavy Stock Paper */}
          <div
            className="bg-[#facc15] px-24 py-8 relative flex flex-col items-center"
            style={{
              clipPath:
                "polygon(0% 10%, 98% 0%, 100% 85%, 94% 100%, 5% 95%, 0% 15%)",
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.15)",
            }}
          >
            {/* Texture on the tag */}
            <div
              className="absolute inset-0 opacity-20 bg-black mix-blend-overlay"
              style={{
                backgroundImage: `url("https://www.transparenttextures.com/patterns/binding-dark.png")`,
              }}
            />

            {date && (
              <span className="text-2xl font-mono text-black/40 font-black tracking-widest mb-2">
                RECOGNIZED • {date}
              </span>
            )}

            <h2 className="text-8xl font-serif font-black text-black leading-none text-center tracking-tighter decoration-double underline decoration-black/5">
              {name.toUpperCase()}
            </h2>

            {/* Aging Tape */}
            <div className="absolute -top-4 left-16 w-32 h-8 bg-white/20 rotate-3 backdrop-blur-md border border-white/5" />
            <div className="absolute -top-4 right-16 w-32 h-8 bg-white/20 -rotate-3 backdrop-blur-md border border-white/5" />
          </div>
        </div>

        {/* Archival Metadata Labels */}
        <div className="absolute top-12 left-12 opacity-40 select-none">
          <div className="bg-red-800 text-white font-black px-4 py-1.5 text-xs tracking-[0.3em] mb-2 uppercase border-l-4 border-white">
            Classified
          </div>
          <p className="text-[11px] font-mono text-gray-500 max-w-[120px] leading-tight font-bold">
            FILE: {name.split(" ")[0].toUpperCase()}_DOC
            <br />
            REF: 00982-24X
            <br />
            DEPT: HERITAGE
          </p>
        </div>

        <div className="absolute top-12 right-12 flex flex-col items-end opacity-40 font-serif text-black uppercase tracking-[0.4em]">
          <span className="text-sm font-black border-b-2 border-black/20 pb-1">
            Legacy
          </span>
          <span className="text-[10px] mt-1 font-bold">Archives</span>
        </div>
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,0.85)]" />

      {/* Dust & Scratches */}
      <AbsoluteFill className="pointer-events-none opacity-[0.08] mix-blend-screen overflow-hidden">
        <div
          className="w-[150%] h-[150%] animate-pulse bg-repeat"
          style={{
            backgroundImage: `url("https://www.transparenttextures.com/patterns/dust-particles.png")`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
