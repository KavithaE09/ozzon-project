import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import loginhouse from '../assets/loginhouse.png';
import ozzonlogo from '../assets/ozzonlogo.jpeg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log('Login attempted with:', { email, password, rememberPassword });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-[#FAF3F2] flex items-center justify-center p-10">
      <div className="w-full max-w-[1400px] flex gap-20 items-center justify-center">
        
        {/* LEFT SECTION */}
        <div className="flex flex-col items-center text-center">
          <img
            src={ozzonlogo}
            alt="logo"
            className="w-[240px] h-auto mb-4 object-contain"
          />

          <div className="font-nunito font-semibold text-[28px] mb-2.5 text-black">
            Ozzon Management
          </div>

          <div className="font-inter text-lg text-black opacity-75 max-w-[420px] leading-7">
            Sign in to streamline your container bookings.
          </div>

          <div className="mt-10">
            <img
              src={loginhouse}
              alt="Container House"
              className="w-[380px] h-auto object-contain"
            />
          </div>
        </div>

        {/* RIGHT SECTION - LOGIN BOX */}
        <div className="w-[400px] h-[420px] bg-white rounded-[18px] p-12 border border-red-600 -ml-2.5 mb-[30px]">
          <h2 className="text-center text-[30px] -mt-2 font-bold font-nunito">
            Login to Account
          </h2>

          <p className="text-center text-base font-nunito opacity-75 mb-8">
            Please enter your number and password to continue
          </p>

          {/* EMAIL OR NUMBER */}
          <div className="mb-[22px]">
            <label className="text-base font-semibold font-nunito mb-2 block">
              Email or Number
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="9876543210"
              className="w-[355px] py-3 px-4 rounded-[10px] border border-red-600 bg-[#F7F9FC] text-base outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <label className="text-base font-semibold font-nunito mb-2 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-[355px] py-3 px-4 rounded-[10px] border border-red-600 bg-[#F7F9FC] text-base outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex justify-between items-center mb-7">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                className="mr-2 accent-primary"
              />
              <span className="text-[15px] opacity-70">
                Remember Password
              </span>
            </label>

            <button className="bg-transparent border-none text-primary text-[15px] font-semibold cursor-pointer hover:underline">
              Forget Password?
            </button>
          </div>

          {/* SIGN IN */}
          <button
            onClick={handleSubmit}
            className="w-full py-[14px] bg-primary text-white text-lg font-semibold border-none rounded-xl cursor-pointer mb-[22px] hover:bg-[#8a2820] transition-colors"
          >
            Sign In
          </button>

          {/* REGISTER */}
          <p className="text-center text-base font-nunito">
            <span className="opacity-70">Don't have an account?</span>{' '}
            <button className="bg-transparent border-none text-primary font-semibold cursor-pointer text-base hover:underline">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}