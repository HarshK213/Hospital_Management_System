import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { patientService } from '../../services/patientService';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingDoctors, setFetchingDoctors] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setFetchingDoctors(true);
    try {
      const response = await patientService.getDoctors();
      setDoctors(response.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
    } finally {
      setFetchingDoctors(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await patientService.bookAppointment({
        doctorId: data.doctorId,
        date: data.date,
        time: data.time,
        reason: data.reason
      });

      setSuccess('Appointment booked successfully!');
      reset();
    } catch (err) {
      setError(err.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Book Appointment</h2>
          <p className="text-gray-500 text-sm mt-1">Schedule a new appointment with a doctor</p>
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
              Select Doctor <span className="text-red-500">*</span>
            </label>
            {fetchingDoctors ? (
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Loading doctors...
              </div>
            ) : (
              <select
                {...register('doctorId', { required: 'Please select a doctor' })}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                  errors.doctorId ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.fullname} {doctor.about ? `- ${doctor.about.substring(0, 50)}${doctor.about.length > 50 ? '...' : ''}` : ''}
                  </option>
                ))}
              </select>
            )}
            {errors.doctorId && (
              <p className="mt-1 text-xs text-red-500">{errors.doctorId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              {...register('date', { required: 'Date is required' })}
              type="date"
              min={today}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                errors.date ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Time <span className="text-red-500">*</span>
            </label>
            <input
              {...register('time', { required: 'Time is required' })}
              type="time"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                errors.time ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {errors.time && (
              <p className="mt-1 text-xs text-red-500">{errors.time.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Reason for Visit <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('reason', { required: 'Please provide a reason for your visit' })}
              rows={3}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm resize-none ${
                errors.reason ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Describe the reason for your appointment..."
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || fetchingDoctors}
              className="w-full bg-[#007a8a] hover:bg-[#005f6c] text-white py-3 px-6 rounded-lg font-semibold text-sm shadow-lg shadow-[#007a8a]/20 hover:shadow-xl hover:shadow-[#007a8a]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                  <span>Booking...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">calendar_month</span>
                  <span>Book Appointment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
