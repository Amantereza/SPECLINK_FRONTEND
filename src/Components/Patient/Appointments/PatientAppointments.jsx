import React, { useContext, useEffect, useState } from 'react';
import Nav from '../../Doctor/DoctorNav/nav';
import { AuthContext } from '../../AuthContext/Context';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'https://speclink-backend.onrender.com/specLink/';
const POST_APPOINTMENT_URL = `${BASE_URL}post_appointements`;
const DOCTOR_LIST_URL = `${BASE_URL}list_doctors`;
const DELETE_APPOINTMENTS_URL = `${BASE_URL}delete_appointments`;
const EDIT_APPOINTMENT_URL = `${BASE_URL}edit_appointements`; // No trailing slash

function PatientAppointments() {
  const { user } = useContext(AuthContext);
  const LIST_PATIENT_APPOINTMENTS = `${BASE_URL}patient_appointments/${user?.user_id}`;

  const [appointments, setAppointments] = useState([]);
  const [createAppointment, setCreateAppointment] = useState({
    user: user?.user_id,
    doctor: '',
    time: '',
    reason: '',
    date: '',
  });
  const [editAppointment, setEditAppointment] = useState({
    id: '', // Keep id for URL, not payload
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
  const [appointmentLoad, setAppointmentLoad] = useState(false);

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

  // Fetch appointments
  const fetchAppointments = async () => {
    setAppointmentLoad(true);
    try {
      const response = await axios.get(LIST_PATIENT_APPOINTMENTS);
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to load appointments.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    } finally {
      setAppointmentLoad(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
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
        setShowModal(false);
        setCreateAppointment({ user: user?.user_id, doctor: '', time: '', reason: '', date: '' });
        fetchAppointments();
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
    }
  };

  // Edit appointment
  const handleEdit = async (e) => {
    e.preventDefault();
    // Exclude 'id' from the payload, use it only in the URL
    const { id, ...editPayload } = editAppointment;
    try {
      const response = await axios.put(`${EDIT_APPOINTMENT_URL}/${id}`, editPayload);
      console.log(response)
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
        fetchAppointments();
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
        fetchAppointments();
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
      id: appointment.id, // For URL
      user: user?.user_id,
      doctor: appointment.doctor.id, // Doctor ID
      time: appointment.time,
      reason: appointment.reason || '',
      date: appointment.date,
    });
    setEditModal(true);
  };

  return (
    <>
      <Nav />
      <div className="appoint-wrapper">
        <div className="appoint_header d-flex mt-3">
          <h4>
            <strong>Appointments</strong>
          </h4>
          <button className="btn btn-primary ms-auto" onClick={() => setShowModal(true)}>
            Create Appointment
          </button>
        </div>

        <div className="col-lg-10 table-responsive">
          {appointmentLoad ? (
            <p>Loading appointments...</p>
          ) : (
            <table className="table table-hover table-bordered table-striped highlight">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Doctor</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment, index) => (
                    <tr key={appointment.id}>
                      <th scope="row">{index + 1}</th>
                      <td>Dr. {appointment.doctor.first_name} {appointment.doctor.last_name}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.reason}</td>
                      <td>{appointment.status}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(appointment.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => openEditModal(appointment)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
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

                <button type="submit" className="btn btn-primary" disabled={doctorLoad}>
                  Submit
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

                <button type="submit" className="btn btn-primary" disabled={doctorLoad}>
                  Update
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