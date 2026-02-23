import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';

export type AnimationType = 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'pan-up' | 'fade';

export const Slide: React.FC<{
  image: string;
  animation: AnimationType;
  durationInFrames: number;
}> = ({ image, animation, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation values
  const progress = frame / durationInFrames;

  // Zoom styles
  const zoomInScale = interpolate(progress, [0, 1], [1, 1.2]);
  const zoomOutScale = interpolate(progress, [0, 1], [1.2, 1]);

  // Pan styles (1080x1920 space)
  const panLeftX = interpolate(progress, [0, 1], [0, -100]);
  const panRightX = interpolate(progress, [0, 1], [-100, 0]);
  const panUpY = interpolate(progress, [0, 1], [0, -100]);

  // Fade
  const fadeOpacity = interpolate(frame, [0, fps, durationInFrames - fps, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  let transform = '';
  let opacity = 1;

  switch (animation) {
    case 'zoom-in':
      transform = `scale(${zoomInScale})`;
      break;
    case 'zoom-out':
      transform = `scale(${zoomOutScale})`;
      break;
    case 'pan-left':
      transform = `scale(1.2) translateX(${panLeftX}px)`;
      break;
    case 'pan-right':
      transform = `scale(1.2) translateX(${panRightX}px)`;
      break;
    case 'pan-up':
      transform = `scale(1.2) translateY(${panUpY}px)`;
      break;
    case 'fade':
      opacity = fadeOpacity;
      break;
  }

  // Handle paths. In Remotion standard projects, static references go through `staticFile()` if they are in `public/`
  // But since the JSON says "/images/photo1.jpg" or "./public/images", we need to handle it.
  // The safest way is to strip `./public` and pass it to staticFile.
  const cleanImageSrc = image.replace('./public', '').replace(/^\//, '');

  return (
    <div style={{ flex: 1, backgroundColor: 'black' }}>
      <Img
        src={staticFile(cleanImageSrc)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform,
          opacity,
        }}
      />
    </div>
  );
};
