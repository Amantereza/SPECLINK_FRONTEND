import React, { useContext, useEffect, useState } from 'react';
import '../DoctorDashboard/dashboard.css';
import Nav from '../DoctorNav/nav';
import { AuthContext } from '../../AuthContext/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import useHook from '../../CustomHook/useHook';

const BASE_URL = 'http://127.0.0.1:8000/specLink/';
const DELETE_RECORD_URL = `${BASE_URL}remove_records`;
const CREATE_RECORD_URL = `${BASE_URL}post_medical_records`;
const EDIT_RECORD_URL = `${BASE_URL}edit_record`;
const LIST_RECORD_URL = `${BASE_URL}list_medical_records`;

function Records() {
  const { user } = useContext(AuthContext);
  const { patientAppointments } = useHook();

  const [records, setRecords] = useState([]);
  const [createRecord, setCreateRecord] = useState({
    user: '', // Patient ID from dropdown
    diagnosis: '',
    treatment: '',
    date: '',
    medication: '',
    dosage: '',
  });
  const [editRecord, setEditRecord] = useState({
    id: '', // For URL only
    user: '', // Patient ID from dropdown
    diagnosis: '',
    treatment: '',
    date: '',
    medication: '',
    dosage: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch records
  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(LIST_RECORD_URL);
      setRecords(response.data || []);
    } catch (err) {
      console.error('Error fetching records:', err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to load records.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.user_id) fetchRecords();
  }, [user?.user_id]);

  // Handle form submission for creating a record
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(CREATE_RECORD_URL, createRecord);
      if (response.status === 201) {
        Swal.fire({
          title: 'Success',
          text: 'Record created successfully!',
          icon: 'success',
          timer: 3000,
          toast: true,
          position: 'top',
          timerProgressBar: true,
        });
        setShowModal(false);
        setCreateRecord({
          user: '', // Reset to empty for next selection
          diagnosis: '',
          treatment: '',
          date: '',
          medication: '',
          dosage: '',
        });
        fetchRecords();
      }
    } catch (err) {
      console.error('Error creating record:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to create record.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    }
  };

  // Handle input changes for create form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateRecord((prev) => ({ ...prev, [name]: value }));
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${DELETE_RECORD_URL}/${id}`);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Record deleted successfully!',
          icon: 'success',
          timer: 3000,
          toast: true,
          position: 'top',
          timerProgressBar: true,
        });
        fetchRecords();
      }
    } catch (err) {
      console.error('Error deleting record:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to delete record.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    }
  };

  // Handle edit submission
  const handleEdit = async (e) => {
    e.preventDefault();
    const { id, ...editPayload } = editRecord; // Exclude id from payload
    try {
      const response = await axios.put(`${EDIT_RECORD_URL}/${id}`, editPayload);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Record updated successfully!',
          icon: 'success',
          timer: 3000,
          toast: true,
          position: 'top',
          timerProgressBar: true,
        });
        setEditModal(false);
        fetchRecords();
      }
    } catch (err) {
      console.error('Error updating record:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to update record.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    }
  };

  // Handle input changes for edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRecord((prev) => ({ ...prev, [name]: value }));
  };

  // Open edit modal with record data
  const openEditModal = (record) => {
    setEditRecord({
      id: record.id,
      user: record.user.id, // Use patient ID
      diagnosis: record.diagnosis || '',
      treatment: record.treatment || '',
      date: record.date || '',
      medication: record.medication || '',
      dosage: record.dosage || '',
    });
    setEditModal(true);
  };

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="record_header d-flex mt-2">
          <h4>
            <strong>Patient Records</strong>
          </h4>
          <button
            className="btn btn-primary text-center text-white ms-auto"
            onClick={() => setShowModal(true)}
          >
            Create Records
          </button>
        </div>

        <div className="row">
          <div className="col-lg-12 col-sm-12 table-container table-responsive">
            {loading ? (
              <p>Loading records...</p>
            ) : records.length === 0 ? (
              <p>No records found.</p>
            ) : (
              <table className="highlight">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Diagnosis</th>
                    <th>Treatment</th>
                    <th>Medication</th>
                    <th>Last Visit Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => {
                    const dateObj = new Date(record.date);
                    const formattedDate = dateObj.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                    return (
                      <tr key={record.id}>
                        <td>{record.user.first_name} {record.user.last_name}</td>
                        <td>{record.diagnosis}</td>
                        <td>{record.treatment}</td>
                        <td>{record.medication} ({record.dosage})</td>
                        <td>{formattedDate}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => handleDelete(record.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => openEditModal(record)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Create Record Modal */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Create Record</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="custom-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">
                    Patient
                  </label>
                  <select
                    className="form-control"
                    id="user"
                    name="user"
                    onChange={handleChange}
                    value={createRecord.user}
                  >
                    <option value="">Choose Patient</option>
                    {patientAppointments.map((patient) => (
                      <option key={patient.user.id} value={patient.user.id}>
                        {patient.user.first_name} {patient.user.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="diagnosis" className="form-label">
                    Diagnosis
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="diagnosis"
                    name="diagnosis"
                    onChange={handleChange}
                    value={createRecord.diagnosis}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="treatment" className="form-label">
                    Treatment
                  </label>
                  <textarea
                    className="form-control"
                    id="treatment"
                    name="treatment"
                    onChange={handleChange}
                    value={createRecord.treatment}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    onChange={handleChange}
                    value={createRecord.date}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="medication" className="form-label">
                    Medication
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="medication"
                    name="medication"
                    onChange={handleChange}
                    value={createRecord.medication}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="dosage" className="form-label">
                    Dosage
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dosage"
                    name="dosage"
                    onChange={handleChange}
                    value={createRecord.dosage}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Record Modal */}
      {editModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Edit Record</h5>
              <button type="button" className="close" onClick={() => setEditModal(false)}>
                ×
              </button>
            </div>
            <div className="custom-modal-body">
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label htmlFor="edit-user" className="form-label">
                    Patient
                  </label>
                  <select
                    className="form-control"
                    id="edit-user"
                    name="user"
                    onChange={handleEditChange}
                    value={editRecord.user}
                  >
                    <option value="">Choose Patient</option>
                    {patientAppointments.map((patient) => (
                      <option key={patient.user.id} value={patient.user.id}>
                        {patient.user.first_name} {patient.user.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="edit-diagnosis" className="form-label">
                    Diagnosis
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-diagnosis"
                    name="diagnosis"
                    onChange={handleEditChange}
                    value={editRecord.diagnosis}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edit-treatment" className="form-label">
                    Treatment
                  </label>
                  <textarea
                    className="form-control"
                    id="edit-treatment"
                    name="treatment"
                    onChange={handleEditChange}
                    value={editRecord.treatment}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edit-date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="edit-date"
                    name="date"
                    onChange={handleEditChange}
                    value={editRecord.date}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edit-medication" className="form-label">
                    Medication
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-medication"
                    name="medication"
                    onChange={handleEditChange}
                    value={editRecord.medication}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edit-dosage" className="form-label">
                    Dosage
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-dosage"
                    name="dosage"
                    onChange={handleEditChange}
                    value={editRecord.dosage}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

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

export default Records;