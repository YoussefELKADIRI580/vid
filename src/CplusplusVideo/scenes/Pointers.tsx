
import {AbsoluteFill} from 'remotion';
import {MemoryPointer} from '../components/MemoryPointer';
import {Title} from '../components/Title';
import {KineticBackground} from '../components/KineticBackground';
import {Character} from '../components/Character';

export const Pointers: React.FC = () => {
	return (
		<AbsoluteFill className="flex flex-col justify-center items-center">
            <KineticBackground />
            <div className="mb-20 z-10">
			    <Title 
                    title="Pointers *" 
                    subtitle="Direct Memory Access" 
                    color="text-red-500"
                />
            </div>
            <div className="z-10 scale-110">
                <MemoryPointer />
            </div>
             <Character emotion="surprised" />
             <div className="mt-20 text-3xl text-red-500 font-bold animate-pulse bg-black/80 px-4 py-2 rounded">
                ⚠️ Don't shoot your foot!
            </div>
		</AbsoluteFill>
	);
};
