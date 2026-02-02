import React, { useState, useRef } from 'react';
import loginhouse from '../assets/loginhouse.png';
import ozzonlogo from '../assets/ozzonlogo.jpeg';

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-white">
      <div className="w-full max-w-[1400px] flex items-center justify-center gap-[-30px] flex-wrap">

        {/* LEFT SECTION */}
        <div className="flex flex-col items-center text-center w-full max-w-[500px]">
          <img
            src={ozzonlogo}
            alt="logo"
            className="w-[220px] mb-4 object-contain"
          />

          <div className="font-semibold text-[26px] mb-[30px]">
            Ozzon Management
          </div>

          <img
            src={loginhouse}
            alt="Container House"
            className="w-full max-w-[420px] object-contain"
          />
        </div>

        {/* RIGHT OTP BOX */}
        <div className="w-full max-w-[380px] bg-white rounded-2xl p-8 border border-red-400">
          <h2 className="text-center text-[26px] font-bold mb-2">
            OTP
          </h2>

          <p className="text-center text-sm opacity-75 mb-1">
            Please enter your OTP to continue
          </p>

          <p className="text-center text-[13px] opacity-75 mb-6">
            Enter the OTP sent to <b>+91 98765XXXX</b>
          </p>

          {/* OTP INPUTS */}
          <div className="flex justify-between gap-2 mb-5">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full max-w-[44px] h-[44px] text-center text-lg rounded-lg border border-red-400 outline-none focus:border-primary"
              />
            ))}
          </div>

          <div className="text-center text-[13px] mb-2">
            00:20 Sec
          </div>

          <div className="text-center text-[13px] mb-6">
            Don’t receive code?{' '}
            <span className="text-primary cursor-pointer font-semibold">
              Re-send
            </span>
          </div>

          <button className="w-full py-3 bg-primary text-white text-base font-semibold rounded-xl hover:bg-[#8a2820] transition-colors">
            OTP Verify
          </button>
        </div>
      </div>
    </div>
  );
}
