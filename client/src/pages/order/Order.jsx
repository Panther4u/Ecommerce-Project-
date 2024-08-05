import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Order.scss';
import { useSelector } from 'react-redux';

const OrderDatatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { _id: userId } = useSelector((state) => state.user.loginInfo);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Fetched orders:', response.data);
      const ordersWithId = response.data.map((order) => ({
        ...order,
        id: order._id,
      }));
      setData(ordersWithId);
    } catch (error) {
      console.error('Error fetching order data:', error);
      toast.error('Failed to fetch order data. Please try again.');
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setData(data.filter((item) => item.id !== orderId));
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
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/orderdetails/${params.row.id}`} style={{ textDecoration: 'none' }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
            Delete
          </div>
        </div>
      ),
    },
  ];

  const orderColumns = [
    { field: 'id', headerName: 'Order ID', width: 200 },
    {
      field: 'userId',
      headerName: 'User ID',
      width: 200,
      renderCell: params => <span>{params.value?.slice(-12) || '-'}</span>
    },
    {
      field: 'billingInfo',
      headerName: 'Billing Info',
      width: 300,
      renderCell: (params) => {
        const { firstName, streetAddress, townCity, pincode } = params.value || {};
        return (
          <div className='billingInfo'>
            <span>{firstName || '-'}</span>
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
    { field: 'paymentId', headerName: 'Transaction ID', width: 200 },
    { 
      field: 'totalAmount', 
      headerName: 'Total Bill Amount', 
      width: 200, 
      renderCell: params => <span>Rs.{params.value?.toFixed(2) || '-'}</span> 
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: params => {
        const statusClasses = {
          Pending: 'pending',
          Processing: 'processing',
          Shipped: 'shipped',
          Delivered: 'delivered',
        };
        const statusColor = statusClasses[params.value] || 'default';
        return <span className={`status ${statusColor}`}>{params.value || '-'}</span>;
      }
    },
    {
      field: 'createdAt',
      headerName: 'Order Date',
      width: 200,
      renderCell: params => {
        const date = params.value ? new Date(params.value) : null;
        return (
          <span>
            {date
              ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
              : '-'}
          </span>
        );
      }
    }
  ];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
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
