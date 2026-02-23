
import {AbsoluteFill} from 'remotion';
import {Title} from '../components/Title';
import {KineticBackground} from '../components/KineticBackground';
import {Character} from '../components/Character';

export const History: React.FC = () => {
    // Ideally we'd have an image of Bjarne Stroustrup here, but we'll use text for now
	return (
		<AbsoluteFill className="flex flex-col justify-center items-center">
            <KineticBackground />
             <div className="flex flex-row gap-10 items-center z-10 scale-90">
                <div className="text-9xl animate-bounce">👴🏻</div>
                <div className="flex flex-col">
			        <Title 
                        title="1979" 
                        subtitle="Bjarne Stroustrup @ Bell Labs" 
                        color="text-yellow-400"
                    />
                    <div className="text-4xl text-white mt-10 text-center font-bold bg-black/50 p-4 rounded-xl">
                        C + OOP = 🚀
                    </div>
                </div>
            </div>
             <Character emotion="thinking" />
		</AbsoluteFill>
	);
};
