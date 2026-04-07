import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/home.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";

import AddStaff from "./pages/admin/AddStaff.jsx";
import AllStaff from "./pages/admin/AllStaff.jsx";
import StaffStatus from "./pages/admin/StaffStatus.jsx";
import ViewReportMedicalHistory from "./pages/admin/ViewReportMedicalHistory.jsx";

import AddMedicalRecord from "./pages/doctor/AddMedicalRecord.jsx";
import DoctorPatientDetails from "./pages/doctor/PatientDetails.jsx";
import SeeAppointment from "./pages/doctor/SeeAppointment.jsx";

import PatientBookAppointment from "./pages/patient/BookAppointment.jsx";
import PatientPatientDetails from "./pages/patient/PatientDetails.jsx";
import PaymentHistory from "./pages/patient/PaymentHistory.jsx";

import ReceptionistBookAppointment from "./pages/receptionist/BookAppointment.jsx";
import ReceptionistViewPatientDetails from "./pages/receptionist/ViewPatientDetails.jsx";
import AddPatient from "./pages/receptionist/AddPatient.jsx";
import GenerateBill from "./pages/receptionist/GenerateBill.jsx";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="material-symbols-outlined text-4xl animate-spin text-[#007a8a]">progress_activity</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />

          <Route path="/admin/add-staff" element={<AddStaff />} />
          <Route path="/admin/all-staff" element={<AllStaff />} />
          <Route path="/admin/staff-status" element={<StaffStatus />} />
          <Route path="/admin/view-report" element={<ViewReportMedicalHistory />} />

          <Route path="/doctor/add-medical-record" element={<AddMedicalRecord />} />
          <Route path="/doctor/patient-details" element={<DoctorPatientDetails />} />
          <Route path="/doctor/see-appointment" element={<SeeAppointment />} />

          <Route path="/patient/book-appointment" element={<PatientBookAppointment />} />
          <Route path="/patient/patient-details" element={<PatientPatientDetails />} />
          <Route path="/patient/payment-history" element={<PaymentHistory />} />

          <Route path="/receptionist/book-appointment" element={<ReceptionistBookAppointment />} />
          <Route path="/receptionist/view-patient-details" element={<ReceptionistViewPatientDetails />} />
          <Route path="/receptionist/add-patient" element={<AddPatient />} />
          <Route path="/receptionist/generate-bill" element={<GenerateBill />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
