import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background font-body text-on-surface min-h-screen flex items-center justify-center overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
            <style>
                {`
                    .material-symbols-outlined {
                        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                    }
                    .bg-login-gradient {
                        background: linear-gradient(135deg, #005f6c 0%, #007a8a 100%);
                    }
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.85);
                        backdrop-filter: blur(12px);
                    }
                    .clip-diagonal {
                        clip-path: polygon(100% 0, 100% 100%, 0 100%, 60% 0);
                    }
                `}
            </style>
            
            {/* Top Navigation Suppression: As per rules, login screens suppress global shell. */}
            <main className="w-full max-w-6xl px-6 py-12 flex flex-col md:flex-row gap-0 items-stretch h-full md:min-h-[700px]">
                {/* Branding & Visual Anchor Section */}
                <section className="hidden md:flex flex-1 bg-login-gradient rounded-l-xl p-16 flex-col justify-between relative overflow-hidden">
                    <div className="z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <span className="material-symbols-outlined text-on-primary-container text-4xl" data-icon="clinical_notes">clinical_notes</span>
                            <h1 className="font-headline font-black text-3xl tracking-tight text-on-primary-container">ClinicalCurator</h1>
                        </div>
                        <h2 className="font-headline font-bold text-5xl leading-tight text-white mb-6">Precision management for modern healthcare.</h2>
                        <p className="text-on-primary-container text-lg max-w-md opacity-90 leading-relaxed">
                            Access your clinical workspace or patient portal with a unified, secure authentication experience designed for clarity.
                        </p>
                    </div>
                    <div className="z-10 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            <img className="w-12 h-12 rounded-full border-2 border-primary shadow-lg object-cover" data-alt="Close up portrait of a professional female doctor in white coat smiling in a bright hospital hallway" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpIHcO4EOOcIi8JAz3zeAk4UCcLZBk96eV-eGihZYghHNZYJuHPLTGnrlhiaNlHg6N4B4s9V5I9Nqsi1tdzdpYlJkii46bV4ueBBpMGmfz1rJzr6CIViMuvCG2j3Rsy70fRELMWw8nlC7-2YycPK81csqC05JCusUWhyxwrr-LlKczwUNPyxRootNPdgPJHzdaVt9M3kFnP6M5yjDvizS0AG2bAG9q6yNMaxlCeh5QvFhqxqfX65-X4vETx-TQwqK-eJeMi_WPC5c" />
                            <img className="w-12 h-12 rounded-full border-2 border-primary shadow-lg object-cover" data-alt="Portrait of a focused male surgeon in blue scrubs looking at the camera in a modern clinical setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl85P35cOV_s3VRhODhhkGvZPFnpe5we0HApXK4SGFbfrOZZLzg4Bzf4wAQbK9p9hKVUXaC458kFDE_s_SkULtzvxzcozE8atWchn3LdZDVjBxadx0RF8Mz5SZHh4BwzMbVciRe679MNenLijnNm6AhMYsJREUd61YtPWZtW74Z7cP2wKEuZ7Kf1VxAOWlnGiuv8bww29B-jk24M0MT8qJxVd7cwOeLj4Rq0av7Ig6M6KN52hZtBiP9ciF7pqReAjBgMlYRaik-TI" />
                            <img className="w-12 h-12 rounded-full border-2 border-primary shadow-lg object-cover" data-alt="Portrait of a friendly nurse wearing a stethoscope and navy blue uniform against a soft clinical background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP7E-HpkF9p-iRE-HGNss_f49ax4gl1tV93KmRBRAuGvPuIdiNpmogvbVh7SL2R5xO8f2n7ycmZ5K_vtIiiEsy2z00xM3XC0rZh7ucGL6_mta0VGwROAT2ADZgT9O7aPbe7WdmutwIhEznnqS5GRwcXKCD5d2xlW7P6u7rGX9F87waP8iOLwcUDcvsY9-6MiH50bKezDqtUJ6Y1-ZrdcjTh0Oz1cvX-oJgj_kMHBtnse70Zj7q6ier7W7Ds8g2Zr9wxTkaEltmbeM" />
                        </div>
                        <span className="text-on-primary-container font-medium text-sm">Trusted by 2,400+ medical professionals daily.</span>
                    </div>
                    {/* Abstract Background Texture */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white"></div>
                        <div className="absolute bottom-1/4 -left-12 w-64 h-64 rounded-full border-[20px] border-white"></div>
                    </div>
                </section>
                {/* Login Interface Section */}
                <section className="flex-1 bg-surface-container-lowest rounded-xl md:rounded-l-none md:rounded-r-xl shadow-[0px_8px_24px_rgba(23,28,31,0.06)] p-8 md:p-16 flex flex-col">
                    <div className="md:hidden flex items-center gap-3 mb-10">
                        <span className="material-symbols-outlined text-primary text-3xl" data-icon="clinical_notes">clinical_notes</span>
                        <h1 className="font-headline font-black text-xl tracking-tight text-primary">ClinicalCurator</h1>
                    </div>
                    <div className="mb-10">
                        <h3 className="font-headline font-bold text-2xl text-on-surface mb-2">Welcome back</h3>
                        <p className="text-on-surface-variant text-sm">Please select your portal and enter your credentials.</p>
                    </div>
                    {/* Role Selection Tabs */}
                    <div className="flex bg-surface-container-low p-1.5 rounded-lg mb-10">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-white text-primary font-bold shadow-sm transition-all duration-200">
                            <span className="material-symbols-outlined text-[20px]" data-icon="medical_services">medical_services</span>
                            <span className="text-sm font-label">Staff Login</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-on-surface-variant font-medium hover:text-on-surface transition-all duration-200">
                            <span className="material-symbols-outlined text-[20px]" data-icon="person">person</span>
                            <span className="text-sm font-label">Patient Login</span>
                        </button>
                    </div>
                    {/* Login Form (Staff View - Active by default) */}
                    <form className="space-y-6 flex-grow">
                        <div>
                            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2" htmlFor="staff_id">Staff ID</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors" data-icon="badge">badge</span>
                                <input className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-none rounded-lg text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary transition-all" id="staff_id" placeholder="e.g. STF-99482" type="text" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider" htmlFor="password">Password</label>
                                <a className="text-xs font-bold text-primary hover:text-primary-container transition-colors" href="#">Forgot Password?</a>
                            </div>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors" data-icon="lock">lock</span>
                                <input className="w-full pl-12 pr-12 py-4 bg-surface-container-highest border-none rounded-lg text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary transition-all" id="password" placeholder="••••••••" type="password" />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline hover:text-on-surface transition-colors" data-icon="visibility" type="button">visibility</button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 py-2">
                            <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" id="remember" type="checkbox" />
                            <label className="text-sm text-on-surface-variant select-none" htmlFor="remember">Keep me logged in on this device</label>
                        </div>
                        <button className="w-full bg-login-gradient text-white py-4 px-6 rounded-lg font-bold text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                            Access Portal
                            <span className="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>
                        </button>
                    </form>
                    {/* Footer / Secondary Actions */}
                    <div className="mt-12 pt-8 border-t border-outline-variant/20">
                        <p className="text-sm text-center text-on-surface-variant">
                            New patient to our network? 
                            <a className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1" href="#" onClick={(e) => {
                                e.preventDefault();
                                navigate('/signup');
                            }}>Patient Signup</a>
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
                            <a className="text-xs font-medium text-outline hover:text-on-surface-variant transition-colors" href="#">Emergency Support</a>
                            <a className="text-xs font-medium text-outline hover:text-on-surface-variant transition-colors" href="#">Privacy Policy</a>
                            <a className="text-xs font-medium text-outline hover:text-on-surface-variant transition-colors" href="#">Compliance</a>
                        </div>
                    </div>
                </section>
            </main>
            {/* Hidden Patient Form State Representation (Mocked for logic visual) */}
            {/* In a real app, clicking 'Patient Login' would swap fields to:
                 - Email (input type email, icon 'mail')
                 - Password (same)
            */}
            {/* Decorative Accent for the background */}
            <div className="fixed top-0 right-0 w-1/3 h-screen bg-surface-container-low -z-10 clip-diagonal hidden lg:block"></div>
        </div>
    );
};

export default Login;
