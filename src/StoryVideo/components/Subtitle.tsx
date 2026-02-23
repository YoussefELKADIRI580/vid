import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SubtitleStyle {
  fontSize: number;
  color: string;
  backgroundColor: string;
  position: 'top' | 'bottom';
}

export const Subtitle: React.FC<{
  text: string;
  style: SubtitleStyle;
}> = ({ text, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in animation mapping
  const opacity = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  // Slide up/down
  const translateY = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const yOffset = style.position === 'bottom' ? 50 - translateY * 50 : translateY * 50 - 50;

  return (
    <div
      style={{
        position: 'absolute',
        [style.position]: 100, // 100px from top or bottom
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${yOffset}px)`,
        zIndex: 10,
      }}
    >
      <div
        style={{
          backgroundColor: style.backgroundColor,
          color: style.color,
          fontSize: `${style.fontSize}px`,
          padding: '20px 40px',
          borderRadius: '20px',
          textAlign: 'center',
          direction: 'rtl',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 'bold',
          maxWidth: '80%',
        }}
      >
        {text}
      </div>
    </div>
  );
};
