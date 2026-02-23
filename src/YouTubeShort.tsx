import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import './index.css';

const Scene1 = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill className="bg-black justify-center items-center">
			<h1
				style={{opacity}}
				className="text-white text-6xl font-bold text-center px-10 leading-tight"
			>
				هل تعلم أن <span className="text-blue-500">البرمجة</span> هي تذكرة
				العبور للمستقبل؟ 🚀
			</h1>
			<div className="absolute bottom-20 text-2xl text-gray-400">2024</div>
		</AbsoluteFill>
	);
};

const Scene2 = () => {
	const frame = useCurrentFrame();
	const scale = interpolate(frame, [0, 30], [0.8, 1], {
		extrapolateRight: 'clamp',
	});
    const opacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });

	return (
		<AbsoluteFill className="bg-blue-900 justify-center items-center">
			<div style={{transform: `scale(${scale})`, opacity}} className="flex flex-col items-center gap-10">
				<div className="text-8xl">💰</div>
				<h2 className="text-white text-5xl font-bold text-center px-10">
					رواتب عالية <br /> وفرص لا تنتهي
				</h2>
			</div>
		</AbsoluteFill>
	);
};

const Scene3 = () => {
    const frame = useCurrentFrame();
    const translateY = interpolate(frame, [0, 30], [50, 0], {
        extrapolateRight: 'clamp',
    });
    const opacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });

	return (
		<AbsoluteFill className="bg-green-800 justify-center items-center">
             <div style={{transform: `translateY(${translateY}px)`, opacity}} className="flex flex-col items-center gap-10">
                <div className="text-8xl">🌍</div>
			    <h2 className="text-white text-5xl font-bold text-center px-10">
				    اعمل من أي مكان <br /> كن سيد وقتك
			    </h2>
            </div>
		</AbsoluteFill>
	);
};

const Scene4 = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });

	return (
		<AbsoluteFill className="bg-gray-900 justify-center items-center">
            <div style={{opacity}} className="flex flex-col items-center gap-10">
                <div className="flex gap-5 text-6xl">
                    <span>🚫🎓</span>
                    <span>✅💻</span>
                </div>
			    <h2 className="text-white text-5xl font-bold text-center px-10">
				    لا شهادة؟ لا مشكلة! <br /> فقط حاسوب وشغف
			    </h2>
            </div>
		</AbsoluteFill>
	);
};

const Scene5 = () => {
     const frame = useCurrentFrame();
    const scale = interpolate(frame, [0, 10, 20], [1, 1.2, 1], {
        extrapolateRight: 'clamp',
    });

	return (
		<AbsoluteFill className="bg-red-700 justify-center items-center">
			<h2 className="text-white text-6xl font-bold text-center px-10 mb-10">
				ابدأ رحلتك الآن!
			</h2>
			<div style={{transform: `scale(${scale})`}} className="bg-white text-red-700 px-10 py-5 rounded-full text-4xl font-bold mt-10">
				رابط المصادر 👇
			</div>
		</AbsoluteFill>
	);
};

export const YouTubeShort: React.FC = () => {
	return (
		<AbsoluteFill className="bg-black">
			<Sequence from={0} durationInFrames={150}>
				<Scene1 />
			</Sequence>
			<Sequence from={150} durationInFrames={300}>
				<Scene2 />
			</Sequence>
			<Sequence from={450} durationInFrames={300}>
				<Scene3 />
			</Sequence>
			<Sequence from={750} durationInFrames={300}>
				<Scene4 />
			</Sequence>
			<Sequence from={1050} durationInFrames={300}>
				<Scene5 />
			</Sequence>
		</AbsoluteFill>
	);
};
