import React, { useState } from 'react';
import { receptionistService } from '../../services/receptionistService';

const ViewPatientDetails = () => {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!patientId.trim()) {
      setError('Please enter a patient ID');
      return;
    }

    setLoading(true);
    setSearchLoading(true);
    setError('');
    setPatient(null);

    try {
      const response = await receptionistService.getPatientProfile(patientId.trim());
      setPatient(response.data?.data);
    } catch (err) {
      setError(err.message || 'Patient not found');
    } finally {
      setLoading(false);
      setSearchLoading(false);
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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Patient Details</h2>
          <p className="text-gray-500 text-sm mt-1">Search for a patient by their ID to view details</p>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={patientId}
                onChange={(e) => {
                  setPatientId(e.target.value);
                  setError('');
                }}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                  error ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Enter Patient ID"
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

        {patient && (
          <>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-[#007a8a] flex items-center justify-center text-white font-bold text-2xl">
                  {patient.fullname?.charAt(0).toUpperCase() || 'P'}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{patient.fullname}</h3>
                  <p className="text-gray-500 text-sm">{patient.email}</p>
                  <span className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    patient.isVerified 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {patient.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm text-gray-900">{patient.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-sm text-gray-900">{patient.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Username</p>
                  <p className="text-sm text-gray-900">{patient.username || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Registered On</p>
                  <p className="text-sm text-gray-900">{formatDate(patient.createdAt)}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewPatientDetails;
