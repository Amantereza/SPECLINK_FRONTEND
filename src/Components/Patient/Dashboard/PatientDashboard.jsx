import React, { useContext } from 'react';
import '../Dashboard/dashboard.css';
import Nav from '../../Doctor/DoctorNav/nav';
import { AuthContext } from '../../AuthContext/Context';
import { Link } from 'react-router-dom';
import useHook from '../../CustomHook/useHook';

function PatientDashboard() {
  const { user } = useContext(AuthContext);
  const { appointments, appointmentLoad, records } = useHook();

  return (
    <>
      <Nav />

      {/* Main Content */}
      <div className="container">
        <h4>
          Welcome, <strong>{user.first_name} {user.last_name}</strong> 👋
        </h4>
        <div className="row patient_dash_row">
          <div className="col-lg-5 col-md-5 col-sm-12 patient_dash_cont bg-white p-2">
            <div className="card-content">
              <span className="card-title"><strong>Medical Records</strong></span>
              <p>View your medical history and prescriptions.</p>
            </div>

            <h4><strong>({records?.length}) Records</strong></h4>
            <div className="card-action p-2">
              <Link to="/patient/records">View Records</Link>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 col-sm-12 patient_dash_cont bg-white p-2">
            <div className="card-content">
              <span className="card-title"><strong>Chat with Doctor</strong></span>
              <p>Start a conversation with your assigned doctor.</p>
            </div>
            <div className="card-action p-2">
              <a href="Pchat.html">Start Chat</a>
            </div>
          </div>
          <div className="card red lighten-4">
            {/* Add content here if needed */}
          </div>
        </div>
        <div className="mt-4 table-responsive">
          <h2>Scheduled Consultations</h2>
          {appointmentLoad ? (
            <div>
              <div className="loader"></div>
              <p className='text-center'>Loading consultations...</p>
            </div>
          ) : appointments.length === 0 ? (
            <h6>No Scheduled Consultations</h6>
          ) : (
            <table className="table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td scope="row">{index + 1}</td>
                    <td>Dr. {appointment.doctor.first_name} {appointment.doctor.last_name}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.reason}</td>
                    <td>
                      <span
                        className={`text-white p-1 rounded ${
                          appointment.status === 'Approved'
                            ? 'bg-success'
                            : appointment.status === 'Cancelled'
                            ? 'bg-danger'
                            : 'bg-warning'
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  );
}

export default PatientDashboard;