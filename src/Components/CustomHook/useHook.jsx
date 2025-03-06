import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext/Context'
import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/specLink/';


function useHook() {
    const {user} = useContext(AuthContext)
    const DOCTOR_APPOINTMENTS_URL = `${BASE_URL}doctor_appointments/${user?.user_id}`;
    const [profile, setProfile] = useState({user:user?.user_id, profile_picture:null, address:"",  specialization:"", license_number:""})
    const userProfile = user && `http://127.0.0.1:8000/specLink/user_profile/${user?.user_id}`
    const [previewImage, setPreviewImage] = useState(null);
    const [patientAppointments, setPatientAppointments] = useState([]);
    const [appointLoader, setAppointLoader] = useState(false);

    const SingleProfile = async()=>{
        try{
           const response = await axios.get(userProfile)
           const data = response.data
           console.log(data)
           setProfile(data)
           setPreviewImage(data.profile.profile_picture)
        }catch(err){
            console.log(err)
        }
    }

     // Fetch appointments
  const fetchAppointments = async () => {
    setAppointLoader(true);
    try {
      const response = await axios.get(DOCTOR_APPOINTMENTS_URL);
      const { appointments } = response.data;
      setPatientAppointments(appointments || []); // Default to empty array if undefined
    } catch (err) {
      console.error('Error fetching appointments:', err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to load appointments.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    } finally {
      setAppointLoader(false);
    }
  };

  useEffect(() => {
    if (user?.user_id) fetchAppointments(); // Only fetch if user is available
  }, [user?.user_id]);

    useEffect(()=>{
        SingleProfile()
        fetchAppointments()
    }, [])
  return {
    profile,
    previewImage, 
    setPreviewImage,
    setProfile,
    SingleProfile,
    patientAppointments, 
    setPatientAppointments,
    appointLoader, 
    setAppointLoader
  }
}

export default useHook
