import {Img, staticFile} from 'remotion';

const emotions = {
    happy: staticFile('characters/A1.png'),
    thinking: staticFile('characters/A2.png'),
    surprised: staticFile('characters/A3.png'),
    a4: staticFile('characters/A4.png'),
    a5: staticFile('characters/A5.png'),
    a6: staticFile('characters/A6.png'),
    a7: staticFile('characters/A7.png'),
    a8: staticFile('characters/A8.png'),
    a9: staticFile('characters/A9.png'),
    a10: staticFile('characters/A10.png'),
    a11: staticFile('characters/A11.png'),
    a12: staticFile('characters/A12.png'),
};

export const Character: React.FC<{
    emotion?: keyof typeof emotions,
    isShifted?: boolean
}> = ({emotion = 'happy', isShifted = false}) => {
    
	return (
		<div 
            className="absolute  w-200 h-200 transition-transform duration-500"
            style={{
                transform: isShifted ? 'translateX(-300px)' : 'translateX(0)'
            }}
        >
             {/* Character Image with Pop Animation */}
            <div 
                style={{
                    transformOrigin: 'bottom center'
                }}
                className="w-full h-full relative flex items-end justify-center animate-talking"
            >
                <Img
                    key={emotion}
                    src={emotions[emotion] || emotions.happy}
                    className="w-full h-full object-contain animate-pop-in origin-bottom"
                    style={{
                        filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))'
                    }}
                />
            </div>
		</div>
	);
};
