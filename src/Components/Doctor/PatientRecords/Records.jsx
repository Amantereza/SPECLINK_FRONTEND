import React, { useContext, useEffect, useState } from 'react';
import Nav from '../DoctorNav/nav';
import { AuthContext } from '../../AuthContext/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import useHook from '../../CustomHook/useHook';
import '../PatientRecords/records.css';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const BASE_URL = 'https://speclink-backend.onrender.com/specLink/';
const DELETE_RECORD_URL = `${BASE_URL}remove_records`;
const CREATE_RECORD_URL = `${BASE_URL}post_medical_records`;
const EDIT_RECORD_URL = `${BASE_URL}edit_record`;
const LIST_RECORD_URL = `${BASE_URL}list_medical_records`;

function Records() {
  const { user } = useContext(AuthContext);
  const { patientAppointments } = useHook();

  const [records, setRecords] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // For search
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [recordsPerPage] = useState(5); // Number of records per page
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // For sorting
  const [createRecord, setCreateRecord] = useState({
    user: '',
    diagnosis: '',
    treatment: '',
    date: '',
    medication: '',
    dosage: '',
  });
  const [editRecord, setEditRecord] = useState({
    id: '',
    user: '',
    diagnosis: '',
    treatment: '',
    date: '',
    medication: '',
    dosage: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [editUploader, setEditUploader] = useState(false);

  // Fetch records
  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(LIST_RECORD_URL);
      setRecords(response.data || []);
      setTableKey((prev) => prev + 1);
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
    setUploadLoader(true);
    try {
      const response = await axios.post(CREATE_RECORD_URL, createRecord);
      if (response.status === 201) {
        setRecords((prev) => {
          const updatedRecords = [...prev, response.data];
          console.log('Updated records in setRecords:', updatedRecords);
          return updatedRecords;
        });
        setTableKey((prev) => prev + 1);
        setUploadLoader(false);
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
          user: '',
          diagnosis: '',
          treatment: '',
          date: '',
          medication: '',
          dosage: '',
        });
      }
    } catch (err) {
      console.error('Error creating record:', err);
      setUploadLoader(false);
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
        setRecords((prev) => prev.filter((record) => record.id !== id));
        setTableKey((prev) => prev + 1);
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
    setEditUploader(true);
    const { id, ...editPayload } = editRecord;
    try {
      const response = await axios.put(`${EDIT_RECORD_URL}/${id}`, editPayload);
      if (response.status === 201) {
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
    } finally {
      setEditUploader(false);
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
      user: record.user.id,
      diagnosis: record.diagnosis || '',
      treatment: record.treatment || '',
      date: record.date || '',
      medication: record.medication || '',
      dosage: record.dosage || '',
    });
    setEditModal(true);
  };

  // Search functionality
  const filteredRecords = records.filter((record) =>
    `${record.user.first_name} ${record.user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Sorting functionality
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = sortConfig.key === 'date' ? new Date(a[sortConfig.key]) : `${a.user.first_name} ${a.user.last_name}`;
    const bValue = sortConfig.key === 'date' ? new Date(b[sortConfig.key]) : `${b.user.first_name} ${b.user.last_name}`;
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setTableKey((prev) => prev + 1); // Force re-render
  };


  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row record_row d-flex mt-2">
          <div className="col-lg-10 record_header d-flex align-items-center">
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
        </div>

        {/* Search Input */}
        <div className="row record_row mb-3 mt-3">
          <div className="col-lg-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search by patient name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>

        <div className="row record_row">
          <div className="col-lg-10 col-sm-12 table-container table-responsive">
            {loading ? (
              <div className="text-center">
                <div className="loader" />
                <p>Loading records...</p>
              </div>
            ) : records.length === 0 ? (
              <p className="text-center">No records found.</p>
            ) : (
              <>
                <table
                  key={tableKey}
                  className="highlight table table-striped table-bordered"
                >
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('user')}>
                        Patient {sortConfig.key === 'user' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th>Diagnosis</th>
                      <th>Treatment</th>
                      <th>Medication</th>
                      <th onClick={() => handleSort('date')}>
                        Last Visit Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((record) => {
                      const dateObj = new Date(record.date);
                      const formattedDate = dateObj.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      });
                      return (
                        <tr key={record.id}>
                          <td>
                            {record.user.first_name} {record.user.last_name}
                          </td>
                          <td>{record.diagnosis}</td>
                          <td>{record.treatment}</td>
                          <td>
                            {record.medication} ({record.dosage})
                          </td>
                          <td>{formattedDate}</td>
                          <td>
                            <Tooltip title="Delete">
                              <IconButton onClick={() => handleDelete(record.id)}>
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton onClick={() => openEditModal(record)}>
                                <EditIcon color="primary" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pagination Controls */}
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
              </>
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
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={uploadLoader}>
                  {uploadLoader ? 'Submitting...' : 'Submit'}
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
              <button
                type="button"
                className="close"
                onClick={() => setEditModal(false)}
              >
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={editUploader}>
                  {editUploader ? 'Updating...' : 'Update'}
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