import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import loginhouse from '../assets/loginhouse.png';
import ozzonlogo from '../assets/ozzonlogo.jpeg';

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully (demo)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[1200px] flex items-center justify-center gap-[120px] p-5 flex-wrap">

        {/* LEFT SECTION */}
        <div className="w-[420px] text-center">
          <img 
            src={ozzonlogo} 
            alt="logo" 
            className="w-[240px] mb-2.5 mx-auto"
          />

          <h2 className="text-[28px] font-semibold mb-10 font-nunito">
            Ozzon Management
          </h2>

          <img
            src={loginhouse}
            alt="container"
            className="w-[380px] max-w-full mx-auto"
          />
        </div>

        {/* RIGHT SECTION - CHANGE PASSWORD CARD */}
        <div className="w-[420px] bg-white border border-red-600 rounded-[18px] p-[45px]">
          <h2 className="text-center text-[30px] font-bold mb-2 font-nunito">
            Change Password
          </h2>

          <p className="text-center text-[15px] opacity-75 mb-[30px] font-nunito">
            Please enter your new password to continue
          </p>

          {/* NEW PASSWORD */}
          <div className="mb-[22px]">
            <label className="text-base font-semibold mb-2 block font-nunito">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full py-3 px-4 rounded-[10px] border border-red-600 bg-[#F7F9FC] text-base outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-600"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-[22px]">
            <label className="text-base font-semibold mb-2 block font-nunito">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full py-3 px-4 rounded-[10px] border border-red-600 bg-[#F7F9FC] text-base outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-600"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* REMEMBER PASSWORD */}
          <label className="flex items-center gap-2 text-sm opacity-75 mb-[30px] cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-primary"
            />
            Remember Password
          </label>

          {/* CHANGE PASSWORD BUTTON */}
          <button 
            onClick={handleSubmit} 
            className="w-full py-[14px] bg-primary text-white text-lg font-semibold border-none rounded-xl cursor-pointer hover:bg-[#8a2820] transition-colors"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}