import React from 'react';
import { useForm } from 'react-hook-form';

const PatientBookAppointment = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Appointment booking data:', data);
    // In a real app, you would send this data to your backend API
    alert('Appointment booked successfully!');
    reset();
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Book Appointment</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Appointment Type</label>
            <select
              {...register('type', {
                required: 'Please select an appointment type'
              })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select appointment type</option>
              <option value="Check-up">General Check-up</option>
              <option value="Follow-up">Follow-up Visit</option>
              <option value="Consultation">Specialist Consultation</option>
              <option value="Procedure">Medical Procedure</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Preferred Date</label>
            <input
              type="date"
              {...register('date', {
                required: 'Please select a date',
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return selectedDate >= today || 'Date must be today or in the future';
                }
              })}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.date ? 'border-red-500' : ''
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Preferred Time</label>
              <input
                type="time"
                {...register('time', {
                  required: 'Please select a time'
                })}
                className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.time ? 'border-red-500' : ''
                }`}
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Department</label>
              <select
                {...register('department', {
                  required: 'Please select a department'
                })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Emergency">Emergency</option>
                <option value="Surgery">Surgery</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Reason for Visit</label>
            <textarea
              {...register('reason', {
                required: 'Please provide a reason for your visit'
              })}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32 ${
                errors.reason ? 'border-red-500' : ''
              }`}
              placeholder="Briefly describe your symptoms or reason for visit"
            />
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 flex items-center gap-2"
            >
              Book Appointment
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

export default PatientBookAppointment;