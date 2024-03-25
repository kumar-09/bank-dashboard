import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 

function Navbar(props) {
  console.log(props.loggedIn)
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src="../assets/bank-logo.png" alt="Bank Logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <div className="dropdown">
          <button className="dropbtn">Loans</button>
          <div className="dropdown-content">
            <Link to="/homeLoan">Home Loan</Link>
            <Link to="/educationLoan">Education Loan</Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Transactions</button>
          <div className="dropdown-content">
            <Link to="/transfer_amount">Transfer Amount</Link>
            <Link to="/transaction_history">Transation History</Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Account</button>
          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      </div>
      <div className="navbar-right">
        {
          props.loggedIn ?(<Link to="/logout" className="login-btn">Logout</Link>):(<Link to="/login" className="login-btn">Login</Link>)
        }
        
      </div>
    </nav>
  );
}

export default Navbar;
