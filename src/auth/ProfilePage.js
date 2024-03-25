import React, { useEffect } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import Service from '../service';
// let { User, baseURL,Service } = require('../service');

function ProfilePage(props) {
    const navigate = useNavigate();
    const service =Service();
    
    useEffect(()=>{
      // console.log(service.loggedIn)
        if (!props.loggedIn) {
            navigate('/login');
        }
    })

    const logout=()=>{
        props.setloggedIn(false)
        navigate('/')
    }
    
    
    const { name, mobile_no, fathers_name, accountNo, dob, accountOpened, gender, accountType, email, profile_image} = props.Profile;
    // User = props.Profile;



  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>Profile</h2>
        <button onClick={logout} className="logout-btn"><FaSignOutAlt /> Logout</button>
      </div>
      <div className="profile-content">
        <div className="profile-image">
          {
            (profile_image !== null)?<img src={service.baseURL+profile_image} alt={name} className="user-image" />:<FaUserCircle className="user-icon" />
          }
        </div>
        <div className="profile-details">
          <h3>{name}</h3>
          <div className="detail-item">
            <span className="label">Account No:</span>
            <span className="value">{accountNo}</span>
          </div>
          <div className="detail-item">
            <span className="label">Mobile No:</span>
            <span className="value">{mobile_no}</span>
          </div>
          <div className="detail-item">
            <span className="label">Father's Name:</span>
            <span className="value">{fathers_name}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Date of Birth:</span>
            <span className="value">{dob}</span>
          </div>
          <div className="detail-item">
            <span className="label">Gender:</span>
            <span className="value">{gender === 'm' ? 'Male' : 'Female'}</span>
          </div>
          <div className="detail-item">
            <span className="label">Account Type:</span>
            <span className="value">{accountType === 'c' ? 'Current' : 'Saving'}</span>
          </div>
          <div className="detail-item">
            <span className="label">Email:</span>
            <span className="value">{email}</span>
          </div>
          <div className="detail-item">
            <span className="label">Account Opening Date:</span>
            <span className="value">{accountOpened}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
