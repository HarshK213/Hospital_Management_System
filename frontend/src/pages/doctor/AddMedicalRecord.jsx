import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { doctorService } from '../../services/doctorService';

const AddMedicalRecord = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await doctorService.addMedicalRecord(data.patientId, {
        diagnosis: data.diagnosis,
        prescription: data.prescription,
        notes: data.notes
      });

      setSuccess('Medical record added successfully!');
      reset();
    } catch (err) {
      setError(err.message || 'Failed to add medical record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Add Medical Record</h2>
          <p className="text-gray-500 text-sm mt-1">Enter patient details and medical information</p>
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
              Patient ID <span className="text-red-500">*</span>
            </label>
            <input
              {...register('patientId', { required: 'Patient ID is required' })}
              type="text"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                errors.patientId ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter patient ID"
            />
            {errors.patientId && (
              <p className="mt-1 text-xs text-red-500">{errors.patientId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Diagnosis <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('diagnosis', { required: 'Diagnosis is required' })}
              rows={3}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm resize-none ${
                errors.diagnosis ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter diagnosis details..."
            />
            {errors.diagnosis && (
              <p className="mt-1 text-xs text-red-500">{errors.diagnosis.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Prescription <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('prescription', { required: 'Prescription is required' })}
              rows={3}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm resize-none ${
                errors.prescription ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter prescription details..."
            />
            {errors.prescription && (
              <p className="mt-1 text-xs text-red-500">{errors.prescription.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Notes
            </label>
            <textarea
              {...register('notes')}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm resize-none"
              placeholder="Additional notes and observations..."
            />
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
                  <span>Adding Record...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">save</span>
                  <span>Add Medical Record</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicalRecord;
