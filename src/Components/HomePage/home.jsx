import React from 'react';
import '../HomePage/home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div>
          <a className="navbar-brand fw-bold" href="#">
            SPEC-LINK
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="main">
        <div className="main_text">
          <h1 className='main_title'>
           <strong>Welcome to Spec-Link</strong>
          </h1>
          <p>
            An easy-to-use system for managing your healthcare, appointments,
            and doctor interactions.
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="row main-logins mt-4 p-3">
            <div className="col-lg-3 col-md-3 col-sm-12">
                <h3 className="card-title h5 fw-bold mb-3">
                  Patient Management
                </h3>
                <p className="card-text mb-4">
                  Patients can log in, view their appointments, and book new
                  consultations with doctors.
                </p>
                <Link to="/login" className="btn btn-primary mt-auto">
                  Login Here
                </Link>
              
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
             
                <h3 className="card-title h5 fw-bold mb-3">
                  Doctor Management
                </h3>
                <p className="card-text mb-4">
                  Doctors can log in to view their schedules, manage
                  appointments, and interact with patients.
                </p>
                <Link to="/login" className="btn btn-primary mt-auto">
                  Login Here
                </Link>
              
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
             
                <h3 className="card-title h5 fw-bold mb-3">
                  Admin Management
                </h3>
                <p className="card-text mb-4">
                  Admins can manage hospital operations, users, and monitor
                  activities across departments.
                </p>
                <Link to="/login" className="btn btn-primary mt-auto">
                  Login Here
                </Link>
              
            </div>
      </div>

      {/* Footer */}
      <footer className="footer text-center py-4 bg-dark text-white">
        <div className="container">
          <p className="mb-0">© 2025 SPEC-LINK. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;