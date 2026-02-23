
import {AbsoluteFill} from 'remotion';
import {Title} from '../components/Title';
import {KineticBackground} from '../components/KineticBackground';
import {Character} from '../components/Character';

export const Intro: React.FC = () => {
	return (
		<AbsoluteFill className="flex justify-center items-center">
            <KineticBackground />
            <div className="z-10">
			    <Title 
                    title="C++" 
                    subtitle="The Language that Moves the World" 
                    color="text-blue-500"
                />
            </div>
            <Character emotion="happy" />
            <div className="absolute bottom-10 right-10 text-9xl opacity-20 animate-bounce">
                🚀
            </div>
		</AbsoluteFill>
	);
};
