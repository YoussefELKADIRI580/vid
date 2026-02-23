import React from 'react';
import { Composition } from 'remotion';
import { StoryVideo } from './StoryVideo';
import videoConfig from '../../video.json';

import transcriptData from '../../download_transcript.json';

export const StoryVideoRoot: React.FC = () => {
  // Calculate total duration in frames based on transcript
  const lastWord = transcriptData.words[transcriptData.words.length - 1];
  const audioDurationInSeconds = lastWord ? lastWord.end / 1000 : 10;
  
  const durationInFrames = Math.max(
    1,
    Math.round(audioDurationInSeconds * videoConfig.fps)
  );

  return (
    <Composition
      id="StoryVideo"
      component={StoryVideo}
      durationInFrames={durationInFrames}
      fps={videoConfig.fps}
      width={1080}
      height={1920}
      defaultProps={{
        config: videoConfig,
      }}
    />
  );
};
