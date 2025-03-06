import React, { useContext, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
import axios from 'axios'; // Added axios import
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import Swal from 'sweetalert2';

const list_users = 'https://speclink-backend.onrender.com/specLink/list_patients';
function ManagePatients() {
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);

  const fetchUsers = async () => {
    setLoad(true);
    try {
      const response = await axios.get(list_users);
      const data = response.data;
      setUsers(data);
      setLoad(false); 
    } catch (err) {
      console.log(err);
      setLoad(false); 
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const tableId = '#myTable';

      // Destroy existing DataTable if it exists
      if ($.fn.DataTable.isDataTable(tableId)) {
        $(tableId).DataTable().destroy();
      }

      // Initialize DataTable
      $(tableId).DataTable({
        destroy: true, 
      });
    }

    // Cleanup DataTable on component unmount
    return () => {
      if ($.fn.DataTable.isDataTable('#myTable')) {
        $('#myTable').DataTable().destroy();
      }
    };
  }, [users]);

  const handleDelete = (id, isUpdATING) => {
    try{
        axios.delete(`https://speclink-backend.onrender.com/specLink/delete_user/${id}`)
        setUsers(prev => prev.filter((user) => user.id !== id)); 
         Swal.fire({
            title: 'Doctor has been removed',
            icon: "error",
            timer: 6000,
            toast: true,
            position: 'top',
            timerProgressBar: true,
            showConfirmButton: false,
        })  
    }catch(err){
        console.log('err', err)
    }
  };

  const handleActiveChange = async (id, newStatus) => {
    try {
      // Find the user to update their loading state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isUpdating: true } : user
        )
      );
  
      // Make the API call to toggle the active status
      const response = await axios.patch(`https://speclink-backend.onrender.com/specLink/active_user/${id}`, {is_active:newStatus});
      
      if (response.status === 200) {
        // Update the user's is_active status in the state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id
              ? { ...user, is_active: !user.is_active, isUpdating: false }
              : user
          )
        );
  
        // Show success message
        Swal.fire({
          title: 'Status Updated',
          text: `User is now ${response.data.is_active ? 'Active' : 'Deactivated'}`,
          icon: 'success',
          timer: 3000,
          toast: true,
          position: 'top',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log('Error:', err);
  
      // Revert the loading state on error
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isUpdating: false } : user
        )
      );
  
      // Show error message
      Swal.fire({
        title: 'Error',
        text: 'Failed to update user status. Please try again.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };
  
  return (
    <>
      <div className="container-fluid px-5 p-2">
        <h6>
          <strong>Manage Patients</strong>
        </h6>

        <div className="doctor_table bg-white p-2 col-lg-12 table-responsive mb-5">
          <table id="myTable" className="table table-striped table-hover table-bordered">
            <thead>
              <tr className="table-striped">
                <th scope="col">Id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Joined</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {load ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    <h6>Loading...</h6>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    <h6>No Doctors Available</h6>
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const { id, email, first_name, last_name, is_active, date_joined } = user;
                  const JoinedPeriod = moment(date_joined).fromNow();
                  return (
                    <tr key={id}>
                      <th scope="row">{id}</th>
                      <td>{first_name}</td>
                      <td>{last_name}</td>
                      <td>{email}</td>
                      <td>{JoinedPeriod}</td>
                      <td>
                        <span
                            className={`activate p-1 rounded text-center ${
                            is_active ? 'text-white bg-success' : 'text-white bg-danger'
                            }`}
                            onClick={() => handleActiveChange(id, is_active ? false : true)}
                            style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
                        >
                            {user.isUpdating ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            ) : is_active ? (
                            'Active'
                            ) : (
                            'Deactivated'
                            )}
                        </span>
                        </td>
                      <td>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ManagePatients;