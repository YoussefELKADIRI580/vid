import {AbsoluteFill, Sequence, Audio, staticFile, useVideoConfig, random, useCurrentFrame} from 'remotion';
import {HighlightedKeywords} from './components/HighlightedKeywords';
import {PaperTitle} from './components/PaperTitle';
import {PremiumBackground} from './components/PremiumBackground';
import {Character} from './components/Character';
import {PersonalityCard} from './components/PersonalityCard';
import videoSequence from './video-sequence.json';

export const CplusplusVideo: React.FC = () => {
    const {durationInFrames, fps} = useVideoConfig();
    const frame = useCurrentFrame();

    // Determine if keywords are currently visible
    const isKeywordActive = videoSequence.some(event => 
        event.type === 'H' && 
        frame >= event.startFrame && 
        frame < event.startFrame + event.durationInFrames
    );
    
    // Generate random emotion sequence deterministically
    const generateEmotionSequence = () => {
        const sequence = [];
        let currentFrame = 0;
        let seed = 12345; // Fixed seed for consistency
        
        const emotionKeys = [
            'happy', 'thinking', 'surprised', 'a4', 'a5', 'a6', 
            'a7', 'a8', 'a9', 'a10', 'a11', 'a12'
        ];

        while (currentFrame < durationInFrames) {
            const randomVal = random(seed++);
            const durationSec = 2 + randomVal * (4 - 2); // 3-6 seconds
            const durationFrames = Math.floor(durationSec * fps);
            
            const emotionIndex = Math.floor(random(seed++) * emotionKeys.length);
            const emotion = emotionKeys[emotionIndex];
            
            sequence.push({
                startFrame: currentFrame,
                duration: Math.min(durationFrames, durationInFrames - currentFrame),
                emotion
            });
            
            currentFrame += durationFrames;
        }
        return sequence;
    };

    const characterEvents = generateEmotionSequence();

    return (
		<AbsoluteFill>
            <PremiumBackground />
            <Audio src={staticFile('audio.wav')} />
            
            {/* Character Layer - Persistent throughout video */}
            <AbsoluteFill>
                {characterEvents.map((event, index) => (
                    <Sequence 
                        key={`char-${index}`} 
                        from={event.startFrame} 
                        durationInFrames={event.duration}
                    >
                        <AbsoluteFill className="flex items-center justify-center">
                            <Character 
                                emotion={event.emotion as any} 
                                isShifted={isKeywordActive}
                            />
                        </AbsoluteFill>
                    </Sequence>
                ))}
            </AbsoluteFill>

            {/* Main Content (Titles, Keywords, Personality Cards) - Overlays Character */}
            {videoSequence.map((event, index) => {
                const { type, startFrame, durationInFrames, props } = event;

                return (
                    <Sequence 
                        key={`vid-${index}`} 
                        from={startFrame} 
                        durationInFrames={durationInFrames}
                    >
                        {type === 'P' && <PaperTitle  title={(props as any).title} />}
                        {type === 'H' && <HighlightedKeywords  keywords={(props as any).keywords} />}
                        {type === 'Per' && (
                            <PersonalityCard 
                                name={(props as any).name} 
                                imageSrc={(props as any).imageSrc} 
                                date={(props as any).date} 
                            />
                        )}
                    </Sequence>
                );
            })}
		</AbsoluteFill>
	);
};

