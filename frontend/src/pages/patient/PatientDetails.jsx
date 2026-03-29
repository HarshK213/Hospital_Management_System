import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const PatientDetails = () => {
  const { user } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch medical history report for the logged-in patient
  useEffect(() => {
    const fetchReport = async () => {
      if (!user || user.role !== 'patient') {
        setError('Unauthorized access');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      
      try {
        // Simulate API call to fetch medical history report
        // In a real app, you would make an API request to your backend with the patient ID
        // For now, we'll mock a response using the patient's ID from the auth context
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock response - in reality this would come from your API
        const mockReport = {
          patientId: user.id, // Using the user.id from auth (which is email in our mock, but should be patient ID in real app)
          patientName: `Patient ${user.id}`,
          age: Math.floor(Math.random() * 80) + 1,
          gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)],
          bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'][Math.floor(Math.random() * 8)],
          height: `${Math.floor(Math.random() * 30) + 140} cm`,
          weight: `${Math.floor(Math.random() * 50) + 40} kg`,
          allergies: ['None', 'Penicillin', 'Peanuts', 'Latex'][Math.floor(Math.random() * 4)],
          chronicConditions: ['None', 'Diabetes', 'Hypertension', 'Asthma'][Math.floor(Math.random() * 4)],
          lastVisit: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          visitHistory: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
            date: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            doctor: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`,
            department: ['Cardiology', 'Pediatrics', 'Emergency', 'Surgery', 'Neurology'][Math.floor(Math.random() * 5)],
            diagnosis: ['Hypertension', 'Diabetes Type 2', 'Migraine', 'Bronchitis', 'Fracture'][Math.floor(Math.random() * 5)],
            prescription: ['Metformin 500mg', 'Lisinopril 10mg', 'Ibuprofen 400mg', 'Amoxicillin 500mg', 'None'][Math.floor(Math.random() * 5)]
          }))
        };
        
        setReport(mockReport);
      } catch (err) {
        setError('Failed to fetch medical report. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [user]);

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">My Medical History</h2>
        
        {loading && (
          <div className="text-neutral-500 text-center py-8">
            Loading your medical history...
          </div>
        )}
        
        {error && (
          <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm mb-6">
            {error}
          </div>
        )}
        
        {report && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-neutral mb-4">Medical History Report</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-neutral-600">Patient Name:</p>
                <p className="font-medium text-neutral">{report.patientName}</p>
              </div>
              <div>
                <p className="text-neutral-600">Patient ID:</p>
                <p className="font-mono text-neutral">{report.patientId}</p>
              </div>
              <div>
                <p className="text-neutral-600">Age:</p>
                <p className="font-medium text-neutral">{report.age}</p>
              </div>
              <div>
                <p className="text-neutral-600">Gender:</p>
                <p className="font-medium text-neutral">{report.gender}</p>
              </div>
              <div>
                <p className="text-neutral-600">Blood Group:</p>
                <p className="font-medium text-neutral">{report.bloodGroup}</p>
              </div>
              <div>
                <p className="text-neutral-600">Height:</p>
                <p className="font-medium text-neutral">{report.height}</p>
              </div>
              <div>
                <p className="text-neutral-600">Weight:</p>
                <p className="font-medium text-neutral">{report.weight}</p>
              </div>
              <div>
                <p className="text-neutral-600">Allergies:</p>
                <p className="font-medium text-neutral">{report.allergies}</p>
              </div>
              <div>
                <p className="text-neutral-600">Chronic Conditions:</p>
                <p className="font-medium text-neutral">{report.chronicConditions}</p>
              </div>
              <div>
                <p className="text-neutral-600">Last Visit:</p>
                <p className="font-medium text-neutral">{report.lastVisit}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-neutral mb-2">Visit History</h4>
              {report.visitHistory.length > 0 ? (
                <div className="space-y-3">
                  {report.visitHistory.map((visit, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-neutral">{visit.date}</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">{visit.department}</span>
                      </div>
                      <p className="text-neutral-600"><strong>Doctor:</strong> {visit.doctor}</p>
                      <p className="text-neutral-600"><strong>Diagnosis:</strong> {visit.diagnosis}</p>
                      <p className="text-neutral-600"><strong>Prescription:</strong> {visit.prescription}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-center py-4">No visit history available.</p>
              )}
            </div>
          </div>
        )}
        
        {!loading && !error && !report && (
          <p className="text-neutral-500 text-center py-8">No medical history data available.</p>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;