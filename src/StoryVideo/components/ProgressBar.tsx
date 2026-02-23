import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export const ProgressBar: React.FC<{
  color?: string;
  height?: number;
}> = ({ color = '#FFD700', height = 12 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(1, frame / durationInFrames);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${height}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        zIndex: 100,
        display: 'flex',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          borderRadius: '0 5px 5px 0',
        }}
      />
    </div>
  );
};
