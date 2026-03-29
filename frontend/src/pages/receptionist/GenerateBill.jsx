import React from 'react';
import { useForm } from 'react-hook-form';

const GenerateBill = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Bill generation data:', data);
    // In a real app, you would send this data to your backend API
    alert('Bill generated successfully!');
    reset();
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Generate Patient Bill</h2>
        
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Bill Date</label>
              <input
                type="date"
                {...register('date', {
                  required: 'Please select a date'
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.date ? 'border-red-500' : ''
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Due Date</label>
              <input
                type="date"
                {...register('dueDate', {
                  required: 'Please select a due date'
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.dueDate ? 'border-red-500' : ''
                }`}
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Description</label>
            <input
              {...register('description', {
                required: 'Please provide a description'
              })}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.description ? 'border-red-500' : ''
              }`}
              placeholder="Enter bill description (e.g., Consultation, Surgery, Lab Tests)"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Amount ($)</label>
              <input
                type="number"
                {...register('amount', {
                  required: 'Please enter an amount',
                  min: {
                    value: 0.01,
                    message: 'Amount must be greater than 0'
                  }
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.amount ? 'border-red-500' : ''
                }`}
                placeholder="0.00"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Tax Rate (%)</label>
              <input
                type="number"
                {...register('taxRate', {
                  value: 0, // Default value
                  min: 0,
                  max: 100
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.taxRate ? 'border-red-500' : ''
                }`}
                placeholder="0"
              />
              {errors.taxRate && (
                <p className="text-red-500 text-sm mt-1">{errors.taxRate.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral">
              <input
                {...register('isInsuranceClaim', { type: 'checkbox' })}
                className="h-4 w-4 text-primary border-neutral-300 rounded"
              />
              Insurance Claim
            </label>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 flex items-center gap-2"
            >
              Generate Bill
            </button>
            <button
              type="button"
              onClick={reset}
              className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-medium px-6 py-3 rounded-md transition-colors duration-200"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateBill;