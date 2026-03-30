import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [loginType, setLoginType] = useState('staff');
    const [formData, setFormData] = useState({
        identifier: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleLoginTypeChange = (type) => {
        setLoginType(type);
        setFormData({
            identifier: '',
            email: '',
            password: ''
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let response;
            
            if (loginType === 'staff') {
                if (!formData.identifier.trim() || !formData.password.trim()) {
                    setError('Please fill in all fields');
                    setLoading(false);
                    return;
                }
                response = await AuthService.staffLogin({
                    staffID: formData.identifier,
                    password: formData.password
                });
            } else {
                if (!formData.email.trim() || !formData.password.trim()) {
                    setError('Please fill in all fields');
                    setLoading(false);
                    return;
                }
                response = await AuthService.patientLogin({
                    email: formData.email,
                    password: formData.password
                });
            }

            const token = response.accessToken || response.data?.accessToken;
            if (token) {
                localStorage.setItem('accessToken', token);
            }

            const userData = response.user || response.data?.user || response;
            login(userData);
            
            const role = (userData.role || loginType).toLowerCase();
            const routes = {
                admin: '/home',
                doctor: '/doctor/see-appointment',
                receptionist: '/receptionist/add-patient',
                patient: '/patient/book-appointment',
                nurse: '/home',
                staff: '/home'
            };
            
            navigate(routes[role] || '/home');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
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
                    .bg-login-gradient {
                        background: linear-gradient(135deg, #005f6c 0%, #007a8a 100%);
                    }
                    .clip-diagonal {
                        clip-path: polygon(100% 0, 100% 100%, 0 100%, 60% 0);
                    }
                    @keyframes pulse-subtle {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                    }
                    .animate-pulse-subtle {
                        animation: pulse-subtle 1.5s ease-in-out infinite;
                    }
                `}
            </style>
            
            <main className="w-full max-w-5xl flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden shadow-2xl">
                <section className="hidden lg:flex lg:w-1/2 bg-login-gradient p-8 xl:p-12 flex-col justify-between relative">
                    <div className="z-10">
                        <div className="flex items-center gap-3 mb-8 xl:mb-12">
                            <span className="material-symbols-outlined text-white text-3xl xl:text-4xl">clinical_notes</span>
                            <h1 className="font-bold text-2xl xl:text-3xl tracking-tight text-white">Arogya</h1>
                        </div>
                        <h2 className="font-bold text-3xl xl:text-4xl 2xl:text-5xl leading-tight text-white mb-4 xl:mb-6">
                            Precision management for modern healthcare.
                        </h2>
                        <p className="text-white/90 text-base xl:text-lg max-w-md leading-relaxed">
                            Access your clinical workspace or patient portal with a unified, secure authentication experience designed for clarity.
                        </p>
                    </div>
                    <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex -space-x-3">
                            <img className="w-10 h-10 xl:w-12 xl:h-12 rounded-full border-2 border-white shadow-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpIHcO4EOOcIi8JAz3zeAk4UCcLZBk96eV-eGihZYghHNZYJuHPLTGnrlhiaNlHg6N4B4s9V5I9Nqsi1tdzdpYlJkii46bV4ueBBpMGmfz1rJzr6CIViMuvCG2j3Rsy70fRELMWw8nlC7-2YycPK81csqC05JCusUWhyxwrr-LlKczwUNPyxRootNPdgPJHzdaVt9M3kFnP6M5yjDvizS0AG2bAG9q6yNMaxlCeh5QvFhqxqfX65-X4vETx-TQwqK-eJeMi_WPC5c" alt="Doctor" />
                            <img className="w-10 h-10 xl:w-12 xl:h-12 rounded-full border-2 border-white shadow-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl85P35cOV_s3VRhODhhkGvZPFnpe5we0HApXK4SGFbfrOZZLzg4Bzf4wAQbK9p9hKVUXaC458kFDE_s_SkULtzvxzcozE8atWchn3LdZDVjBxadx0RF8Mz5SZHh4BwzMbVciRe679MNenLijnNm6AhMYsJREUd61YtPWZtW74Z7cP2wKEuZ7Kf1VxAOWlnGiuv8bww29B-jk24M0MT8qJxVd7cwOeLj4Rq0av7Ig6M6KN52hZtBiP9ciF7pqReAjBgMlYRaik-TI" alt="Surgeon" />
                            <img className="w-10 h-10 xl:w-12 xl:h-12 rounded-full border-2 border-white shadow-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP7E-HpkF9p-iRE-HGNss_f49ax4gl1tV93KmRBRAuGvPuIdiNpmogvbVh7SL2R5xO8f2n7ycmZ5K_vtIiiEsy2z00xM3XC0rZh7ucGL6_mta0VGwROAT2ADZgT9O7aPbe7WdmutwIhEznnqS5GRwcXKCD5d2xlW7P6u7rGX9F87waP8iOLwcUDcvsY9-6MiH50bKezDqtUJ6Y1-ZrdcjTh0Oz1cvX-oJgj_kMHBtnse70Zj7q6ier7W7Ds8g2Zr9wxTkaEltmbeM" alt="Nurse" />
                        </div>
                        <span className="text-white/90 text-sm font-medium">Trusted by 2,400+ medical professionals daily.</span>
                    </div>
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -right-24 w-64 xl:w-96 h-64 xl:h-96 rounded-full border-[30px] xl:border-[40px] border-white"></div>
                        <div className="absolute bottom-1/4 -left-12 w-48 xl:w-64 h-48 xl:h-64 rounded-full border-[15px] xl:border-[20px] border-white"></div>
                    </div>
                </section>
                
                <section className="w-full lg:w-1/2 bg-white p-6 sm:p-8 md:p-10 xl:p-12 flex flex-col">
                    <div className="flex lg:hidden items-center gap-3 mb-6 sm:mb-8">
                        <span className="material-symbols-outlined text-[#007a8a] text-2xl sm:text-3xl">clinical_notes</span>
                        <h1 className="font-bold text-xl sm:text-2xl tracking-tight text-[#007a8a]">Arogya</h1>
                    </div>
                    
                    <div className="mb-6 sm:mb-8">
                        <h3 className="font-bold text-xl sm:text-2xl text-gray-900 mb-2">Welcome back</h3>
                        <p className="text-gray-600 text-sm sm:text-base">Please select your portal and enter your credentials.</p>
                    </div>
                    
                    <div className="flex bg-gray-100 p-1.5 rounded-lg mb-6 sm:mb-8">
                        <button
                            type="button"
                            onClick={() => handleLoginTypeChange('staff')}
                            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                loginType === 'staff'
                                    ? 'bg-white text-[#007a8a] shadow-sm font-bold'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <span className="material-symbols-outlined text-lg sm:text-[20px]">medical_services</span>
                            <span className="hidden xs:inline">Staff</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleLoginTypeChange('patient')}
                            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                loginType === 'patient'
                                    ? 'bg-white text-[#007a8a] shadow-sm font-bold'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <span className="material-symbols-outlined text-lg sm:text-[20px]">person</span>
                            <span className="hidden xs:inline">Patient</span>
                        </button>
                    </div>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">error</span>
                                {error}
                            </p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 flex-grow">
                        {loginType === 'staff' ? (
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" htmlFor="identifier">
                                    Staff ID
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-[#007a8a] transition-colors">badge</span>
                                    <input
                                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm sm:text-base"
                                        id="identifier"
                                        name="identifier"
                                        type="text"
                                        placeholder="e.g. STF-99482"
                                        value={formData.identifier}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        ) : (
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
                                        placeholder="patient@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        )}
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="password">
                                    Password
                                </label>
                                <a className="text-xs font-medium text-[#007a8a] hover:text-[#005f6c] transition-colors" href="#">
                                    Forgot Password?
                                </a>
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
                        
                        <div className="flex items-center gap-3 py-1">
                            <input
                                className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-[#007a8a] focus:ring-[#007a8a] cursor-pointer"
                                id="remember"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label className="text-sm text-gray-600 select-none cursor-pointer" htmlFor="remember">
                                Keep me logged in on this device
                            </label>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-login-gradient text-white py-3 sm:py-4 px-6 rounded-lg font-bold text-sm sm:text-base shadow-lg shadow-[#007a8a]/20 hover:shadow-xl hover:shadow-[#007a8a]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    Access Portal
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>
                    
                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100">
                        <p className="text-sm text-center text-gray-600">
                            New patient to our network?{' '}
                            <a
                                className="text-[#007a8a] font-bold hover:underline decoration-2 underline-offset-4"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/signup');
                                }}
                            >
                                Patient Signup
                            </a>
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
                            <a className="text-xs sm:text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors" href="#">Emergency Support</a>
                            <a className="text-xs sm:text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors" href="#">Privacy Policy</a>
                            <a className="text-xs sm:text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors" href="#">Compliance</a>
                        </div>
                    </div>
                </section>
            </main>
            
            <div className="fixed top-0 right-0 w-1/3 h-screen bg-[#f0f7f9] -z-10 clip-diagonal hidden xl:block"></div>
        </div>
    );
};

export default Login;
