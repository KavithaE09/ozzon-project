import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ozzonlogo from '../assets/ozzonlogo.jpeg';
import { useNavigate } from 'react-router-dom';
import userloginimg from '../assets/userloginimg.jpeg';
import { loginUser } from "../api/authApi";

export default function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Sending login request...");

    const res = await loginUser({
      username: email,
      password: password
    });

    console.log("API RESPONSE:", res.data);

    if (res.data.message === "Login successful") {
      navigate("/layout");
    } else {
      alert(res.data.message);
    }

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    alert("Invalid Username or Password");
  }
};

  const handleForgotPassword = () => {
    navigate("/ForgetPassword");
  };

  return (
    <div className="admin-login-page">
      <div className="login-page">
        <div className="login-container">
          
          {/* LEFT SECTION - Desktop only */}
          <div className="login-left">
            <img
              src={ozzonlogo}
              alt="Ozzon Logo"
              className="logo"
            />

            <div className="title">
              Logic PRO ERP
            </div>

            <div>
              <img
                src={userloginimg}
                alt="User Login"
                className="login-image"
              />
            </div>
          </div>

          {/* MOBILE ONLY - Logo and Title */}
          <div className="login-left-mobile">
            <img
              src={ozzonlogo}
              alt="Ozzon Logo"
              className="logo"
            />

            <div className="title">
              Logic PRO ERP
            </div>
          </div>

          {/* LOGIN CARD */}
          <div className="login-card">
            <h2>User Login</h2>

            <p>Please enter your number and password to continue</p>

            <form onSubmit={handleSubmit}>
              {/* USER NAME */}
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="User Name"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <label>Password</label>
                <div className="password-box">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*********"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye-icon"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="options">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={rememberPassword}
                    onChange={(e) => setRememberPassword(e.target.checked)}
                  />
                  <span>Remember Password</span>
                </label>

                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="forgot"
                >
                  Forget Password?
                </button>
              </div>

              {/* SIGN IN */}
              <button
                type="submit"
                className="login-btn"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* MOBILE ONLY - User Login Image at Bottom */}
          <div className="login-image-mobile">
            <img
              src={userloginimg}
              alt="User Login"
              className="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}