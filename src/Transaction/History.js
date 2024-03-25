import React, { useState, useEffect } from 'react';
import './History.css'; // Import CSS for styling
import axios from 'axios';
import Service from '../service';
import { useNavigate } from 'react-router-dom';

function TransactionHistory(props) {
  const navigate = useNavigate();
  const service = Service();
  const [transactions, setTransactions] = useState([]);
  const [filterTransactions,setfilterTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (!props.loggedIn) {
        navigate('/login');
    }
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(service.baseURL+'/api/transactions/',{
            params:{'accountNo':props.Profile.accountNo}
        });
        setTransactions(response.data);
        setfilterTransactions(response.data);
        console.log(filterTransactions)
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleFilter = async () => {
    try {
      setfilterTransactions(transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.dateOfTransaction).toISOString().split('T')[0];
        return transactionDate >= startDate && transactionDate <= endDate;
      }))
    } catch (error) {
      console.error('Error filtering transactions:', error);
    }
  };

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <div className="filter-container">
        <label htmlFor="start-date">Start Date:</label>
        <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label htmlFor="end-date">End Date:</label>
        <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {filterTransactions.slice().reverse().map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.dateOfTransaction).toLocaleString()}</td>
              <td className="description">{transaction.description}</td>
              <td className={`amount debit`}>{transaction.debit}</td>
              <td className={`amount credit`}>{transaction.credit}</td>
              <td className={`amount`}>{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;
