import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthContext/Context'

function Nav() {
  const {user} = useContext(AuthContext)
  return (
    <>
{user && user.is_doctor && (
      <>
      <nav className="doctor_navbar">
        <a href="#" className="navbar-brand">
          SPEC-LINK
        </a>
        <ul className="navbar-nav">
          <li>
            <Link to="/doctor/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/doctor/profile">Profile</Link>
          </li>
          <li>
            <Link to='/doctor/logout'>Logout</Link>
          </li>
        </ul>
      </nav>
      </>
    )}

    {user && user.is_patient && (
      <>
      <nav className="doctor_navbar">
        <a href="#" className="navbar-brand">
          SPEC-LINK
        </a>
        <ul className="navbar-nav">
          <li>
            <Link to="/patient/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/patient/profile">Profile</Link>
          </li>

          <li>
            <Link to="/patient/patient_appointments">Appointments</Link>
          </li>
          <li>
            <Link to='/doctor/logout'>Logout</Link>
          </li>
        </ul>
      </nav>
      </>
    )}
    
    </>
    
  )
}

export default Nav
