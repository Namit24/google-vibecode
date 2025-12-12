import { PulseOutput, PulseMode } from '../types';

export const runPulseSimulation = (mode: PulseMode): Promise<PulseOutput> => {
    const delay = mode === 'voice' ? 5000 : 3500;

    return new Promise((resolve) => {
        setTimeout(() => {
            if (mode === 'text') {
                resolve({
                    type: 'Potential Cephalalgia',
                    severity: 'Low / Ambient',
                    msg: 'Subjective analysis indicates moderate photophobia and tension-type cephalalgia. Signs correlate with digital eye strain (DES). Recommended intervention protocols initiated.',
                    action: 'Reduce Blue Light Exposure'
                });
            } else if (mode === 'camera') {
                resolve({
                    type: 'Dermal Layer Analysis',
                    severity: 'Benign',
                    msg: 'Epidermal integrity intact. Localized hyperpigmentation detected consistent with benign solar lentigo. No signs of malignant melanoma or basal cell carcinoma features detected in stratum corneum.',
                    action: 'Monitor for Asymmetry'
                });
            } else {
                resolve({
                    type: 'Cortisol Variance',
                    severity: 'Elevated',
                    msg: 'Fundamental frequency analysis detects micro-tremors indicative of acute cortisol elevation. Jitter/Shimmer variance exceeds 1.2% baseline, correlating with systemic fatigue.',
                    action: 'Box Breathing Protocol'
                });
            }
        }, delay);
    });
};