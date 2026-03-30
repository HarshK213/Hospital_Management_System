import React from "react";
import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  const roleLabels = {
    admin: "Administrator",
    doctor: "Doctor",
    patient: "Patient",
    receptionist: "Receptionist",
    nurse: "Nurse",
    staff: "Staff",
  };

  const getRoleLabel = () => {
    return roleLabels[user?.role?.toLowerCase()] || "User";
  };

  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <div className="w-full px-6 py-3 flex items-center justify-between bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center gap-6 w-full max-w-2xl">
        <h1 className="text-lg font-semibold text-[#007a8a]">
          {getRoleLabel()} Dashboard
        </h1>

        <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg w-full shadow-sm border border-gray-100">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search patients, appointments, records..."
            className="w-full outline-none text-sm text-gray-600 bg-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Bell
          className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
          size={20}
        />

        <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">{getRoleLabel()}</p>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#007a8a] flex items-center justify-center text-sm font-semibold text-white">
            {getUserInitials()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
