import React, { useState } from 'react';
import '../UserManagement/user.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const register = 'https://speclink-backend.onrender.com/specLink/register';


function Signup() {
    const navigate = useNavigate()
  const [patient, setPatient] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    is_doctor: true,
  });

  const [error, setError] = useState("");
  const [userError, setUserError] = useState('')
  const [load, setLoad] = useState(false)

  const handleChange = (e) => {
    const { name, value} = e.target;
    setPatient({
      ...patient,
      [name]:value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   setLoad(true)
    // Basic validation
    if (patient.password !== patient.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post(register, patient)
      .then(res =>{
          console.log('response', res)
          if(res.status === 201){
            setLoad(false)
            Swal.fire({
                title: 'Registration successfull',
                icon: "success",
                timer: 6000,
                toast: true,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
        // navigate('/')
        setPatient({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            is_doctor: true,
        })
      }).catch(err =>{
        setLoad(false)
        setUserError(err.response.data.email)
        console.log('err', err)
      })
     
      // Redirect or show success message
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setLoad(false)
    }
  };

  return (
    <>
      <div className="doctorregister bg-white  p-2 px-5">
        <h4 className='p-2 w-100 doc_reg_header'><strong>Doctor Registration</strong></h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className='p-3'>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              value={patient.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              value={patient.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={patient.email}
              onChange={handleChange}
              required
            />
            {userError && <p className='text-danger'>{userError}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={patient.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              name="confirm_password"
              value={patient.confirm_password}
              onChange={handleChange}
              required
            />
          </div>

          <button className='btn btn-primary w-100 text-white text-center p-2' type='submit'>
            {load ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;