import React from 'react';

export type ViewState = 'home' | 'whitepaper';

export type PulseMode = 'text' | 'camera' | 'voice';

export type PulseStatus = 'idle' | 'preview' | 'analyzing' | 'result';

export interface PulseOutput {
    type: string;
    severity: string;
    msg: string;
    action: string;
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export interface NavProps {
    onHome: () => void;
}

export interface BadgeProps {
    text: string;
}

export interface FeatureTabProps {
    active: boolean;
    label: string;
    onClick: () => void;
}

export interface TypewriterProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
}