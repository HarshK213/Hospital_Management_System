import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

const AllStaff = () => {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    if (roleFilter === 'all') {
      setFilteredStaff(staff);
    } else {
      setFilteredStaff(staff.filter(s => s.role === roleFilter));
    }
  }, [roleFilter, staff]);

  const fetchStaff = async () => {
    try {
      const response = await adminService.getAllStaff();
      setStaff(response.data.data);
      setFilteredStaff(response.data.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch staff');
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      doctor: 'bg-blue-100 text-blue-700',
      receptionist: 'bg-purple-100 text-purple-700',
      admin: 'bg-green-100 text-green-700'
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'doctor': return 'medical_services';
      case 'receptionist': return 'support_agent';
      case 'admin': return 'admin_panel_settings';
      default: return 'person';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="material-symbols-outlined text-4xl animate-spin text-[#007a8a]">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">All Staff</h2>
          <p className="text-gray-500 text-sm mt-1">View and filter all staff members</p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'doctor', 'receptionist', 'admin'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  roleFilter === role
                    ? 'bg-[#007a8a] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </p>
          </div>
        )}

        {filteredStaff.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <span className="material-symbols-outlined text-5xl mb-2">group</span>
            <p>No staff found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredStaff.map((member) => (
              <div
                key={member._id}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[#007a8a] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">{getRoleIcon(member.role)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{member.fullname}</h3>
                  <p className="text-gray-500 text-sm">{member.email}</p>
                  {member.phone && (
                    <p className="text-gray-500 text-sm">{member.phone}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(member.role)}`}>
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStaff;