import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { API_BASE_URL } from 'src/api/index';

const Widget = ({ type }) => {
  const [data, setData] = useState(null);
  const [amount, setAmount] = useState(null);
  const [prevAmount, setPrevAmount] = useState(null);
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    fetchData();
  }, [type]); // Fetch data whenever type changes

  useEffect(() => {
    // Calculate percentage difference whenever the amount changes
    if (prevAmount !== null && amount !== null && prevAmount !== 0) {
      const difference = ((amount - prevAmount) / prevAmount) * 100;
      setDiff(difference.toFixed(2));
    }
    // Update previous amount to current amount after calculation
    setPrevAmount(amount);
  }, [amount]);

  const fetchData = async () => {
    try {
      let response;
      switch (type) {
        case 'user':
          response = await axios.get(`${API_BASE_URL}/api/totalUserCount`);
          setData({
            title: 'USERS',
            isMoney: false,
            link: 'See all users',
            icon: <PersonOutlinedIcon className="icon" style={{ color: 'crimson', backgroundColor: 'rgba(255, 0, 0, 0.2)' }} />,
          });
          setAmount(response.data.count); // Assuming response structure { count: ... }
          break;
        case 'order':
          response = await axios.get(`${API_BASE_URL}/api/totalUserOrderCount`);
          setData({
            title: 'ORDERS',
            isMoney: false,
            link: 'View all orders',
            icon: <ShoppingCartOutlinedIcon className="icon" style={{ backgroundColor: 'rgba(218, 165, 32, 0.2)', color: 'goldenrod' }} />,
          });
          setAmount(response.data.count); // Assuming response structure { count: ... }
          break;
        case 'earning':
          response = await axios.get(`${API_BASE_URL}/api/totalBillAmount`);
          setData({
            title: 'EARNINGS',
            isMoney: true,
            link: 'View net earnings',
            icon: <MonetizationOnOutlinedIcon className="icon" style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }} />,
          });
          setAmount(response.data.amount); // Assuming response structure { amount: ... }
          break;
        case 'balance':
          response = await axios.get(`${API_BASE_URL}/api/totalBalanceAmount`);
          setData({
            title: 'BALANCE',
            isMoney: true,
            link: 'See details',
            icon: <AccountBalanceWalletOutlinedIcon className="icon" style={{ backgroundColor: 'rgba(128, 0, 128, 0.2)', color: 'purple' }} />,
          });
          setAmount(response.data.amount); // Assuming response structure { amount: ... }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or display a message
    }
  };

  if (!data) return null; // Handle loading state or wait for initial fetch

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney ? `₹ ${amount !== null ? amount.toLocaleString() : 'Loading...'} -` : amount !== null ? amount : 'Loading...'}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff >= 0 ? 'positive' : 'negative'}`}>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
