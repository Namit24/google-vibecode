import React, { useEffect } from 'react';
import { Icons } from './Icons';
import { useTilt } from '../hooks/useTilt';

interface WhitepaperCardProps {
    onClick: () => void;
}

export const WhitepaperCard: React.FC<WhitepaperCardProps> = ({ onClick }) => {
    const tiltRef = useTilt();
    return (
    <div onClick={onClick} ref={tiltRef} className="tilt-card w-full bg-[#f4f2f0] p-8 rounded-xl border border-stone-300 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-700 interactive cursor-pointer shadow-sm hover:shadow-xl">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Icons.Activity className="w-32 h-32" />
        </div>
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 border border-stone-300 px-2 py-0.5 rounded-full bg-white">Product Intelligence</span>
                    <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                </div>
                <h3 className="font-serif text-[28px] text-stone-900 mb-4 leading-none italic">
                    Context-Native <br/>Computing
                </h3>
                <div className="w-8 h-0.5 bg-stone-900 mb-4"></div>
                <p className="text-[14px] leading-relaxed text-stone-600 mb-6 font-sans">
                    Learn how Pulse replaces hardware with ambient sensing. View full technical specifications and privacy architecture.
                </p>
            </div>
            <div className="flex items-center gap-3 text-[12px] font-medium tracking-wide text-stone-900 group-hover:translate-x-2 transition-transform">
                <span className="border-b border-stone-900 pb-0.5">Read Technical Brief</span>
                <Icons.ArrowRight className="w-4 h-4" />
            </div>
        </div>
    </div>
    );
}

interface WhitepaperViewProps {
    onClose: () => void;
}

export const WhitepaperView: React.FC<WhitepaperViewProps> = ({ onClose }) => {
    useEffect(() => {
        // Scroll to top when opened
        window.scrollTo(0,0);
        document.body.style.overflow = 'hidden';
        return () => {
            // Restore overflow to default (likely defined in CSS) rather than explicitly 'auto'
            // to preserve any specific body styles like overflow-x: hidden
            document.body.style.overflow = '';
        }
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-[#FDFCF8] overflow-y-auto animate-modal-enter">
            <div className="max-w-4xl mx-auto px-6 py-24">
                <button onClick={onClose} className="fixed top-8 left-8 z-50 flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors interactive bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-stone-200">
                    <Icons.ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back to Pulse</span>
                </button>

                <div className="mb-20">
                    <div className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-4">Internal Technical Brief 2025.04</div>
                    <h1 className="font-serif text-6xl md:text-8xl text-stone-900 mb-8 italic">Context-Native Computing</h1>
                    <p className="text-xl md:text-2xl text-stone-500 leading-relaxed max-w-2xl font-sans font-light">
                        Pulse is not an app. It is a logic layer that sits between your environment and your biology, requiring zero user input to function.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 border-t border-stone-200 pt-12">
                    <div>
                        <h3 className="font-serif text-2xl mb-4">The Problem</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            Wearables are friction. They require charging, physical contact, and conscious attention. This active participation creates the "Observer Effect," altering the very biometric data they aim to measure.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-serif text-2xl mb-4">The Solution</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            Pulse utilizes existing sensor arrays (optical, auditory, and thermal) present in your local environment. By aggregating this ambient data, we construct a high-fidelity model of your autonomic nervous system.
                        </p>
                    </div>
                        <div>
                        <h3 className="font-serif text-2xl mb-4">Privacy Architecture</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            All processing occurs on-device (Edge Compute). Raw sensor data is discarded immediately after vectorization. Only the encrypted biomarkers leave the local loop, ensuring 100% data sovereignty.
                        </p>
                    </div>
                </div>

                <div className="bg-stone-900 text-stone-50 p-12 rounded-3xl mb-12">
                    <h2 className="font-serif text-4xl mb-8">System Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="border-b border-stone-800 pb-4">
                            <div className="text-xs font-mono text-stone-500 uppercase mb-1">Latency</div>
                            <div className="text-xl">&lt; 12ms (Real-time Triage)</div>
                        </div>
                        <div className="border-b border-stone-800 pb-4">
                            <div className="text-xs font-mono text-stone-500 uppercase mb-1">Accuracy</div>
                            <div className="text-xl">98.4% vs Clinical Standard</div>
                        </div>
                        <div className="border-b border-stone-800 pb-4">
                            <div className="text-xs font-mono text-stone-500 uppercase mb-1">Encryption</div>
                            <div className="text-xl">AES-256 + Local Key Storage</div>
                        </div>
                        <div className="border-b border-stone-800 pb-4">
                            <div className="text-xs font-mono text-stone-500 uppercase mb-1">Compatibility</div>
                            <div className="text-xl">Universal (iOS / Android / Web)</div>
                        </div>
                    </div>
                </div>

                    <div className="text-center py-12">
                    <h3 className="font-serif text-3xl mb-6">Ready to integrate?</h3>
                    <button className="bg-teal-700 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-teal-800 transition-colors interactive">
                        Request Developer Access
                    </button>
                </div>

            </div>
        </div>
    )
}