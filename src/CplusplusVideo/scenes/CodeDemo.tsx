
import {AbsoluteFill, Sequence} from 'remotion';
import {CodeWindow} from '../components/CodeWindow';
import {Title} from '../components/Title';
import {KineticBackground} from '../components/KineticBackground';

const CODE_SAMPLE_1 = `#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}`;

const CODE_SAMPLE_2 = `class Player {
public:
    virtual void move() {
        // Polymorphism power ⚡
    }
};`;

export const CodeDemo: React.FC = () => {
	return (
		<AbsoluteFill className="flex flex-col items-center justify-center">
            <KineticBackground />
            <Sequence from={0} durationInFrames={30 * 8}>
                <div className="scale-90 w-full flex justify-center">
                    <CodeWindow code={CODE_SAMPLE_1} title="main.cpp" />
                </div>
            </Sequence>
            <Sequence from={30 * 8}>
                <div className="absolute top-10 w-full text-center z-20">
                    <Title title="OOP & Polymorphism" subtitle="Organize code like a pro" color="text-green-400" />
                </div>
                 <div className="scale-90 w-full flex justify-center mt-20">
                    <CodeWindow code={CODE_SAMPLE_2} title="Player.h" />
                </div>
            </Sequence>
		</AbsoluteFill>
	);
};
