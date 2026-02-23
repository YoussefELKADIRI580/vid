import React from 'react';
import { Sequence, useVideoConfig, AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Slide, AnimationType } from './components/Slide';
import { TranscriptSubtitle } from './components/TranscriptSubtitle';
import { ProgressBar } from './components/ProgressBar';
import { Outro } from './components/Outro';
import transcriptData from '../../download_transcript.json';

export interface SlideConfig {
  image: string;
  duration: number; // in seconds
  subtitle?: string;
  animation: AnimationType;
}

export interface VideoConfig {
  fps: number;
  slides: SlideConfig[];
  subtitleStyle: {
    fontSize: number;
    color: string;
    strokeColor?: string;
    strokeWidth?: number;
    shadowColor?: string;
    backgroundColor?: string;
    position: 'top' | 'bottom';
  };
}

export const StoryVideo: React.FC<{ config: VideoConfig }> = ({ config }) => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {/* Background Audio Voiceover */}
      <Audio src={staticFile('audio.wav')} />

      <TransitionSeries>
        {config.slides.map((slide, index) => {
          const slideDurationInFrames = Math.round(slide.duration * fps);

          return (
            <React.Fragment key={index}>
              <TransitionSeries.Sequence durationInFrames={slideDurationInFrames}>
                <Slide
                  image={slide.image}
                  animation={slide.animation}
                  durationInFrames={slideDurationInFrames}
                />
              </TransitionSeries.Sequence>
              
              {/* Transition to next frame if it's not the last one */}
              {index < config.slides.length - 1 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: 15 })}
                />
              )}
            </React.Fragment>
          );
        })}
      </TransitionSeries>
      
      {/* Dynamic Subtitle overlay over the entire video sequence */}
      <AbsoluteFill>
        <TranscriptSubtitle 
          words={transcriptData.words} 
          style={config.subtitleStyle} 
        />
      </AbsoluteFill>

      {/* Progress Bar always on top */}
      <ProgressBar color={config.subtitleStyle.color} height={15} />

      {/* Outro sequences in the final 3 seconds (90 frames) */}
      <Sequence from={Math.max(0, durationInFrames - 90)}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
