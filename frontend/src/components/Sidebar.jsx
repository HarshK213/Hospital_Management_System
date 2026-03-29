import React from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Boxes,
  HelpCircle,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-neutral flex flex-col justify-between shadow-md">
      {/* Top Section */}
      <div>
        {/* Logo / Title */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-200">
          <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-md">
            ➕
          </div>
          <div>
            <h1 className="text-md font-semibold text-neutral">
              HealthCenter
            </h1>
            <p className="text-xs text-neutral-600">Admin Portal</p>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-4 px-3 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" />

          <SidebarItem
            icon={<Users size={18} />}
            label="Patient Records"
            active
          />

          <SidebarItem icon={<Calendar size={18} />} label="Appointments" />
          <SidebarItem icon={<CreditCard size={18} />} label="Billing" />
          <SidebarItem icon={<Boxes size={18} />} label="Inventory" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-3 py-4 space-y-2 border-t border-neutral-200">
        <SidebarItem icon={<HelpCircle size={18} />} label="Support" />
        <SidebarItem icon={<LogOut size={18} />} label="Sign Out" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200
      ${
        active
          ? "bg-primary/10 text-primary"
          : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default Sidebar;
