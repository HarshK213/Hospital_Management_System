import React from 'react';
import { useForm } from 'react-hook-form';

const AddMedicalRecord = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Medical record data:', data);
    // In a real app, you would send this data to your backend API
    alert('Medical record added successfully!');
    reset();
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Add Medical Record</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Patient ID</label>
            <input
              {...register('patientId', {
                required: 'Patient ID is required'
              })}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.patientId ? 'border-red-500' : ''
              }`}
              placeholder="Enter patient ID"
            />
            {errors.patientId && (
              <p className="text-red-500 text-sm mt-1">{errors.patientId.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Medical Notes</label>
            <textarea
              {...register('notes', {
                required: 'Medical notes are required'
              })}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32 ${
                errors.notes ? 'border-red-500' : ''
              }`}
              placeholder="Enter medical notes, observations, or treatment details"
            />
            {errors.notes && (
              <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 flex items-center gap-2"
            >
              Add Medical Record
            </button>
            <button
              type="button"
              onClick={reset}
              className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-medium px-6 py-3 rounded-md transition-colors duration-200"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicalRecord;