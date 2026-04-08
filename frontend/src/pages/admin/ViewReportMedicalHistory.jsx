import React, { useState } from "react";
import { adminService } from "../../services/adminService";

const ViewReportMedicalHistory = () => {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!patientId.trim()) {
      setError("Please enter a patient ID");
      return;
    }

    setLoading(true);
    setSearchLoading(true);
    setError("");
    setPatient(null);
    setMedicalHistory(null);

    try {
      const response = await adminService.getPatientMedicalHistory(
        patientId.trim(),
      );
      const data = response.data.data;
      console.log(data);
      if (data && data.medical_records) {
        setPatient(null);
        setMedicalHistory(data.medical_records);
      } else if (Array.isArray(data) && data.length > 0) {
        setPatient(null);
        setMedicalHistory(data);
      } else {
        setError("No medical history found for this patient");
      }
    } catch (err) {
      setError(err.message || "Patient not found");
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            View Medical History
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Search for a patient by their ID to view medical history
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={patientId}
                onChange={(e) => {
                  setPatientId(e.target.value);
                  setError("");
                }}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all text-sm ${
                  error ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Enter patient ID"
              />
            </div>
            <button
              type="submit"
              disabled={searchLoading}
              className="bg-[#007a8a] hover:bg-[#005f6c] text-white px-6 py-3 rounded-lg font-semibold text-sm shadow-lg shadow-[#007a8a]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {searchLoading ? (
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
              ) : (
                <span className="material-symbols-outlined">search</span>
              )}
              <span>Search</span>
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </p>
          )}
        </form>

        {patient && (
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-[#007a8a] flex items-center justify-center text-white font-bold text-lg">
                {patient.fullname?.charAt(0).toUpperCase() || "P"}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {patient.fullname}
                </h3>
                <p className="text-gray-500 text-sm">{patient.email}</p>
              </div>
            </div>
          </div>
        )}

        {medicalHistory && medicalHistory.length > 0 && (
          <div className="space-y-6">
            {medicalHistory.map((record, index) => (
              <div
                key={record._id || index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <div className="bg-[#007a8a] px-6 py-4">
                  <h3 className="font-bold text-lg text-white">
                    Medical Record #{index + 1}
                  </h3>
                  <p className="text-white/80 text-sm">
                    Date: {formatDate(record.date)}
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {record.date && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Date
                      </h4>
                      <p className="text-gray-900 bg-gray-50 rounded-lg p-4">
                        {formatDate(record.date)}
                      </p>
                    </div>
                  )}

                  {record.doctor_id && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Doctor
                      </h4>
                      <p className="text-gray-900 bg-gray-50 rounded-lg p-4">
                        {record.doctor_id.fullname}
                      </p>
                    </div>
                  )}

                  {record.diagnosis && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Diagnosis
                      </h4>
                      <p className="text-gray-900 bg-gray-50 rounded-lg p-4">
                        {record.diagnosis}
                      </p>
                    </div>
                  )}

                  {record.prescription && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Prescription
                      </h4>
                      <p className="text-gray-900 bg-gray-50 rounded-lg p-4">
                        {record.prescription}
                      </p>
                    </div>
                  )}

                  {record.notes && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Doctor Notes
                      </h4>
                      <p className="text-gray-900 bg-gray-50 rounded-lg p-4">
                        {record.notes}
                      </p>
                    </div>
                  )}

                  {!record.diagnosis &&
                    !record.prescription &&
                    !record.notes && (
                      <div className="text-center py-8 text-gray-500">
                        <span className="material-symbols-outlined text-4xl mb-2">
                          description
                        </span>
                        <p>No details in this record</p>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        {medicalHistory && medicalHistory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <span className="material-symbols-outlined text-4xl mb-2">
              description
            </span>
            <p>No medical history records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReportMedicalHistory;
