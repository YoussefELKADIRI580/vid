import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { YouTubeShort } from "./YouTubeShort";
import { CplusplusVideo } from "./CplusplusVideo";
import { TOTAL_DURATION } from "./CplusplusVideo/constants";
import { StoryVideoRoot } from "./StoryVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
            id="YouTubeShort"
            component={YouTubeShort}
            durationInFrames={1350}
            fps={30}
            width={1080}
            height={1920}
        />
        <Composition
            id="CplusplusVideo"
            component={CplusplusVideo}
            durationInFrames={TOTAL_DURATION}
            fps={30}
            width={1920}
            height={1080}
        />
        <StoryVideoRoot />
    </>
  );
};
