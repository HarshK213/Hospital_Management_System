import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientService } from '../../services/patientService';
import { AuthService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);

        try {
            const response = await patientService.register({
                fullname: formData.fullName,
                email: formData.email,
                password: formData.password
            });

            setSuccess('Account created successfully! Signing you in...');

            try {
                const loginResponse = await AuthService.patientLogin({
                    email: formData.email,
                    password: formData.password
                });

                if (loginResponse.data?.accessToken) {
                    localStorage.setItem('accessToken', loginResponse.data.accessToken);
                }

                login(loginResponse.data.user || loginResponse.data);
                navigate('/patient/book-appointment');
            } catch (loginErr) {
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#f0f7f9] to-[#e8f4f6]">
            <button
                onClick={() => navigate('/')}
                className="fixed top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 bg-[#007a8a] hover:bg-[#005f6c] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-50"
            >
                <span className="material-symbols-outlined text-lg sm:text-xl">home</span>
            </button>
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

            <main className="w-full max-w-5xl flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden shadow-2xl">
                <section className="hidden lg:flex lg:w-[45%] clinical-gradient p-8 xl:p-12 flex-col justify-between relative">
                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
                        <div className="h-full w-full bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8 xl:mb-12">
                            <span className="material-symbols-outlined text-3xl xl:text-4xl text-white">clinical_notes</span>
                            <h1 className="font-bold text-2xl xl:text-3xl tracking-tight text-white">Arogya</h1>
                        </div>
                        <div className="space-y-4 xl:space-y-6 max-w-sm">
                            <h2 className="font-bold text-3xl xl:text-4xl leading-tight text-white">
                                Your healthcare journey starts here.
                            </h2>
                            <p className="text-white/90 text-base xl:text-lg leading-relaxed">
                                Access your patient records, schedule appointments, and communicate with your clinical team in one secure environment.
                            </p>
                        </div>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 xl:gap-4 p-3 xl:p-4 rounded-xl glass-panel border border-white/10">
                            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full overflow-hidden shrink-0 border-2 border-white/50">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCe6soHuxb9T5mYJTU-Un_LPYuYJMbjhlis1_v6Gx_N4GTYK7YPZQzr4n9JCf71ExEV4X2Fbjh4DqdwyoucGFo8cwvsddZ_kUyBMkfDAF5qplKvsD1kkPSh1hzAScPdspHlejKB56tRotiUeNNoOkxQYJCjPb8562QUZWPPf6qGS3aODnpm1-h1-it97mmh0lAkE8fcVY2FxvqKlf83oyglF_btGfqewcEeNBy0hDLugWi7BEH-QzCcb8kVsk8GV5huS4R8R8dcdk" alt="Doctor" />
                            </div>
                            <div>
                                <p className="font-bold text-white text-xs xl:text-sm">Clinical Assurance</p>
                                <p className="text-white/80 text-xs xl:text-sm">"Our precision-first approach ensures your data is handled with surgical clarity."</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute bottom-0 right-0 w-full h-1/2 opacity-20 transform translate-y-1/4 translate-x-1/4 pointer-events-none">
                        <span className="material-symbols-outlined text-[200px] xl:text-[300px] text-white">medical_services</span>
                    </div>
                </section>
                
                <section className="w-full lg:w-[55%] bg-white p-6 sm:p-8 md:p-10 xl:p-12 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <div className="flex lg:hidden items-center gap-3 mb-6 sm:mb-8">
                            <span className="material-symbols-outlined text-[#007a8a] text-2xl sm:text-3xl">clinical_notes</span>
                            <h1 className="font-bold text-xl sm:text-2xl tracking-tight text-[#007a8a]">Arogya</h1>
                        </div>
                        
                        <header className="mb-6 sm:mb-8">
                            <h3 className="font-bold text-xl sm:text-2xl xl:text-3xl text-gray-900 mb-2">Patient Signup</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Create your clinical profile to begin.</p>
                        </header>
                        
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">error</span>
                                    {error}
                                </p>
                            </div>
                        )}
                        
                        {success && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-600 text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">check_circle</span>
                                    {success}
                                </p>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" htmlFor="fullName">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-[#007a8a] transition-colors">person</span>
                                    <input
                                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm sm:text-base"
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="Dr. Jane Smith"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-[#007a8a] transition-colors">mail</span>
                                    <input
                                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm sm:text-base"
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="jane.smith@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="password">
                                        Password
                                    </label>
                                    <span className="text-[10px] xl:text-xs text-gray-400 font-medium">8+ characters required</span>
                                </div>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-[#007a8a] transition-colors">lock</span>
                                    <input
                                        className="w-full pl-12 pr-12 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm sm:text-base"
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-[#007a8a] transition-colors">lock</span>
                                    <input
                                        className="w-full pl-12 pr-12 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm sm:text-base"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full clinical-gradient text-white py-3 sm:py-4 px-6 rounded-lg font-bold text-sm sm:text-base shadow-lg shadow-[#007a8a]/20 hover:shadow-xl hover:shadow-[#007a8a]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        <footer className="mt-6 sm:mt-8 pt-6 sm:pt-8 text-center space-y-4">
                            <p className="text-sm sm:text-base text-gray-600">
                                Already have a clinical profile?{' '}
                                <a
                                    className="text-[#007a8a] font-bold hover:underline underline-offset-4"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/login');
                                    }}
                                >
                                    Login here
                                </a>
                            </p>
                            <div className="flex items-center justify-center gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-1.5 grayscale opacity-50">
                                    <span className="material-symbols-outlined text-sm">security</span>
                                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">HIPAA Compliant</span>
                                </div>
                                <div className="flex items-center gap-1.5 grayscale opacity-50">
                                    <span className="material-symbols-outlined text-sm">encrypted</span>
                                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">256-Bit SSL</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </section>
            </main>
            
            <div className="fixed -bottom-32 -left-32 w-64 xl:w-96 h-64 xl:h-96 bg-[#007a8a]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="fixed -top-32 -right-32 w-64 xl:w-96 h-64 xl:h-96 bg-[#1b4f72]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        </div>
    );
};

export default Signup;
