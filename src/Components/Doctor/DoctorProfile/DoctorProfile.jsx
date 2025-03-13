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
import '../../HomePage/styles.css';
import '../DoctorProfile/docProfile.css'

function DoctorProfile() {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  // Mock data - in a real app, you would fetch this from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctor({
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        experience: "15+ years",
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.9,
        bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology, heart failure management, and cardiac rehabilitation.",
        education: [
          { degree: "MD", institution: "Harvard Medical School", year: "2005" },
          { degree: "Residency", institution: "Massachusetts General Hospital", year: "2009" },
          { degree: "Fellowship", institution: "Cleveland Clinic", year: "2011" },
        ],
        certifications: [
          "American Board of Internal Medicine - Cardiovascular Disease",
          "Advanced Cardiac Life Support (ACLS)",
          "Fellow of the American College of Cardiology (FACC)",
        ],
        location: "123 Medical Center Dr, Suite 300, Healthcare City",
        phone: "(555) 123-4567",
        email: "dr.johnson@speclink.com",
        availableDates: [
          { date: "2025-03-15", times: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"] },
          { date: "2025-03-16", times: ["10:00 AM", "1:00 PM", "3:30 PM"] },
          { date: "2025-03-17", times: ["9:30 AM", "12:00 PM", "2:30 PM", "5:00 PM"] },
        ],
        reviews: [
          {
            id: 1,
            name: "Jennifer L.",
            rating: 5,
            comment:
              "Dr. Johnson is an excellent cardiologist. She took the time to explain my condition and treatment options thoroughly.",
            date: "2025-02-10",
          },
          {
            id: 2,
            name: "Robert M.",
            rating: 5,
            comment: "Very professional and knowledgeable. The office staff is also friendly and efficient.",
            date: "2025-01-25",
          },
          {
            id: 3,
            name: "David K.",
            rating: 4,
            comment: "Dr. Johnson provided great care and follow-up. Would recommend to anyone with heart concerns.",
            date: "2025-01-15",
          },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [id])

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    setSelectedTime("")
  }

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value)
  }

  const handleBookAppointment = (e) => {
    e.preventDefault()
    // Handle appointment booking logic
    console.log("Appointment booked:", { doctorId: doctor.id, date: selectedDate, time: selectedTime })
    alert(`Appointment booked with ${doctor.name} on ${selectedDate} at ${selectedTime}`)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading doctor profile...</p>
      </div>
    )
  }

  return (
    <div className="page-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            {/* <span className="brand-logo me-2">SL</span> */}
            <span className="brand-text">SPEC-LINK</span>
          </a>
          <div className="ms-auto">
            <a href="/signup" className="btn btn-light btn-sm">
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* Doctor Profile Section */}
      <section className="doctor-profile-section">
        <div className="container">
          <Link to="/doctors" className="back-link">
            <ArrowLeft size={16} /> Back to Doctors
          </Link>

          <div className="row">
            <div className="col-lg-4">
              <motion.div
                className="doctor-profile-sidebar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="doctor-profile-image-container">
                  <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="doctor-profile-image" />
                </div>

                <div className="doctor-profile-info">
                  <h1 className="doctor-profile-name">{doctor.name}</h1>
                  <p className="doctor-profile-specialty">{doctor.specialty}</p>
                  <p className="doctor-profile-experience">{doctor.experience} Experience</p>

                  <div className="doctor-profile-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`star ${i < Math.floor(doctor.rating) ? "filled" : ""}`} size={16} />
                      ))}
                    </div>
                    <span className="rating-value">{doctor.rating}</span>
                  </div>

                  <div className="doctor-profile-contact">
                    <div className="contact-item">
                      <MapPin size={16} />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>{doctor.phone}</span>
                    </div>
                    <div className="contact-item">
                      <Mail size={16} />
                      <span>{doctor.email}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-8">
              <motion.div
                className="doctor-profile-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="doctor-profile-tabs">
                  <ul className="nav nav-tabs" id="doctorProfileTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="about-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#about"
                        type="button"
                        role="tab"
                        aria-controls="about"
                        aria-selected="true"
                      >
                        <User size={16} /> About
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="education-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#education"
                        type="button"
                        role="tab"
                        aria-controls="education"
                        aria-selected="false"
                      >
                        <Award size={16} /> Education
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="reviews-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#reviews"
                        type="button"
                        role="tab"
                        aria-controls="reviews"
                        aria-selected="false"
                      >
                        <Star size={16} /> Reviews
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content" id="doctorProfileTabsContent">
                    <div className="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab">
                      <div className="doctor-profile-bio">
                        <h3>Biography</h3>
                        <p>{doctor.bio}</p>
                      </div>

                      <div className="doctor-profile-certifications">
                        <h3>Certifications</h3>
                        <ul>
                          {doctor.certifications.map((cert, index) => (
                            <li key={index}>
                              <FileText size={16} />
                              <span>{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="education" role="tabpanel" aria-labelledby="education-tab">
                      <div className="doctor-profile-education">
                        <h3>Education & Training</h3>
                        <div className="education-timeline">
                          {doctor.education.map((edu, index) => (
                            <div key={index} className="education-item">
                              <div className="education-year">{edu.year}</div>
                              <div className="education-content">
                                <h4>{edu.degree}</h4>
                                <p>{edu.institution}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                      <div className="doctor-profile-reviews">
                        <h3>Patient Reviews</h3>
                        <div className="reviews-list">
                          {doctor.reviews.map((review) => (
                            <div key={review.id} className="review-item">
                              <div className="review-header">
                                <div className="review-author">
                                  <div className="review-avatar">{review.name.charAt(0)}</div>
                                  <div className="review-meta">
                                    <h4>{review.name}</h4>
                                    <span className="review-date">{review.date}</span>
                                  </div>
                                </div>
                                <div className="review-rating">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`star ${i < review.rating ? "filled" : ""}`} size={14} />
                                  ))}
                                </div>
                              </div>
                              <div className="review-content">
                                <p>{review.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="appointment-booking-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3>Book an Appointment</h3>
                  <form onSubmit={handleBookAppointment}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            <Calendar size={16} /> Select Date
                          </label>
                          <select value={selectedDate} onChange={handleDateChange} required className="form-select">
                            <option value="">Choose a date</option>
                            {doctor.availableDates.map((dateObj, index) => (
                              <option key={index} value={dateObj.date}>
                                {new Date(dateObj.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            <Clock size={16} /> Select Time
                          </label>
                          <select
                            value={selectedTime}
                            onChange={handleTimeChange}
                            required
                            disabled={!selectedDate}
                            className="form-select"
                          >
                            <option value="">Choose a time</option>
                            {selectedDate &&
                              doctor.availableDates
                                .find((d) => d.date === selectedDate)
                                ?.times.map((time, index) => (
                                  <option key={index} value={time}>
                                    {time}
                                  </option>
                                ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="book-appointment-button" disabled={!selectedDate || !selectedTime}>
                      Book Appointment
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-center py-4">
        <div className="container">
          <p className="copyright">© {new Date().getFullYear()} SPEC-LINK. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default DoctorProfile