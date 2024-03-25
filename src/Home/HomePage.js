import React, { useEffect } from 'react';
import './HomePage.css';

function HomePage(props) {

  useEffect(()=>{
    console.log(props.loggedIn)
  })
  return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to Pirate Bank of Treasure Island</h1>
        <p>Your trusted financial partner</p>
      </header>
      <section className="services">
        <div className="service">
          <h2>Personal Banking</h2>
          <p>Explore our range of personal banking services tailored to your needs.</p>
          <button>Learn More</button>
        </div>
        <div className="service">
          <h2>Business Banking</h2>
          <p>Discover our comprehensive business banking solutions to help your business grow.</p>
          <button>Learn More</button>
        </div>
        <div className="service">
          <h2>Loans and Mortgages</h2>
          <p>Find the right loan or mortgage option for your needs with competitive rates.</p>
          <button>Learn More</button>
        </div>
      </section>
      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li>24/7 Online Banking</li>
          <li>Mobile Banking App</li>
          <li>Secure Transactions</li>
          <li>Financial Planning Services</li>
        </ul>
      </section>
      <section className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, please feel free to contact us.</p>
        <button>Contact</button>
      </section>
      <footer className="footer">
        <p>&copy; 2024 Bank Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
