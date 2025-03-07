import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext/Context'
import axios from 'axios'

const BASE_URL = 'https://speclink-backend.onrender.com/specLink/';


function useHook() {
    const {user} = useContext(AuthContext)
    const DOCTOR_APPOINTMENTS_URL = `${BASE_URL}doctor_appointments/${user?.user_id}`;
    const [profile, setProfile] = useState({user:user?.user_id, profile_picture:null, address:"",  specialization:"", years_of_experience:0, date_of_birth:""})
    const userProfile = user && `https://speclink-backend.onrender.com/specLink/user_profile/${user?.user_id}`
     const medical_records_list = `${BASE_URL}patient_records/${user?.user_id}`
    const LIST_PATIENT_APPOINTMENTS = `${BASE_URL}patient_appointments/${user?.user_id}`;
    const [previewImage, setPreviewImage] = useState(null);
    const [patientAppointments, setPatientAppointments] = useState([]);
    const [appointLoader, setAppointLoader] = useState(false);
     const [appointments, setAppointments] = useState([]);
      const [appointmentLoad, setAppointmentLoad] = useState(false);
      
  const [records, setRecords] = useState([])
  const [recordloader, setRecordLoader] = useState(false)

    const SingleProfile = async()=>{
        try{
           const response = await axios.get(userProfile)
           const data = response.data
           setProfile(data.profile)
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

   // Fetch appointments
   const fetchAppointment = async () => {
    setAppointmentLoad(true);
    try {
      const response = await axios.get(LIST_PATIENT_APPOINTMENTS);
      setAppointments(response.data);
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
      setAppointmentLoad(false);
    }
  };

  const fetchRecords = async()=>{
      setRecordLoader(true)
      try{
          const response = await axios.get(medical_records_list)
          const {medical_records} = response.data
          setRecords(medical_records)
          setRecordLoader(false)
      }catch(err){
          console.log(err)
      }
  }

  useEffect(()=>{
  fetchRecords()
  }, [])

  useEffect(() => {
    fetchAppointment();
  }, [user?.user_id]);

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
    setAppointLoader,
    fetchAppointments,
    appointments,
    appointmentLoad,
    fetchAppointment,
    records, 
    recordloader,
    setAppointments
  }
}

export default useHook
