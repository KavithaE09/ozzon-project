import React, { useState } from 'react';
import loginhouse from '../assets/loginhouse.png';
import ozzonlogo from '../assets/ozzonlogo.jpeg';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();
  const DEMO_NUMBER = "1234567890";

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!phone) {
      alert('Please enter your number');
      return;
    }

    if (phone === DEMO_NUMBER) {
      // correct number → OTP page
      navigate('/OTP', { state: { phone } });
    } else {
      alert('Invalid number');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-white">
      <div className="w-full max-w-[1400px] flex gap-20 items-center justify-center">
        
        {/* LEFT SECTION */}
        <div className="flex flex-col items-center text-center">
          <img
            src={ozzonlogo}
            alt="logo"
            className="w-[240px] mb-4 object-contain"
          />

          <div className="font-nunito font-semibold text-[28px] mb-2.5 text-black">
            Ozzon Management
          </div>

          <div className="font-inter text-base text-black opacity-75 max-w-[420px] leading-7">
          </div>

          <div className="mt-10">
            <img
              src={loginhouse}
              alt="Container House"
              className="w-[380px] object-contain"
            />
          </div>
        </div>

        {/* RIGHT SECTION – FORGET PASSWORD */}
        <div className="w-[380px] h-[400px] bg-white rounded-2xl p-9 border border-red-400 -ml-2.5 mb-[30px]">
          <h2 className="text-center text-[28px] mt-0 font-bold font-nunito">
            Forget Password
          </h2>

          <p className="text-center text-[15px] font-nunito opacity-75 mb-7">
            Please enter your number to continue
          </p>

          {/* PHONE NUMBER */}
          <div className="mb-7">
            <label className="text-[15px] font-semibold font-nunito mb-2 block">
              Email or Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9187000000"
              className="w-full py-3 px-4 rounded-[10px] border border-red-400 bg-[#F7F9FC] text-[15px] outline-none"
            />
          </div>

          {/* SEND OTP */}
          <button
            onClick={handleSendOtp}
            className="w-full py-3 bg-primary text-white text-base font-semibold border-none rounded-xl cursor-pointer mb-[18px] hover:bg-[#8a2820] transition-colors"
          >
            Send OTP
          </button>

          {/* BACK TO LOGIN */}
          <button className="bg-transparent border-none text-primary text-sm font-semibold cursor-pointer w-full text-center hover:underline">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}