import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { adminService } from '../../services/adminService';

const AddStaff = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await adminService.addStaff({
        fullname: data.fullName,
        email: data.email,
        phone: data.phone,
        about: data.aboutMe,
        role: data.role
      });

      setSuccess(`Staff added successfully! User ID: ${response.data.data.user_id}`);
      reset();
    } catch (err) {
      setError(err.message || 'Failed to add staff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Add New Staff</h2>
          <p className="text-gray-500 text-sm mt-1">Fill in the details to add a new staff member</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              {success}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('fullName', { required: 'Full name is required' })}
              type="text"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                errors.fullName ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                errors.email ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="staff@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone must be 10 digits'
                }
              })}
              type="tel"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                errors.phone ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="1234567890"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              About Me <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('aboutMe', { required: 'About me is required' })}
              rows={4}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm resize-none ${
                errors.aboutMe ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Brief description about the staff member..."
            />
            {errors.aboutMe && (
              <p className="mt-1 text-xs text-red-500">{errors.aboutMe.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              {...register('role', { required: 'Role is required' })}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                errors.role ? 'border-red-300' : 'border-gray-200'
              }`}
            >
              <option value="">Select a role</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
              <option value="Receptionist">Receptionist</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#007a8a] hover:bg-[#005f6c] text-white py-3 px-6 rounded-lg font-semibold text-sm shadow-lg shadow-[#007a8a]/20 hover:shadow-xl hover:shadow-[#007a8a]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                  <span>Adding Staff...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">person_add</span>
                  <span>Add Staff</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
