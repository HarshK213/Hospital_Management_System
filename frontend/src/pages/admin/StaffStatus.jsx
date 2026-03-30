import React, { useState } from 'react';
import { adminService } from '../../services/adminService';

const StaffStatus = () => {
  const [userId, setUserId] = useState('');
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setError('Please enter a staff ID');
      return;
    }

    setLoading(true);
    setSearchLoading(true);
    setError('');
    setSuccess('');
    setStaff(null);

    try {
      const response = await adminService.getStaffByUserId(userId.trim());
      setStaff(response.data.data);
    } catch (err) {
      setError(err.message || 'Staff not found');
      setStaff(null);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!staff) return;

    if (!window.confirm(`Are you sure you want to delete ${staff.fullname}?`)) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await adminService.deleteStaff(staff._id);
      setSuccess('Staff deleted successfully');
      setStaff(null);
      setUserId('');
    } catch (err) {
      setError(err.message || 'Failed to delete staff');
    } finally {
      setLoading(false);
    }
  };

  const roleColors = {
    Doctor: 'bg-blue-100 text-blue-700',
    Admin: 'bg-purple-100 text-purple-700',
    Receptionist: 'bg-green-100 text-green-700',
    Nurse: 'bg-orange-100 text-orange-700'
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Staff Status</h2>
          <p className="text-gray-500 text-sm mt-1">Search for a staff member by their ID</p>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  setError('');
                }}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                  error ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Enter Staff ID (e.g., DOC-Joh-1234)"
              />
            </div>
            <button
              type="submit"
              disabled={searchLoading}
              className="bg-[#007a8a] hover:bg-[#005f6c] text-white px-6 py-3 rounded-lg font-semibold text-sm shadow-lg shadow-[#007a8a]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {searchLoading ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined">search</span>
              )}
              <span>Search</span>
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </p>
          )}
        </form>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              {success}
            </p>
          </div>
        )}

        {staff && (
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#007a8a] flex items-center justify-center text-white font-bold text-lg">
                  {staff.fullname?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{staff.fullname}</h3>
                  <p className="text-gray-500 text-sm">{staff.user_id}</p>
                  <span className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[staff.role] || 'bg-gray-100 text-gray-700'}`}>
                    {staff.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm text-gray-900">{staff.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm text-gray-900">{staff.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">About</p>
                <p className="text-sm text-gray-700">{staff.about}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined">delete</span>
                )}
                <span>Delete Staff</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffStatus;
