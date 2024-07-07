import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [targetRevenue, setTargetRevenue] = useState(0);
  const [lastWeekRevenue, setLastWeekRevenue] = useState(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      // Fetch total revenue
      const totalResponse = await axios.get('http://localhost:8000/api/totalBillAmount');
      setTotalRevenue(totalResponse.data.amount);

      // Fetch target revenue
      const targetResponse = await axios.get('http://localhost:8000/api/targetRevenue');
      setTargetRevenue(targetResponse.data.amount);

      // Fetch last week's revenue
      const lastWeekResponse = await axios.get('http://localhost:8000/api/lastWeekRevenue');
      setLastWeekRevenue(lastWeekResponse.data.amount);

      // Fetch last month's revenue
      const lastMonthResponse = await axios.get('http://localhost:8000/api/lastMonthRevenue');
      setLastMonthRevenue(lastMonthResponse.data.amount);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={(totalRevenue / targetRevenue) * 100} text={`${((totalRevenue / targetRevenue) * 100).toFixed(2)}%`} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">Rs. {totalRevenue.toLocaleString()} -</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className={`itemResult ${totalRevenue < targetRevenue ? 'negative' : 'positive'}`}>
              {totalRevenue < targetRevenue ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowUpOutlinedIcon fontSize="small" />}
              <div className="resultAmount">Rs. {targetRevenue.toLocaleString()} -</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">Rs. {lastWeekRevenue.toLocaleString()} -</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">Rs. {lastMonthRevenue.toLocaleString()} -</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
