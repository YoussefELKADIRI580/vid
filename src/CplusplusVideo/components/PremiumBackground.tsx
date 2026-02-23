import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';

export const PremiumBackground: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    // Speed up movement and increase range
    const movementScale = 100; 
    const timeScale = 0.1;

    // Orb 1: Cyan/Blue (Top Leftish)
    const orb1X = Math.sin(frame * timeScale) * movementScale;
    const orb1Y = Math.cos(frame * timeScale * 1.2) * movementScale;

    // Orb 2: Purple/Pink (Bottom Rightish)
    const orb2X = Math.cos(frame * timeScale * 0.8) * movementScale;
    const orb2Y = Math.sin(frame * timeScale * 0.9) * movementScale;

    // Orb 3: Deep Blue (Center/Random)
    const orb3X = Math.sin(frame * timeScale * 0.5 + Math.PI) * movementScale;
    const orb3Y = Math.cos(frame * timeScale * 0.6 + Math.PI) * movementScale;

    return (
        <AbsoluteFill className="bg-slate-950 overflow-hidden z-0">
             {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-black" />

             {/* Orb 1 */}
            <div 
                className="absolute w-[800px] h-[800px] rounded-full bg-cyan-500 opacity-20 blur-[100px]"
                style={{
                    top: '10%',
                    left: '10%',
                    transform: `translate(${orb1X}px, ${orb1Y}px)`
                }}
            />

             {/* Orb 2 */}
             <div 
                className="absolute w-[700px] h-[700px] rounded-full bg-purple-600 opacity-20 blur-[120px]"
                style={{
                    bottom: '10%',
                    right: '10%',
                    transform: `translate(${orb2X}px, ${orb2Y}px)`
                }}
            />

             {/* Orb 3 */}
             <div 
                className="absolute w-[900px] h-[900px] rounded-full bg-blue-700 opacity-15 blur-[150px]"
                style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) translate(${orb3X}px, ${orb3Y}px)`
                }}
            />

            {/* Noise Overlay (Optional for texture) */}
             <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    transform: 'scale(1.5)'
                }}
            />
            
            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient-cover from-transparent to-black opacity-40" />
        </AbsoluteFill>
    );
};
