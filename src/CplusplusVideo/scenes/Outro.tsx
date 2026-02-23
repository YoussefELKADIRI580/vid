
import {AbsoluteFill, Sequence} from 'remotion';
import {Title} from '../components/Title';
import {KineticBackground} from '../components/KineticBackground';

export const Outro: React.FC = () => {
	return (
		<AbsoluteFill className="bg-black flex flex-col justify-center items-center">
            <KineticBackground />
            <Sequence from={0} durationInFrames={60}>
			    <Title title="C++" color="text-blue-500" />
            </Sequence>
             <Sequence from={60}>
			    <Title title="Like & Subscribe" subtitle="For more tech in 100s" color="text-white" />
            </Sequence>
		</AbsoluteFill>
	);
};
