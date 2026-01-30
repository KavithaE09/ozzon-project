import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Settings, Bell, Menu, ChevronDown } from "lucide-react";

import headerlogo from "../assets/ozzonlogo.jpeg";
import userIcon from "../assets/user.png";

export default function Header({ onMenuClick }) {
  const [openNotification, setOpenNotification] = useState(false);
  const notificationRef = useRef(null);
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  // 🌗 DARK MODE STATE
  const [darkMode, setDarkMode] = useState(false);

  // APPLY THEME
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // LOAD SAVED THEME
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setOpenNotification(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`h-[76px] flex justify-between items-center border-b shadow-sm transition-colors
      ${darkMode ? "bg-[#151B23] border-[#2a2a2a]" : "bg-white border-[#E5E7EB]"}`}
    >
      {/* LEFT */}
      <div className="flex items-center pl-6">
        <Menu
          className={`w-[18px] h-[18px] cursor-pointer ${
            darkMode ? "text-white" : "text-[#374151]"
          }`}
          onClick={onMenuClick}
        />

        <div className="h-10 flex items-center ml-6">
          <img src={headerlogo} alt="Ozzon Logo" className="h-10 object-contain" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 pr-6">
        {/* 🔔 NOTIFICATION */}
        <div className="relative mr-3">
          <Bell
            size={32}
            className={`cursor-pointer ${
              darkMode ? "text-white" : "text-[#374151]"
            }`}
            onClick={() => setOpenNotification(!openNotification)}
          />

          {openNotification && (
            <div
              ref={notificationRef}
              className={`absolute right-0 mt-2 w-[260px] rounded shadow-lg z-[9999]
              ${darkMode ? "bg-[#121212] border border-[#2a2a2a]" : "bg-white border border-[#9CA3AF]"}`}
            >
              {[
                { label: "Quotation Approval", path: "/layout/quotationapproval" },
                { label: "Proforma Invoice Approval", path: "/layout/proformainvoiceapproval" },
                { label: "Container Hold Request Approval", path: "/layout/containerholdrequestapproval" },
                { label: "Container Block Request Approval", path: "/layout/containerblockrequestapproval" }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setOpenNotification(false)}
                  className={`block px-3 py-2 text-sm border-b last:border-none
                  ${darkMode ? "text-gray-200 border-[#2a2a2a]" : "text-[#374151] border-[#E5E7EB]"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ⚙️ SETTINGS */}
        <Link to="/layout/settings">
          <Settings
            size={32}
            className={darkMode ? "text-white" : "text-[#374151]"}
          />
        </Link>

        {/* 👤 PROFILE */}
        <div ref={profileRef} className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className={`flex items-center gap-3 px-4 h-[60px] cursor-pointer border transition-colors
            ${darkMode
              ? "bg-[#151B23] border-[#2a2a2a]"
              : "bg-white border-[#E5E7EB]"}`}
            style={{ width: "227px", borderRadius: "5px" }}
          >
            <img src={userIcon} alt="user" className="h-10" />

            <div className="flex flex-col flex-1">
              <span className={`text-[13px] ${darkMode ? "text-gray-400" : "text-[#6B7280]"}`}>
                User Name
              </span>
              <span className={`text-[13px] font-semibold ${darkMode ? "text-white" : "text-[#374151]"}`}>
                ADMIN
              </span>
            </div>

            <ChevronDown className={darkMode ? "text-white" : "text-[#374151]"} />
          </div>

          {openProfile && (
            <div
              className={`absolute right-0 top-[110%] w-[230px] rounded shadow-lg z-[9999]
              ${darkMode ? "bg-[#121212] border border-[#2a2a2a]" : "bg-white border border-[#9CA3AF]"}`}
            >
              <Link
                to="/layout/profile"
                className={`block px-3 py-2 text-sm border-b
                ${darkMode ? "text-gray-200 border-[#2a2a2a]" : "text-[#374151] border-[#E5E7EB]"}`}
                onClick={() => setOpenProfile(false)}
              >
                Profile
              </Link>

              <div className={`px-3 py-2 text-sm cursor-pointer ${darkMode ? "text-gray-200" : "text-[#374151]"}`}>
                Logout
              </div>
            </div>
          )}
        </div>

        {/* 🌗 TOGGLE */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`ml-2 w-[58px] h-[30px] flex items-center rounded-full cursor-pointer transition-all
          ${darkMode ? "bg-[#2a2a2a]" : "bg-[#E5E7EB]"}`}
        >
          <div
            className={`w-[26px] h-[26px] bg-white rounded-full shadow-md flex items-center justify-center 
            transform transition-all duration-300
            ${darkMode ? "translate-x-[28px]" : "translate-x-[2px]"}`}
          >
            {darkMode ? "🌙" : "☀️"}
          </div>
        </div>
      </div>
    </header>
  );
}
