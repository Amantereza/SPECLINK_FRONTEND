import React, { useContext, useEffect, useState } from 'react';
import Nav from '../../Doctor/DoctorNav/nav';
import { AuthContext } from '../../AuthContext/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import useHook from '../../CustomHook/useHook';
import '../Appointments/appoint.css';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const BASE_URL = 'https://speclink-backend.onrender.com/specLink/';
const POST_APPOINTMENT_URL = `${BASE_URL}post_appointements`;
const DOCTOR_LIST_URL = `${BASE_URL}list_doctors`;
const DELETE_APPOINTMENTS_URL = `${BASE_URL}delete_appointments`;
const EDIT_APPOINTMENT_URL = `${BASE_URL}edit_appointements`;

function PatientAppointments() {
  const { user } = useContext(AuthContext);
  const { appointments, appointmentLoad, fetchAppointment, setAppointments } = useHook();

  const [createAppointment, setCreateAppointment] = useState({
    user: user?.user_id,
    doctor: '',
    time: '',
    reason: '',
    date: '',
  });
  const [editAppointment, setEditAppointment] = useState({
    id: '',
    user: user?.user_id,
    doctor: '',
    time: '',
    reason: '',
    date: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctorLoad, setDoctorLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [tableKey, setTableKey] = useState(0);
  const [createLoading, setCreateLoading] = useState(false); // Loading state for create
  const [updateLoading, setUpdateLoading] = useState(false); // Loading state for update

  // Fetch doctors
  const fetchDoctors = async () => {
    setDoctorLoad(true);
    try {
      const response = await axios.get(DOCTOR_LIST_URL);
      setDoctors(response.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to load doctors.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    } finally {
      setDoctorLoad(false);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchDoctors();
    }
  }, [user?.user_id]);

  // Handle input change for create appointment
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateAppointment((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input change for edit appointment
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAppointment((prev) => ({ ...prev, [name]: value }));
  };

  // Create appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateLoading(true); // Start loading
    try {
      const response = await axios.post(POST_APPOINTMENT_URL, createAppointment);
      if (response.status === 201) {
        Swal.fire({
          title: 'Success',
          text: 'Appointment created successfully!',
          icon: 'success',
          timer: 3000,
          toast: true,
          position: 'top',
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Update appointments state and force table re-render
        await fetchAppointment();
        setTableKey((prev) => prev + 1);

        setShowModal(false);
        setCreateAppointment({ user: user?.user_id, doctor: '', time: '', reason: '', date: '' });
      }
    } catch (err) {
      console.error('Error creating appointment:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to create appointment.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    } finally {
      setCreateLoading(false); // Stop loading
    }
  };

  // Edit appointment
  const handleEdit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true); // Start loading
    const { id, ...editPayload } = editAppointment;
    try {
      const response = await axios.put(`${EDIT_APPOINTMENT_URL}/${id}`, editPayload);
      if (response.status === 201) {
        Swal.fire({
          title: 'Success',
          text: 'Appointment updated successfully!',
          icon: 'success',
          timer: 3000,
          toast: true,
          position: 'top',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setEditModal(false);
        await fetchAppointment();
      }
    } catch (err) {
      console.error('Error updating appointment:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to update appointment.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    } finally {
      setUpdateLoading(false); // Stop loading
    }
  };

  // Delete appointment
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${DELETE_APPOINTMENTS_URL}/${id}`);
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
        setAppointments((prev) => prev.filter((appt) => appt.id !== id));
        setTableKey((prev) => prev + 1);
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

  // Open edit modal with appointment data
  const openEditModal = (appointment) => {
    setEditAppointment({
      id: appointment.id,
      user: user?.user_id,
      doctor: appointment.doctor.id,
      time: appointment.time,
      reason: appointment.reason || '',
      date: appointment.date,
    });
    setEditModal(true);
  };

  // Search functionality
  const filteredAppointments = appointments.filter((appointment) =>
    `${appointment.doctor.first_name} ${appointment.doctor.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Sorting functionality
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue =
      sortConfig.key === 'date'
        ? new Date(a[sortConfig.key])
        : sortConfig.key === 'doctor'
        ? `${a.doctor.first_name} ${a.doctor.last_name}`
        : a[sortConfig.key];
    const bValue =
      sortConfig.key === 'date'
        ? new Date(b[sortConfig.key])
        : sortConfig.key === 'doctor'
        ? `${b.doctor.first_name} ${b.doctor.last_name}`
        : b[sortConfig.key];
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentAppointments = sortedAppointments.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(sortedAppointments.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setTableKey((prev) => prev + 1);
  };

  return (
    <>
      <Nav />
      <div className="appoint-wrapper">
        <div className="appoint_header d-flex mt-3 row justify-content-center">
          <div className="col-lg-9 p-2 d-flex appoint_header">
            <h4>
              <strong>Appointments</strong>
            </h4>
            <button className="btn btn-primary ms-auto" onClick={() => setShowModal(true)}>
              Create Appointment
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="row appoint_row mb-3 mt-2">
          <div className="col-lg-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search by doctor name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="row appoint_row">
          <div className="col-lg-10 table-responsive bg-white p-2 mt-3">
            {appointmentLoad ? (
              <div className="text-center">
                <div className="loader"></div>
                <p>Loading appointments...</p>
              </div>
            ) : (
              <>
                <table
                  key={tableKey}
                  className="table table-hover table-bordered table-striped highlight"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col" onClick={() => handleSort('doctor')}>
                        Doctor {sortConfig.key === 'doctor' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th scope="col" onClick={() => handleSort('date')}>
                        Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th scope="col" onClick={() => handleSort('time')}>
                        Time {sortConfig.key === 'time' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th scope="col">Reason</th>
                      <th scope="col" onClick={() => handleSort('status')}>
                        Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAppointments.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No appointments found.
                        </td>
                      </tr>
                    ) : (
                      currentAppointments.map((appointment, index) => (
                        <tr key={appointment.id}>
                          <th scope="row">{indexOfFirstRecord + index + 1}</th>
                          <td>Dr. {appointment.doctor.first_name} {appointment.doctor.last_name}</td>
                          <td>{appointment.date}</td>
                          <td>{appointment.time}</td>
                          <td>{appointment.reason}</td>
                          <td>{appointment.status}</td>
                          <td>
                            <Tooltip title="Delete">
                              <IconButton  onClick={() => handleDelete(appointment.id)}>
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton onClick={() => openEditModal(appointment)}>
                                <EditIcon color="primary" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-secondary"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <div>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      className="btn btn-secondary"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Create Appointment Modal */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Create Appointment</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="custom-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="doctor" className="form-label">
                    Doctor
                  </label>
                  <select
                    className="form-control"
                    id="doctor"
                    name="doctor"
                    onChange={handleChange}
                    value={createAppointment.doctor}
                    disabled={doctorLoad}
                  >
                    <option value="">Choose Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        Dr. {doc.first_name} {doc.last_name}
                      </option>
                    ))}
                  </select>
                  {doctorLoad && <small>Loading doctors...</small>}
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    onChange={handleChange}
                    value={createAppointment.date}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">
                    Appointment Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    name="time"
                    onChange={handleChange}
                    value={createAppointment.time}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="reason" className="form-label">
                    Reason
                  </label>
                  <textarea
                    className="form-control"
                    id="reason"
                    name="reason"
                    onChange={handleChange}
                    value={createAppointment.reason}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={createLoading || doctorLoad}>
                  {createLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Creating...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Appointment Modal */}
      {editModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Edit Appointment</h5>
              <button type="button" className="close" onClick={() => setEditModal(false)}>
                ×
              </button>
            </div>
            <div className="custom-modal-body">
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label htmlFor="edit-doctor" className="form-label">
                    Doctor
                  </label>
                  <select
                    className="form-control"
                    id="edit-doctor"
                    name="doctor"
                    onChange={handleEditChange}
                    value={editAppointment.doctor}
                    disabled={doctorLoad}
                  >
                    <option value="">Choose Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        Dr. {doc.first_name} {doc.last_name}
                      </option>
                    ))}
                  </select>
                  {doctorLoad && <small>Loading doctors...</small>}
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-date" className="form-label">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="edit-date"
                    name="date"
                    onChange={handleEditChange}
                    value={editAppointment.date}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-time" className="form-label">
                    Appointment Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="edit-time"
                    name="time"
                    onChange={handleEditChange}
                    value={editAppointment.time}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-reason" className="form-label">
                    Reason
                  </label>
                  <textarea
                    className="form-control"
                    id="edit-reason"
                    name="reason"
                    onChange={handleEditChange}
                    value={editAppointment.reason}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={updateLoading || doctorLoad}>
                  {updateLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    'Update'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PatientAppointments;