import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from 'react-router-dom';
import { API_BASE_URL } from 'src/api/index';

const Widget = ({ type }) => {
  const [data, setData] = useState(null);
  const [amount, setAmount] = useState(null);
  const [prevAmount, setPrevAmount] = useState(null);
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    fetchData();
  }, [type]);

  useEffect(() => {
    if (prevAmount !== null && amount !== null && prevAmount !== 0) {
      const difference = ((amount - prevAmount) / prevAmount) * 100;
      setDiff(difference.toFixed(2));
    }
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
          setAmount(response.data.count);
          break;
        case 'order':
          response = await axios.get(`${API_BASE_URL}/api/totalUserOrderCount`);
          setData({
            title: 'ORDERS',
            isMoney: false,
            link: 'View all orders',
            icon: <ShoppingCartOutlinedIcon className="icon" style={{ backgroundColor: 'rgba(218, 165, 32, 0.2)', color: 'goldenrod' }} />,
          });
          setAmount(response.data.count);
          break;
        case 'earning':
          response = await axios.get(`${API_BASE_URL}/api/totalBillAmount`);
          setData({
            title: 'EARNINGS',
            isMoney: true,
            link: 'View net earnings',
            icon: <MonetizationOnOutlinedIcon className="icon" style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }} />,
          });
          setAmount(response.data.amount);
          break;
        case 'balance':
          response = await axios.get(`${API_BASE_URL}/api/totalBalanceAmount`);
          setData({
            title: 'BALANCE',
            isMoney: true,
            link: 'See details',
            icon: <AccountBalanceWalletOutlinedIcon className="icon" style={{ backgroundColor: 'rgba(128, 0, 128, 0.2)', color: 'purple' }} />,
          });
          setAmount(response.data.amount);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!data) return null;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney ? `₹ ${amount !== null ? amount.toLocaleString() : 'Loading...'}` : amount !== null ? amount : 'Loading...'}
        </span>
        <span className="link">
          {type === 'order' && <Link to="/orderlist">{data.link}</Link>}
          {type === 'user' && <Link to="/users">{data.link}</Link>}
          {/* Add more conditions here for other types if needed */}
        </span>
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
