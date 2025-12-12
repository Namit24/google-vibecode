import React, { useState, useRef } from 'react';
import { Badge, FeatureTab, Typewriter } from './UI';
import { Icons } from './Icons';
import { useTilt } from '../hooks/useTilt';
import { PulseMode, PulseStatus, PulseOutput } from '../types';
import { runPulseSimulation } from '../services/simulationService';

export const PulseCore: React.FC = () => {
    const tiltRef = useTilt();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [mode, setMode] = useState<PulseMode>('text');
    const [status, setStatus] = useState<PulseStatus>('idle');
    const [output, setOutput] = useState<PulseOutput | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [voiceProgress, setVoiceProgress] = useState(0);

    const reset = () => {
        setStatus('idle');
        setOutput(null);
        setVoiceProgress(0);
        setUploadedImage(null);
    };

    const changeMode = (id: PulseMode) => {
        setMode(id);
        reset();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setStatus('preview');
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const runSimulation = async () => {
        setStatus('analyzing');
        
        if (mode === 'voice') {
            let p = 0;
            const interval = setInterval(() => {
                p += 1;
                setVoiceProgress(p);
                if (p >= 100) clearInterval(interval);
            }, 50);
        }

        const result = await runPulseSimulation(mode);
        
        setStatus('result');
        setOutput(result);
    };

    return (
        <section className="py-24 bg-stone-50 border-y border-stone-200">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header & Tabs */}
                <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <Badge text="Pulse OS v1.0" />
                        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">The Wellness Engine.</h2>
                        <p className="text-stone-500 mt-4 max-w-md">Select an ambient sensing module to initiate diagnostics.</p>
                    </div>
                    <div className="flex gap-1 bg-white p-1.5 rounded-full border border-stone-200 shadow-sm">
                        <FeatureTab active={mode==='text'} onClick={()=>changeMode('text')} label="Triage Engine" />
                        <FeatureTab active={mode==='camera'} onClick={()=>changeMode('camera')} label="Dermal Scan" />
                        <FeatureTab active={mode==='voice'} onClick={()=>changeMode('voice')} label="Vocal Biomarkers" />
                    </div>
                </div>

                {/* Main Interactive Stage */}
                <div ref={tiltRef} className="tilt-card relative w-full h-[600px] bg-[#0C0E10] rounded-[32px] shadow-2xl overflow-hidden border border-stone-800/50">
                    
                    {/* Window Controls */}
                    <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-30 bg-gradient-to-b from-[#0C0E10] to-transparent">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="h-4 w-px bg-stone-800 mx-2"></div>
                            <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">Pulse_Core // {mode}_module</span>
                        </div>
                        <div className="text-[10px] font-mono text-emerald-500 animate-pulse">● System Active</div>
                    </div>

                    {/* Content Area */}
                    <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
                        
                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                        {/* IDLE & PREVIEW STATES */}
                        {(status === 'idle' || status === 'preview') && (
                            <div className="z-10 animate-fade-in w-full max-w-xl mx-auto text-center px-6">
                                {mode === 'text' && (
                                    <div className="w-full">
                                        <div className="mb-8">
                                            <Icons.Message className="w-16 h-16 mx-auto text-stone-700 mb-6" />
                                            <h3 className="text-2xl text-white font-serif mb-2">Symptom Triage</h3>
                                            <p className="text-stone-500 text-sm">Describe your physical state. Our NLP engine will triage severity.</p>
                                        </div>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Migraine with light sensitivity..." 
                                                className="w-full bg-stone-900/50 border-b-2 border-stone-700 text-xl py-4 text-center text-stone-200 placeholder-stone-700 focus:outline-none focus:border-emerald-500 transition-colors font-serif interactive rounded-t-lg"
                                            />
                                        </div>
                                        <button onClick={runSimulation} className="interactive mt-10 text-xs font-mono text-emerald-400 border border-emerald-900/50 px-8 py-3 rounded-full bg-emerald-900/10 hover:bg-emerald-900/20 hover:border-emerald-500/50 transition-all uppercase tracking-widest">
                                            Initialize Analysis
                                        </button>
                                    </div>
                                )}
                                
                                {mode === 'camera' && (
                                    <div className="w-full">
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange} 
                                            className="hidden" 
                                            accept="image/*" 
                                        />
                                        {status === 'preview' && uploadedImage ? (
                                                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 border border-stone-700 group shadow-2xl mx-auto max-w-lg">
                                                <img src={uploadedImage} alt="Target" className="w-full h-full object-cover opacity-80" />
                                                <div className="absolute inset-0 bg-stone-900/20"></div>
                                                <div className="absolute inset-0 border-[1px] border-emerald-500/30 m-4 rounded-lg">
                                                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500"></div>
                                                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-500"></div>
                                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-500"></div>
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-500"></div>
                                                </div>
                                                <div className="absolute bottom-6 left-0 right-0 text-center">
                                                    <span className="bg-black/50 text-emerald-500 text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md">Image Captured</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="group/btn cursor-pointer interactive mb-8" onClick={triggerFileUpload}>
                                                <div className="w-32 h-32 rounded-full border border-dashed border-stone-700 flex items-center justify-center mx-auto mb-6 group-hover/btn:border-emerald-500/50 group-hover/btn:scale-105 transition-all duration-500 bg-stone-900/30">
                                                    <Icons.Camera className="w-10 h-10 text-stone-600 group-hover/btn:text-emerald-500" />
                                                </div>
                                                <h3 className="text-xl text-white font-serif mb-2">Dermal Scan</h3>
                                                <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">Tap to Upload Image</p>
                                            </div>
                                        )}
                                        {status === 'preview' && (
                                            <button onClick={runSimulation} className="interactive text-xs font-mono text-emerald-400 border border-emerald-900/50 px-8 py-3 rounded-full bg-emerald-900/10 hover:bg-emerald-900/20 hover:border-emerald-500/50 transition-all uppercase tracking-widest">
                                                Process Visual Data
                                            </button>
                                        )}
                                    </div>
                                )}

                                {mode === 'voice' && (
                                    <div className="w-full">
                                        <div className="group/btn cursor-pointer interactive mb-8" onClick={runSimulation}>
                                            <div className="relative w-32 h-32 mx-auto mb-8">
                                                <div className="absolute inset-0 bg-emerald-500/10 rounded-full pulse-ring"></div>
                                                <div className="absolute inset-0 bg-emerald-500/10 rounded-full pulse-ring" style={{animationDelay: '1s'}}></div>
                                                <div className="relative w-full h-full rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center group-hover/btn:border-emerald-900 transition-all duration-500 shadow-2xl">
                                                    <Icons.Mic className="w-10 h-10 text-stone-500 group-hover/btn:text-emerald-500" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl text-white font-serif mb-2">Vocal Biomarkers</h3>
                                            <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">Tap to Record Clip</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ANALYZING STATE */}
                        {status === 'analyzing' && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0C0E10]">
                                {mode === 'camera' && uploadedImage ? (
                                    <div className="absolute inset-0 z-0">
                                        <img src={uploadedImage} className="w-full h-full object-cover opacity-20 blur-md scale-105" alt="Analysing" />
                                        <div className="absolute inset-0 bg-stone-900/60"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-full h-[2px] bg-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.8)] scan-line"></div>
                                        </div>
                                    </div>
                                ) : null}

                                <div className="relative z-10 flex flex-col items-center">
                                    {mode === 'voice' ? (
                                        <div className="flex justify-center items-end h-24 gap-1 mb-8">
                                            {[...Array(12)].map((_,i) => (
                                                <div 
                                                    key={i} 
                                                    className="w-1.5 bg-emerald-500 rounded-full animate-equalizer"
                                                    style={{ 
                                                        animationDelay: `${i*0.05}s`, 
                                                        height: '30%',
                                                        opacity: 0.8 
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    ) : (
                                        mode !== 'camera' && (
                                            <div className="relative w-20 h-20 mb-8">
                                                <div className="absolute inset-0 border-2 border-stone-800 rounded-full"></div>
                                                <div className="absolute inset-0 border-2 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                                            </div>
                                        )
                                    )}
                                    
                                    <div className="bg-stone-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-stone-800">
                                        <p className="font-mono text-[11px] text-emerald-500 animate-pulse uppercase tracking-widest">
                                            {mode === 'camera' ? 'Analyzing Dermal Layer...' : 'Processing Biometrics...'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* RESULT POPUP */}
                        {status === 'result' && output && (
                            <div className="absolute inset-0 z-50 bg-[#0C0E10]/95 backdrop-blur-xl flex items-center justify-center animate-fade-in p-8">
                                <div className="max-w-2xl w-full border border-stone-800 bg-stone-900/50 p-10 rounded-3xl relative overflow-hidden shadow-2xl">
                                    {/* Top Accents */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-transparent to-transparent"></div>
                                    
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-2">Diagnosis</div>
                                                    <h4 className="font-serif text-3xl text-stone-100">{output.type}</h4>
                                                </div>
                                                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-900/20 border border-emerald-900/50 px-3 py-1.5 rounded-full">{output.severity}</span>
                                            </div>
                                            
                                            <div className="min-h-[60px] text-[14px] text-stone-400 mb-8 leading-relaxed font-light border-l-2 border-stone-700 pl-4">
                                                <Typewriter text={output.msg} speed={10} />
                                            </div>

                                            <div className="flex items-center gap-4 text-stone-300 bg-stone-800/50 p-4 rounded-xl opacity-0 animate-[fade-in_1s_ease-out_1.5s_forwards]">
                                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                                    <Icons.Shield className="w-5 h-5 text-emerald-500" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-0.5">Recommended Protocol</div>
                                                    <div className="text-sm font-bold uppercase tracking-wide">{output.action}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={reset} 
                                        className="absolute top-6 right-6 text-stone-600 hover:text-white transition-colors p-2"
                                    >
                                        ✕
                                    </button>
                                    
                                    <div className="mt-8 pt-6 border-t border-stone-800 flex justify-between items-center opacity-0 animate-[fade-in_1s_ease-out_2s_forwards]">
                                            <div className="text-[10px] font-mono text-stone-600">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                                            <button onClick={reset} className="text-[11px] font-mono text-stone-400 hover:text-white transition-colors uppercase tracking-widest interactive">
                                            Close Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};