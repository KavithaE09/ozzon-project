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

  // 🌗 APPLY THEME
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // 🌗 LOAD SAVED THEME
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpenNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideProfile);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
    };
  }, []);

  return (
    <header 
      className="h-16 md:h-[68px] lg:h-[76px] flex justify-between items-center border-b shadow-sm px-3 md:px-4 lg:px-6"
      style={{
        backgroundColor: darkMode ? "#1E293B" : "white",
        borderColor: darkMode ? "#374151" : "#E5E7EB"
      }}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
        {/* MENU ICON - Larger on mobile, normal on desktop */}
        <Menu
          className="w-7 h-7 md:w-6 md:h-6 lg:w-[18px] lg:h-[18px] cursor-pointer flex-shrink-0"
          onClick={onMenuClick}
          style={{
            color: darkMode ? "#E5E7EB" : "#374151",
            filter: darkMode ? "brightness(2)" : "none"
          }}
        />

        {/* LOGO - Larger on mobile, normal on desktop */}
        <div className="h-10 md:h-9 lg:h-10 flex items-center flex-shrink-0">
          <img
            src={headerlogo}
            alt="Ozzon Logo"
            className="h-10 md:h-9 lg:h-10 w-auto object-contain"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
        {/* 🔔 NOTIFICATION - Responsive sizes */}
        <div className="relative">
          <Bell
            className="w-5 h-5 md:w-6 md:h-6 lg:w-[35px] lg:h-[35px] cursor-pointer"
            fill={darkMode ? "#9CA3AF" : "#374151"}
            stroke="none" 
            onClick={() => setOpenNotification(!openNotification)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = darkMode ? "#3B82F6" : "#B73E3E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = darkMode ? "#9CA3AF" : "#374151";
            }}
          />

          {openNotification && (
            <div
              ref={notificationRef}
              style={{
                position: "absolute",
                right: 0,
                marginTop: "8px",
                width: "240px",
                backgroundColor: darkMode ? "#1E293B" : "white",
                border: `1px solid ${darkMode ? "#374151" : "#9CA3AF"}`,
                borderRadius: "6px",
                boxShadow: darkMode ? "0 4px 6px rgba(0,0,0,0.3)" : "0 4px 6px rgba(0,0,0,0.15)",
                zIndex: 9999
              }}
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
                  className="notification-link"
                  style={{
                    display: "block",
                    padding: "8px 10px",
                    fontSize: "13px",
                    color: darkMode ? "#E5E7EB" : "#374151",
                    textDecoration: "none",
                    borderBottom: index !== 3 ? `1px solid ${darkMode ? "#374151" : "#E5E7EB"}` : "none",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = darkMode ? "#3B82F6" : "#A63128";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = darkMode ? "#E5E7EB" : "#374151";
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ⚙️ SETTINGS - Responsive sizes */}
        <Link
          to="/layout/settings"
          className="cursor-pointer flex items-center justify-center"
        > 
          <Settings 
            className="w-5 h-5 md:w-6 md:h-6 lg:w-[35px] lg:h-[35px]"
            style={{
              color: darkMode ? "#9CA3AF" : "#374151",
              transition: "color 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = darkMode ? "#3B82F6" : "#B73E3E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = darkMode ? "#9CA3AF" : "#374151";
            }}
          />
        </Link>

        {/* 👤 USER PROFILE - Responsive: Icon only on mobile/tablet, full box on laptop */}
        <div ref={profileRef} className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="cursor-pointer flex items-center justify-center lg:gap-3 lg:px-4 lg:border"
            style={{ 
              width: "auto",
              height: "auto",
              borderRadius: "5px",
              backgroundColor: darkMode ? "#1E293B" : "white",
              borderColor: darkMode ? "#374151" : "#E5E7EB"
            }}
          >
            {/* USER ICON - Always visible */}
            <img 
              src={userIcon} 
              alt="user" 
              className="w-5 h-5 md:w-6 md:h-6 lg:h-10 lg:w-auto cursor-pointer" 
            />

            {/* USER TEXT - Only on laptop */}
            <div className="hidden lg:flex flex-col flex-1">
              <span 
                className="text-[13px]"
                style={{ color: darkMode ? "#9CA3AF" : "#6B7280" }}
              >
                User Name
              </span>
              <span 
                className="text-[13px] font-semibold"
                style={{ color: darkMode ? "#E5E7EB" : "#374151" }}
              >
                ADMIN
              </span>
            </div>

            {/* CHEVRON - Only on laptop */}
            <ChevronDown 
              className="w-4 h-4 hidden lg:block" 
              style={{ color: darkMode ? "#9CA3AF" : "#374151" }}
            />
          </div>

          {/* DROPDOWN MENU */}
          {openProfile && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 8px)",
                width: "200px",
                backgroundColor: darkMode ? "#1E293B" : "white",
                border: `1px solid ${darkMode ? "#374151" : "#9CA3AF"}`,
                borderRadius: "6px",
                boxShadow: darkMode ? "0 4px 6px rgba(0,0,0,0.3)" : "0 4px 6px rgba(0,0,0,0.15)",
                zIndex: 9999
              }}
            >
              <Link
                to="/layout/profile"
                onClick={() => setOpenProfile(false)}
                className="block"
                style={{ 
                  padding: "10px 12px",
                  fontSize: "14px",
                  color: darkMode ? "#E5E7EB" : "#374151",
                  borderBottom: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                  textDecoration: "none",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => {
                  // Only apply hover on desktop
                  if (window.innerWidth >= 1024) {
                    e.currentTarget.style.backgroundColor = darkMode ? "#3B82F6" : "#A63128";
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth >= 1024) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = darkMode ? "#E5E7EB" : "#374151";
                  }
                }}
              >
                Profile
              </Link>

              <div
                onClick={() => setOpenProfile(false)}
                style={{ 
                  padding: "10px 12px", 
                  fontSize: "14px", 
                  cursor: "pointer",
                  color: darkMode ? "#E5E7EB" : "#374151",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => {
                  // Only apply hover on desktop
                  if (window.innerWidth >= 1024) {
                    e.currentTarget.style.backgroundColor = darkMode ? "#3B82F6" : "#A63128";
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth >= 1024) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = darkMode ? "#E5E7EB" : "#374151";
                  }
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>

        {/* 🌗 DARK MODE TOGGLE - Same toggle design for all devices */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`ml-1 md:ml-1.5 lg:ml-2 w-11 h-6 md:w-12 md:h-7 lg:w-[58px] lg:h-[30px] flex items-center rounded-full cursor-pointer transition-all duration-300 
          ${darkMode ? "bg-[#2F2F2F]" : "bg-[#E5E7EB]"}`}
        >
          <div
            className={`w-5 h-5 md:w-6 md:h-6 lg:w-[26px] lg:h-[26px] bg-white rounded-full shadow-md flex items-center justify-center 
            transform transition-all duration-300 text-xs md:text-sm lg:text-base
            ${darkMode ? "translate-x-5 md:translate-x-5 lg:translate-x-[28px]" : "translate-x-[2px]"}`}
          >
            {darkMode ? "🌙" : "☀️"}
          </div>
        </div>
      </div>
    </header>
  );
}