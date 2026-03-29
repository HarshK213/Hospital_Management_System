import React, { useState } from 'react';

const ChangeAppointmentStatus = () => {
  const [appointmentId, setAppointmentId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleStatusChange = async () => {
    if (!appointmentId.trim()) {
      setError('Please enter an appointment ID');
      return;
    }

    if (!newStatus) {
      setError('Please select a new status');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulate API call to change appointment status
      // In a real app, you would make an API request to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      setSuccess(`Appointment ${appointmentId} status updated to ${newStatus}`);
      setAppointmentId('');
      setNewStatus('');
    } catch (err) {
      setError('Failed to update appointment status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Change Appointment Status</h2>
        
        {success && (
          <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-md text-green-600 text-sm mb-6">
            {success}
          </div>
        )}
        
        {error && (
          <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm mb-6">
            {error}
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Appointment ID</label>
            <input
              type="text"
              value={appointmentId}
              onChange={(e) => setAppointmentId(e.target.value)}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                error ? 'border-red-500' : ''
              }`}
              placeholder="Enter appointment ID"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">New Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                error && !newStatus ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select new status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="No Show">No Show</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleStatusChange}
              disabled={loading}
              className={`bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Updating...' : 'Update Status'}
            </button>
          </div>
          
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral mb-4">Status Information</h3>
            <p className="text-neutral-600">
              Use this form to update the status of any appointment in the system.
              Enter the appointment ID and select the new status from the dropdown.
            </p>
            <p className="text-neutral-500 mt-2">
              Common statuses: Scheduled, Confirmed, Completed, Cancelled, No Show, Rescheduled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAppointmentStatus;