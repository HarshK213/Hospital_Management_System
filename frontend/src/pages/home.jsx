import React from 'react';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
            <style>
                {`
                    .material-symbols-outlined {
                        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                    }
                    .bg-clinical-gradient {
                        background: linear-gradient(135deg, #005f6c 0%, #007a8a 100%);
                    }
                    .glass-panel {
                        background: rgba(246, 250, 254, 0.8);
                        backdrop-filter: blur(12px);
                    }
                `}
            </style>
            
            {/* TopNavBar */}
            <header className="bg-[#f6fafe] dark:bg-slate-950 docked full-width top-0 sticky z-50 transition-all duration-300">
                <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
                    <div className="text-2xl font-black text-[#005f6c] dark:text-[#007a8a] tracking-tighter font-headline">
                        Arogya
                    </div>
                    <nav className="hidden md:flex gap-8 items-center">
                        <a className="text-[#3e494b] dark:text-slate-400 font-medium hover:text-[#005f6c] font-['Manrope'] font-bold text-lg uppercase tracking-tight transition-colors duration-200" href="#features">Features</a>
                        <a className="text-[#3e494b] dark:text-slate-400 font-medium hover:text-[#005f6c] font-['Manrope'] font-bold text-lg uppercase tracking-tight transition-colors duration-200" href="#about">About Us</a>
                        <a className="text-[#3e494b] dark:text-slate-400 font-medium hover:text-[#005f6c] font-['Manrope'] font-bold text-lg uppercase tracking-tight transition-colors duration-200" href="#contact">Contact</a>
                    </nav>
                     <div className="flex items-center gap-4">
                         <button onClick={() => navigate("/login")} className="px-5 py-2 text-[#005f6c] font-bold font-headline hover:bg-[#dfe3e7] rounded transition-all active:scale-95">Login</button>
                         <button onClick={() => navigate("/signup")} className="px-6 py-2 bg-clinical-gradient text-white font-bold font-headline rounded-lg shadow-sm hover:opacity-90 transition-all active:scale-95">Sign Up</button>
                     </div>
                </div>
            </header>
            <main>
                {/* Hero Section */}
                <section className="relative min-h-[870px] flex items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img className="w-full h-full object-cover" data-alt="Modern high-tech hospital corridor with soft natural lighting and clean architectural lines reflecting clinical excellence and peace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5S8CjeWb9ESX6HOEWZoGIH39p4HNT-HxThZbGjslTTXo-We1iIHpxNedEf4cIU4nT2yjv02Ba_T5FJkQjtqHa_0vwzZ8icPge94e8Kf7vOg1EncOQdkV1-TrxwGvlJuC41GUdPzyHISS5_PwmMm4h6uqAl5uYDuHGUNNvO3-NISEL7HmCU6OVUo7dBBXApscXhg9rb7ss3o3AKuGFaoqb2_iQiAq8z4nyQ8hN96vdhEfZBK2LtPwQih2kYM2QwZ4xFt_b10tHasU" />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
                        <div className="max-w-2xl">
                            <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6 rounded-full">Excellence in Care</span>
                            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] mb-6 tracking-tight">
                                World-Class Healthcare, <br/><span className="text-primary">Managed with Care</span>
                            </h1>
                            <p className="text-on-surface-variant text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
                                Experience the future of medical hospitality. Arogya combines cutting-edge technology with deep human empathy to provide an unparalleled healing environment.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="bg-clinical-gradient text-white px-8 py-4 rounded-lg font-headline font-bold text-lg flex items-center gap-2 shadow-lg hover:opacity-90 transition-all active:scale-95">
                                    Find a Doctor <span className="material-symbols-outlined">search</span>
                                </button>
                                <button className="bg-white border-2 border-primary/10 text-primary px-8 py-4 rounded-lg font-headline font-bold text-lg hover:bg-surface-container-low transition-all active:scale-95">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* About Us Section */}
                <section className="py-24 bg-surface-container-low" id="about">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-5">
                                <div className="relative">
                                    <img className="rounded-xl shadow-2xl relative z-10" data-alt="Professional female doctor smiling warmly while looking at clinical charts in a brightly lit modern medical facility" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFjO68aHXEFwtOHklj9_XTkwFAu_AHyo4Ik4_eDN3kRz1puFYuNP528ndgByNeK2JsX4_hHRzjtFe9KUuZtpWneLibtHx0OleYRcva0jSo2JphDpyFTCMN5PMPfqer9Xz5tj4pD2uSV5fWp5GLravrcYJws8qKtwJXDfnTERYqm4dksXInYiCxC7kwkmIQUJXbkE7MpMsZA9S_gTggweju6Qp2ExSMxxBoSPqFo_Rd1r50K43VkEsjIDU0BUE5yTqWBkzIceYn68Q" />
                                    <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-xl -z-0"></div>
                                </div>
                            </div>
                            <div className="lg:col-span-7">
                                <h2 className="font-headline text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">Our Mission</h2>
                                <h3 className="font-headline text-4xl font-bold text-on-surface mb-8 leading-tight">A Legacy of Healing and Continuous Innovation</h3>
                                <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                                    Founded with the vision to bridge the gap between advanced medical technology and compassionate patient care, Arogya has grown into a beacon of hope for thousands. Our commitment goes beyond treating symptoms; we focus on holistic wellness.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                                            <span className="material-symbols-outlined text-primary">history_edu</span>
                                        </div>
                                        <div>
                                            <h4 className="font-headline font-bold text-on-surface">Established 1998</h4>
                                            <p className="text-sm text-on-surface-variant">Over two decades of excellence in regional healthcare.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                                            <span className="material-symbols-outlined text-primary">diversity_3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-headline font-bold text-on-surface">500+ Experts</h4>
                                            <p className="text-sm text-on-surface-variant">Specialists from around the globe dedicated to you.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Services Grid (Bento Style) */}
                <section className="py-24 bg-background">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-headline text-4xl font-bold text-on-surface mb-4">Our Specialized Facilities</h2>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">Comprehensive medical services tailored to your needs, powered by the latest clinical technology.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {/* Emergency - Large */}
                            <div className="md:col-span-2 lg:col-span-3 bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-tertiary"></div>
                                <div className="relative z-10">
                                    <span className="material-symbols-outlined text-4xl text-tertiary mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                                    <h3 className="font-headline text-2xl font-bold text-on-surface mb-3">Emergency Care</h3>
                                    <p className="text-on-surface-variant mb-6">24/7 rapid response trauma unit equipped with life-saving technology.</p>
                                    <a className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform" href="#">View Department <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                                </div>
                                <div className="absolute -right-12 -bottom-12 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="material-symbols-outlined text-[12rem]">medical_services</span>
                                </div>
                            </div>
                            {/* Specialized Surgery */}
                            <div className="md:col-span-2 lg:col-span-3 bg-clinical-gradient p-8 rounded-xl text-white relative overflow-hidden">
                                <div className="relative z-10 flex flex-col h-full">
                                    <span className="material-symbols-outlined text-4xl mb-6">precision_manufacturing</span>
                                    <h3 className="font-headline text-2xl font-bold mb-3">Specialized Surgery</h3>
                                    <p className="text-white/80 mb-6">Minimally invasive robotic surgery and expert neurosurgical units.</p>
                                    <div className="mt-auto flex -space-x-3">
                                        <img className="w-10 h-10 rounded-full border-2 border-primary" data-alt="Surgeon portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Qw7i4tMSEVBICG8tUwV4OXAVOeK1MK8dud11jW1y3jCffvZD0YNUo6rg38jwcbOfX2Vl7Ac1uvHnlrqy2cPeWOZbvA7P3Bfuodz4ETLUZrmjLird-tHsXNfWtHEb3owBCoH1-hPWAVrLR4dgI-26DkL_YzgUHyOHW_GhxKaYIitL0DMSTap7Qi_ql6XVkfiBMCZtCr3oDwN365N6lKdoR8iAOBUpYDbcpDtEtMmMNyKXLOQPQeTkhnz9rrSfnqi4QY-li46Gpl4" />
                                        <img className="w-10 h-10 rounded-full border-2 border-primary" data-alt="Doctor portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvrphei6yWlgvf8rYo18WtiJpxwlAw8KcIzc1ob6nRqa4CUDiSuJPtoWumk2aKHlB1kigIRyTSHlQ_iloQCsK52cogxc7sId9uJy3MyVOYXnMzQ_550zY48OB__QsX9wFm52OdvmxhtXIu0tEyuz8gDyyA_byYpZzPyf89cFUWS1I9tC_hC1JhtdeRCv5_Tr2x7a6TTTp2zamYnkoAdXFk5OlePsGRmZm6KS4X8FxsL8gDs_FzjJ8GtYAW9xJD_lrImyULt-G6nmM" />
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">+12</div>
                                    </div>
                                </div>
                            </div>
                            {/* Cardiology */}
                            <div className="md:col-span-2 lg:col-span-2 bg-surface-container-low p-8 rounded-xl">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                                <span className="material-symbols-outlined text-4xl text-primary mb-6">cardiology</span>
                                <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Cardiology</h3>
                                <p className="text-sm text-on-surface-variant">Advanced heart care including non-invasive diagnostics and rehabilitation.</p>
                            </div>
                            {/* Maternity */}
                            <div className="md:col-span-2 lg:col-span-2 bg-surface-container-low p-8 rounded-xl">
                                <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                                <span className="material-symbols-outlined text-4xl text-secondary mb-6">baby_changing_station</span>
                                <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Maternity</h3>
                                <p className="text-sm text-on-surface-variant">Luxury birthing suites and comprehensive neonatal intensive care.</p>
                            </div>
                            {/* Diagnostics */}
                            <div className="md:col-span-2 lg:col-span-2 bg-surface-container-low p-8 rounded-xl">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
                                <span className="material-symbols-outlined text-4xl text-primary-container mb-6">biotech</span>
                                <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Diagnostics</h3>
                                <p className="text-sm text-on-surface-variant">Full-spectrum laboratory and high-resolution imaging services.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Why Choose Us */}
                <section className="py-24 bg-surface-container">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="font-headline text-4xl font-bold text-on-surface mb-8">Why Arogya is Your Best Choice for Care</h2>
                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="shrink-0 w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                                        </div>
                                        <div>
                                            <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Expert Doctors</h3>
                                            <p className="text-on-surface-variant">Our staff includes board-certified specialists with international credentials and decades of experience.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="shrink-0 w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-primary text-3xl">memory</span>
                                        </div>
                                        <div>
                                            <h3 className="font-headline text-xl font-bold text-on-surface mb-2">State-of-the-art Technology</h3>
                                            <p className="text-on-surface-variant">Utilizing AI-driven diagnostics and the latest surgical robotics for precision outcomes.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="shrink-0 w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-primary text-3xl">favorite</span>
                                        </div>
                                        <div>
                                            <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Compassionate Care</h3>
                                            <p className="text-on-surface-variant">We treat people, not patients. Our patient-first philosophy ensures your dignity and comfort.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <img className="rounded-xl shadow-xl" data-alt="Interior of a ultra-modern patient suite with ergonomic furniture, large windows showing greenery, and minimalist design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6xEE1pFZtIjct5pbRTgMhgwLTwacoSON5pDmjNFX5lFdke_kio4vHvkZiPekPOlDtpUQfYhsyuHwlrzplJC0VOpFXzqtR9csDb3Ds4Njo89wr6vGc8PjXXxpc4pzPOuVPvr4zjP78stY80FEDlopxbB_i2ZUBCzYbpWVJ8KpPlhz_3UDu7DlK8fy2XBh7EIxo6zChB-fbTjhngEPMPmj9kwajIjQ34G8BhSM1giNpqO0j3vPmb4nwlvcGll5cBfOkl4RxMSLi0Kg" />
                                <div className="absolute -bottom-10 -left-10 glass-panel p-8 rounded-xl shadow-lg max-w-xs hidden md:block border border-white/20">
                                    <div className="text-primary font-headline text-4xl font-black mb-1 tracking-tighter">98.4%</div>
                                    <div className="text-on-surface font-bold text-sm uppercase tracking-wider mb-2">Patient Satisfaction</div>
                                    <p className="text-xs text-on-surface-variant">Based on our 2023 annual health quality review and feedback.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Contact Section */}
                <section className="py-24 bg-background" id="contact">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="bg-surface-container-low rounded-3xl overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-12 md:p-16">
                                    <h2 className="font-headline text-3xl font-bold text-on-surface mb-4">Get in Touch</h2>
                                    <p className="text-on-surface-variant mb-10">Have questions about our services or need to schedule a consultation? Our team is here to help you 24/7.</p>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <span className="material-symbols-outlined text-primary">call</span>
                                            <span className="font-bold">+1 (800) AROGYA-MED</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="material-symbols-outlined text-primary">mail</span>
                                            <span className="font-bold">care@arogya-hospital.com</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="material-symbols-outlined text-primary">location_on</span>
                                            <span className="font-bold">122 Medical Square, Healthcare District, Metro City</span>
                                        </div>
                                    </div>
                                    <div className="mt-12">
                                        <button className="bg-clinical-gradient text-white px-8 py-3 rounded-lg font-headline font-bold hover:opacity-90 transition-all">
                                            Schedule Appointment
                                        </button>
                                    </div>
                                </div>
                                <div className="h-80 lg:h-auto relative">
                                    <img className="w-full h-full object-cover" data-alt="Modern medical building exterior at sunset with sleek glass facade and landscaped entrance" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC7kknC1_3gX4wuM3c34ZwzP3y4ernJ-HVrp0VofsHRB5bDuoQiXrUR9UHllrn48wAvi7c-aB98t00TXMZluFcZxr1yDB1Z8AkK-k0mFfKWaYy3vZdxbfkhi66kr72HRIpaOFrOCxiPGYYDFVXy2k9DkOHdlu1fiXGAiERRahAEMJV-IdFVmZSwaAhtHLGEPLmyAkQa-8KjLommA8gswwKNbuTKR-C0iJv9l1DCU6pQ1BvJQ00uIxr6MzLPJPGevb5R_Yglx_pB1Q" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* Footer */}
            <footer className="bg-[#f0f4f8] dark:bg-slate-900 full-width border-t border-[#bdc8cb]/20">
                <div className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="text-lg font-bold text-[#005f6c] font-headline">Arogya</div>
                        <p className="font-['Inter'] text-sm text-[#3e494b] dark:text-slate-400 text-center md:text-left max-w-xs">
                            Leading the way in medical excellence and patient-centered hospital management systems.
                        </p>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-6">
                        <a className="font-['Inter'] text-sm text-[#3e494b] hover:text-[#005f6c] transition-opacity" href="#">Privacy Policy</a>
                        <a className="font-['Inter'] text-sm text-[#3e494b] hover:text-[#005f6c] transition-opacity" href="#">Terms of Service</a>
                        <a className="font-['Inter'] text-sm text-[#3e494b] hover:text-[#005f6c] transition-opacity" href="#">Support</a>
                        <a className="font-['Inter'] text-sm text-[#3e494b] hover:text-[#005f6c] transition-opacity" href="#">Accessibility</a>
                    </nav>
                    <div className="font-['Inter'] text-sm text-[#3e494b] dark:text-slate-400">
                        © 2024 Arogya Hospital Management Systems. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;