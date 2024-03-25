import React, { useState, useEffect } from 'react';
import './Transfer.css'; // Import CSS for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons/fa
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import Service from '../service';
// let { User, baseURL, service } = require('../service');

function TransferAmount(props) {
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
    if(!isCaptchaCorrect){
        alert('Enter Correct Captcha')
    }
    event.preventDefault();
    axios.post(service.baseURL+'/api/transactions/',
      {
        'from_accountNo': props.Profile.accountNo,
        'to_accountNo' : event.target.to_accountNo.value,
        'amount': event.target.amount.value,
        'password' : event.target.password.value
      }).then((res)=>{
        alert(res.data.success)
        console.log(res)
      }).catch((err)=>{
        alert(err.response.data.error)
      })
  };

  useEffect(() => {
    console.log(service.baseURL)
    generateCaptcha();
    if (!props.loggedIn) {
      navigate('/login');
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
    <div className="transfer-page">
      <div className="transfer-container">
        <div className="transfer-header">
          <h2>Transfer Fund</h2>
        </div>
        <div className="transfer-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="to_accountNo">Account Number</label>
              <input type="text" id="to_accountNo" name="to_accountNo" placeholder="Enter Account Number" required />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Enter Amount</label>
              <input type="text" id="amount" name="amount" placeholder="Enter your Amount to transfer" required />
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
            <button type="submit" className="transfer-btn" disabled={!isCaptchaCorrect}>Transfer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TransferAmount;
