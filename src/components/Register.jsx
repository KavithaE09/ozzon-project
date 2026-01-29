import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import loginhouse from '../assets/loginhouse.png';
import  ozzonlogo from '../assets/ozzonlogo.png';

export default function Register() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Iaccepttermsandconditions, setIaccepttermsandconditions] = useState(false);

  const handleMobileChange = (e) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 10);
    setMobileNumber(numbersOnly);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const validUsername = value.replace(/[^a-zA-Z0-9 ]/g, '');
    setUsername(validUsername);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      alert('Please fill all required fields');
      return;
    }
    if (!email || !isValidEmail(email)) {
      alert('Please fill all required fields');
      return;
    }
    if (!username.trim()) {
      alert('Please fill all required fields');
      return;
    }
    if (!password) {
      alert('Please fill all required fields');
      return;
    }
    console.log('Register attempted with:', { mobileNumber, email, username, password });
  };

  return (
    <div style={{ 
      Height: '1024px',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      overflow: 'hidden'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '1440px',
        display: 'flex',
        gap: '80px',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        {/* Left Section - Logo and Image */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: '600px'
        }}>
        <div style={{
            width: '100%',
            maxWidth: '550px',
            height: 'auto',
            marginBottom: '13px',
            marginLeft: '180px',
            }}>
            <img 
              src={ozzonlogo} 
              alt="logo" 
              style={{ 
                width: '255px', 
                height: '66px', 
                objectFit: 'contain',
                display: 'block',

            }}/>
        </div>
          {/* Logo */}
          {/*<div style={{
            width: '100%',
            maxWidth: '550px',
            height: 'auto',
            marginBottom: '18px',
            marginLeft: '180px',
          }}>
            <h1 style={{ 
              fontSize: '72px', 
              fontWeight: 'bold',
              margin: 0,
              color: '#4A4A4A',
              lineHeight: '1'
            }}>
              o<span style={{ color: '#A63028' }}>zz</span>on
            </h1>
          </div>*/}

          {/* Ozzon Management Text */}
          <div style={{
            fontFamily: 'Nunito Sans',
            fontWeight: '400',
            fontSize: '30px',
            color: '#000000',
            marginBottom: '18px',
            marginLeft: '190px',
            textAlign: 'center'
          }}>
            Ozzon Management
          </div>

          {/* Tagline */}
          <div style={{
           fontFamily: 'Inter',
            fontWeight: '400',
            fontSize: '20px',
            color: '#000000',
            textAlign: 'center',
            marginLeft: '150px',
          }}>
            Get started with simple, secure cantainer booking.
          </div>

          {/* Container House Image */}
          <div style={{
            width: '673px',
            height: '593px',
            marginRight: '100px',
          }}>
            <img 
              src={loginhouse}
              alt="Container House" 
              style={{ 
                width: '673px', 
                height: '593px', 
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Right Section - Register Form */}
        <div style={{
          width: '500px',
          border: '0.3px solid #A63028',
          borderRadius: '15px',
          padding: '60px 50px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          backgroundColor: '#FFFFFF'
        }}>
          {/* Heading */}
          <h2 style={{
            textAlign: 'center',
            fontSize: '32px',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '15px',
            marginTop: 0,
            fontFamily: 'Nunito Sans'
          }}>
            Create Account
          </h2>

          {/* Subheading */}
          <p style={{
            color: '#202224',
            marginBottom: '40px',
            fontSize: '16px',
            marginTop: 0,
            fontFamily: 'Nunito Sans',
            textAlign: 'center',
            fontWeight: '500',
            opacity: 0.7
          }}>
            Create a account to continue
          </p>

          <div>
            {/* Mobile Number Input */}
            <div style={{ marginBottom: '25px' }}>
              <label htmlFor="mobile" style={{
                display: 'block',
                color: '#202224',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'Nunito Sans',
                opacity: 0.8
              }}>
                Number
              </label>
              <input
                type="text"
                id="mobile"
                value={mobileNumber}
                onChange={handleMobileChange}
                placeholder="9876543210"
                style={{
                  fontWeight: '400',
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#F1F4F9',
                  border: '1px solid #A63028',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'Nunito Sans',
                  color: '#202224'
                }}
              />
              {mobileNumber && mobileNumber.length < 10 && (
                <p style={{
                  fontSize: '12px',
                  color: '#d32f2f',
                  marginTop: '5px',
                  margin: '5px 0 0 0',
                  fontFamily: 'Nunito Sans'
                }}>
                  Mobile number must be 10 digits
                </p>
              )}
            </div>

            {/* Email Input */}
            <div style={{ marginBottom: '25px' }}>
              <label htmlFor="email" style={{
                display: 'block',
                color: '#202224',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'Nunito Sans',
                opacity: 0.8
              }}>
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="user@email.com"
                style={{
                  fontWeight: '400',
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#F1F4F9',
                  border: email && !isValidEmail(email) ? '1px solid #d32f2f' : '1px solid #A63028',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'Nunito Sans',
                  color: '#202224'
                }}
              />
              {email && !isValidEmail(email) && (
                <p style={{
                  fontSize: '12px',
                  color: '#d32f2f',
                  marginTop: '5px',
                  margin: '5px 0 0 0',
                  fontFamily: 'Nunito Sans'
                }}>
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Username Input */}
            <div style={{ marginBottom: '25px' }}>
              <label htmlFor="username" style={{
                display: 'block',
                color: '#202224',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'Nunito Sans',
                opacity: 0.8
              }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="username"
                style={{
                  fontWeight: '400',
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#F1F4F9',
                  border: '1px solid #A63028',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'Nunito Sans',
                  color: '#202224'
                }}
              />
            </div>

            {/* Password Input */}
            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="password" style={{
                display: 'block',
                color: '#202224',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'Nunito Sans',
                opacity: 0.8
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
                  style={{
                    fontWeight: '400',
                    width: '100%',
                    padding: '12px 16px',
                    paddingRight: '45px',
                    backgroundColor: '#F1F4F9',
                    border: '1px solid #A63028',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'Nunito Sans',
                    color: '#202224'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666666',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '45px' 
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  fontFamily: 'Nunito Sans'
                }}>
                  <input
                    type="checkbox"
                    checked={Iaccepttermsandconditions}
                    onChange={(e) => setIaccepttermsandconditions(e.target.checked)}
                    style={{ 
                      width: '18px', 
                      height: '18px', 
                      marginRight: '10px',
                      accentColor: '#A63028',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{ color: '#202224', fontSize: '18px', opacity: 0.6 }}>I accept terms and conditions</span>
                </label>
                <button 
                  style={{ 
                    background: 'none',
                    border: 'none',
                    color: '#A63028',
                    fontWeight: '500',
                    fontSize: '18px',
                    cursor: 'pointer',
                    fontFamily: 'Nunito Sans'
                  }}
                >
                  Forget Password?
                </button>
              </div>

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              style={{ 
                  width: '418px',
                  padding: '16px',
                  backgroundColor: '#A63028',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '20px',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  marginBottom: '30px',
                  transition: 'background-color 0.2s',
                  fontFamily: 'Nunito Sans',
                  marginLeft: '50px'  
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#8a2820'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#A63028'}
            >
              Sign Up
            </button>

            {/* Login Link */}
            <p style={{
              textAlign: 'center',
              color: '#202224',
              fontSize: '16px',
              margin: 0,
              fontFamily: 'Nunito Sans'
            }}>
              <span style={{ opacity: 0.7 }}>Already have an account?</span>{' '}
              <button style={{
                background: 'none',
                border: 'none',
                color: '#A63028',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px',
                fontFamily: 'Nunito Sans'
              }}>
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}