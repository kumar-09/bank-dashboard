import {Routes, Route } from 'react-router-dom';
import './App.css';
import { React, useState } from 'react';
import HomePage from './Home/HomePage';
import LoginPage from './auth/LoginPage';
import NotFound from './NotFound';
import Navbar from './navbar/navbar';
import HomeLoanPage from './Loan/HomeLoan/HomeLoanPage';
import EducationLoanPage from './Loan/EducationLoan/EducationLoanPage';
import Logout from './auth/LogoutPage';
import ProfilePage from './auth/ProfilePage';
import RegisterPage from './auth/RegisterPage';
import TransactionHistory from './Transaction/History';
import TransferAmount from './Transaction/Transfer';

const App = () =>{

  const [loggedIn, setloggedIn] = useState(false)
  const [Profile, setProfile] = useState({})

  return (
    <div className="contaienr">
      <Navbar loggedIn={loggedIn}/>
      <Routes>
          <Route exact path="/" element = {<HomePage loggedIn={loggedIn} />} />
          <Route path="/login" element = {<LoginPage loggedIn={loggedIn} setloggedIn={setloggedIn} Profile={Profile} setProfile={setProfile}/>} />
          <Route path="/register" element = {<RegisterPage loggedIn={loggedIn} setloggedIn={setloggedIn} setProfile={setProfile}/>} />
          <Route path="/logout" element = {<Logout loggedIn={loggedIn} setloggedIn={setloggedIn} Profile={Profile}/>} />
          <Route path="/profile" element = {<ProfilePage loggedIn={loggedIn} setloggedIn={setloggedIn} Profile={Profile} />} />
          <Route path="/homeLoan" element = {<HomeLoanPage loggedIn={loggedIn} Profile={Profile}/>} />
          <Route path="/educationLoan" element = {<EducationLoanPage loggedIn={loggedIn} Profile={Profile}/>} />
          <Route path="/transfer_amount" element = {<TransferAmount loggedIn={loggedIn} Profile={Profile}/>} />
          <Route path="/transaction_history" element = {<TransactionHistory loggedIn={loggedIn} Profile={Profile}/>} />
          <Route component={NotFound} />
      </Routes>
    </div>
    
  )
}

export default App;
