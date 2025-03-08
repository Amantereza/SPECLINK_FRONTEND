import React, { useContext, useEffect, useState } from 'react';
import Nav from '../DoctorNav/nav';
import { AuthContext } from '../../AuthContext/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import useHook from '../../CustomHook/useHook';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

const BASE_URL = 'https://speclink-backend.onrender.com/specLink/';

function DoctorAppointments() {
  const {patientAppointments, appointLoader, setPatientAppointments} = useHook()
  const { user } = useContext(AuthContext);
  const DELETE_APPOINTMENT_URL = `${BASE_URL}delete_appointments`;
  const CHANGE_STATUS_URL = `${BASE_URL}change_appointment_status`;
  const [statusLoaders, setStatusLoaders] = useState({});
 
  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${DELETE_APPOINTMENT_URL}/${id}`);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Appointment deleted successfully!',
          icon: 'success',
          timer: 3000,
          toast: true,
          position: 'top',
          timerProgressBar: true,
          showConfirmButton: false,
        });
       setPatientAppointments((prev) =>
       prev.filter(appoint => appoint.id !== id)
      )
      
      }
    } catch (err) {
      console.error('Error deleting appointment:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to delete appointment.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    }
  };

  // Change status
  const changeStatus = async (id, newStatus) => {
    setStatusLoaders((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await axios.patch(`${CHANGE_STATUS_URL}/${id}`, { status: newStatus });
      
      if (response.status === 200) {
        console.log(response)
        Swal.fire({
          title: 'Success',
          text: `Status updated to ${newStatus}!`,
          icon: 'success',
          timer: 3000,
          toast: true,
          position: 'top',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      
        setPatientAppointments((prev) =>
        prev.map(appoint =>(
          appoint.id === id ? {...appoint, status:newStatus} : appoint
        ))
        )
      }
    } catch (err) {
      console.error('Error changing status:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to update status.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    } finally {
      setStatusLoaders((prev) => ({ ...prev, [id]: false }));
    }
  };

  
  useEffect(() => {
    if (patientAppointments.length > 0) {
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
  }, [patientAppointments]);

  return (
    <>
      <Nav />
      <div className="container">
        <h4>
          <strong>Patient Appointments</strong>
        </h4>

        <div className="row">
          {appointLoader ? (
            <div>
              <div className='loader'></div>
              <h6 className='text-center'>Loading appointments...</h6>
            </div>
          ) : patientAppointments.length === 0 ? (
            <h6>No Appointments</h6>
          ) : (
            <div className="col-lg-12 col-sm-12 table-container table-responsive">
              <table id='myTable' className="highlight responsive-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patientAppointments.map((appoint) => {
                    const { id, user, date, time, status, reason } = appoint;
                    const dateObj = new Date(date);
                    const formattedDate = dateObj.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });

                    return (
                      <tr key={id}>
                        <td>{user.first_name} {user.last_name}</td>
                        <td>{formattedDate}</td>
                        <td>{time}</td>
                        <td>{reason}</td>
                        <td>
                          {statusLoaders[id] ? (
                            <div className="orderloader">Loading...</div>
                          ) : status === 'Approved' ? (
                            <span className="text-success d-flex">
                              <i className="bi bi-check2-circle"></i> Approved
                            </span>
                          ) : status === 'Cancelled' ? (
                            <span className="text-danger">Cancelled</span>
                          ) : status === 'Pending' ? (
                            <span className="text-warning d-flex">
                              <i className="bi bi-arrow-counterclockwise"></i> Pending
                            </span>
                          ) : (
                            <span className="text-secondary">
                              <i className="fa fa-spinner"></i> Waiting
                            </span>
                          )}
                        </td>
                        <td className='d-flex'>
                          <div className="dropdown ms-4">
                            <button
                              className="btn border dropdown-toggle"
                              type="button"
                              id={`statusDropdown${id}`}
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Status
                            </button>
                            <div
                              className="dropdown-menu"
                              aria-labelledby={`statusDropdown${id}`}
                            >
                              <button
                                className="dropdown-item"
                                onClick={() => changeStatus(id, 'Cancelled')}
                              >
                                Cancelled
                              </button>
                              <button
                                className="dropdown-item"
                                onClick={() => changeStatus(id, 'Approved')}
                              >
                                Approved
                              </button>
                              <button
                                className="dropdown-item"
                                onClick={() => changeStatus(id, 'Pending')}
                              >
                                Pending
                              </button>
                            </div>
                          </div>
                          <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(id)}>
                            <DeleteIcon color="error"/>
                          </IconButton>
                        </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <h5>Contact & Support</h5>
          <p>Email: support@speclink.com</p>
          <p>Phone: +256 123 456 789</p>
        </div>
        <div className="footer-copyright">
          <p>© 2025 SPEC-LINK | All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}

export default DoctorAppointments;