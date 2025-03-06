import { Avatar } from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import '../Profile/profile.css'
import useHook from '../../CustomHook/useHook';
import { AuthContext } from '../../AuthContext/Context';
import axios from 'axios';
import moment from 'moment';
import UseAxios from '../../UseAxios/Token';
import Swal from 'sweetalert2';

function Profile() {
  const {user} = useContext(AuthContext)
  const axiosInstance = UseAxios()
  const {profile,  previewImage, setPreviewImage, setProfile, SingleProfile} = useHook()
  const userurl = `https://speclink-backend.onrender.com/specLink/single_user/${user.user_id}`
  const update_user_url = `https://speclink-backend.onrender.com/specLink/update_user/${user?.user_id}`
  const update_profile_url = `https://speclink-backend.onrender.com/specLink/EditProfile/${user?.user_id}`
  const [showModal, setShowModal] = useState(false);
  const [dateFormat, setDateFormat] = useState();
  const [userData, setUserData] = useState({username:'',first_name:"", last_name:"", is_doctor:false, is_staff:true, is_patient:false, email:'', date_joined:''})
  const [Image, setImage] = useState(null)
  const [update, setUpdate] = useState(false)

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const userDataHandle = async()=>{
    try{
     const response = await axios.get(userurl)
     const data = response.data
     const formattedDate = formatDate(data.date_joined);
     setDateFormat(formattedDate)
     console.log(data)
     setUserData(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    userDataHandle()
  }, [])

   // handle image change
   const handleImageChange = (e)=>{
    const selectedImage = e.target.files[0]

    if(selectedImage){
      setProfile({...profile, profile_picture:selectedImage})
      setPreviewImage(URL.createObjectURL(selectedImage)); // Update the preview URL
    }
  }

  // handle input change
  const handleProfile = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // handle user
  const handleUser = (e)=>{
    setUserData({
      ...userData, [e.target.name]: e.target.value
    })
  }

  // handle update profile submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdate(true)
    const userdata = new FormData()
    const formdata = new FormData()

    // user info
    userdata.append('username', userData.username)
    userdata.append('email', userData.email)
    userdata.append('is_doctor', userData.is_doctor)
    userdata.append('is_patient', userData.is_patient)
    userdata.append('is_staff', userData.is_staff)
    userdata.append('first_name', userData.first_name)
    userdata.append('last_name', userData.last_name)
    userdata.append('date_joined', userData.date_joined)

    // profile info
    formdata.append('profile_picture', profile.profile_picture)
    formdata.append('address', profile.address)
    formdata.append('specialization', profile.specialization)
    formdata.append('license_number', profile.license_number)

    // Only append the image if it has been changed
    if (profile.profile_picture && typeof profile.profile_picture !== 'string') {
      formdata.append('profile_picture', profile.profile_picture);
    }
  
    try{
       const useresponse = await axiosInstance.put(update_user_url, userdata)
       const profile_response = await axiosInstance.put(update_profile_url, formdata)

       if(useresponse.status === 201 && profile_response.status === 200){
        await SingleProfile()
        showSuccessAlert("Profile Updated");
        setUpdate(false)
        setShowModal(false)
        setImage(profile_response.data.image)
        console.log(profile_response.data)
       }
    }catch(err){
      console.log('err', err)
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      timer: 2000,
    });
  };

  return (
    <>
    <div className="container-fluid profile-wrapper bg-white px-5">
     <div className="profile d-flex mt-3">
      <div className="pic">
        <div className="pic_avater">
        <Avatar alt={userData.first_name} src={`${Image ? `https://speclink-backend.onrender.com/${Image}` : `https://speclink-backend.onrender.com/${previewImage}` }`}/>
        </div>
       
       <div className="pic_email">
        <span><strong>{userData.email}</strong></span>
        <span>{moment(userData.date_joined).fromNow()}</span>
       </div>
      </div>

      <button className='ms-auto btn btn-success p-2 text-white' onClick={()=> setShowModal(true)}>edit</button>
     </div>

     <form className='mt-4 profile_form'>
  <div className="mb-3">
    <label htmlFor="formGroupExampleInput" className="form-label">
      First Name
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput"
      value={userData.first_name}
      readOnly
    />
  </div>

  <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
      Last Name
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput2"
      value={userData.last_name}
      readOnly
    />
  </div>

  <div className="mb-3">
    <label htmlFor="formGroupExampleInput" className="form-label">
      Email
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput"
      value={userData.email}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
      Username
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput2"
      value={userData.username}
      readOnly
    />
  </div>

  <div className="mb-3">
    <label htmlFor="formGroupExampleInput" className="form-label">
      Date joined
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput"
      value={dateFormat}
      readOnly
    />
  </div>
  
     </form>
    </div>

     {/* Custom Modal */}
     {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Update Profile</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="custom-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="user_profile">
              
                  <div className="photo">
                    <span>Photo</span>
                    <Avatar alt={userData.first_name} src={previewImage || `https://speclink-backend.onrender.com${profile.profile_picture}`}  className="profile" />
                  </div>
                  <div className="actions">
                  <input
                  type='file'
                  accept='image/*'
                  id='profile_image'
                  hidden='true'
                  onChange={handleImageChange}/>
          
                    <label htmlFor="profile_image">
                    <i className="bi bi-pen-fill text-primary">update photo</i>
                    </label>
                   
                    <p>
                      Recommended: JPG, PNG, or GIF
                    </p>
                  </div>
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
                    value={userData.email}
                    onChange={handleUser}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Username
                  </label>
                  <input
                    type='text'
                    className="form-control"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleUser}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="first_name"
                    value={userData.first_name}
                    onChange={userData}
                     placeholder='add location.....'
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleUser}
                     placeholder='add location.....'
                  />
                </div>

                <button type="submit" className='update_profile'>
                {update ? 'Updating...' : 'Update'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
