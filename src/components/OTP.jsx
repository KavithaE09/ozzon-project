import React, { useState, useRef } from 'react';
import loginhouse from '../assets/loginhouse.png';
import ozzonlogo from '../assets/ozzonlogo.jpeg';

export default function OTP() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;
        const handleKeyDown = (e, index) => {
            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        };

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '1400px',
                    display: 'flex',
                    gap: '60px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap', // ✅ responsive
                }}
            >
                {/* LEFT SECTION */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        maxWidth: '500px',
                        width: '100%',
                    }}
                >
                    <img
                        src={ozzonlogo}
                        alt="logo"
                        style={{
                            width: '220px',
                            marginBottom: '16px',
                        }}
                    />

                    <div
                        style={{
                            fontWeight: '600',
                            fontSize: '26px',
                            marginBottom: '30px',
                        }}
                    >
                        Ozzon Management
                    </div>

                    <img
                        src={loginhouse}
                        alt="Container House"
                        style={{
                            width: '100%',
                            maxWidth: '420px',
                        }}
                    />
                </div>

                {/* RIGHT OTP BOX */}
                <div
                    style={{
                        width: '100%',
                        maxWidth: '380px',
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        padding: '32px',
                        border: '1px solid #F87171',
                    }}
                >
                    <h2
                        style={{
                            textAlign: 'center',
                            fontSize: '26px',
                            fontWeight: '700',
                            marginBottom: '10px',
                        }}
                    >
                        OTP
                    </h2>

                    <p
                        style={{
                            textAlign: 'center',
                            fontSize: '14px',
                            opacity: 0.75,
                            marginBottom: '6px',
                        }}
                    >
                        Please enter your OTP to continue
                    </p>

                    <p
                        style={{
                            textAlign: 'center',
                            fontSize: '13px',
                            opacity: 0.75,
                            marginBottom: '22px',
                        }}
                    >
                        Enter the OTP sent to <b>+91 98765XXXX</b>
                    </p>

                    {/* OTP INPUTS */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '8px',
                            marginBottom: '18px',
                        }}
                    >
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={value}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                style={{
                                    width: '100%',
                                    maxWidth: '44px',
                                    height: '44px',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                    borderRadius: '8px',
                                    border: '1px solid #F87171',
                                    outline: 'none',
                                }}
                            />
                        ))}

                    </div>

                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '13px',
                            marginBottom: '10px',
                        }}
                    >
                        00:20 Sec
                    </div>

                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '13px',
                            marginBottom: '22px',
                        }}
                    >
                        Don’t receive code?{' '}
                        <span style={{ color: '#A63028', cursor: 'pointer' }}>
                            Re-send
                        </span>
                    </div>

                    <button
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
                        }}
                    >
                        OTP Verify
                    </button>
                </div>
            </div>
        </div>
    );
}