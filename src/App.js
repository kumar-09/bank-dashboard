import axios from 'axios';
import './App.css';
import { React, useState, useEffect } from 'react';
import AccountForm from './accountForm';

const App = () =>{

  const [userData, setUserData] = useState(null);

  const componentDidMount=() =>{
    // console.log('hello'); 
  };

  useEffect(()=>{
    let data;
    axios.get('http://localhost:8000/api/userdetail/123456789100/').then((res)=>{
      setUserData(res.data)
      console.log(res);
    }).catch((err)=>{
      console.log('hello world');
      if (err.response) {
        // The request was made and the server responded with a status code
        console.log('Server responded with error:', err.response.data);
        console.log('Status code:', err.response.status);
      } else if (err.request) {
        // The request was made but no response was received
        console.log('No response received:', err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error:', err.message);
      }
    }); 
  },[]);
  

  return (
    <div className="contaienr">
      <h1>Hello World</h1>
      <div>
        <AccountForm/>
      </div>
      <div>
        <h1>User Details</h1>
        {userData && (
          <div>
            <img src={userData.profile_image} alt="User" /> {/* Assuming 'image' is the key containing the image URL */}
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            {/* Add more user details as needed */}
          </div>
        )}
      </div>
    </div>
    
  )
}

export default App;
