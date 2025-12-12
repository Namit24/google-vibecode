import React, { useState, useEffect } from 'react';
import { BadgeProps, FeatureTabProps, TypewriterProps } from '../types';
import { useTilt } from '../hooks/useTilt';

export const Badge: React.FC<BadgeProps> = ({ text }) => (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-200 bg-white/50 backdrop-blur-sm text-[11px] font-sans tracking-wide text-stone-500 mb-6 interactive hover:bg-white transition-colors">
        <span className="w-1 h-1 rounded-full bg-teal-600"></span>
        {text}
    </div>
);

export const FeatureTab: React.FC<FeatureTabProps> = ({ active, label, onClick }) => (
    <button 
        onClick={onClick}
        className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 interactive ${
            active ? 'text-white' : 'text-stone-500 hover:text-stone-800'
        }`}
    >
        {active && (
            <div className="absolute inset-0 bg-stone-900 rounded-full shadow-lg"></div>
        )}
        <span className="relative z-10">{label}</span>
    </button>
);

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 15, onComplete }) => {
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
        setDisplayed('');
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayed(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text]);
    return <span>{displayed}</span>;
};

export const VibeGraph: React.FC = () => {
    const tiltRef = useTilt();
    return (
        <div ref={tiltRef} className="tilt-card w-full h-[320px] bg-white rounded-[24px] p-8 relative overflow-hidden border border-stone-200 group interactive shadow-sm">
            
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <h3 className="font-serif text-xl tracking-tight text-stone-900">Circadian Flow</h3>
                    <p className="text-[13px] text-stone-500 mt-1">Real-time cortisol monitoring</p>
                </div>
                <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-stone-300 block"></span>
                        <span className="w-2 h-2 rounded-full bg-teal-700 block"></span>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <svg viewBox="0 0 800 400" className="w-full h-full">
                    <defs>
                        <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#1c1917" stopOpacity="0" />
                            <stop offset="50%" stopColor="#1c1917" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#1c1917" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path 
                        d="M0,200 Q100,150 200,200 T400,200 T600,200 T800,200" 
                        fill="none" 
                        stroke="url(#flowGradient)" 
                        strokeWidth="2"
                        className="animate-wave"
                    />
                        <path 
                        d="M0,200 Q100,250 200,200 T400,180 T600,220 T800,200" 
                        fill="none" 
                        stroke="#a8a29e" 
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        className="animate-wave-slow"
                    />
                </svg>
            </div>

            <div className="absolute bottom-[32px] left-[32px] right-[32px]">
                <div className="flex justify-between text-[10px] font-mono text-stone-400 border-t border-stone-100 pt-4 tracking-widest">
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>00:00</span>
                </div>
            </div>
        </div>
    );
};