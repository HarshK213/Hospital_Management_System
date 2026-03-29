import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background font-body text-on-surface antialiased min-h-screen flex items-center justify-center overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
            <style>
                {`
                    .material-symbols-outlined {
                        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                    }
                    .clinical-gradient {
                        background: linear-gradient(135deg, #005f6c 0%, #007a8a 100%);
                    }
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.8);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                    }
                `}
            </style>

            {/* Suppressed Nav Shells for Transactional Screen per Conflict Resolution Protocol */}
            <main className="w-full max-w-6xl h-[870px] flex rounded-xl overflow-hidden shadow-[0px_8px_24px_rgba(23,28,31,0.06)] mx-4 md:mx-8">
                {/* Left Column: Branding & Visual Content (Asymmetric Layout) */}
                <section className="hidden md:flex flex-col justify-between w-[45%] clinical-gradient p-12 text-on-primary relative overflow-hidden">
                    {/* Decorative Grain/Texture Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
                        <div className="h-full w-full bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-12">
                            <span className="material-symbols-outlined text-3xl" data-icon="clinical_notes">clinical_notes</span>
                            <h1 className="font-headline font-extrabold text-2xl tracking-tight text-on-primary">ClinicalCurator</h1>
                        </div>
                        <div className="space-y-6 max-w-sm">
                            <h2 className="font-headline font-bold text-4xl leading-tight text-on-primary">
                                Your healthcare journey starts here.
                            </h2>
                            <p className="text-on-primary-container text-lg opacity-90 leading-relaxed font-body">
                                Access your patient records, schedule appointments, and communicate with your clinical team in one secure editorial environment.
                            </p>
                        </div>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/10">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary-fixed">
                                <img className="w-full h-full object-cover" data-alt="professional portrait of a smiling female doctor in a bright modern medical office with soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCe6soHuxb9T5mYJTU-Un_LPYuYJMbjhlis1_v6Gx_N4GTYK7YPZQzr4n9JCf71ExEV4X2Fbjh4DqdwyoucGFo8cwvsddZ_kUyBMkfDAF5qplKvsD1kkPSh1hzAScPdspHlejKB56tRotiUeNNoOkxQYJCjPb8562QUZWPPf6qGS3aODnpm1-h1-it97mmh0lAkE8fcVY2FxvqKlf83oyglF_btGfqewcEeNBy0hDLugWi7BEH-QzCcb8kVsk8GV5huS4R8R8dcdk" />
                            </div>
                            <div>
                                <p className="font-headline font-bold text-primary-fixed text-sm">Clinical Assurance</p>
                                <p className="text-xs text-on-primary-container">"Our precision-first approach ensures your data is handled with surgical clarity."</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Background Decorative Image */}
                    <div className="absolute bottom-0 right-0 w-full h-1/2 opacity-20 transform translate-y-1/4 translate-x-1/4 pointer-events-none">
                        <span className="material-symbols-outlined text-[300px]" data-icon="medical_services">medical_services</span>
                    </div>
                </section>
                
                {/* Right Column: Signup Form */}
                <section className="flex-1 bg-surface-container-lowest flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-y-auto">
                    <div className="max-w-md w-full mx-auto">
                        <header className="mb-10">
                            <h3 className="font-headline font-bold text-3xl text-primary mb-2">Patient Signup</h3>
                            <p className="text-on-surface-variant font-medium">Create your clinical profile to begin.</p>
                        </header>
                        
                        <form className="space-y-6">
                            {/* Full Name Field */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant font-label" htmlFor="full-name">Full Name</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant transition-colors group-focus-within:text-primary" data-icon="person">person</span>
                                    <input className="w-full pl-12 pr-4 py-3 bg-surface-container-highest border-none rounded-lg font-body text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary transition-all duration-200" id="full-name" placeholder="Dr. Jane Smith" type="text" />
                                </div>
                            </div>
                            
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant font-label" htmlFor="email">Email Address</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant transition-colors group-focus-within:text-primary" data-icon="mail">mail</span>
                                    <input className="w-full pl-12 pr-4 py-3 bg-surface-container-highest border-none rounded-lg font-body text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary transition-all duration-200" id="email" placeholder="jane.smith@medical.com" type="email" />
                                </div>
                            </div>
                            
                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant font-label" htmlFor="password">Password</label>
                                    <span className="text-[10px] text-outline font-medium">8+ characters required</span>
                                </div>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant transition-colors group-focus-within:text-primary" data-icon="lock">lock</span>
                                    <input className="w-full pl-12 pr-12 py-3 bg-surface-container-highest border-none rounded-lg font-body text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary transition-all duration-200" id="password" placeholder="••••••••" type="password" />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" type="button">
                                        <span className="material-symbols-outlined" data-icon="visibility">visibility</span>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                            <div className="pt-4">
                                <button className="w-full clinical-gradient text-on-primary font-headline font-bold py-4 rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" type="submit">
                                    Create Account
                                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" data-icon="arrow_forward">arrow_forward</span>
                                </button>
                            </div>
                        </form>
                        
                        <footer className="mt-12 text-center space-y-4">
                            <p className="text-sm text-on-surface-variant font-medium">
                                Already have a clinical profile? 
                                <a className="text-primary font-bold hover:underline underline-offset-4 ml-1" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/login');
                                }}>Login here</a>
                            </p>
                            <div className="flex items-center justify-center gap-6 pt-6 border-t border-outline-variant/10">
                                <div className="flex items-center gap-1.5 grayscale opacity-50">
                                    <span className="material-symbols-outlined text-sm" data-icon="security">security</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">HIPAA Compliant</span>
                                </div>
                                <div className="flex items-center gap-1.5 grayscale opacity-50">
                                    <span className="material-symbols-outlined text-sm" data-icon="encrypted">encrypted</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">256-Bit SSL</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </section>
            </main>
            
            {/* Background Decoration (Subtle Clinical Circles) */}
            <div className="fixed -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="fixed -top-32 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        </div>
    );
};

export default Signup;