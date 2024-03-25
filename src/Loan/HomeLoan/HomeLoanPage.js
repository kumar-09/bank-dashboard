import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Service from '../../service';
import './HomeLoanPage.css'

function HomeLoanPage(props) {
  const navigate = useNavigate();
  const [service] = useState(Service());
  const [formData, setFormData] = useState({
    accountNo: props.Profile.accountNo,
    name: '',
    fathers_name: '',
    mobile_no: '',
    address: '',
    application_type: 'home_loan',
    amount: '',
  });

  useEffect(() => {
    if (!props.loggedIn) {
      navigate('/login');
    }
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    axios.post(service.baseURL+'/api/applications/',formData).then((res)=>{
      alert(res.statusText)
      navigate('/');
    }).catch((err)=>{
      alert(err.response.data.error)
      console.log(err)
    })
  };

  return (
    <div className="home-loan-page">
      <h2>Welcome to our Home Loan Service</h2>
      <p>Here at Pirate Bank of Treasure Island, we offer competitive home loan options tailored to your needs.</p>

      <div className="loan-info">
        <h3>Loan Information</h3>
        <p>Our home loan options feature:</p>
        <ul>
          <li>Competitive interest rates of 1.5%</li>
          <li>Flexible repayment terms</li>
          <li>Quick and easy application process</li>
        </ul>
      </div>

      <div className="loan-images">
        <img src="../assets/home-loan1.jpeg" alt="House" />
      </div>

      <div className="home-loan-form">
        <h3>Apply for Home Loan</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="fathers_name" placeholder="Father's Name" value={formData.fathers_name} onChange={handleChange} required />
          <input type="text" name="mobile_no" placeholder="Mobile No." value={formData.mobile_no} onChange={handleChange} required />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required></textarea>
          <select name="amount" value={formData.amount} onChange={handleChange} required>
            <option value="">Select Loan Amount</option>
            <option value="100000">1,00,000 INR</option>
            <option value="200000">2,00,000 INR</option>
            <option value="500000">5,00,000 INR</option>
          </select>
          <button type="submit">Apply</button>
        </form>
      </div>
    </div>
  );
}

export default HomeLoanPage;
