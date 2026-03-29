import React, { useState } from 'react';

const DoctorPatientDetails = () => {
  const [patientId, setPatientId] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleViewDetails = async () => {
    if (!patientId.trim()) {
      setError('Please enter a patient ID');
      return;
    }

    setLoading(true);
    setError('');
    setPatientDetails(null);
    
    try {
      // Simulate API call to fetch patient details
      // In a real app, you would make an API request to your backend
      // For now, we'll mock a response
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock response - in reality this would come from your API
      const mockDetails = {
        patientId: patientId,
        name: `Patient ${patientId}`,
        age: Math.floor(Math.random() * 90) + 1,
        gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)],
        contact: `+1-555-${Math.floor(Math.random() * 9000).toString().padStart(4, '0')}`,
        email: `patient${patientId}@example.com`,
        address: `${Math.floor(Math.random() * 9999)} Medical Street, Health City`,
        bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'][Math.floor(Math.random() * 8)],
        height: `${Math.floor(Math.random() * 30) + 140} cm`,
        weight: `${Math.floor(Math.random() * 50) + 40} kg`,
        allergies: ['None', 'Penicillin', 'Peanuts', 'Latex', 'Shellfish'][Math.floor(Math.random() * 5)],
        chronicConditions: ['None', 'Diabetes', 'Hypertension', 'Asthma', 'Arthritis'][Math.floor(Math.random() * 5)],
        primaryPhysician: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Davis'][Math.floor(Math.random() * 6)]}`,
        lastVisit: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        emergencyContact: {
          name: `Emergency Contact ${patientId}`,
          relation: ['Spouse', 'Parent', 'Sibling', 'Child', 'Friend'][Math.floor(Math.random() * 5)],
          phone: `+1-555-${Math.floor(Math.random() * 9000).toString().padStart(4, '0')}`
        }
      };
      
      setPatientDetails(mockDetails);
    } catch (err) {
      setError('Failed to fetch patient details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Patient Details</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Patient ID</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                error ? 'border-red-500' : ''
              }`}
              placeholder="Enter patient ID to view details"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleViewDetails}
              disabled={loading}
              className={`bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Fetching Details...' : 'View Details'}
            </button>
          </div>
          
          {patientDetails && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-neutral mb-4">Patient Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-neutral-600">Name:</p>
                  <p className="font-medium text-neutral">{patientDetails.name}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Patient ID:</p>
                  <p className="font-mono text-neutral">{patientDetails.patientId}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Age:</p>
                  <p className="font-medium text-neutral">{patientDetails.age}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Gender:</p>
                  <p className="font-medium text-neutral">{patientDetails.gender}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Contact:</p>
                  <p className="font-medium text-neutral">{patientDetails.contact}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Email:</p>
                  <p className="font-medium text-neutral break-all">{patientDetails.email}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Blood Group:</p>
                  <p className="font-medium text-neutral">{patientDetails.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Height:</p>
                  <p className="font-medium text-neutral">{patientDetails.height}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Weight:</p>
                  <p className="font-medium text-neutral">{patientDetails.weight}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Address:</p>
                  <p className="font-medium text-neutral break-all">{patientDetails.address}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Allergies:</p>
                  <p className="font-medium text-neutral">{patientDetails.allergies}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Chronic Conditions:</p>
                  <p className="font-medium text-neutral">{patientDetails.chronicConditions}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Primary Physician:</p>
                  <p className="font-medium text-neutral">{patientDetails.primaryPhysician}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Last Visit:</p>
                  <p className="font-medium text-neutral">{patientDetails.lastVisit}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-neutral mb-2">Emergency Contact</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Name:</span>
                    <span className="font-medium">{patientDetails.emergencyContact.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Relation:</span>
                    <span className="font-medium">{patientDetails.emergencyContact.relation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Phone:</span>
                    <span className="font-medium">{patientDetails.emergencyContact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDetails;