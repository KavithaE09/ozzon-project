import React, { useState } from 'react';
import loginhouse from '../assets/loginhouse.png';
import ozzonlogo from '../assets/ozzonlogo.jpeg';

export default function ForgetPassword() {
  const [phone, setPhone] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone) {
      alert('Please enter your number');
      return;
    }
    alert('OTP sent successfully (demo)');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
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
        {/* LEFT SECTION (UNCHANGED) */}
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
              fontSize: '16px',
              color: '#000',
              opacity: 0.75,
              maxWidth: '420px',
              lineHeight: '28px',
            }}
          ></div>

          <div style={{ marginTop: '40px' }}>
            <img
              src={loginhouse}
              alt="Container House"
              style={{
                width: '380px',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* RIGHT SECTION – FORGET PASSWORD */}
        <div
          style={{
            width: '380px',
            height: '400px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '36px',
            border: '1px solid #F87171',
            marginLeft: '-10px',
            marginBottom: '30px',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '28px',
              marginTop: '0px',
              fontWeight: '700',
              fontFamily: 'Nunito Sans',
            }}
          >
            Forget Password
          </h2>

          <p
            style={{
              textAlign: 'center',
              fontSize: '15px',
              fontFamily: 'Nunito Sans',
              opacity: 0.75,
              marginBottom: '28px',
            }}
          >
            Please enter your number to continue
          </p>

          {/* PHONE NUMBER */}
          <div style={{ marginBottom: '28px' }}>
            <label
              style={{
                fontSize: '15px',
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9187000000"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #F87171',
                backgroundColor: '#F7F9FC',
                fontSize: '15px',
                outline: 'none',
              }}
            />
          </div>

          {/* SEND OTP */}
          <button
            onClick={handleSendOtp}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#A63028',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              marginBottom: '18px',
            }}
          >
            Send OTP
          </button>

          {/* BACK TO LOGIN */}
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#A63028',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}