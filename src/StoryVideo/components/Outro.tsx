import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: '"Montserrat", "Cairo", sans-serif',
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        <h1 style={{ fontSize: '100px', margin: 0, fontWeight: 900, textShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
          شكراً للمشاهدة!
        </h1>
        <div
          style={{
            fontSize: '60px',
            fontWeight: 'bold',
            padding: '30px 60px',
            backgroundColor: '#FF0000', // YouTube Red
            borderRadius: '50px',
            boxShadow: '0 10px 30px rgba(255,0,0,0.4)',
            color: 'white',
          }}
        >
          لا تنسى الاشتراك 🔔
        </div>
      </div>
    </AbsoluteFill>
  );
};
