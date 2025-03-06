import React, { useContext } from 'react'
import '../Dashboard/dashboard.css'
import Nav from '../../Doctor/DoctorNav/nav'
import { AuthContext } from '../../AuthContext/Context'

function PatientDashboard() {
  const {user} = useContext(AuthContext)
  return (
   <>
   <Nav/>
  
  {/* Main Content */}
  <div className="container">
    <h4>Welcome, <strong>{user.first_name} {user.last_name}</strong> 👋</h4>
    <div className="dashboard-grid">
      <div className="card green lighten-4">
        <div className="card-content">
          <span className="card-title">Medical Records</span>
          <p>View your medical history and prescriptions.</p>
        </div>
        <div className="card-action">
          <a href="Medical_records.html">View Records</a>
        </div>
      </div>
      <div className="card orange lighten-4">
        <div className="card-content">
          <span className="card-title">Chat with Doctor</span>
          <p>Start a conversation with your assigned doctor.</p>
        </div>
        <div className="card-action">
          <a href="Pchat.html">Start Chat</a>
        </div>
      </div>
      <div className="card red lighten-4">
        {/* Add content here if needed */}
      </div>
    </div>
    <div className="section">
      <h2>Scheduled Consultations</h2>
      <table>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dr. Smith</td>
            <td>Nov 15, 2023</td>
            <td>10:00 AM</td>
          </tr>
          <tr>
            <td>Dr. Johnson</td>
            <td>Nov 20, 2023</td>
            <td>02:00 PM</td>
          </tr>
        </tbody>
      </table>
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

export default PatientDashboard
