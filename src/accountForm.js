import React, { useState } from 'react';
import axios from 'axios';

function AccountForm() {
  const [formData, setFormData] = useState({
    accountNo: '',
    name: '',
    email: '',
    gender: 'm', // Defaulting to 'm' for male
    dob: '',
    accountType: 's' // Defaulting to 's' for savings
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);
      console.log('Response:', response.data);
      // Optionally handle success response
    } catch (error) {
      console.error('Error:', error);
      // Optionally handle error response
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Account Number:
        <input type="text" name="accountNo" value={formData.accountNo} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Account Type:
        <select name="accountType" value={formData.accountType} onChange={handleChange} required>
          <option value="s">Savings</option>
          <option value="c">Current</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AccountForm;
