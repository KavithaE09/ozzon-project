import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Settings, Bell, Menu , ChevronDown} from "lucide-react";

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
      className="h-[76px] flex justify-between items-center border-b shadow-sm"
      style={{
        backgroundColor: darkMode ? "#1E293B" : "white",
        borderColor: darkMode ? "#374151" : "#E5E7EB"
      }}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center" style={{ paddingLeft: "24px" }}>
      
        <Menu  size={24}
          alt="menu"
          className="w-[18.14px] h-[17.61px] cursor-pointer"
          onClick={onMenuClick}
          style={{
            color: darkMode ? "#E5E7EB" : "#374151",
            filter: darkMode ? "brightness(2)" : "none"
          }}
        />

        <div className="h-10 flex items-center" style={{ marginLeft: "24px" }}>
          <img
            src={headerlogo}
            alt="Ozzon Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="flex items-center gap-4"
        style={{ paddingRight: "24px", marginTop: "-0.5px" }}
      >
        {/* 🔔 NOTIFICATION */}
        <div className="relative" style={{ marginRight: "12px" }}>
          <Bell
            size={35}
            fill={darkMode ? "#9CA3AF" : "#374151"}
            stroke="none"
            className="cursor-pointer"
            onClick={() => setOpenNotification(!openNotification)}
          />

          {openNotification && (
            <div
              ref={notificationRef}
              style={{
                position: "absolute",
                right: 0,
                marginTop: "8px",
                width: "260px",
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
                    padding: "10px 12px",
                    fontSize: "14px",
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

        {/* ⚙️ SETTINGS */}
        <Link
          to="/layout/settings"
          className="cursor-pointer flex items-center justify-center"
          style={{ marginRight: "16px" }}
        >
          <Settings 
            size={35} 
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

        {/* 👤 USER PROFILE */}
        <div ref={profileRef} className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-3 cursor-pointer px-4 border h-[60px]"
            style={{ 
              width: "227px", 
              borderRadius: "5px",
              backgroundColor: darkMode ? "#1E293B" : "white",
              borderColor: darkMode ? "#374151" : "#E5E7EB"
            }}
          >
            <img src={userIcon} alt="user" className="h-10" />

            <div className="flex flex-col flex-1">
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

            <ChevronDown 
              className="w-4 h-4" 
              style={{ color: darkMode ? "#9CA3AF" : "#374151" }}
            />
          </div>

          {openProfile && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                width: "230px",
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
                style={{
                  display: "block",
                  padding: "10px 12px",
                  fontSize: "14px",
                  color: darkMode ? "#E5E7EB" : "#374151",
                  borderBottom: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                  textDecoration: "none",
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
                Profile
              </Link>

              <div
                style={{ 
                  padding: "10px 12px", 
                  fontSize: "14px", 
                  cursor: "pointer",
                  color: darkMode ? "#E5E7EB" : "#374151",
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
                Logout
              </div>
            </div>
          )}
        </div>

        {/* 🌗 DARK MODE TOGGLE (RIGHT OF USER BOX) */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`ml-2 w-[58px] h-[30px] flex items-center rounded-full cursor-pointer transition-all duration-300 
          ${darkMode ? "bg-[#2F2F2F]" : "bg-[#E5E7EB]"}`}
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