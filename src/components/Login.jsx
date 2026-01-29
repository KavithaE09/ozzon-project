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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFF 60%, #FAF3F2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          display: 'flex',
          gap: '80px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* LEFT SECTION */}
        <div
          style={{
            
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <img
            src={ozzonlogo}
            alt="logo"
            style={{
              width: '240px',
              height: 'auto',
              marginBottom: '16px',
              objectFit: 'contain',
            }}
          />

          <div
            style={{
              fontFamily: 'Nunito Sans',
              fontWeight: '600',
              fontSize: '28px',
              marginBottom: '10px',
              color: '#000',
            }}
          >
            Ozzon Management
          </div>

          <div
            style={{
              fontFamily: 'Inter',
              fontSize: '18px',
              color: '#000',
              opacity: 0.75,
              maxWidth: '420px',
              lineHeight: '28px',
            }}
          >
            Sign in to streamline your container bookings.
          </div>

          <div style={{ marginTop: '40px' }}>
            <img
              src={loginhouse}
              alt="Container House"
              style={{
                width: '380px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* RIGHT SECTION - LOGIN BOX */}
        <div
          style={{
            width: '400px',
            height: '420px',
            backgroundColor: '#FF0000FF0000',
            borderRadius: '18px',
            padding: '48px',
            border: '1px solid #FF0000',
            marginLeft: '-10px',
            marginBottom: '30px'
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '30px',
              marginTop: '-9px',
              fontWeight: '700',
              fontFamily: 'Nunito Sans'
  
            }}
          >
            Login to Account
          </h2>

          <p
            style={{
              textAlign: 'center',
              fontSize: '16px',
              fontFamily: 'Nunito Sans',
              opacity: 0.75,
              marginBottom: '32px',
            }}
          >
            Please enter your number and password to continue
          </p>

          {/* EMAIL */}
          <div style={{ marginBottom: '22px' }}>
            <label
              style={{
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Nunito Sans',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Email or Number
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="9876543210"
              style={{
                width: '355px',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #FF0000',
                backgroundColor: '#F7F9FC',
                fontSize: '16px',
                outline: 'none',
              }}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Nunito Sans',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '355px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #FF0000',
                  backgroundColor: '#F7F9FC',
                  fontSize: '16px',
                  outline: 'none',
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
                  color: '#777',
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '28px',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                style={{ marginRight: '8px', accentColor: '#A63028' }}
              />
              <span style={{ fontSize: '15px', opacity: 0.7 }}>
                Remember Password
              </span>
            </label>

            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#A63028',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Forget Password?
            </button>
          </div>

          {/* SIGN IN */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#A63028',
              color: '#fff',
              fontSize: '18px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              marginBottom: '22px',
            }}
          >
            Sign In
          </button>

          {/* REGISTER */}
          <p
            style={{
              textAlign: 'center',
              fontSize: '16px',
              fontFamily: 'Nunito Sans',
            }}
          >
            <span style={{ opacity: 0.7 }}>Don't have an account?</span>{' '}
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#A63028',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
