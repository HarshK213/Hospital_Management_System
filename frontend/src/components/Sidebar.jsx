import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Users,
  Calendar,
  UserPlus,
  FileText,
  Receipt,
  Stethoscope,
  CreditCard,
  LogOut,
  UserCircle,
  History,
  UserCheck,
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = user?.role?.toLowerCase() || "patient";

  const menuItems = {
    admin: [
      { icon: <UserPlus size={18} />, label: "Add Staff", path: "/admin/add-staff" },
      { icon: <Users size={18} />, label: "All Staff", path: "/admin/all-staff" },
      { icon: <UserCheck size={18} />, label: "Staff Status", path: "/admin/staff-status" },
      { icon: <History size={18} />, label: "Medical History", path: "/admin/view-report" },
    ],
    doctor: [
      { icon: <FileText size={18} />, label: "Add Medical Record", path: "/doctor/add-medical-record" },
      { icon: <Users size={18} />, label: "Patient Details", path: "/doctor/patient-details" },
      { icon: <Calendar size={18} />, label: "See Appointments", path: "/doctor/see-appointment" },
    ],
    patient: [
      { icon: <Calendar size={18} />, label: "Book Appointment", path: "/patient/book-appointment" },
      { icon: <UserCircle size={18} />, label: "Patient Details", path: "/patient/patient-details" },
      { icon: <CreditCard size={18} />, label: "Payment History", path: "/patient/payment-history" },
    ],
    receptionist: [
      { icon: <UserPlus size={18} />, label: "Add Patient", path: "/receptionist/add-patient" },
      { icon: <Calendar size={18} />, label: "Book Appointment", path: "/receptionist/book-appointment" },
      { icon: <Receipt size={18} />, label: "Generate Bill", path: "/receptionist/generate-bill" },
      { icon: <Users size={18} />, label: "View Patient", path: "/receptionist/view-patient-details" },
    ],
    nurse: [
      { icon: <FileText size={18} />, label: "Patient Records", path: "/nurse/patient-records" },
      { icon: <Stethoscope size={18} />, label: "Vitals", path: "/nurse/vitals" },
      { icon: <Calendar size={18} />, label: "Schedule", path: "/nurse/schedule" },
    ],
  };

  const roleLabels = {
    admin: "Admin Portal",
    doctor: "Doctor Portal",
    patient: "Patient Portal",
    receptionist: "Receptionist Portal",
    nurse: "Nurse Portal",
  };

  const currentMenuItems = menuItems[role] || menuItems.patient;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 h-screen bg-white flex flex-col justify-between shadow-md border-r border-gray-100">
      <div>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-10 h-10 bg-[#007a8a] text-white flex items-center justify-center rounded-lg">
            <Stethoscope size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800">Arogya</h1>
            <p className="text-xs text-gray-500">{roleLabels[role] || "Portal"}</p>
          </div>
        </div>

        <div className="mt-4 px-3">
          {currentMenuItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              active={isActive(item.path)}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </div>
      </div>

      <div className="px-3 py-4 space-y-2 border-t border-gray-100">
        <SidebarItem
          icon={<LogOut size={18} />}
          label="Sign Out"
          onClick={handleLogout}
          logout
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick, logout }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200
      ${
        active
          ? "bg-[#007a8a]/10 text-[#007a8a] font-semibold"
          : logout
          ? "text-red-500 hover:bg-red-50"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className={active ? "text-[#007a8a]" : ""}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default Sidebar