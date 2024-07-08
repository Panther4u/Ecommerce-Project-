import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDatatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/orders");
      const usersWithId = response.data.map((user) => ({
        ...user,
        id: user._id, // Use _id for DataGrid
      }));
      setData(usersWithId);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (userId) => {
    // console.log(`Attempting to delete user with id: ${userId}`); // Log id being passed
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      setData(data.filter((item) => item._id !== userId)); // Update state after delete
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user. Please try again.");
      console.error("Error deleting user:", error);
    }
  };
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={orderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id} // Use id after mapping
      />
    </div>
  );
};

export default OrderDatatable;
