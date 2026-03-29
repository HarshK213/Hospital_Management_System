import React, { useState } from 'react';

const SeeAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock function to fetch appointments for a given date
  const fetchAppointments = async (date) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data: generate some random appointments for the selected date
      const mockAppointments = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
        id: i + 1,
        time: `${Math.floor(Math.random() * 12) + 9}:${Math.floor(Math.random() * 2) * 30}`
          .toString()
          .padStart(5, '0') , // 9:00, 9:30, 10:00, etc. up to 17:00
        patientName: `Patient ${Math.floor(Math.random() * 100) + 1}`,
        patientId: `PID${Math.floor(Math.random() * 1000) + 1}`,
        type: ['Check-up', 'Follow-up', 'Consultation', 'Procedure'][Math.floor(Math.random() * 4)],
        department: ['Cardiology', 'Pediatrics', 'Emergency', 'Surgery', 'Neurology'][Math.floor(Math.random() * 5)],
        status: ['Scheduled', 'Completed', 'Cancelled'][Math.floor(Math.random() * 3)],
        notes: ['Initial consultation', 'Routine check', 'Post-op follow-up', 'New symptoms'][Math.floor(Math.random() * 4)]
      }));
      
      setAppointments(mockAppointments);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments for the initial date
  React.useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setSelectedDate(date);
    fetchAppointments(date);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">My Appointments</h2>
        
        <div className="space-y-6">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
              className={`w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            />
          </div>
          
          {/* Appointments List */}
          <div>
            <h3 className="text-xl font-semibold text-neutral mb-4">
              Appointments for {selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
            
            {loading ? (
              <p className="text-neutral-500 text-center py-8">Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <p className="text-neutral-500 text-center py-8">No appointments scheduled for this date.</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral">{appointment.patientName}</h4>
                        <p className="text-neutral-600 text-sm">ID: {appointment.patientId}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">{appointment.time}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'Scheduled' ? 'bg-primary/20 text-primary' :
                          appointment.status === 'Completed' ? 'bg-green-200 text-green-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                      <div>
                        <p className="text-neutral-600">Type:</p>
                        <p className="font-medium text-neutral">{appointment.type}</p>
                      </div>
                      <div>
                        <p className="text-neutral-600">Department:</p>
                        <p className="font-medium text-neutral">{appointment.department}</p>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="bg-neutral-50 p-3 rounded">
                        <p className="text-neutral-600"><strong>Notes:</strong> {appointment.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeAppointment;