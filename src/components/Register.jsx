import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import loginhouse from '../assets/loginhouse.png';
import ozzonlogo from '../assets/ozzonlogo.jpeg';

export default function Register() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Iaccepttermsandconditions, setIaccepttermsandconditions] = useState(false);

  const handleMobileChange = (e) => {
    const numbersOnly = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setMobileNumber(numbersOnly);
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (
      mobileNumber.length < 10 ||
      !isValidEmail(email) ||
      !username.trim() ||
      !password
    ) {
      alert('Please fill all required fields');
      return;
    }
    console.log({ mobileNumber, email, username, password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-[1440px] flex items-center justify-center gap-20">

        {/* LEFT SECTION */}
        <div className="flex flex-col items-center flex-1 max-w-[600px]">
          <img
            src={ozzonlogo}
            alt="logo"
            className="w-[255px] mb-3 object-contain"
          />

          <div className="text-[30px] font-normal mb-4 text-black font-nunito">
            Ozzon Management
          </div>

          <div className="text-[20px] mb-6 text-black font-inter text-center">
            Get started with simple, secure container booking.
          </div>

          <img
            src={loginhouse}
            alt="Container House"
            className="w-full max-w-[673px] object-contain"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="w-[500px] bg-white border border-primary rounded-2xl p-[60px_50px] shadow-md">

          <h2 className="text-center text-[32px] font-bold mb-3 font-nunito">
            Create Account
          </h2>

          <p className="text-center text-base opacity-70 mb-10 font-nunito">
            Create a account to continue
          </p>

          {/* Number */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold opacity-80 font-nunito">
              Number
            </label>
            <input
              value={mobileNumber}
              onChange={handleMobileChange}
              placeholder="9876543210"
              className="w-full px-4 py-3 rounded-lg border border-primary bg-[#F1F4F9] outline-none"
            />
            {mobileNumber && mobileNumber.length < 10 && (
              <p className="text-xs text-red-600 mt-1">
                Mobile number must be 10 digits
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold opacity-80 font-nunito">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@email.com"
              className={`w-full px-4 py-3 rounded-lg bg-[#F1F4F9] outline-none border ${
                email && !isValidEmail(email)
                  ? 'border-red-600'
                  : 'border-primary'
              }`}
            />
            {email && !isValidEmail(email) && (
              <p className="text-xs text-red-600 mt-1">
                Please enter a valid email
              </p>
            )}
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold opacity-80 font-nunito">
              Username
            </label>
            <input
              value={username}
              onChange={(e) =>
                setUsername(e.target.value.replace(/[^a-zA-Z0-9 ]/g, ''))
              }
              placeholder="username"
              className="w-full px-4 py-3 rounded-lg border border-primary bg-[#F1F4F9] outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold opacity-80 font-nunito">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-primary bg-[#F1F4F9] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center justify-between mb-10">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={Iaccepttermsandconditions}
                onChange={(e) => setIaccepttermsandconditions(e.target.checked)}
                className="accent-primary w-4 h-4"
              />
              <span className="text-lg opacity-60">
                I accept terms and conditions
              </span>
            </label>

            <button className="text-primary text-lg font-medium">
              Forget Password?
            </button>
          </div>

          {/* Register Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-primary text-white text-xl rounded-xl hover:bg-[#8a2820] transition mb-8"
          >
            Sign Up
          </button>

          {/* Login */}
          <p className="text-center text-base">
            <span className="opacity-70">Already have an account?</span>{' '}
            <button className="text-primary font-semibold">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
