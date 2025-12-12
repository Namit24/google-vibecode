import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NavProps } from '../types';

export const Nav: React.FC<NavProps> = ({ onHome }) => (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="
            rounded-full px-6 py-3 flex items-center gap-8
            bg-white/80 backdrop-blur-xl
            border border-stone-200
            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
        ">
            <div onClick={onHome} className="flex items-center gap-2 interactive cursor-pointer group">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-900 group-hover:bg-teal-600 transition-colors"></div>
                <span className="font-serif font-medium text-lg tracking-tight text-stone-900">Pulse.</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-[12px] font-sans font-medium tracking-wide text-stone-500">
                <a href="#" className="hover:text-stone-900 transition-colors interactive">Manifesto</a>
                <a href="#" className="hover:text-stone-900 transition-colors interactive">Science</a>
                <a href="#" className="hover:text-stone-900 transition-colors interactive">Access</a>
            </div>
            <button className="interactive bg-stone-900 text-cream px-5 py-2 rounded-full text-[12px] font-sans font-medium hover:bg-stone-800 transition-colors shadow-sm">
                Beta 1.0
            </button>
        </div>
    </nav>
);

export const Footer: React.FC = () => (
    <footer className="border-t border-stone-200 bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <div>
                    <h1 className="font-serif text-[96px] text-stone-900 leading-none tracking-tight opacity-90 mb-8">Pulse.</h1>
                    <p className="max-w-md text-stone-500 text-[15px] font-sans">
                        Constructed in San Francisco. <br/>
                        Adhering to the 2025 Digital Health Accord.
                    </p>
                </div>
                <div className="flex gap-16 text-[13px] font-medium text-stone-800 font-sans">
                    <div className="flex flex-col gap-4">
                        <a href="#" className="hover:text-stone-500 transition-colors interactive">Twitter</a>
                        <a href="#" className="hover:text-stone-500 transition-colors interactive">LinkedIn</a>
                        <a href="#" className="hover:text-stone-500 transition-colors interactive">Instagram</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <a href="#" className="hover:text-stone-500 transition-colors interactive">Legal</a>
                        <a href="#" className="hover:text-stone-500 transition-colors interactive">Privacy</a>
                        <a href="#" className="hover:text-stone-500 transition-colors interactive">Terms</a>
                    </div>
                </div>
            </div>
            <div className="h-px bg-stone-200 my-12 w-full"></div>
            <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                    <span>© 2025 Pulse Inc.</span>
                    <span>System Status: Online</span>
            </div>
        </div>
    </footer>
);

export const CustomCursor: React.FC = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;
        if (!dot || !outline) return;

        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            gsap.to(dot, { x: clientX, y: clientY, duration: 0 });
            gsap.to(outline, { x: clientX, y: clientY, duration: 0.15, ease: "power2.out" });
        };

        const addHover = () => document.body.classList.add('hovering');
        const removeHover = () => document.body.classList.remove('hovering');

        window.addEventListener('mousemove', moveCursor);
        
        const addListeners = () => {
            const interactives = document.querySelectorAll('a, button, input, .interactive');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', addHover);
                el.addEventListener('mouseleave', removeHover);
            });
        };

        // Periodic check for new elements (React re-renders)
        addListeners();
        const interval = setInterval(addListeners, 1000);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            clearInterval(interval);
            document.body.classList.remove('hovering');
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot hidden md:block"></div>
            <div ref={outlineRef} className="cursor-outline hidden md:block"></div>
        </>
    );
};