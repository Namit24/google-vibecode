import React, { useState } from 'react';
import { Nav, Footer, CustomCursor } from './components/Layout';
import { Hero } from './components/Hero';
import { PulseCore } from './components/PulseCore';
import { VibeGraph, Badge } from './components/UI';
import { WhitepaperView } from './components/Whitepaper';
import { ViewState } from './types';

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>('home');

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 overflow-x-hidden relative selection:bg-stone-200 selection:text-stone-900">
            <div className="noise-overlay"></div>
            <CustomCursor />
            
            {view === 'whitepaper' && (
                <WhitepaperView onClose={() => setView('home')} />
            )}

            <div className={`transition-opacity duration-700 ${view === 'whitepaper' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="fixed inset-0 bg-tech-grid opacity-30 pointer-events-none"></div>
                <div className="orb bg-teal-100 w-[600px] h-[600px] top-[-10%] left-[-10%] mix-blend-multiply"></div>
                <div className="orb bg-stone-200 w-[500px] h-[500px] bottom-[10%] right-[-10%] mix-blend-multiply animation-delay-2000"></div>
                
                <Nav onHome={() => setView('home')} />
                <main>
                    <Hero onOpenWhitepaper={() => setView('whitepaper')} />
                    <PulseCore />
                    <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge text="Deep Science" />
                            <h3 className="text-4xl font-serif mb-6 text-stone-900">Quantifiable Calm.</h3>
                            <p className="text-stone-500 leading-relaxed mb-8 font-sans">
                                By continuously monitoring vocal prosody and micro-expressions, Pulse builds a longitudinal map of your nervous system regulation. This isn't just data; it's a mirror for your mind.
                            </p>
                            <div className="flex gap-8 text-stone-900 font-mono text-xs uppercase tracking-widest">
                                <div>
                                    <div className="text-3xl font-serif mb-2">0ms</div>
                                    <div>Latency</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-serif mb-2">100%</div>
                                    <div>Private</div>
                                </div>
                            </div>
                        </div>
                        <VibeGraph />
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;