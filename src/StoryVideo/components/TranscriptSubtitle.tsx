import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

interface Word {
  text: string;
  start: number; // in ms
  end: number; // in ms
  confidence: number;
  speaker: string | null;
}

interface SubtitleStyle {
  fontSize: number;
  color: string;
  strokeColor?: string;
  strokeWidth?: number;
  shadowColor?: string;
  backgroundColor?: string;
  position: 'top' | 'bottom';
}

export const TranscriptSubtitle: React.FC<{
  words: Word[];
  style: SubtitleStyle;
}> = ({ words, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = (frame / fps) * 1000;

  // Find the word that falls into the current time window
  const activeWordInfo = words.find(w => currentTimeMs >= w.start && currentTimeMs <= w.end);

  if (!activeWordInfo) {
    return null; // Return nothing when no word is actively spoken
  }

  const wordStartFrame = Math.round((activeWordInfo.start / 1000) * fps);

  // Quick spring animation for pop effect on every word
  const scale = spring({
    frame: frame - wordStartFrame,
    fps,
    config: {
      damping: 10,
      stiffness: 250,
      mass: 0.8,
    },
  });

  return (
    <div
      style={{
        position: 'absolute',
        [style.position]: 350,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <div
        style={{
          // Highlight long words in neon green
          color: activeWordInfo.text.length >= 6 ? '#39FF14' : style.color,
          fontSize: `${activeWordInfo.text.length >= 6 ? style.fontSize + 10 : style.fontSize}px`,
          textAlign: 'center',
          direction: 'rtl',
          fontFamily: '"Montserrat", "Cairo", system-ui, -apple-system, sans-serif',
          fontWeight: '900',
          lineHeight: '1.2',
          maxWidth: '90%',
          transform: `scale(${scale}) ${activeWordInfo.text.length >= 6 ? 'rotate(-2deg)' : ''}`,
          // Stroke effect using textShadow for 360 degree coverage
          textShadow: style.strokeColor && style.strokeWidth 
            ? `
              -${style.strokeWidth}px -${style.strokeWidth}px 0 ${style.strokeColor},  
               ${style.strokeWidth}px -${style.strokeWidth}px 0 ${style.strokeColor},
              -${style.strokeWidth}px  ${style.strokeWidth}px 0 ${style.strokeColor},
               ${style.strokeWidth}px  ${style.strokeWidth}px 0 ${style.strokeColor},
               0px 15px 20px ${style.shadowColor || 'transparent'}
              `
            : '0px 8px 15px rgba(0,0,0,0.7)',
          WebkitTextStroke: style.strokeWidth ? `${style.strokeWidth}px ${style.strokeColor}` : undefined,
          WebkitTextFillColor: activeWordInfo.text.length >= 6 ? '#39FF14' : style.color,
          paintOrder: 'stroke fill',
        }}
      >
        {activeWordInfo.text}
      </div>
    </div>
  );
};
