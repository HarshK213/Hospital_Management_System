import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { patientService } from '../../services/patientService';

const PatientDetails = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      phone: user?.phone || '',
    }
  });

  const handleCancel = () => {
    setIsEditing(false);
    reset({ phone: user?.phone || '' });
    setError('');
    setSuccess('');
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updateData = {};
      if (data.phone && data.phone !== user?.phone) {
        updateData.phone = data.phone;
      }
      if (data.newPassword) {
        if (data.newPassword !== data.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        updateData.password = data.newPassword;
      }

      if (Object.keys(updateData).length === 0) {
        setError('No changes to update');
        setLoading(false);
        return;
      }

      const response = await patientService.updateUser(updateData);
      const updatedPatient = response.data?.data || response.data;
      
      updateUser(updatedPatient);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      reset({ phone: updatedPatient.phone || '' });
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Profile</h2>
            <p className="text-gray-500 text-sm mt-1">View and manage your personal information</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#007a8a] hover:bg-[#005f6c] text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
              Edit
            </button>
          )}
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

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-[#007a8a] flex items-center justify-center text-white font-bold text-3xl">
              {user?.fullname?.charAt(0).toUpperCase() || 'P'}
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">{user?.fullname || 'Patient'}</h3>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <span className="inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                Patient
              </span>
            </div>
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Full Name</p>
                <p className="text-sm font-medium text-gray-900">{user?.fullname || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900">{user?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm font-medium text-gray-900">{user?.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Username</p>
                <p className="text-sm font-medium text-gray-900">{user?.username || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Created</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(user?.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Verification Status</p>
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                  user?.isVerified 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {user?.isVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.fullname || ''}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 text-sm cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-400">Name cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 text-sm cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  {...register('phone', { 
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone must be 10 digits'
                    }
                  })}
                  type="tel"
                  placeholder="Enter phone number"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                    errors.phone ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-5 mt-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Change Password (Optional)</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      New Password
                    </label>
                    <input
                      {...register('newPassword', {
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        }
                      })}
                      type="password"
                      placeholder="Enter new password"
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                        errors.newPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    {errors.newPassword && (
                      <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#007a8a] hover:bg-[#005f6c] text-white py-3 px-6 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">save</span>
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
