import React from 'react';
import { useForm } from 'react-hook-form';

const AddPatient = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Patient data:', data);
    // In a real app, you would send this data to your backend API
    alert('Patient added successfully!');
    reset();
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Add New Patient</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">First Name</label>
              <input
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters'
                  }
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.firstName ? 'border-red-500' : ''
                }`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Last Name</label>
              <input
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters'
                  }
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.lastName ? 'border-red-500' : ''
                }`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Date of Birth</label>
              <input
                type="date"
                {...register('dob', {
                  required: 'Date of birth is required'
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.dob ? 'border-red-500' : ''
                }`}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Gender</label>
              <select
                {...register('gender', {
                  required: 'Gender is required'
                })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Phone Number</label>
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\+?[\d\s-]+$/,
                    message: 'Enter a valid phone number'
                  }
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? 'border-red-500' : ''
                }`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Enter a valid email address'
                  }
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Address</label>
            <textarea
              {...register('address', {
                required: 'Address is required'
              })}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32 ${
                errors.address ? 'border-red-500' : ''
              }`}
              placeholder="Enter full address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Emergency Contact Name</label>
              <input
                {...register('emergencyContactName', {
                  required: 'Emergency contact name is required'
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.emergencyContactName ? 'border-red-500' : ''
                }`}
                placeholder="Enter emergency contact name"
              />
              {errors.emergencyContactName && (
                <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Emergency Contact Phone</label>
              <input
                type="tel"
                {...register('emergencyContactPhone', {
                  required: 'Emergency contact phone is required',
                  pattern: {
                    value: /^\+?[\d\s-]+$/,
                    message: 'Enter a valid phone number'
                  }
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.emergencyContactPhone ? 'border-red-500' : ''
                }`}
                placeholder="Enter emergency contact phone"
              />
              {errors.emergencyContactPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral">
              <input
                {...register('isActive', { type: 'checkbox' })}
                className="h-4 w-4 text-primary border-neutral-300 rounded"
              />
              Active Status
            </label>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 flex items-center gap-2"
            >
              Add Patient
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

export default AddPatient;