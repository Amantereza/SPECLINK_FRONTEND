import React from 'react'
import '../HomePage/home.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
   <>
     <>
  {/* Navbar */}
  <nav className="navbar navbar-expand-lg navbar-dark">
    <div className="container">
      <a className="navbar-brand" href="#">
        SPEC-LINK
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </div>
  </nav>
  {/* Hero Section */}
  <section className="hero-section">
    <div className="container">
      <h1 className='home_title'>Welcome to Spec-Link</h1>
      <p>
        An easy-to-use system for managing your healthcare, appointments, and
        doctor interactions.
      </p>
    </div>
  </section>
  {/* Service Cards */}
  <section className="container service-cards my-5">
    <div className="row text-center g-4">
      <div className="col-md-4">
        <div className="card p-4">
          <h3 className="card-title">Patient Management</h3>
          <p className="card-text">
            Patients can log in, view their appointments, and book new
            consultations with doctors.
          </p>
          <Link to='/login' className="btn btn-primary">
            Login Here
          </Link>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card p-4">
          <h3 className="card-title">Doctor Management</h3>
          <p className="card-text">
            Doctors can log in to view their schedules, manage appointments, and
            interact with patients.
          </p>
          <Link to='/login' className="btn btn-primary">
            Login Here
          </Link>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card p-4">
          <h3 className="card-title">Admin Management</h3>
          <p className="card-text">
            Admins can manage hospital operations, users, and monitor activities
            across departments.
          </p>
          <Link to='/login' className="btn btn-primary">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer className="footer text-center">
    <div className="container">
      <p>© 2025 SPEC-LINK. All Rights Reserved.</p>
    </div>
  </footer>
</>

   </>
  )
}

export default Home
