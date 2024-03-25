import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Service from '../../service';
import './EducationLoanPage.css';

function EducationLoanPage(props) {
  const navigate = useNavigate();
  const [service] = useState(Service());
  const [formData, setFormData] = useState({
    accountNo: props.Profile.accountNo,
    name: '',
    fathers_name: '',
    mobile_no: '',
    address: '',
    application_type: 'education_loan',
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
    axios.post(service.baseURL+'/api/applications/',formData).then((res)=>{
      alert(res.statusText)
      navigate('/');
    }).catch((err)=>{
      alert(err.response.data.error)
      console.log(err)
    })
  };

  return (
    <div className="education-loan-page">
      <div className="loan-info">
        <h2>Education Loan</h2>
        <p>Explore our education loan schemes with attractive interest rates and flexible repayment options.</p>
        <div className="common-image">
          <img src="../assets/edu-loan1.jpg" alt="Education" />
        </div>
        <div className="loan-schemes">
          <div className="scheme">
            <h3>Scheme 1</h3>
            <p>Interest Rate: 8%</p>
            <p>Loan Amount: Up to 50,000 INR</p>
            <p>Repayment Period: 5 years</p>
          </div>
          <div className="scheme">
            <h3>Scheme 2</h3>
            <p>Interest Rate: 9%</p>
            <p>Loan Amount: Up to 1,00,000 INR</p>
            <p>Repayment Period: 7 years</p>
          </div>
          <div className="scheme">
            <h3>Scheme 3</h3>
            <p>Interest Rate: 10%</p>
            <p>Loan Amount: Up to 5,00,000 INR</p>
            <p>Repayment Period: 10 years</p>
          </div>
        </div>
      </div>
      <div className="edu-loan-form">
        <h2>Apply for Education Loan</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="fathers_name">Father's Name:</label>
            <input type="text" id="fathers_name" name="fathers_name" value={formData.fathers_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_no">Mobile No.:</label>
            <input type="text" id="mobile_no" name="mobile_no" value={formData.mobile_no} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Loan Amount:</label>
            <select id="amount" name="amount" value={formData.amount} onChange={handleChange} required>
              <option value="">Select Loan Amount</option>
              <option value="50000">50,000 INR</option>
              <option value="100000">1,00,000 INR</option>
              <option value="500000">5,00,000 INR</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EducationLoanPage;
