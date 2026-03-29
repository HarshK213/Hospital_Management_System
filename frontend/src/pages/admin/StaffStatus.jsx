import React, { useState } from 'react';

const StaffStatus = () => {
  const [staffId, setStaffId] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckStatus = async () => {
    if (!staffId.trim()) {
      setError('Please enter a staff ID');
      return;
    }

    setLoading(true);
    setError('');
    setStatus(null);
    
    try {
      // Simulate API call to check staff status
      // In a real app, you would make an API request to your backend
      // For now, we'll mock a response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - in reality this would come from your API
      const mockStatus = {
        id: staffId,
        name: `Staff Member ${staffId}`,
        role: ['Doctor', 'Nurse', 'Receptionist', 'Admin'][Math.floor(Math.random() * 4)],
        department: ['Cardiology', 'Pediatrics', 'Emergency', 'Surgery'][Math.floor(Math.random() * 4)],
        status: ['Active', 'On Leave', 'Training'][Math.floor(Math.random() * 3)],
        lastLogin: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toLocaleDateString()
      };
      
      setStatus(mockStatus);
    } catch (err) {
      setError('Failed to fetch staff status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Staff Status Check</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Staff ID</label>
            <input
              type="text"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                error ? 'border-red-500' : ''
              }`}
              placeholder="Enter staff ID to check status"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleCheckStatus}
              disabled={loading}
              className={`bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </div>
          
          {status && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-neutral mb-4">Staff Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Name:</span>
                  <span className="font-medium">{status.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">ID:</span>
                  <span className="font-mono">{status.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Role:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status.role === 'Doctor' ? 'bg-secondary/20 text-secondary' :
                    status.role === 'Nurse' ? 'bg-tertiary/20 text-tertiary' :
                    status.role === 'Receptionist' ? 'bg-neutral/20 text-neutral' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {status.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Department:</span>
                  <span className="font-medium">{status.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status.status === 'Active' ? 'bg-green-100 text-green-800' :
                    status.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {status.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Last Login:</span>
                  <span className="font-medium">{status.lastLogin}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffStatus;