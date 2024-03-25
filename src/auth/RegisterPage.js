import React, { useEffect, useState } from 'react';
import './RegisterPage.css'; // Import CSS for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons/fa
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function RegisterPage(props) {  
  const [formData, setFormData] = useState({
    name: '',
    fathers_name: '',
    mobile_no: '',
    email: '',
    gender: '',
    accountType: '',
    dob: '',
    profile_image:null,
    password: '',
    confirmPassword:''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if (props.loggedIn) {
        navigate('/');
    }
  })
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] }); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('fathers_name', formData.fathers_name);
    formDataToSend.append('mobile_no', formData.mobile_no);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('dob', formData.dob);
    formDataToSend.append('accountType', formData.accountType);
    formDataToSend.append('profile_image', formData.profile_image);
    formDataToSend.append('password', formData.password);
    
    axios.post('http://127.0.0.1:8000/api/register/',formDataToSend).then((res)=>{
        props.setloggedIn(true)
        props.setProfile(res)
        console.log(res)
        alert(`Your Account No. is ${res.data.accountNo}`)
        navigate('/');
      }).catch((err)=>{
        console.log(err)
      })
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h2>Register</h2>
        </div>
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
                <fieldset id="personal_detail">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                    <label htmlFor="fathersName">Father's Name</label>
                    <input type="text" id="fathersName" name="fathers_name" value={formData.fathers_name} onChange={handleChange} required />

                    <label htmlFor="mobileNo">Mobile Number</label>
                    <input type="text" id="mobileNo" name="mobile_no" value={formData.mobile_no} onChange={handleChange} required />
                    
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </fieldset>
                <fieldset id="gender_type">
                    <legend>Gender</legend>
                    <label> <input type="radio" name="gender" id="male" value="m" onChange={handleChange} required/> Male </label>
                    <label> <input type="radio" name="gender" id="female" value="f"  onChange={handleChange} required/> Female </label>
                </fieldset>
                <fieldset id="account_type">
                    <legend>Account Type</legend>
                    <label> <input type="radio" name="accountType" id="saving" value="s" onChange={handleChange} required/> Saving </label>
                    <label> <input type="radio" name="accountType" id="current" value="c" onChange={handleChange} required/> Current </label>
                </fieldset>
                <fieldset id='profile'>
                    <label htmlFor="profileImage">Profile Image</label>
                    <input type="file" id="profile_image" name="profile_image" accept="image/*" onChange={handleImageChange} />
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                    
                </fieldset>
                <fieldset id='password'>
                <label htmlFor="password">Password</label>
                    <div className="password-input">
                        <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} required />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="text" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </fieldset>
            </div>
            <button type="submit" className="register-btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
