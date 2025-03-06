import React, { useContext, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../DashboardContet/dashboard.css'
import axios from 'axios';
import { AuthContext } from '../../../AuthContext/Context';

const list_users = 'https://speclink-backend.onrender.com/specLink/list_doctors';
const list_patients = 'https://speclink-backend.onrender.com/specLink/list_patients';
const all_users = 'https://speclink-backend.onrender.com/specLink/list_users'

function Content() {
  const {user} = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [loader, setLoader] = useState(false)

 const fetchUsers = async()=>{
  setLoader(true)
  try{
   const response = await axios(all_users)
   const data = response.data.filter(user => user.is_staff === false)
   setUsers(data)
   setLoader(false)
  }catch(err){
    console.log('err', err)
  }
 }

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(list_users);
      const data = response.data;
      setDoctors(data); 
    } catch (err) {
      console.log(err); 
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(list_patients);
      const data = response.data;
      setPatients(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    fetchUsers() 
    fetchDoctors()
    fetchPatients()
  }, [])
  return (
    <>
    <div className="container-fluid px-5 bg-white">
      <h3 className='mt-3 dash_header p-2'><strong>Welcome, {user.first_name} {user.last_name} 👋</strong></h3>

      <div className="row pt-5">
       <div className="col-lg-12">
          <div className="row dash_row">
            <div className="col-md-3 col-sm-12 dash_menu">
            <i class="bi bi-people-fill"></i>
            <div className="text">
              <span className='dash_count'><strong>{doctors?.length}</strong></span>
              <h4 className='text-primary'>Doctors</h4>
            </div>
            </div>

            <div className="col-md-3 col-sm-12 dash_menu">
            <i class="bi bi-people-fill"></i>
            <div className="text">
              <span className='dash_count'><strong>{patients?.length}</strong></span>
              <h4 className='text-primary'>Patients</h4>
            </div>
              </div>

              <div className="col-md-3 col-sm-12 dash_menu">
              <i class="bi bi-people-fill"></i>
            <div className="text">
              <span className='dash_count'><strong>{users?.length}</strong></span>
              <h4 className='text-primary'>Total Users</h4>
            </div>
              </div>
          </div>
       </div>

{/* user summary */}
      <div className="col-lg-9 table-responsive mb-5 p-2 mt-5">

        <h4><strong>User List</strong></h4>
        {users.length === 0 ? (<span>No users Available</span>) : (
          <>
          {loader ? ( <div class="loader"></div>) : (
            <>
             <table class="table table-striped table-hover table-bordered">
  <thead>
    <tr className='table-striped'>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Doctor</th>
      <th scope="col">Patient</th>
    </tr>
  </thead>
  <tbody>
    {users.map(user => {
      const {id, first_name, last_name, email, is_doctor, is_patient} = user
      return (
        <>
         <tr>
        <th scope="row">{id}</th>
        <td>{first_name}</td>
      <td>{last_name}</td>
        <td>{email}</td>
        <td><span>{is_doctor === false ? (<i class="bi bi-x-circle-fill text-danger"></i>) : (<i class="bi bi-check-circle-fill text-success"></i>)}</span></td>
        <td><span>{is_patient === false ? (<i class="bi bi-x-circle-fill text-danger"></i>) : (<i class="bi bi-check-circle-fill text-success"></i>)}</span></td>
    </tr>
        </>
      )
    })}
  </tbody>
</table>
            </>
          )}
          
          </>
        )}
      
      </div>
      </div>
    </div>
    </>
  )
}

export default Content
