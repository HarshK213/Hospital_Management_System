import React from "react";
import { Bell, HelpCircle } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full px-6 py-3 flex items-center justify-between bg-neutral-50 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-6 w-full max-w-2xl">
        <h1 className="text-lg font-semibold text-primary">
          Patient Records
        </h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white px-3 py-2 rounded-md w-full shadow-sm">
          <input
            type="text"
            placeholder="Search by name, ID, or phone..."
            className="w-full outline-none text-sm text-neutral-600"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Icons */}
        <Bell className="text-neutral-500 cursor-pointer hover:text-neutral-700" size={20} />
        <HelpCircle className="text-neutral-500 cursor-pointer hover:text-neutral-700" size={20} />

        {/* User Info */}
        <div className="flex items-center gap-3 border-l pl-4 border-neutral-200">
          <div className="text-right">
            <p className="text-sm font-medium text-neutral">
              Dr. Sarah Jenkins
            </p>
            <p className="text-xs text-neutral-500">Chief Surgeon</p>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-semibold text-neutral">
            👩‍⚕️
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
