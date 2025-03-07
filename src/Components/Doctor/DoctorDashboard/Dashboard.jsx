import React, { useContext, useState, useEffect } from 'react'
import '../DoctorDashboard/dashboard.css'
import { Link } from 'react-router-dom'
import Nav from '../DoctorNav/nav'
import { AuthContext } from '../../AuthContext/Context'
import useHook from '../../CustomHook/useHook'
import axios from 'axios'

const BASE_URL = 'https://speclink-backend.onrender.com/specLink/';

function Dashboard() {
  const {user} = useContext(AuthContext)
  const {  patientAppointments, appointLoader} = useHook()
   const [records, setRecords] = useState([]);
   const LIST_RECORD_URL = `${BASE_URL}list_medical_records`;

    // Fetch records
  const fetchRecords = async () => {
    try {
      const response = await axios.get(LIST_RECORD_URL);
      setRecords(response.data || []);
    } catch (err) {
      console.error('Error fetching records:', err);
    } finally {
    }
  };

  useEffect(() => {
    if (user?.user_id) fetchRecords();
  }, [user?.user_id]);

  return (
    <>
   <Nav/>
    {/* Main Content */}
    <div className="container">
      <h4>Welcome, Dr. <strong>{user.first_name} {user.last_name}  👋</strong></h4>
      <div className="row doc_dash_row">
        {/* Assigned Patients Card */}
        <div className="col-lg-5 col-md-5 col-sm-12 p-2 bg-white">
          <div className="card-content">
            <span className="card-title">Appointements</span>
            <p>View and manage your appointments.</p>
          </div>

          <h4><strong>({patientAppointments?.length}) Appointments</strong></h4>

          <div className="card-action">
            <Link to='/doctor/appointments' className="modal-trigger">
              View Appointments
            </Link>
          </div>
        </div>

        {/* Chat with Patients Card */}
        <div className="col-lg-5 col-md-5 col-sm-12 p-2 bg-white">
          <div className="card-content">
            <span className="card-title">Chat with Patients</span>
            <p>Start a conversation with your patients.</p>
          </div>
          <div className="card-action">
            <a href="Dchat.html">Start Chat</a>
          </div>
        </div>
        {/* Patient Records Card */}
        <div className="col-lg-5 col-md-5 col-sm-12 p-2 bg-white mt-4 doc_dash_col">
          <div className="card-content">
            <span className="card-title">Patient Records</span>
            <p>Access and update patient medical records.</p>
          </div>
          <h4><strong>({records?.length}) Records</strong></h4>
          <div className="card-action">
            <Link to='/doctor/patient_records'>Manage Records</Link>
          </div>
        </div>
        {/* Reports Card */}
        <div className="col-lg-5 col-md-5 col-sm-12 p-2 bg-white mt-4">
          <div className="card-content">
            <span className="card-title">Reports</span>
            <p>Generate and view patient reports.</p>
          </div>

          <h4><strong>(4) Reports</strong></h4>

          <div className="card-action">
            <Link to='/doctor/reports'>View Reports</Link>
          </div>
        </div>
      </div>
      {/* Upcoming Appointments Table */}
      <div className="mt-4">
        <div className="row">
          <div className="col-lg-10 col-sm-12 d-flex appoint_col">
        <h2><strong>Upcoming Appointments</strong></h2>
        <Link to='/doctor/appointments'>
        <span className='p-2 text-white bg-primary rounded show_all'>
          <span>show all</span> 
          <i class="bi bi-arrow-right"></i></span>
        </Link>
          </div>
        </div>

        {patientAppointments.length === 0 ? (<h6>No appointments available</h6>) : (
          <>
          {appointLoader ? (
            <div>
              <div className='loader'></div>
              <p>Loading appointments...</p>
            </div>
          ) : (<>
            <div className="table-container table-responsive">
            <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {patientAppointments.map(appoint => {
               const {user, date, time, status} = appoint
               const dateObj = new Date(date);
               const formattedDate = dateObj.toLocaleDateString('en-US', {
                 month: 'short',
                 day: 'numeric',
                 year: 'numeric',
               });
               return (
                <>
                  <tr>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{formattedDate}</td>
                  <td>{time}</td>
                  <td><span className={`text-white p-1 rounded ${status === 'Cancelled' ? 'bg-danger' : status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>{status}</span></td>
            </tr>
                </>
               )
            })}
           
          </tbody>
        </table>
            </div>
          </>)}
          </>
        )}
       
      </div>
    </div>
    
    {/* Footer */}
    <footer className="footer">
      <div className="footer-content">
        <h5>Contact &amp; Support</h5>
        <p>Email: support@speclink.com</p>
        <p>Phone: +256 123 456 789</p>
      </div>
      <div className="footer-copyright">
        <p>© 2025 SPEC-LINK | All Rights Reserved</p>
      </div>
    </footer>
  </>
  
  )
}

export default Dashboard
