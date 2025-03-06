import React, { useContext } from 'react'
import '../DoctorDashboard/dashboard.css'
import { Link } from 'react-router-dom'
import Nav from '../DoctorNav/nav'
import { AuthContext } from '../../AuthContext/Context'
import useHook from '../../CustomHook/useHook'


function Dashboard() {
  const {user} = useContext(AuthContext)
  const {  patientAppointments, appointLoader} = useHook()
  return (
    <>
   <Nav/>
    {/* Main Content */}
    <div className="container">
      <h4>Welcome, Dr. <strong>{user.first_name} {user.last_name}  👋</strong></h4>
      <div className="dashboard-grid">
        {/* Assigned Patients Card */}
        <div className="card blue lighten-4">
          <div className="card-content">
            <span className="card-title">Appointements</span>
            <p>View and manage your appointments.</p>
          </div>
          <div className="card-action">
            <Link to='/doctor/appointments' className="modal-trigger">
              View Appointments
            </Link>
          </div>
        </div>
        {/* Chat with Patients Card */}
        <div className="card green lighten-4">
          <div className="card-content">
            <span className="card-title">Chat with Patients</span>
            <p>Start a conversation with your patients.</p>
          </div>
          <div className="card-action">
            <a href="Dchat.html">Start Chat</a>
          </div>
        </div>
        {/* Patient Records Card */}
        <div className="card orange lighten-4">
          <div className="card-content">
            <span className="card-title">Patient Records</span>
            <p>Access and update patient medical records.</p>
          </div>
          <div className="card-action">
            <Link to='/doctor/patient_records'>Manage Records</Link>
          </div>
        </div>
        {/* Reports Card */}
        <div className="card red lighten-4">
          <div className="card-content">
            <span className="card-title">Reports</span>
            <p>Generate and view patient reports.</p>
          </div>
          <div className="card-action">
            <a href="reportsd.html">View Reports</a>
          </div>
        </div>
      </div>
      {/* Upcoming Appointments Table */}
      <div className="section">
        <h2>Upcoming Appointments</h2>

        {patientAppointments.length === 0 ? (<h6>No appointments available</h6>) : (
          <>
          {appointLoader ? (<h6>loading...</h6>) : (<>
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
                  <td>{status}</td>
            </tr>
                </>
               )
            })}
           
            <tr>
              <td>Jane Smith</td>
              <td>Nov 20, 2023</td>
              <td>02:00 PM</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
            </div>
          </>)}
          </>
        )}
       
      </div>
    </div>
    {/* Assigned Patients Modal */}
    <div id="patientsModal" className="modal">
      <div className="modal-content">
        <h4>Assigned Patients</h4>
        <ul className="collection">
          <li className="collection-item">John Doe</li>
          <li className="collection-item">Jane Smith</li>
          <li className="collection-item">Alice Johnson</li>
          <li className="collection-item">Michael Brown</li>
        </ul>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close btn blue">
          Close
        </a>
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
