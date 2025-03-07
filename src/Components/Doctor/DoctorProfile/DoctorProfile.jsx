import React, { useContext, useEffect, useState } from 'react';
import '../../Admin/Profile/profile.css'
import { Avatar } from '@mui/material';
import useHook from '../../CustomHook/useHook';
import { AuthContext } from '../../AuthContext/Context';
import axios from 'axios';
import moment from 'moment';
import UseAxios from '../../UseAxios/Token';
import Swal from 'sweetalert2';
import Nav from '../DoctorNav/nav';

import '../DoctorProfile/docProfile.css'

function DoctorProfile() {
  const { user } = useContext(AuthContext);
  const axiosInstance = UseAxios();
  const { profile, previewImage, setPreviewImage, setProfile, SingleProfile } = useHook();

  const userUrl = `https://speclink-backend.onrender.com/specLink/single_user/${user.user_id}`;
  const updateUserUrl = `https://speclink-backend.onrender.com/specLink/update_user/${user?.user_id}`;
  const updateProfileUrl = `https://speclink-backend.onrender.com/specLink/EditProfile/${user?.user_id}`;

  const [showModal, setShowModal] = useState(false);
  const [dateFormat, setDateFormat] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    is_doctor: false,
    is_staff: true,
    is_patient: false,
    email: '',
    date_joined: '',
  });
  const [update, setUpdate] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Fetch user data
  const userDataHandle = async () => {
    try {
      const response = await axios.get(userUrl);
      const data = response.data;
      const formattedDate = formatDate(data.date_joined);
      setDateFormat(formattedDate);
      setUserData(data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to load user data.',
        icon: 'error',
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    if (user?.user_id) userDataHandle();
  }, [user?.user_id]);

  // Handle image change
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setProfile({ ...profile, profile_picture: selectedImage });
      setPreviewImage(URL.createObjectURL(selectedImage));
    }
  };

//   handle profiel
const handleProfile = (e)=>{
    setProfile({
        ...profile, [e.target.name]: e.target.value
    })
}

  // Handle user input change
  const handleUser = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdate(true);

    const userFormData = new FormData();
    const profileFormData = new FormData();

    // Append user data
    userFormData.append('username', userData.username);
    userFormData.append('email', userData.email);
    userFormData.append('is_doctor', userData.is_doctor);
    userFormData.append('is_patient', userData.is_patient);
    userFormData.append('is_staff', userData.is_staff);
    userFormData.append('first_name', userData.first_name);
    userFormData.append('last_name', userData.last_name);
    userFormData.append('date_joined', userData.date_joined);

    // Append profile data
    profileFormData.append('address', profile.address || '');
    profileFormData.append('specialization', profile.specialization);
    // profileFormData.append('license_number', profile.license_number || '');
    profileFormData.append('years_of_experience', profile.years_of_experience)
    profileFormData.append('date_of_birth', profile.date_of_birth || '')

    // Append profile_picture only if it’s a File object (new upload)
    if (profile.profile_picture && profile.profile_picture instanceof File) {
      profileFormData.append('profile_picture', profile.profile_picture);
    }

    try {
      const userResponse = await axiosInstance.put(updateUserUrl, userFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const profileResponse = await axiosInstance.put(updateProfileUrl, profileFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (userResponse.status === 201 && profileResponse.status === 200) {
        await SingleProfile(); // Refresh profile data
        showSuccessAlert('Profile Updated');
        setShowModal(false);
        setUpdate(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.profile_picture?.[0] || 'Failed to update profile.',
        icon: 'error',
        timer: 2000,
      });
    } finally {
      setUpdate(false);
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: 'success',
      timer: 2000,
    });
  };

  return (
    <>
    <Nav/>
      <div className="container-fluid bg-white p-4">
        <div className="user_profile_wrapper ">
        <div className="profile user_prof d-flex mt-3 p-2">
          <div className="pic">
            <div className="pic_avater">
              <Avatar
                alt={userData.first_name}
                src={
                  previewImage
                    ? `https://speclink-backend.onrender.com${previewImage}`
                    : profile.profile_picture
                    ? `https://speclink-backend.onrender.com${profile.profile_picture}`
                    : ''
                }
              />
            </div>
            <div className="pic_email">
              <span>
                <strong>{userData.email}</strong>
              </span>
              <span>{moment(userData.date_joined).fromNow()}</span>
            </div>
          </div>
          <button
            className="ms-auto btn btn-success p-2 text-white"
            onClick={() => setShowModal(true)}
          >
            Edit
          </button>
        </div>

        <form className="mt-4 profile_form">
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={userData.first_name}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={userData.last_name}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={userData.email}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={userData.username}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateJoined" className="form-label">
              Date Joined
            </label>
            <input
              type="text"
              className="form-control"
              id="dateJoined"
              value={dateFormat}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dateJoined" className="form-label">
              Specializations
            </label>
            <input
              type="text"
              className="form-control"
              id="dateJoined"
              value={profile.specialization}
              placeholder='specialization....'
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dateJoined" className="form-label">
             Years of Experience
            </label>
            <input
              type="text"
              className="form-control"
              id="dateJoined"
              value={profile.years_of_experience}
              placeholder='experience.....'
              readOnly
            />
          </div>
        </form>
        </div>
       
      </div>

      {/* Update Profile Modal */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Update Profile</h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="custom-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="user_profile">
                  <div className="photo">
                    <span>Photo</span>
                    <Avatar
                      alt={userData.first_name}
                      src={
                        previewImage
                          ? previewImage
                          : profile.profile_picture
                          ? `https://speclink-backend.onrender.com${profile.profile_picture}`
                          : ''
                      }
                      className="profile"
                    />
                  </div>
                  <div className="actions">
                    <input
                      type="file"
                      accept="image/*"
                      id="profile_image"
                      hidden
                      onChange={handleImageChange}
                    />
                    <label htmlFor="profile_image">
                      <i className="bi bi-pen-fill text-primary"> Update Photo</i>
                    </label>
                    <p>Recommended: JPG, PNG, or GIF</p>
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
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleUser}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleUser}
                    placeholder="Enter first name..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleUser}
                    placeholder="Enter last name..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    specialization
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleProfile}
                    placeholder="Enter last name..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    years of experience
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="lastName"
                    name="years_of_experience"
                    value={profile.years_of_experience}
                    onChange={handleProfile}
                    placeholder="Enter last name..."
                  />
                </div>

                <button type="submit" className="update_profile btn btn-primary" disabled={update}>
                  {update ? 'Updating...' : 'Update'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorProfile;