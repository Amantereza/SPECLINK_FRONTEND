import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Award,
  FileText,
  BookOpen,
  Calendar,
  Clock,
  Heart,
  ArrowLeft,
  Check,
  Users,
  MessageSquare,
  Languages,
} from "lucide-react"
import '../HomePage/viewprofile.css'

export default function DoctorProfilePage() {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("about")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  // Mock data - in a real app, you would fetch this from an API based on the doctor's ID
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctor({
        id: id,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        subSpecialty: "Interventional Cardiology",
        experience: "15+ years",
        image: "/placeholder.svg?height=500&width=500",
        rating: 4.9,
        totalReviews: 127,
        bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She specializes in interventional cardiology, heart failure management, and cardiac rehabilitation. Her patient-centered approach and expertise in the latest cardiac treatments have made her one of the most sought-after cardiologists in the region.",
        education: [
          { degree: "MD", institution: "Harvard Medical School", year: "2005" },
          { degree: "Residency in Internal Medicine", institution: "Massachusetts General Hospital", year: "2009" },
          { degree: "Fellowship in Cardiovascular Disease", institution: "Cleveland Clinic", year: "2011" },
          { degree: "Fellowship in Interventional Cardiology", institution: "Johns Hopkins Hospital", year: "2012" },
        ],
        certifications: [
          "American Board of Internal Medicine - Cardiovascular Disease",
          "American Board of Internal Medicine - Interventional Cardiology",
          "Advanced Cardiac Life Support (ACLS)",
          "Fellow of the American College of Cardiology (FACC)",
        ],
        awards: [
          { title: "Top Cardiologist", organization: "City Health Magazine", year: "2023" },
          { title: "Excellence in Patient Care", organization: "National Medical Association", year: "2021" },
          { title: "Research Innovation Award", organization: "American Heart Association", year: "2018" },
        ],
        languages: ["English", "Spanish", "French"],
        location: {
          address: "123 Medical Center Dr, Suite 300",
          city: "Boston",
          state: "MA",
          zipCode: "02115",
          coordinates: { lat: 42.3601, lng: -71.0589 },
        },
        contact: {
          office: "(555) 123-4567",
          email: "dr.johnson@speclink.com",
        },
        hospitalAffiliations: ["Boston General Hospital", "Massachusetts Medical Center", "Cardiac Care Institute"],
        specialInterests: [
          "Coronary Artery Disease",
          "Heart Failure Management",
          "Preventive Cardiology",
          "Cardiac Rehabilitation",
        ],
        insurance: ["Blue Cross Blue Shield", "Aetna", "United Healthcare", "Medicare", "Cigna", "Humana"],
        availableDates: [
          { date: "2025-03-15", times: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"] },
          { date: "2025-03-16", times: ["10:00 AM", "1:00 PM", "3:30 PM"] },
          { date: "2025-03-17", times: ["9:30 AM", "12:00 PM", "2:30 PM", "5:00 PM"] },
          { date: "2025-03-18", times: ["8:00 AM", "10:30 AM", "1:30 PM", "4:00 PM"] },
          { date: "2025-03-19", times: ["11:00 AM", "2:30 PM", "5:00 PM"] },
        ],
        publications: [
          { title: "Advances in Interventional Cardiology Techniques", journal: "Journal of Cardiology", year: "2023" },
          {
            title: "Long-term Outcomes of Stent Placement in Coronary Artery Disease",
            journal: "New England Journal of Medicine",
            year: "2021",
          },
          { title: "Preventive Strategies for Heart Failure", journal: "American Heart Journal", year: "2019" },
        ],
        reviews: [
          {
            id: 1,
            name: "Jennifer L.",
            rating: 5,
            date: "2025-02-10",
            comment:
              "Dr. Johnson is an excellent cardiologist. She took the time to explain my condition and treatment options thoroughly. She has a wonderful bedside manner and really listens to her patients.",
          },
          {
            id: 2,
            name: "Robert M.",
            rating: 5,
            date: "2025-01-25",
            comment:
              "Very professional and knowledgeable. Dr. Johnson helped me manage my heart condition with both medication and lifestyle changes. The office staff is also friendly and efficient.",
          },
          {
            id: 3,
            name: "David K.",
            rating: 4,
            date: "2025-01-15",
            comment:
              "Dr. Johnson provided great care and follow-up. She explained everything clearly and answered all my questions. Would recommend to anyone with heart concerns.",
          },
          {
            id: 4,
            name: "Maria G.",
            rating: 5,
            date: "2024-12-20",
            comment:
              "After seeing multiple cardiologists, I finally found Dr. Johnson. She diagnosed my condition accurately and started me on the right treatment plan. I'm feeling so much better now.",
          },
          {
            id: 5,
            name: "Thomas B.",
            rating: 5,
            date: "2024-12-05",
            comment:
              "Outstanding doctor who truly cares about her patients. Dr. Johnson never rushes appointments and takes the time to address all concerns. Her expertise is evident in every interaction.",
          },
        ],
        statistics: {
          patientsServed: "4,500+",
          successRate: "98%",
          yearsPracticing: "15+",
        },
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
    // In a real app, you would submit the appointment data to your backend
    console.log("Appointment booked:", { doctorId: id, date: selectedDate, time: selectedTime })

    // Show success message or redirect
    alert(`Appointment booked with ${doctor.name} on ${selectedDate} at ${selectedTime}`)
    setIsAppointmentModalOpen(false)
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
          <a className="navbar-brand d-flex align-items-center" href="/">
            <span className="brand-logo me-2">SL</span>
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
      <section className="doctor-profile-page py-5">
        <div className="container">
          <Link href="/doctors" className="back-link mb-4 d-inline-flex align-items-center gap-2">
            <ArrowLeft size={16} />
            <span>Back to Doctors</span>
          </Link>

          <div className="row">
            {/* Left Column - Doctor Info */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <motion.div
                className="doctor-profile-card sticky-top"
                style={{ top: "100px" }}
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
                  {doctor.subSpecialty && <p className="doctor-profile-subspecialty">{doctor.subSpecialty}</p>}

                  <div className="doctor-profile-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`star ${i < Math.floor(doctor.rating) ? "filled" : ""}`} size={16} />
                      ))}
                    </div>
                    <span className="rating-value">{doctor.rating}</span>
                    <span className="rating-count">({doctor.totalReviews} reviews)</span>
                  </div>

                  <div className="doctor-profile-statistics">
                    <div className="stat-item">
                      <div className="stat-icon">
                        <Users size={18} />
                      </div>
                      <div className="stat-content">
                        <span className="stat-value">{doctor.statistics.patientsServed}</span>
                        <span className="stat-label">Patients</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">
                        <Check size={18} />
                      </div>
                      <div className="stat-content">
                        <span className="stat-value">{doctor.statistics.successRate}</span>
                        <span className="stat-label">Success Rate</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">
                        <Award size={18} />
                      </div>
                      <div className="stat-content">
                        <span className="stat-value">{doctor.statistics.yearsPracticing}</span>
                        <span className="stat-label">Experience</span>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="doctor-profile-contact">
                    <div className="contact-item">
                      <MapPin size={16} />
                      <span>
                        {doctor.location.address}, {doctor.location.city}, {doctor.location.state}{" "}
                        {doctor.location.zipCode}
                      </span>
                    </div>
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>{doctor.contact.office}</span>
                    </div>
                    <div className="contact-item">
                      <Mail size={16} />
                      <span>{doctor.contact.email}</span>
                    </div>
                    <div className="contact-item">
                      <Languages size={16} />
                      <span>{doctor.languages.join(", ")}</span>
                    </div>
                  </div>

                  <button
                    className="book-appointment-button w-100 mt-4"
                    onClick={() => setIsAppointmentModalOpen(true)}
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="col-lg-8">
              <motion.div
                className="doctor-profile-tabs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="profile-tabs">
                  <button
                    className={`profile-tab ${selectedTab === "about" ? "active" : ""}`}
                    onClick={() => setSelectedTab("about")}
                  >
                    About
                  </button>
                  <button
                    className={`profile-tab ${selectedTab === "education" ? "active" : ""}`}
                    onClick={() => setSelectedTab("education")}
                  >
                    Education & Awards
                  </button>
                  <button
                    className={`profile-tab ${selectedTab === "publications" ? "active" : ""}`}
                    onClick={() => setSelectedTab("publications")}
                  >
                    Publications
                  </button>
                  <button
                    className={`profile-tab ${selectedTab === "reviews" ? "active" : ""}`}
                    onClick={() => setSelectedTab("reviews")}
                  >
                    Reviews
                  </button>
                </div>

                <div className="profile-tab-content">
                  {/* About Tab */}
                  {selectedTab === "about" && (
                    <div className="profile-about">
                      <div className="profile-section">
                        <h2 className="section-title">About Dr. {doctor.name.split(" ")[1]}</h2>
                        <p className="section-content">{doctor.bio}</p>
                      </div>

                      <div className="profile-section">
                        <h2 className="section-title">Specializations & Interests</h2>
                        <div className="specializations-grid">
                          {doctor.specialInterests.map((interest, index) => (
                            <div key={index} className="specialization-item">
                              <Heart size={16} className="specialty-icon" />
                              <span>{interest}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="profile-section">
                        <h2 className="section-title">Hospital Affiliations</h2>
                        <ul className="hospital-list">
                          {doctor.hospitalAffiliations.map((hospital, index) => (
                            <li key={index} className="hospital-item">
                              <div className="hospital-icon">
                                <MapPin size={16} />
                              </div>
                              <span>{hospital}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="profile-section">
                        <h2 className="section-title">Insurance Accepted</h2>
                        <div className="insurance-grid">
                          {doctor.insurance.map((ins, index) => (
                            <div key={index} className="insurance-item">
                              <Check size={16} className="insurance-icon" />
                              <span>{ins}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Education & Awards Tab */}
                  {selectedTab === "education" && (
                    <div className="profile-education">
                      <div className="profile-section">
                        <h2 className="section-title">Education & Training</h2>
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

                      <div className="profile-section">
                        <h2 className="section-title">Certifications</h2>
                        <ul className="certifications-list">
                          {doctor.certifications.map((cert, index) => (
                            <li key={index} className="certification-item">
                              <FileText size={16} />
                              <span>{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="profile-section">
                        <h2 className="section-title">Awards & Recognitions</h2>
                        <div className="awards-list">
                          {doctor.awards.map((award, index) => (
                            <div key={index} className="award-item">
                              <div className="award-icon">
                                <Award size={20} />
                              </div>
                              <div className="award-content">
                                <h4>{award.title}</h4>
                                <p>
                                  {award.organization}, {award.year}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Publications Tab */}
                  {selectedTab === "publications" && (
                    <div className="profile-publications">
                      <div className="profile-section">
                        <h2 className="section-title">Research Publications</h2>
                        <div className="publications-list">
                          {doctor.publications.map((pub, index) => (
                            <div key={index} className="publication-item">
                              <div className="publication-icon">
                                <BookOpen size={20} />
                              </div>
                              <div className="publication-content">
                                <h4>{pub.title}</h4>
                                <p>
                                  {pub.journal}, {pub.year}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {selectedTab === "reviews" && (
                    <div className="profile-reviews">
                      <div className="profile-section">
                        <div className="reviews-header">
                          <h2 className="section-title">Patient Reviews</h2>
                          <div className="reviews-summary">
                            <div className="overall-rating">
                              <h3>{doctor.rating}</h3>
                              <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`star ${i < Math.floor(doctor.rating) ? "filled" : ""}`}
                                    size={18}
                                  />
                                ))}
                              </div>
                              <p>{doctor.totalReviews} reviews</p>
                            </div>
                          </div>
                        </div>

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
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <div className="appointment-modal-overlay">
          <div className="appointment-modal">
            <div className="appointment-modal-header">
              <h3>Book an Appointment with {doctor.name}</h3>
              <button className="close-modal" onClick={() => setIsAppointmentModalOpen(false)}>
                ×
              </button>
            </div>

            <div className="appointment-modal-body">
              <form onSubmit={handleBookAppointment}>
                <div className="form-group">
                  <label htmlFor="date">
                    <Calendar size={16} className="form-icon" /> Select Date
                  </label>
                  <select id="date" className="form-select" value={selectedDate} onChange={handleDateChange} required>
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

                <div className="form-group">
                  <label htmlFor="time">
                    <Clock size={16} className="form-icon" /> Select Time
                  </label>
                  <select
                    id="time"
                    className="form-select"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    required
                    disabled={!selectedDate}
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

                <div className="form-group">
                  <label htmlFor="reason">
                    <MessageSquare size={16} className="form-icon" /> Reason for Visit
                  </label>
                  <select id="reason" className="form-select" required>
                    <option value="">Select reason</option>
                    <option value="new-patient">New Patient Consultation</option>
                    <option value="follow-up">Follow-up Appointment</option>
                    <option value="annual-checkup">Annual Check-up</option>
                    <option value="procedure">Procedure</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsAppointmentModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-book" disabled={!selectedDate || !selectedTime}>
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer text-center py-4">
        <div className="container">
          <p className="copyright">© {new Date().getFullYear()} SPEC-LINK. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

