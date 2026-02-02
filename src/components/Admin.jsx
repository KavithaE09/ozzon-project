import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ozzonlogo from '../assets/ozzonlogo.jpeg';
import { useNavigate } from 'react-router-dom';
import userloginimg from '../assets/userloginimg.jpeg';

export default function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin" && password === "123456") {
      navigate("/Layout");
    } else {
      alert("Invalid demo credentials");
    }
  };

  return (
    <div className="admin-login-page login-page px-10">
      <div className="login-container">
        {/* LEFT SECTION */}
        <div className="login-left">
          <img
            src={ozzonlogo}
            alt="logo"
            className="logo mx-auto"
          />

          <div className="title font-nunito font-semibold text-black">
            Logic PRO ERP
          </div>
          
          <div className="mt-2.5">
            <img
              src={userloginimg}
              alt="Container House"
              className="login-image"
            />
          </div>
        </div>

        {/* RIGHT SECTION - LOGIN BOX */}
        <div className="login-card">
          <h2 className="font-nunito font-bold -mt-2">
            User Login
          </h2>

          <p className="font-nunito text-base opacity-75 mb-8">
            Please enter your number and password to continue
          </p>

          {/* USER NAME */}
          <div className="form-group">
            <label className="font-nunito text-base font-semibold mb-2 block">
              User Name
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="User Name"
              className="w-full py-3 px-4 rounded-[10px] border border-red-600 bg-[#F7F9FC] text-base outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label className="font-nunito text-base font-semibold mb-2 block">
              Password
            </label>
            <div className="password-box">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder='*********'
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 rounded-[10px] border border-red-600 bg-[#F7F9FC] text-base outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="options">
            <label className="remember flex items-center">
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                className="mr-2 accent-primary"
              />
              <span className="opacity-70">
                Remember Password
              </span>
            </label>

            <button className="forgot">
              Forget Password?
            </button>
          </div>

          {/* SIGN IN */}
          <button
            type="button"
            onClick={handleSubmit}
            className="login-btn"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}