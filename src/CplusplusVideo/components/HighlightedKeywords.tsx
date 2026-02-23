import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import React from 'react';

const HandDrawnCircle: React.FC<{ children: React.ReactNode, index: number }> = ({ children, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Stagger animation based on index
    const delay = index * 10;
    const progress = spring({
        frame: frame - delay,
        fps,
        config: { damping: 200, stiffness: 200, mass: 0.5 },
    });

    const pathLength = 300; // Approximate length of the path
    const dashOffset = interpolate(progress, [0, 1], [pathLength, 0]);

    return (
        <div className="relative inline-flex items-center justify-center p-4 m-4">
             {/* Text Content */}
            <h1 className="text-6xl font-black text-white z-10 drop-shadow-lg" style={{
                fontFamily: 'Cairo, sans-serif' // Or any specific font you use
            }}>
                {children}
            </h1>

            {/* SVG Circle Overlay */}
            <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 200 100" // Adjust viewbox as needed or use percentage
                preserveAspectRatio="none"
                style={{
                    top: '-10%',
                    left: '-10%',
                    width: '120%',
                    height: '140%',
                    transform: 'rotate(-2deg)' // Slight rotation for natural feel
                }}
            >
                 <path 
                    d="M20,50 Q40,10 100,10 Q160,10 180,50 Q190,80 100,90 Q10,90 20,50 M180,50 Q160,10 100,10" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={pathLength}
                    strokeDashoffset={dashOffset}
                    style={{
                         filter: 'drop-shadow(0 0 5px rgba(239, 68, 68, 0.5))'
                    }}
                />
            </svg>
        </div>
    );
};

export const HighlightedKeywords: React.FC<{ keywords: string[] }> = ({ keywords }) => {
    
    // Determine layout class based on count
    let containerClass = "flex flex-wrap items-center justify-center content-center max-w-6xl mx-auto h-full gap-16";

    // Specific layouts could be handled by different flex/grid properties if needed
    // 1 item: Centered (default flex behavior)
    // 2 items: Side by side (default flex behavior)
    // 3 items: Triangle
    // 4 items: Grid 2x2
    // 5 items: 3 top, 2 bottom

    if (keywords.length === 3) {
        // Triangle layout wrapper logic specific to 3 items? 
        // Or just let flex-wrap handle it naturally if width constraints force wrap.
        // To force triangle:
        // We can render custom structure
    }

    return (
        <AbsoluteFill className="flex left-[450px] items-center justify-center">
             <div className={containerClass}>
                {keywords.map((keyword, i) => {
                    // Logic to position 3rd item in center for triangle
                    // If 3 items: Item 1 & 2 (top), Item 3 (bottom center)
                    // If flex-wrap, we need 100% width break for item 3?
                    const isLastOfOdd = keywords.length % 2 !== 0 && i === keywords.length - 1 && keywords.length > 2;
                    
                    return (
                        <div key={i} style={isLastOfOdd ? { flexBasis: '100%', display: 'flex', justifyContent: 'center' } : {}}>
                            <HandDrawnCircle index={i}>
                                {keyword}
                            </HandDrawnCircle>
                        </div>
                    );
                })}
             </div>
        </AbsoluteFill>
    );
};
