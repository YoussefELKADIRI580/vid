
import {AbsoluteFill, Sequence} from 'remotion';
import {KineticBackground} from '../components/KineticBackground';

const TechItem: React.FC<{name: string; icon: string; color: string}> = ({name, icon, color}) => (
    <div className={`flex flex-col items-center justify-center p-10 bg-gray-800 rounded-2xl border-4 ${color} m-4 w-64 h-64`}>
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-3xl font-bold text-white text-center">{name}</h3>
    </div>
);

export const Uses: React.FC = () => {
	return (
		<AbsoluteFill className="flex flex-wrap justify-center items-center content-center">
            <KineticBackground />
            <div className="z-10 flex flex-wrap justify-center gap-10">
                <Sequence from={0}>
                    <TechItem name="Unreal Engine" icon="🎮" color="border-gray-500" />
                </Sequence>
                <Sequence from={15}>
                    <TechItem name="Chrome" icon="🌐" color="border-yellow-500" />
                </Sequence>
                <Sequence from={30}>
                    <TechItem name="Adobe" icon="🎨" color="border-purple-500" />
                </Sequence>
                <Sequence from={45}>
                    <TechItem name="Databases" icon="💾" color="border-blue-500" />
                </Sequence>
            </div>
		</AbsoluteFill>
	);
};
