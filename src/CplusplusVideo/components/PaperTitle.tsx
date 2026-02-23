import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import React from 'react';

const PaperBackground: React.FC = () => {
    // A simplified jagged/torn paper SVG path
    return (
        <svg
            viewBox="0 0 600 150"
            className="w-full h-full drop-shadow-xl"
            style={{
                filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))'
            }}
            preserveAspectRatio="none"
        >
             {/* Torn Paper Shape */}
            <path
                d="M10,10 
                   L 20,12 L 40,8 L 60,11 L 80,9 L 100,12 L 120,8 L 140,11 L 160,9 L 180,12 L 200,8 L 220,11 L 240,9 L 260,12 L 280,8 L 300,11 L 320,9 L 340,12 L 360,8 L 380,11 L 400,9 L 420,12 L 440,8 L 460,11 L 480,9 L 500,12 L 520,8 L 540,11 L 560,9 L 580,10
                   L 590,140
                   L 570,138 L 550,142 L 530,138 L 510,142 L 490,138 L 470,142 L 450,138 L 430,142 L 410,138 L 390,142 L 370,138 L 350,142 L 330,138 L 310,142 L 290,138 L 270,142 L 250,138 L 230,142 L 210,138 L 190,142 L 170,138 L 150,142 L 130,138 L 110,142 L 90,138 L 70,142 L 50,138 L 30,142 L 10,140
                   Z"
                fill="#f8f1e5" // Beige/Paper color
            />
            
            {/* Texture/Grain could go here */}
            <rect x="25" y="25" width="550" height="100" fill="url(#paperGrain)" opacity="0.3" />
            
             <defs>
                <filter id="paperGrain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
            </defs>
             {/* Re-drawing path for visible shape */}
             <path
                d="M10,10 
                   L 20,12 L 40,8 L 60,11 L 80,9 L 100,12 L 120,8 L 140,11 L 160,9 L 180,12 L 200,8 L 220,11 L 240,9 L 260,12 L 280,8 L 300,11 L 320,9 L 340,12 L 360,8 L 380,11 L 400,9 L 420,12 L 440,8 L 460,11 L 480,9 L 500,12 L 520,8 L 540,11 L 560,9 L 580,10
                   L 590,140
                   L 570,138 L 550,142 L 530,138 L 510,142 L 490,138 L 470,142 L 450,138 L 430,142 L 410,138 L 390,142 L 370,138 L 350,142 L 330,138 L 310,142 L 290,138 L 270,142 L 250,138 L 230,142 L 210,138 L 190,142 L 170,138 L 150,142 L 130,138 L 110,142 L 90,138 L 70,142 L 50,138 L 30,142 L 10,140
                   Z"
                fill="#e8dcb5" // Darker beige
                stroke="none"
             />
              <path
                d="M10,10 
                   L 20,12 L 40,8 L 60,11 L 80,9 L 100,12 L 120,8 L 140,11 L 160,9 L 180,12 L 200,8 L 220,11 L 240,9 L 260,12 L 280,8 L 300,11 L 320,9 L 340,12 L 360,8 L 380,11 L 400,9 L 420,12 L 440,8 L 460,11 L 480,9 L 500,12 L 520,8 L 540,11 L 560,9 L 580,10
                   L 590,140
                   L 570,138 L 550,142 L 530,138 L 510,142 L 490,138 L 470,142 L 450,138 L 430,142 L 410,138 L 390,142 L 370,138 L 350,142 L 330,138 L 310,142 L 290,138 L 270,142 L 250,138 L 230,142 L 210,138 L 190,142 L 170,138 L 150,142 L 130,138 L 110,142 L 90,138 L 70,142 L 50,138 L 30,142 L 10,140
                   Z"
                fill="#fdfbf7" // Light paper
                transform="translate(-5, -5)"
             />
        </svg>
    );
};

export const PaperTitle: React.FC<{ title: string }> = ({ title }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fade/Pop in paper
    const paperProgress = spring({
        frame,
        fps,
        config: { damping: 200, stiffness: 200 }
    });
    
    // Highlighter stroke animation
    const highlightProgress = spring({
        frame: frame - 15,
        fps,
        config: { damping: 200, stiffness: 100 }
    });
    
    const scale = interpolate(paperProgress, [0, 1], [0.8, 1]);
    const opacity = interpolate(paperProgress, [0, 1], [0, 1]);

    // Calculate highlighter width based on title length approx
    // Using a simple overlay div for highlighter
    const highlightWidth = interpolate(highlightProgress, [0, 1], [0, 100]);

    return (
        <AbsoluteFill>
            <div 
                style={{ 
                    transform: `translateX(-50%) scale(${scale}) rotate(${Math.sin(frame / 20) * 1}deg)`,
                    opacity
                }}
                className="absolute bottom-20 left-1/2 w-[700px] h-[200px] flex items-center justify-center"
            >
                <div className="absolute inset-0 w-full h-full">
                    <PaperBackground />
                </div>
                
                <div className="relative z-10 px-16 py-8">
                     {/* Highlighter Layer */}
                    <div 
                        className="absolute top-1/2 left-[5%] h-[60%] bg-yellow-300 opacity-60 rounded-sm transform -translate-y-1/2 -rotate-1"
                        style={{
                            width: `${highlightWidth * 0.9}%`,
                            mixBlendMode: 'multiply',
                            filter: 'blur(1px)' // Highlighters are imperfect
                        }}
                    />
                    
                    <h1 className="text-8xl font-serif font-bold text-black relative z-20 text-center leading-tight tracking-tight shadow-sm">
                        {title}
                    </h1>
                </div>
            </div>
        </AbsoluteFill>
    );
};
