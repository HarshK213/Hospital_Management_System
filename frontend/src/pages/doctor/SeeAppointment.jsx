import React, { useState, useEffect } from 'react';
import { doctorService } from '../../services/doctorService';

const SeeAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('calendar');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await doctorService.getAppointments({});
      setAppointments(response.data.data || []);
      console.log(response);
    } catch (err) {
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    return time;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    const startPadding = firstDay.getDay();
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date).toDateString();
      return aptDate === date.toDateString();
    });
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonth = new Date(selectedDate);
  const days = getDaysInMonth(selectedDate);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  const today = new Date().toDateString();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Appointments</h2>
            <p className="text-gray-500 text-sm mt-1">View your scheduled appointments</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'calendar' 
                  ? 'bg-[#007a8a] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'list' 
                  ? 'bg-[#007a8a] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#007a8a] focus:border-transparent"
          />
          <button
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            className="text-sm text-[#007a8a] hover:text-[#005f6c] font-medium"
          >
            Today
          </button>
        </div>

        {viewMode === 'calendar' ? (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-7 bg-gray-50">
              {daysOfWeek.map(day => (
                <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                const dayAppointments = day ? getAppointmentsForDate(day) : [];
                const isToday = day && day.toDateString() === today;
                const isSelected = day && day.toISOString().split('T')[0] === selectedDate;
                
                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border-b border-r border-gray-100 ${
                      day ? 'cursor-pointer hover:bg-gray-50' : 'bg-gray-50'
                    } ${isSelected ? 'bg-[#007a8a]/5' : ''}`}
                    onClick={() => day && setSelectedDate(day.toISOString().split('T')[0])}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${
                          isToday ? 'w-7 h-7 bg-[#007a8a] text-white rounded-full flex items-center justify-center' : 'text-gray-700'
                        }`}>
                          {day.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayAppointments.slice(0, 2).map((apt, i) => (
                            <div
                              key={apt._id || i}
                              className={`text-xs px-1.5 py-1 rounded truncate ${getStatusColor(apt.status)}`}
                              title={`${formatTime(apt.time)} - ${apt.patient_id?.fullname}`}
                            >
                              {formatTime(apt.time)} {apt.patient_id?.fullname?.split(' ')[0]}
                            </div>
                          ))}
                          {dayAppointments.length > 2 && (
                            <div className="text-xs text-gray-500 px-1.5">
                              +{dayAppointments.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-4xl animate-spin text-[#007a8a]">progress_activity</span>
                <p className="text-gray-500 mt-2">Loading appointments...</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <span className="material-symbols-outlined text-5xl mb-3">event_busy</span>
                <p className="text-lg font-medium">No Appointments</p>
                <p className="text-sm">No appointments scheduled for this date</p>
              </div>
            ) : (
              appointments.map((apt) => (
                <div key={apt._id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#007a8a] flex items-center justify-center text-white font-bold">
                        {apt.patient_id?.fullname?.charAt(0).toUpperCase() || 'P'}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{apt.patient_id?.fullname || 'Unknown Patient'}</h4>
                        <p className="text-sm text-gray-500">{apt.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{formatTime(apt.time)}</p>
                        <p className="text-xs text-gray-500">{formatDate(apt.date)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Contact</p>
                      <p className="text-sm text-gray-900">{apt.patient_id?.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                      <p className="text-sm text-gray-900">{apt.patient_id?.email || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
            <span className="text-sm text-gray-600">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="text-sm text-gray-600">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeAppointment;
