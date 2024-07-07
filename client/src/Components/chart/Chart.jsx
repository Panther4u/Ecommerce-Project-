import "./chart.scss";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Chart = ({ aspect = 16 / 9, title = "Chart Title" }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/revenue');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching chart data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="second-chart-total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="gray"
            allowDataOverflow={false}
            interval={0}
            padding={{ left: 0, right: 0 }}
            tick={{ fontSize: 12, fill: "gray" }}
            type="category"
          />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip
            formatter={(value) => Number(value).toLocaleString() + ' /-'} // Format tooltip value with commas
          />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#second-chart-total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
