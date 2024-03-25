import React, { useState, useEffect } from 'react';
import './LoginPage.css'; // Import CSS for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons/fa
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import Service from '../service';
// let { User, baseURL, service } = require('../service');

function LoginPage(props) {
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isCaptchaCorrect, setIsCaptchaCorrect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [service] = useState(Service());

  
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  const handleCaptchaChange = (event) => {
    setCaptchaInput(event.target.value);
    setIsCaptchaCorrect(event.target.value.toUpperCase() === captcha.toUpperCase());
  };
  const randomRotation = () => {
    return Math.floor(Math.random() * 101) - 50;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(service.baseURL+'/api/login/',
      {
        'accountNo' : event.target.accountNo.value,
        'password' : event.target.password.value
      }).then((res)=>{
        props.setloggedIn(true)
        // service.updateloggedIn(true)
        props.setProfile(res.data)
        // service.updateUser(res.data)
        navigate('/');
      }).catch((err)=>{
        console.log(err)
      })
  };

  useEffect(() => {
    console.log(service.baseURL)
    generateCaptcha();
    if (props.loggedIn) {
      navigate('/');
    }
  },[]);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to generate a random color
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userID">Account Number</label>
              <input type="text" id="userID" name="accountNo" placeholder="Enter your Account Number" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Enter your password" required />
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="captcha">Enter the text you see below:</label>
              <div className="captcha-container">
                <div className="captcha">
                  {captcha.split('').map((char, index) => (
                    <span key={index} className="captcha-char" style={{ color: randomColor(), transform: `rotate(${randomRotation()}deg)` }}>{char}</span>
                  ))}
                </div>
                <input type="text" id="captcha" name="captcha" value={captchaInput} onChange={handleCaptchaChange} maxLength="5" required />
              </div>
            </div>
            <button type="submit" className="login-btn" disabled={!isCaptchaCorrect}>Login</button>
          </form>
          <p>Already have an account<Link to="/register">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
