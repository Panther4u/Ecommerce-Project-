import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Order.scss';

const OrderDatatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { _id: userId } = useSelector((state) => state.user.loginInfo); // Get userId from Redux store

  useEffect(() => {
    fetchOrderData();
  }, [userId]);

  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/orders', {
        params: { userId },
      });
      console.log('Fetched orders:', response.data); // Log fetched data
      const ordersWithId = response.data.map((order) => ({
        ...order,
        id: order._id, // Use _id for DataGrid
      }));
      setData(ordersWithId);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order data:', error);
      toast.error('Failed to fetch order data. Please try again.');
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/api/orders/${orderId}`);
      setData(data.filter((item) => item._id !== orderId)); // Update state after delete
      toast.success('Order deleted successfully!');
    } catch (error) {
      toast.error('Error deleting order. Please try again.');
      console.error('Error deleting order:', error);
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/orders/${params.row.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const orderColumns = [
    { field: '_id', headerName: 'Order ID', width: 200 },
    {
      field: 'userId',
      headerName: 'User ID',
      width: 200,
      renderCell: (params) => {
        const shortId = params.value ? params.value.slice(-12) : '-';
        return <span>{shortId}</span>;
      },
    },
    {
      field: 'billingInfo',
      headerName: 'Billing Info',
      width: 300,
      renderCell: (params) => {
        const { name, streetAddress, townCity, pincode } = params.value || {};
        return (
          <div>
            <span>{name || '-'}</span>
            <span>{streetAddress || '-'}</span>
            <span>{townCity || '-'}</span>
            <span>{pincode || '-'}</span>
          </div>
        );
      },
    },
    { field: 'totalProducts', headerName: 'Total Products', width: 200 },
    { field: 'deliveryMethod', headerName: 'Delivery Method', width: 200 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 200 },
    { field: 'transactionId', headerName: 'Transaction ID', width: 200 },
    {
      field: 'totalBillAmount',
      headerName: 'Total Bill Amount',
      width: 200,
      renderCell: (params) => <span>Rs. {params.value ? params.value.toFixed(2) : '-'}</span>,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      renderCell: (params) => {
        const date = params.value ? new Date(params.value) : null;
        return (
          <span>
            {date
              ? date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '-'}
          </span>
        );
      },
    },
    {
      field: 'orderDate',
      headerName: 'Order Date',
      width: 200,
      renderCell: (params) => {
        const date = params.value ? new Date(params.value) : null;
        return (
          <span>
            {date
              ? date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '-'}
          </span>
        );
      },
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={orderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default OrderDatatable;
