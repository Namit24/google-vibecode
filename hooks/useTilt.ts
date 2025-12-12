import { useEffect, useRef, RefObject } from 'react';

export const useTilt = (): RefObject<HTMLDivElement> => {
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -1; // Subtle
            const rotateY = ((x - centerX) / centerX) * 1;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.002, 1.002, 1.002)`;
        };

        const handleLeave = () => {
            element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        };

        element.addEventListener('mousemove', handleMove);
        element.addEventListener('mouseleave', handleLeave);
        return () => {
            element.removeEventListener('mousemove', handleMove);
            element.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return ref;
};