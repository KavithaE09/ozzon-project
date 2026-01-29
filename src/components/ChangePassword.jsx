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
    <div style={page}>
      <div style={wrapper}>

        {/* LEFT */}
        <div style={leftSection}>
          <img src={ozzonlogo} alt="logo" style={logo} />

          <h2 style={brand}>Ozzon Management</h2>

          <img
            src={loginhouse}
            alt="container"
            style={image}
          />
        </div>

        {/* RIGHT */}
        <div style={card}>
          <h2 style={title}>Change Password</h2>

          <p style={subtitle}>
            Please enter your new password to continue
          </p>

          {/* NEW PASSWORD */}
          <div style={field}>
            <label style={label}>New Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={input}
              />
              <button
                onClick={() => setShowNew(!showNew)}
                style={eyeBtn}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div style={field}>
            <label style={label}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={input}
              />
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                style={eyeBtn}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* REMEMBER */}
          <label style={rememberRow}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ accentColor: '#A63028' }}
            />
            Remember Password
          </label>

          <button onClick={handleSubmit} style={btn}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const page = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const wrapper = {
  width: '100%',
  maxWidth: '1200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '120px',
  padding: '20px',
  flexWrap: 'wrap',
};

const leftSection = {
  width: '420px',
  textAlign: 'center',
};

const logo = {
  width: '240px',
  marginBottom: '10px',
};

const brand = {
  fontSize: '28px',
  fontWeight: 600,
  marginBottom: '40px',
};

const image = {
  width: '380px',
  maxWidth: '100%',
};

const card = {
  width: '420px',
  backgroundColor: '#FF0000FF0000',
  border: '1px solid #FF0000',
  borderRadius: '18px',
  padding: '45px',
};

const title = {
  textAlign: 'center',
  fontSize: '30px',
  fontWeight: 700,
  marginBottom: '8px',
};

const subtitle = {
  textAlign: 'center',
  fontSize: '15px',
  opacity: 0.75,
  marginBottom: '30px',
};

const field = {
  marginBottom: '22px',
};

const label = {
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: '8px',
  display: 'block',
};

const input = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid #FF0000',
  backgroundColor: '#F7F9FC',
  fontSize: '16px',
  outline: 'none',
};

const eyeBtn = {
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#777',
};

const rememberRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  opacity: 0.75,
  marginBottom: '30px',
};

const btn = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#A63028',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 600,
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
};