import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';

const PaymentHistory = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const billsRes = await patientService.getBills();
      setBills(billsRes.data?.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch bills');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Bills</h2>
          <p className="text-gray-500 text-sm mt-1">View your bills</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-5xl animate-spin text-[#007a8a]">progress_activity</span>
            <p className="text-gray-500 mt-3">Loading...</p>
          </div>
        ) : bills.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <span className="material-symbols-outlined text-5xl mb-3">receipt_long</span>
            <p className="text-lg font-medium">No Bills</p>
            <p className="text-sm">You don't have any bills yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill._id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      bill.status === 'paid' 
                        ? 'bg-green-100' 
                        : bill.status === 'pending'
                        ? 'bg-yellow-100'
                        : 'bg-gray-100'
                    }`}>
                      <span className={`material-symbols-outlined ${
                        bill.status === 'paid' 
                          ? 'text-green-600' 
                          : bill.status === 'pending'
                          ? 'text-yellow-600'
                          : 'text-gray-600'
                      }`}>receipt</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Bill - {formatCurrency(bill.total_amount || bill.amount)}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {bill.description || 'Medical services'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(bill.status)}`}>
                      {bill.status || 'Pending'}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(bill.createdAt)}</p>
                    {bill.appointment_id?.date && (
                      <p className="text-xs text-gray-400 mt-1">
                        Service Date: {formatDate(bill.appointment_id.date)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Bill ID</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{bill._id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Amount</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(bill.total_amount || bill.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Discount</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(bill.discount || 0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Final Amount</p>
                    <p className="text-sm font-bold text-[#007a8a]">{formatCurrency(bill.final_amount || bill.total_amount || bill.amount)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
