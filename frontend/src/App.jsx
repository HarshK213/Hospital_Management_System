import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/home.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";

// Admin pages
import AddStaff from "./pages/admin/AddStaff.jsx";
import StaffStatus from "./pages/admin/StaffStatus.jsx";
import ViewReportMedicalHistory from "./pages/admin/ViewReportMedicalHistory.jsx";

// Doctor pages
import AddMedicalRecord from "./pages/doctor/AddMedicalRecord.jsx";
import DoctorPatientDetails from "./pages/doctor/PatientDetails.jsx";
import SeeAppointment from "./pages/doctor/SeeAppointment.jsx";

// Patient pages
import PatientBookAppointment from "./pages/patient/BookAppointment.jsx";
import PatientPatientDetails from "./pages/patient/PatientDetails.jsx";
import PaymentHistory from "./pages/patient/PaymentHistory.jsx";

// Receptionist pages
import ReceptionistBookAppointment from "./pages/receptionist/BookAppointment.jsx";
import ReceptionistViewPatientDetails from "./pages/receptionist/ViewPatientDetails.jsx";
import ChangeAppointmentStatus from "./pages/receptionist/ChangeAppointmentStatus.jsx";
import AddPatient from "./pages/receptionist/AddPatient.jsx";
import GenerateBill from "./pages/receptionist/GenerateBill.jsx";

function App() {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (no auth required) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />

        {/* Protected routes (auth required) */}
        <Route
          element={
            <React.Fragment>
              {isAuthenticated ? (
                <>
                  <Navbar />
                  <Sidebar />
                </>
              ) : (
                <Navigate to="/login" replace />
              )}
            </React.Fragment>
          }
        >
          {/* Home page - accessible to all authenticated users */}
          <Route path="/home" element={<Home />} />

          {/* Admin routes */}
          <Route path="/admin/add-staff" element={<AddStaff />} />
          <Route path="/admin/staff-status" element={<StaffStatus />} />
          <Route
            path="/admin/view-report"
            element={<ViewReportMedicalHistory />}
          />

          {/* Doctor routes */}
          <Route
            path="/doctor/add-medical-record"
            element={<AddMedicalRecord />}
          />
          <Route
            path="/doctor/patient-details"
            element={<DoctorPatientDetails />}
          />
          <Route path="/doctor/see-appointment" element={<SeeAppointment />} />

          {/* Nurse routes */}
          {/* <Route path="/nurse/add-note" element={<AddNustingNote />} />
          <Route
            path="/nurse/patient-details"
            element={<NursePatientDetails />}
          /> */}

          {/* Patient routes */}
          <Route
            path="/patient/book-appointment"
            element={<PatientBookAppointment />}
          />
          <Route
            path="/patient/patient-details"
            element={<PatientPatientDetails />}
          />
          <Route path="/patient/payment-history" element={<PaymentHistory />} />

          {/* Receptionist routes */}
          <Route
            path="/receptionist/book-appointment"
            element={<ReceptionistBookAppointment />}
          />
          <Route
            path="/receptionist/view-patient-details"
            element={<ReceptionistViewPatientDetails />}
          />
          <Route
            path="/receptionist/change-appointment-status"
            element={<ChangeAppointmentStatus />}
          />
          <Route path="/receptionist/add-patient" element={<AddPatient />} />
          <Route
            path="/receptionist/generate-bill"
            element={<GenerateBill />}
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
