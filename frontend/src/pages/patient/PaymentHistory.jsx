import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(null);

  // Fetch payment history for the logged-in patient
  useEffect(() => {
    const fetchPayments = async () => {
      if (!user || user.role !== 'patient') {
        setError('Unauthorized access');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      
      try {
        // Simulate API call to fetch payment history
        // In a real app, you would make an API request to your backend with the patient ID
        // For now, we'll mock a response
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Generate mock payment data
        const mockPayments = Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => {
          const date = new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
          const amount = Math.floor(Math.random() * 500) + 50; // $50-$550
          const status = ['Paid', 'Pending', 'Failed'][Math.floor(Math.random() * 3)];
          const type = ['Consultation', 'Procedure', 'Medication', 'Lab Test', 'Surgery'][Math.floor(Math.random() * 5)];
          
          return {
            id: `PAY${Math.floor(Math.random() * 9000) + 1000}`,
            date: date.toLocaleDateString(),
            amount: `$${amount}.00`,
            status,
            type,
            details: {
              invoiceId: `INV${Math.floor(Math.random() * 9000) + 1000}`,
              description: `${type} service at HealthCare Medical Center`,
              date: date.toLocaleDateString(),
              amount: `$${amount}.00`,
              status,
              paymentMethod: ['Credit Card', 'Debit Card', 'Insurance', 'Cash'][Math.floor(Math.random() * 4)],
              transactionId: `TXN${Math.floor(Math.random() * 90000) + 10000}`
            }
          };
        }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
        
        setPayments(mockPayments);
      } catch (err) {
        setError('Failed to fetch payment history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Payment History</h2>
        
        {loading && (
          <div className="text-neutral-500 text-center py-8">
            Loading your payment history...
          </div>
        )}
        
        {error && (
          <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm mb-6">
            {error}
          </div>
        )}
        
        {!loading && !error && payments.length === 0 && (
          <p className="text-neutral-500 text-center py-8">No payment history available.</p>
        )}
        
        {!loading && !error && payments.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-neutral mb-4">Recent Payments</h3>
            <div className="space-y-3">
              {payments.map((payment) => (
                <div 
                  key={payment.id} 
                  className={`border border-neutral-200 rounded-lg p-4 cursor-pointer hover:bg-neutral-50 transition-colors duration-200 ${
                    showDetails === payment.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setShowDetails(showDetails === payment.id ? null : payment.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral">{payment.type}</h4>
                      <p className="text-neutral-600 text-sm">Invoice: {payment.details.invoiceId}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium text-primary">{payment.amount}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Paid' ? 'bg-green-200 text-green-800' :
                        payment.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-neutral-600 text-sm mt-2">
                    <span>{payment.date}</span>
                    <span>{showDetails === payment.id ? '▲' : '▼'}</span>
                  </div>
                  
                  {showDetails === payment.id && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Description:</span>
                          <span className="font-medium">{payment.details.description}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Payment Method:</span>
                          <span className="font-medium">{payment.details.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Transaction ID:</span>
                          <span className="font-mono">{payment.details.transactionId}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;