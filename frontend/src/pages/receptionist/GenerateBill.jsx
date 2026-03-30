import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { receptionistService } from '../../services/receptionistService';

const GenerateBill = () => {
  const [patient, setPatient] = useState(null);
  const [searchingPatient, setSearchingPatient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [billGenerated, setBillGenerated] = useState(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

  const patientUsername = watch('patientUsername');

  React.useEffect(() => {
    if (patientUsername && patientUsername.length >= 3) {
      const timeoutId = setTimeout(() => searchPatient(patientUsername), 500);
      return () => clearTimeout(timeoutId);
    } else {
      setPatient(null);
    }
  }, [patientUsername]);

  const searchPatient = async (username) => {
    if (!username) return;
    
    setSearchingPatient(true);
    try {
      const response = await receptionistService.searchPatientByUsername(username);
      setPatient(response.data?.data);
      setValue('patientId', response.data?.data?._id);
      setError('');
    } catch (err) {
      setPatient(null);
      setValue('patientId', '');
    } finally {
      setSearchingPatient(false);
    }
  };

  const onSubmit = async (data) => {
    if (!patient) {
      setError('Please enter a valid patient username');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setBillGenerated(null);

    try {
      const response = await receptionistService.generateOPDBill({
        patientId: data.patientId,
        appointmentId: data.appointmentId || null,
        amount: parseFloat(data.amount),
        type: data.type
      });

      setBillGenerated(response.data?.data);
      setSuccess('Bill generated successfully!');
      reset();
      setPatient(null);
    } catch (err) {
      setError(err.message || 'Failed to generate bill');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const billTypes = [
    { value: 'consultation', label: 'Consultation' },
    { value: 'procedure', label: 'Procedure' },
    { value: 'laboratory', label: 'Laboratory' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Generate OPD Bill</h2>
          <p className="text-gray-500 text-sm mt-1">Create an outpatient department bill for a patient</p>
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
              Patient Username <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register('patientUsername', { required: 'Patient username is required' })}
                type="text"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                  errors.patientUsername ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Enter patient username"
              />
              {searchingPatient && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 animate-spin">
                  progress_activity
                </span>
              )}
            </div>
            {errors.patientUsername && (
              <p className="mt-1 text-xs text-red-500">{errors.patientUsername.message}</p>
            )}
            {patient && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">check_circle</span>
                <div>
                  <p className="text-sm font-medium text-green-800">{patient.fullname}</p>
                  <p className="text-xs text-green-600">{patient.email}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Bill Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register('type', { required: 'Bill type is required' })}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                errors.type ? 'border-red-300' : 'border-gray-200'
              }`}
            >
              <option value="">Select bill type</option>
              {billTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                {...register('amount', { 
                  required: 'Amount is required',
                  min: {
                    value: 0.01,
                    message: 'Amount must be greater than 0'
                  }
                })}
                type="number"
                step="0.01"
                className={`w-full pl-8 pr-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                  errors.amount ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-xs text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Appointment ID <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              {...register('appointmentId')}
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm"
              placeholder="Enter appointment ID if applicable"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !patient}
              className="w-full bg-[#007a8a] hover:bg-[#005f6c] text-white py-3 px-6 rounded-lg font-semibold text-sm shadow-lg shadow-[#007a8a]/20 hover:shadow-xl hover:shadow-[#007a8a]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">receipt_long</span>
                  <span>Generate Bill</span>
                </>
              )}
            </button>
          </div>
        </form>

        {billGenerated && (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#007a8a]">description</span>
              Generated Bill Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Bill ID</p>
                <p className="text-sm font-medium text-gray-900 truncate">{billGenerated._id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Amount</p>
                <p className="text-lg font-bold text-[#007a8a]">{formatCurrency(billGenerated.amount)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Type</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{billGenerated.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 capitalize">
                  {billGenerated.status}
                </span>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(billGenerated.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateBill;
