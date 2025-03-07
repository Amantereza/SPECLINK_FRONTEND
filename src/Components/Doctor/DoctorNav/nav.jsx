import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthContext/Context'

function Nav() {
  const {user} = useContext(AuthContext)
  return (
    <>
{user && user.is_doctor && (
  <>
  <nav className="navbar navbar-expand-lg  doctor_navbar">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      SPECLINK
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
      <Link to="/doctor/dashboard" className='nav-link active'>Dashboard</Link>
      <Link to="/doctor/profile" className='nav-link'>Profile</Link>
      <Link to='/doctor/logout' className='nav-link'>Logout</Link>
      </div>
    </div>
  </div>
</nav>
  </>
)}

{user && user.is_patient && (<>
  <nav className="navbar navbar-expand-lg  doctor_navbar">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      SPECLINK
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
            <Link to="/patient/dashboard" className='nav-link active'>Dashboard</Link>
          
            <Link to="/patient/profile" className='nav-link'>Profile</Link>
          
            <Link to="/patient/patient_appointments" className='nav-link'>Appointments</Link>
          
            <Link to='/doctor/logout' className='nav-link'>Logout</Link>
      </div>
    </div>
  </div>
</nav>
</>)}

  
    </>
    
  )
}

export default Nav
