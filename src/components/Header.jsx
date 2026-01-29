import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Settings, Bell } from "lucide-react";

import headerlogo from "../assets/headerlogo.png";
import menuIcon from "../assets/MENU.png";
import userIcon from "../assets/user.png";
import dropdown from "../assets/drop.png";

export default function Header({ onMenuClick }) {
  const [openNotification, setOpenNotification] = useState(false);
  const notificationRef = useRef(null);
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);


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
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setOpenProfile(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutsideProfile);
  return () => {
    document.removeEventListener("mousedown", handleClickOutsideProfile);
  };
}, []);



  return (
    <header className="bg-white h-[76px] flex justify-between items-center border-b border-[#E5E7EB] shadow-sm">
      
      {/* LEFT SIDE */}
      <div className="flex items-center" style={{ paddingLeft: "24px" }}>
        <img
          src={menuIcon}
          alt="menu"
          className="w-[18.14px] h-[17.61px] cursor-pointer"
          onClick={onMenuClick}
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
        {/* 🔔 NOTIFICATION ICON */}
        <div className="relative" style={{ marginRight: "12px" }}>
          <Bell
            size={35}
            fill="#374151"
            stroke="none"
            className="cursor-pointer"
            onClick={() => setOpenNotification(!openNotification)}
          />

          {/* 🔽 NOTIFICATION DROPDOWN */}
       {openNotification && (
  <div
    ref={notificationRef}
    style={{
      position: "absolute",
      right: 0,
      marginTop: "8px",
      width: "260px",
      backgroundColor: "white",
      border: "1px solid #9CA3AF",
     
      borderRadius: "6px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
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
        style={{
          display: "block",
          padding: "10px 12px",
          fontSize: "14px",
          color: "#374151",
          textDecoration: "none",
          borderBottom:
            index !== 3 ? "1px solid #E5E7EB" : "none"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#A63128";
          e.target.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "#374151";
        }}
      >
        {item.label}
      </Link>
    ))}
  </div>
)}


        </div>

        {/* ⚙️ SETTINGS ICON */}
        <Link
          to="/layout/settings"
          className="cursor-pointer flex items-center justify-center"
          style={{ marginRight: "16px" }}
        >
          <Settings
            size={35}
            className="text-[#374151] hover:text-[#B73E3E] transition"
          />
        </Link>

        {/* 👤 USER PROFILE */}
        <div ref={profileRef} className="relative">

  {/* USER BOX */}
  <div
    onClick={() => setOpenProfile(!openProfile)}
    className="flex items-center gap-3 cursor-pointer bg-white px-4 border border-[#E5E7EB] h-[60px]"
    style={{ width: "227px", borderRadius: "5px" }}
  >
    <div style={{ paddingRight: "12px", paddingLeft: "12px" }}>
      <img
        src={userIcon}
        alt="user"
        className="h-10 w-auto object-contain"
      />
    </div>

    <div className="flex flex-col gap-0.5 flex-1">
      <span className="text-[13px] text-[#6B7280]">
        User Name
      </span>
      <span className="text-[13px] text-[#374151] font-semibold">
        ADMIN
      </span>
    </div>

    <div style={{ paddingRight: "12px" }}>
      <img src={dropdown} alt="dropdown" className="w-4 h-4" />
    </div>
  </div>

  {/* DROPDOWN */}
  {openProfile && (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "110%",
        width: "230px",
        backgroundColor: "white",
        border: "1px solid #9CA3AF",
        
        borderRadius: "6px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
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
          color: "#374151",
          borderBottom: "1px solid #E5E7EB",
          textDecoration: "none"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#A63128";
          e.target.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "#374151";
        }}
      >
        Profile
      </Link>

      <div
        onClick={() => {
          setOpenProfile(false);
          console.log("Logout clicked");
        }}
        style={{
          padding: "10px 12px",
          fontSize: "14px",
          cursor: "pointer",
          color: "#374151"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#A63128";
          e.target.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "#374151";
        }}
      >
        Logout
      </div>
    </div>
  )}

</div>

      </div>
    </header>
  );
}
