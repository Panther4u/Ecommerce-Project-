import React, { useEffect, useState } from 'react';
import s from "./table.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';

const List = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/orders');
        setRows(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <TableContainer component={Paper} className={s.table}>
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={s.tableCell}>PaymentId</TableCell>
            <TableCell className={s.tableCell}>Product</TableCell>
            <TableCell className={s.tableCell}>Customer</TableCell>
            <TableCell className={s.tableCell}>Date</TableCell>
            <TableCell className={s.tableCell}>Amount</TableCell>
            <TableCell className={s.tableCell}>Payment Method</TableCell>
            <TableCell className={s.tableCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className={s.tableCell}>{row.paymentId}</TableCell>
              <TableCell className={s.tableCell}>
                <div className={s.cellWrapper}>
                  {row.cartProducts[0]?.img ? (
                    <img 
                      src={`http://localhost:8000/${row.cartProducts[0]?.img}`} 
                      alt={row.cartProducts[0]?.name} 
                      className={s.image} 
                    />
                  ) : (
                    <img 
                      src="/path/to/placeholder-image.jpg" 
                      alt="Placeholder" 
                      className={s.image} 
                    />
                  )}
                  {row.cartProducts[0]?.name}
                </div>
              </TableCell>
              <TableCell className={s.tableCell}>{row.billingInfo.firstName}</TableCell>
              <TableCell className={s.tableCell}>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className={s.tableCell}>
                ₹ {row.totalAmount.toFixed(2)}
              </TableCell>
              <TableCell className={s.tableCell}>{row.paymentMethod}</TableCell>
              <TableCell className={s.tableCell}>
                <span className={`${s.status} ${s[row.status]}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
