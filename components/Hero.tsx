import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Badge } from './UI';
import { WhitepaperCard } from './Whitepaper';

interface HeroProps {
    onOpenWhitepaper: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWhitepaper }) => {
    useEffect(() => {
        const tl = gsap.timeline();
        tl.from(".hero-char", {
            y: 80,
            opacity: 0,
            duration: 1.2,
            stagger: 0.03,
            ease: "power3.out",
            delay: 0.1
        });
    }, []);

    return (
        <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                {/* Left Column: Hero Text */}
                <div className="lg:col-span-7 relative z-10">
                    <Badge text="System v1.02 Live" />
                    <h1 className="text-[clamp(60px,7vw,100px)] leading-[0.95] tracking-tight font-serif text-stone-900 mb-8">
                        <div className="overflow-hidden"><span className="hero-char inline-block">E</span><span className="hero-char inline-block">m</span><span className="hero-char inline-block">p</span><span className="hero-char inline-block">a</span><span className="hero-char inline-block">t</span><span className="hero-char inline-block">h</span><span className="hero-char inline-block">y</span></div>
                        <div className="overflow-hidden flex flex-wrap items-baseline gap-4">
                            <span className="hero-char text-3xl md:text-4xl font-sans font-light text-stone-400 self-center">is a</span>
                            <span className="hero-char inline-block italic text-stone-600">compute</span>
                        </div>
                        <div className="overflow-hidden"><span className="hero-char inline-block">Problem.</span></div>
                    </h1>
                    <p className="text-[17px] leading-[1.7] text-stone-500 max-w-[36ch] font-light">
                        The world's first context-native wellness engine. 
                        We replaced wearables with <span className="text-stone-900 border-b border-stone-300">ambient intelligence</span>.
                    </p>
                </div>
                
                {/* Right Column: Whitepaper Abstract */}
                <div className="lg:col-span-5 h-full flex items-end pb-2 pl-4">
                        <WhitepaperCard onClick={onOpenWhitepaper} />
                </div>
            </div>
        </section>
    );
};