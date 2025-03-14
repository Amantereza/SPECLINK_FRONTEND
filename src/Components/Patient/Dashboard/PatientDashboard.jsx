import React, { useContext } from 'react';
import '../Dashboard/dashboard.css';
import Nav from '../../Doctor/DoctorNav/nav';
import { AuthContext } from '../../AuthContext/Context';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react"
import useHook from '../../CustomHook/useHook';
import axios from 'axios';
import  Swal from 'sweetalert2'


const BASE_URL = 'https://speclink-backend.onrender.com/specLink/'

// Mock data - in a real app, this would come from your API/context
const mockUser = {
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
}

const mockAppointments = [
  {
    id: "1",
    doctor: { first_name: "Jane", last_name: "Smith", id: "d1", specialty: "Cardiologist" },
    date: "2025-03-15",
    time: "10:00 AM",
    reason: "Annual checkup",
    status: "Approved",
  },
  {
    id: "2",
    doctor: { first_name: "Michael", last_name: "Johnson", id: "d2", specialty: "Neurologist" },
    date: "2025-03-20",
    time: "2:30 PM",
    reason: "Follow-up consultation",
    status: "Pending",
  },
]

const mockRecords = [
  { id: "1", title: "Blood Test Results", date: "2025-02-10", doctor: "Dr. Smith" },
  { id: "2", title: "X-Ray Report", date: "2025-01-15", doctor: "Dr. Johnson" },
  { id: "3", title: "Prescription", date: "2025-02-28", doctor: "Dr. Smith" },
]

const mockDoctors = [
  { id: "d1", first_name: "Jane", last_name: "Smith", specialty: "Cardiologist", status: "online" },
  { id: "d2", first_name: "Michael", last_name: "Johnson", specialty: "Neurologist", status: "offline" },
  { id: "d3", first_name: "Sarah", last_name: "Williams", specialty: "Dermatologist", status: "online" },
]

// Time slots for appointment booking
const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
]

function PatientDashboard() {

  const { user } = useContext(AuthContext);
  const { appointments, appointmentLoad, records, fetchAppointment} = useHook();
  const DOCTOR_LIST_URL = `${BASE_URL}list_doctors`;
  const POST_APPOINTMENT_URL = `${BASE_URL}post_appointements`;

  // State variables
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [doctorload,setDoctorLoad] = useState(false)
  const [createAppointment, setCreateAppointment] = useState({ user: user?.user_id, doctor: '', time: '', reason: '', date: '' })

  // Chat state
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const messagesEndRef = useRef(null)

  // Video call state
  const [isVideoConnected, setIsVideoConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)

  // Voice call state
  const [isVoiceConnected, setIsVoiceConnected] = useState(false)

  // Appointment booking state
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")
  const [appointmentReason, setAppointmentReason] = useState("")
  const [doctors, setDoctors] = useState([])
  const [createLoading, setCreateLoading] = useState(false)

  // Fetch doctors
  const fetchDoctors = async () => {
    setDoctorLoad(true);
    try {
      const response = await axios.get(DOCTOR_LIST_URL);
      setDoctors(response.data);
      console.log(response.data)
    } catch (err) {
      console.error('Error fetching doctors:', err);
      // Swal.fire({
      //   title: 'Error',
      //   text: 'Failed to load doctors.',
      //   icon: 'error',
      //   timer: 3000,
      //   toast: true,
      //   position: 'top',
      // });
    } finally {
      setDoctorLoad(false);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchDoctors();
    }
  }, [user?.user_id]);

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Set initial chat messages when doctor is selected
  useEffect(() => {
    if (selectedDoctor && activeView === "chat") {
      setChatMessages([
        {
          id: 1,
          sender: "doctor",
          text: `Hello ${user.first_name}, how can I help you today?`,
          time: "10:00 AM",
        },
      ])
    }
  }, [selectedDoctor, activeView, user.first_name])

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!message.trim() || !selectedDoctor) return

    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, userMessage])
    setMessage("")

    // Simulate doctor response after a delay
    setTimeout(() => {
      const doctorMessage = {
        id: chatMessages.length + 2,
        sender: "doctor",
        text: "I understand your concern. Would you like to schedule an appointment for a more thorough examination?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setChatMessages((prev) => [...prev, doctorMessage])
    }, 2000)
  }

  // Handle starting a video call
  const handleStartVideoCall = (doctor) => {
    setSelectedDoctor(doctor)
    setIsVideoConnected(true)
    alert(`Starting video call with Dr. ${doctor.first_name} ${doctor.last_name}`)
  }

  // Handle ending a video call
  const handleEndVideoCall = () => {
    setIsVideoConnected(false)
    alert("Video call ended")
  }

  // Handle starting a voice call
  const handleStartVoiceCall = (doctor) => {
    setSelectedDoctor(doctor)
    setIsVoiceConnected(true)
    alert(`Starting voice call with Dr. ${doctor.first_name} ${doctor.last_name}`)
  }

  // Handle ending a voice call
  const handleEndVoiceCall = () => {
    setIsVoiceConnected(false)
    alert("Voice call ended")
  }

  // Handle booking an appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateLoading(true); // Start loading
    try {
      const response = await axios.post(POST_APPOINTMENT_URL, createAppointment);
      if (response.status === 201) {
        Swal.fire({
          title: 'Success',
          text: 'Appointment created successfully!',
          icon: 'success',
          timer: 3000,
          toast: true,
          position: 'top',
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Update appointments state and force table re-render
        await fetchAppointment();
        // setTableKey((prev) => prev + 1);

        setShowModal(false);
        setCreateAppointment({ user: user?.user_id, doctor: '', time: '', reason: '', date: '' });
      }
    } catch (err) {
      console.error('Error creating appointment:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to create appointment.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top',
      });
    } finally {
      setCreateLoading(false); // Stop loading
    }
  };

  // const handleBookAppointment = () => {
  //   if (!appointmentDate || !appointmentTime || !appointmentReason || !selectedDoctor) {
  //     alert("Please fill in all required fields")
  //     return
  //   }

  //   const newAppointment = {
  //     id: String(appointments.length + 1),
  //     doctor: selectedDoctor,
  //     date: appointmentDate,
  //     time: appointmentTime,
  //     reason: appointmentReason,
  //     status: "Pending",
  //   }

  //   setAppointments([...appointments, newAppointment])
  //   setShowBookingForm(false)
  //   setAppointmentDate("")
  //   setAppointmentTime("")
  //   setAppointmentReason("")

  //   alert(`Appointment with Dr. ${selectedDoctor.first_name} ${selectedDoctor.last_name} booked successfully!`)
  //   setActiveView("appointments")
  // }

  // Toggle sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen)
    } else {
      setSidebarOpen(!sidebarOpen)
    }
  }

  // Render the sidebar
  const renderSidebar = () => {
    const menuItems = [
      { title: "Dashboard", icon: "fas fa-home", view: "dashboard" },
      { title: "Appointments", icon: "fas fa-calendar", view: "appointments" },
      { title: "Medical Records", icon: "fas fa-file-medical", view: "records" },
      { title: "Chat", icon: "fas fa-comment", view: "chat" },
      { title: "Video Call", icon: "fas fa-video", view: "video" },
      { title: "Voice Call", icon: "fas fa-phone", view: "voice" },
      { title: "Profile", icon: "fas fa-user", view: "profile" },
      { title: "Settings", icon: "fas fa-cog", view: "settings" },
    ]

    const sidebarClass = isMobile
      ? `sidebar mobile-sidebar ${mobileSidebarOpen ? "open" : ""}`
      : `sidebar ${sidebarOpen ? "open" : "collapsed"}`

    return (
      <div className={sidebarClass}>
        <div className="sidebar-header">
          <div className="user-info">
            <div className="avatar">
              <span>
                {user.first_name[0]}
                {user.last_name[0]}
              </span>
            </div>
            <div className="user-details">
              <h3>
                {user.first_name} {user.last_name}
              </h3>
              <p>Patient</p>
            </div>
          </div>
          <button className="toggle-sidebar" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.view}
              className={activeView === item.view ? "active" : ""}
              onClick={() => setActiveView(item.view)}
            >
              <i className={item.icon}></i>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <button className="logout-button">
            <i className="fas fa-sign-out-alt"></i>
            <Link to='/patient/logout'>
            <span>Logout</span>
            </Link>
          </button>
        </div>
      </div>
    )
  }

  // Render the main content based on active view
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return renderDashboard()
      case "appointments":
        return renderAppointments()
      case "records":
        return renderMedicalRecords()
      case "chat":
        return renderChat()
      case "video":
        return renderVideoCall()
      case "voice":
        return renderVoiceCall()
      case "profile":
        return renderProfile()
      case "settings":
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  // Render the dashboard overview
  const renderDashboard = () => {
    return (
      <div className="dashboard-overview">
        <h2 className="welcome-message">
          Welcome, {user.first_name} {user.last_name} 👋
        </h2>

        <div className="dashboard-cards">
          <div className="dashboard-card appointments-card">
            <div className="card-icon">
              <i className="fas fa-calendar"></i>
            </div>
            <div className="card-content">
              <h3>Appointments</h3>
              <p>Manage your consultations</p>
              <h4>{appointments.length}</h4>
              <p>Upcoming appointments</p>
            </div>
            <button onClick={() => setActiveView("appointments")}>
              <i className="fas fa-calendar"></i> View Schedule
            </button>
          </div>

          <div className="dashboard-card records-card">
            <div className="card-icon">
              <i className="fas fa-file-medical"></i>
            </div>
            <div className="card-content">
              <h3>Medical Records</h3>
              <p>Access your health data</p>
              <h4>{records.length}</h4>
              <p>Available records</p>
            </div>
            <button onClick={() => setActiveView("records")}>
              <i className="fas fa-file-medical"></i> View Records
            </button>
          </div>

          <div className="dashboard-card chat-card">
            <div className="card-icon">
              <i className="fas fa-comment"></i>
            </div>
            <div className="card-content">
              <h3>Chat with Doctor</h3>
              <p>Get medical advice</p>
            </div>
            <button onClick={() => setActiveView("chat")}>
              <i className="fas fa-comment"></i> Start Chat
            </button>
          </div>

          <div className="dashboard-card video-card">
            <div className="card-icon">
              <i className="fas fa-video"></i>
            </div>
            <div className="card-content">
              <h3>Video Consultation</h3>
              <p>Face-to-face appointments</p>
            </div>
            <button onClick={() => setActiveView("video")}>
              <i className="fas fa-video"></i> Start Video Call
            </button>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="appointments-section">
            <h3>Scheduled Consultations</h3>
            {renderAppointmentTable()}
            <button className="view-all-button" onClick={() => setActiveView("appointments")}>
              View All Appointments
            </button>
          </div>

          <div className="quick-connect-section">
            <h3>Quick Connect</h3>
            <div className="doctors-list">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-info">
                    <div className="doctor-avatar">
                      <span>
                        {doctor.first_name}
                        {doctor.last_name}
                      </span>
                      <span className={`status-indicator ${doctor.status}`}></span>
                    </div>
                    <div>
                      <h4>
                        Dr. {doctor.first_name} {doctor.last_name}
                      </h4>
                      <p>{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="doctor-actions">
                    <button
                      className="action-button chat"
                      onClick={() => {
                        setSelectedDoctor(doctor)
                        setActiveView("chat")
                      }}
                      title="Chat"
                    >
                      <i className="fas fa-comment"></i>
                    </button>
                    <button
                      className="action-button video"
                      onClick={() => {
                        setSelectedDoctor(doctor)
                        setActiveView("video")
                      }}
                      title="Video Call"
                    >
                      <i className="fas fa-video"></i>
                    </button>
                    <button
                      className="action-button voice"
                      onClick={() => {
                        setSelectedDoctor(doctor)
                        setActiveView("voice")
                      }}
                      title="Voice Call"
                    >
                      <i className="fas fa-phone"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="book-appointment-button"
              onClick={() => {
                setShowBookingForm(true)
                setActiveView("appointments")
              }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render the appointment table
  const renderAppointmentTable = () => {
    if (appointmentLoad) {
      return (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading consultations...</p>
        </div>
      )
    }

    if (appointments.length === 0) {
      return <h6>No Scheduled Consultations</h6>
    }

    return (
      <div className="table-responsive">
        <table className="table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>{index + 1}</td>
                <td>
                  Dr. {appointment.doctor.first_name} {appointment.doctor.last_name}
                </td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.reason}</td>
                <td>
                  <span
                    className={`status-badge ${
                      appointment.status === "Approved"
                        ? "approved"
                        : appointment.status === "Cancelled"
                          ? "cancelled"
                          : "pending"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Render the appointments view
  const renderAppointments = () => {
    if (showBookingForm) {
      return (
        <div className="appointment-booking">
          <div className="section-header">
            <h2>Book an Appointment</h2>
            <button className="back-button" onClick={() => setShowBookingForm(false)}>
              Back to Appointments
            </button>
          </div>

          <div className="booking-form">
            <div className="form-section">
              <h3>Select Doctor</h3>
              <div className="doctors-grid">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`doctor-selection ${selectedDoctor?.id === doctor.id ? "selected" : ""}`}
                    onClick={() => setCreateAppointment({...createAppointment, doctor: doctor.id})}
                  >
                    <div className="doctor-avatar">
                      <span>
                        {doctor.first_name}
                        {doctor.last_name}
                      </span>
                    </div>
                    <div>
                      <h4>
                        Dr. {doctor.first_name} {doctor.last_name}
                      </h4>
                      <p>{doctor.profile.specialisation}</p>
                    </div>
                    {selectedDoctor?.id === doctor.id && <i className="fas fa-check selection-check"></i>}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label>Select Date</label>
                <input
                  type="date"
                  name='date'
                  value={createAppointment.date}
                  onChange={(e) => setCreateAppointment({...createAppointment, date:e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Select Time</label>
                <input
                  type="time"
                  name='time'
                  value={createAppointment.time}
                  onChange={(e) => setCreateAppointment({...createAppointment, time:e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Reason for Visit</label>
                <textarea
                  placeholder="Please describe your symptoms or reason for consultation"
                  name='reason'
                  value={createAppointment.reason}
                  onChange={(e) => setCreateAppointment({...createAppointment, reason:e.target.value})}
                ></textarea>
                <p className="form-hint">This helps the doctor prepare for your appointment</p>
              </div>
            </div>

            <div className="form-actions">
              <button className="cancel-button" onClick={() => setShowBookingForm(false)}>
                Cancel
              </button>
              <button className="submit-button" onClick={handleSubmit}>
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="appointments-view">
        <div className="section-header">
          <h2>Appointments</h2>
          <button className="book-button" onClick={() => setShowBookingForm(true)}>
            <i className="fas fa-calendar-plus"></i> Book Appointment
          </button>
        </div>

        <div className="appointments-tabs">
          <div className="tabs-header">
            <button
              className="tab-button active"
              onClick={() => {
                /* Handle tab change */
              }}
            >
              <i className="fas fa-calendar"></i> Upcoming
            </button>
            <button
              className="tab-button"
              onClick={() => {
                /* Handle tab change */
              }}
            >
              <i className="fas fa-clock"></i> Past
            </button>
          </div>

          <div className="tab-content">
            <div className="appointments-list">
              <h3>Upcoming Appointments</h3>
              {renderAppointmentTable()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render the medical records view
  const renderMedicalRecords = () => {
    return (
      <div className="medical-records-view">
        <div className="section-header">
          <h2>Medical Records</h2>
          <div className="search-container">
            <input type="text" placeholder="Search records..." className="search-input" />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="records-grid">
          {records.map((record) => (
            <div key={record.id} className="record-card">
              <h3>{record.title}</h3>
              <p>
                {record.date} • {record.doctor}
              </p>
              <div className="record-actions">
                <button className="view-button">
                  <i className="fas fa-eye"></i> View
                </button>
                <button className="download-button">
                  <i className="fas fa-download"></i> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render the chat view
  const renderChat = () => {
    return (
      <div className="chat-view">
        <div className="chat-container">
          <div className="doctors-sidebar">
            <h3>Doctors</h3>
            <div className="doctors-list">
              {mockDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`doctor-item ${selectedDoctor?.id === doctor.id ? "selected" : ""} ${doctor.status}`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="doctor-avatar">
                    <span>
                      {doctor.first_name[0]}
                      {doctor.last_name[0]}
                    </span>
                    <span className={`status-indicator ${doctor.status}`}></span>
                  </div>
                  <div className="doctor-info">
                    <h4>
                      Dr. {doctor.first_name} {doctor.last_name}
                    </h4>
                    <p>{doctor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-main">
            {selectedDoctor ? (
              <>
                <div className="chat-header">
                  <div className="doctor-info">
                    <div className="doctor-avatar">
                      <span>
                        {selectedDoctor.first_name[0]}
                        {selectedDoctor.last_name[0]}
                      </span>
                      <span className={`status-indicator ${selectedDoctor.status}`}></span>
                    </div>
                    <div>
                      <h3>
                        Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}
                      </h3>
                      <p>{selectedDoctor.specialty}</p>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button
                      className="action-button"
                      onClick={() => {
                        setActiveView("voice")
                        handleStartVoiceCall(selectedDoctor)
                      }}
                    >
                      <i className="fas fa-phone"></i>
                    </button>
                    <button
                      className="action-button"
                      onClick={() => {
                        setActiveView("video")
                        handleStartVideoCall(selectedDoctor)
                      }}
                    >
                      <i className="fas fa-video"></i>
                    </button>
                    <button
                      className="action-button"
                      onClick={() => {
                        setShowBookingForm(true)
                        setActiveView("appointments")
                      }}
                    >
                      <i className="fas fa-calendar"></i>
                    </button>
                  </div>
                </div>

                <div className="chat-messages">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`message ${msg.sender === "user" ? "user-message" : "doctor-message"}`}
                    >
                      <div className="message-content">
                        <p>{msg.text}</p>
                        <span className="message-time">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <button className="send-button" onClick={handleSendMessage} disabled={!message.trim()}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </>
            ) : (
              <div className="no-selection">
                <div className="icon-container">
                  <i className="fas fa-comment"></i>
                </div>
                <h3>Start a Conversation</h3>
                <p>Select a doctor from the list to begin chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render the video call view
  const renderVideoCall = () => {
    if (isVideoConnected && selectedDoctor) {
      return (
        <div className="video-call-active">
          <div className="video-container">
            <div className="main-video">
              {isVideoOn ? (
                <div className="video-placeholder doctor">
                  <div className="doctor-avatar">
                    <span>
                      {selectedDoctor.first_name[0]}
                      {selectedDoctor.last_name[0]}
                    </span>
                  </div>
                  <h3>
                    Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}
                  </h3>
                  <p>{selectedDoctor.specialty}</p>
                </div>
              ) : (
                <div className="video-off">
                  <i className="fas fa-video-slash"></i>
                </div>
              )}

              <div className="self-video">
                {isVideoOn ? (
                  <div className="video-placeholder self">
                    <div className="user-avatar">
                      <span>{user.first_name[0]}</span>
                    </div>
                  </div>
                ) : (
                  <div className="video-off">
                    <i className="fas fa-video-slash"></i>
                  </div>
                )}
              </div>
            </div>

            <div className="video-controls">
              <button className={`control-button ${isMuted ? "off" : ""}`} onClick={() => setIsMuted(!isMuted)}>
                <i className={`fas ${isMuted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
              </button>
              <button className="control-button end-call" onClick={handleEndVideoCall}>
                <i className="fas fa-phone-slash"></i>
              </button>
              <button className={`control-button ${isVideoOn ? "" : "off"}`} onClick={() => setIsVideoOn(!isVideoOn)}>
                <i className={`fas ${isVideoOn ? "fa-video" : "fa-video-slash"}`}></i>
              </button>
            </div>
          </div>

          <div className="call-info">
            <h3>Consultation Details</h3>
            <div className="doctor-info">
              <h4>Doctor</h4>
              <div className="doctor-profile">
                <div className="doctor-avatar">
                  <span>
                    {selectedDoctor.first_name[0]}
                    {selectedDoctor.last_name[0]}
                  </span>
                </div>
                <div>
                  <p>
                    Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}
                  </p>
                  <p className="specialty">{selectedDoctor.specialty}</p>
                </div>
              </div>
            </div>

            <div className="call-duration">
              <h4>Call Duration</h4>
              <p>00:05:32</p>
            </div>

            <div className="call-actions">
              <button className="action-button chat">
                <i className="fas fa-comment"></i> Open Chat
              </button>
              <button
                className="action-button book"
                onClick={() => {
                  setShowBookingForm(true)
                  setActiveView("appointments")
                }}
              >
                <i className="fas fa-calendar"></i> Book Follow-up Appointment
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="video-call-view">
        <div className="section-header">
          <h2>Video Consultation</h2>
        </div>

        <div className="doctors-grid">
          {mockDoctors.map((doctor) => (
            <div key={doctor.id} className={`doctor-card ${doctor.status === "offline" ? "offline" : ""}`}>
              <div className="doctor-profile">
                <div className="doctor-avatar">
                  <span>
                    {doctor.first_name[0]}
                    {doctor.last_name[0]}
                  </span>
                  <span className={`status-indicator ${doctor.status}`}></span>
                </div>
                <div className="doctor-info">
                  <h3>
                    Dr. {doctor.first_name} {doctor.last_name}
                  </h3>
                  <p>{doctor.specialty}</p>
                  <p className="status">{doctor.status}</p>
                </div>
              </div>
              <button
                className="call-button"
                onClick={() => handleStartVideoCall(doctor)}
                disabled={doctor.status !== "online"}
              >
                <i className="fas fa-video"></i> Start Video Call
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render the voice call view
  const renderVoiceCall = () => {
    if (isVoiceConnected && selectedDoctor) {
      return (
        <div className="voice-call-active">
          <div className="call-container">
            <div className="doctor-profile">
              <div className="doctor-avatar pulsing">
                <span>
                  {selectedDoctor.first_name[0]}
                  {selectedDoctor.last_name[0]}
                </span>
              </div>
              <h3>
                Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}
              </h3>
              <p>{selectedDoctor.specialty}</p>
              <p className="call-status">Call in progress: 00:03:45</p>

              <div className="call-controls">
                <button className={`control-button ${isMuted ? "off" : ""}`} onClick={() => setIsMuted(!isMuted)}>
                  <i className={`fas ${isMuted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
                </button>
                <button className="control-button end-call" onClick={handleEndVoiceCall}>
                  <i className="fas fa-phone-slash"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="call-info">
            <h3>Consultation Details</h3>
            <div className="doctor-info">
              <h4>Doctor</h4>
              <div className="doctor-profile">
                <div className="doctor-avatar">
                  <span>
                    {selectedDoctor.first_name[0]}
                    {selectedDoctor.last_name[0]}
                  </span>
                </div>
                <div>
                  <p>
                    Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}
                  </p>
                  <p className="specialty">{selectedDoctor.specialty}</p>
                </div>
              </div>
            </div>

            <div className="call-duration">
              <h4>Call Duration</h4>
              <p>00:03:45</p>
            </div>

            <div className="call-actions">
              <button className="action-button chat">
                <i className="fas fa-comment"></i> Open Chat
              </button>
              <button
                className="action-button book"
                onClick={() => {
                  setShowBookingForm(true)
                  setActiveView("appointments")
                }}
              >
                <i className="fas fa-calendar"></i> Book Follow-up Appointment
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="voice-call-view">
        <div className="section-header">
          <h2>Voice Consultation</h2>
        </div>

        <div className="doctors-grid">
          {mockDoctors.map((doctor) => (
            <div key={doctor.id} className={`doctor-card ${doctor.status === "offline" ? "offline" : ""}`}>
              <div className="doctor-profile">
                <div className="doctor-avatar">
                  <span>
                    {doctor.first_name[0]}
                    {doctor.last_name[0]}
                  </span>
                  <span className={`status-indicator ${doctor.status}`}></span>
                </div>
                <div className="doctor-info">
                  <h3>
                    Dr. {doctor.first_name} {doctor.last_name}
                  </h3>
                  <p>{doctor.specialty}</p>
                  <p className="status">{doctor.status}</p>
                </div>
              </div>
              <button
                className="call-button"
                onClick={() => handleStartVoiceCall(doctor)}
                disabled={doctor.status !== "online"}
              >
                <i className="fas fa-phone"></i> Start Voice Call
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render the profile view
  const renderProfile = () => {
    // Mock profile data
    const profileData = {
      ...user,
      phone: "+256 123 456 789",
      address: "123 Main St, Kampala, Uganda",
      dob: "1990-05-15",
      gender: "Male",
      bloodType: "O+",
      allergies: ["Penicillin", "Peanuts"],
      emergencyContact: {
        name: "Jane Doe",
        relation: "Spouse",
        phone: "+256 987 654 321",
      },
    }

    return (
      <div className="profile-view">
        <div className="section-header">
          <h2>My Profile</h2>
          <button className="edit-button">
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        </div>

        <div className="profile-sections">
          <div className="profile-section personal-info">
            <h3>Personal Information</h3>
            <div className="profile-content">
              <div className="user-profile">
                <div className="user-avatar">
                  <span>
                    {profileData.first_name[0]}
                    {profileData.last_name[0]}
                  </span>
                </div>
                <div>
                  <h4>
                    {profileData.first_name} {profileData.last_name}
                  </h4>
                  <p>Patient ID: P-1</p>
                </div>
              </div>

              <div className="info-items">
                <div className="info-item">
                  <i className="fas fa-user"></i>
                  <div>
                    <p className="label">Gender</p>
                    <p>{profileData.gender}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-calendar"></i>
                  <div>
                    <p className="label">Date of Birth</p>
                    <p>{profileData.dob}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <p className="label">Email</p>
                    <p>{profileData.email}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <p className="label">Phone</p>
                    <p>{profileData.phone}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <p className="label">Address</p>
                    <p>{profileData.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section medical-info">
            <h3>Medical Information</h3>
            <div className="profile-content">
              <div className="info-item">
                <h4>Blood Type</h4>
                <p>{profileData.bloodType}</p>
              </div>

              <div className="info-item">
                <h4>Allergies</h4>
                <div className="allergies-list">
                  {profileData.allergies.map((allergy) => (
                    <span key={allergy} className="allergy-tag">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section emergency-contact">
            <h3>Emergency Contact</h3>
            <div className="profile-content">
              <div className="contact-info">
                <h4>{profileData.emergencyContact.name}</h4>
                <p>{profileData.emergencyContact.relation}</p>
              </div>

              <div className="info-item">
                <i className="fas fa-phone"></i>
                <p>{profileData.emergencyContact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render the settings view
  const renderSettings = () => {
    return (
      <div className="settings-view">
        <div className="section-header">
          <h2>Settings</h2>
        </div>

        <div className="settings-sections">
          <div className="settings-section preferences">
            <h3>Preferences</h3>
            <div className="settings-content">
              <div className="setting-item">
                <div className="setting-label">
                  <i className="fas fa-moon"></i>
                  <label>Dark Mode</label>
                </div>
                <div className="toggle-switch">
                  <input type="checkbox" id="dark-mode" />
                  <label htmlFor="dark-mode"></label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-label">
                  <i className="fas fa-bell"></i>
                  <label>Email Notifications</label>
                </div>
                <div className="toggle-switch">
                  <input type="checkbox" id="email-notifications" defaultChecked />
                  <label htmlFor="email-notifications"></label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-label">
                  <i className="fas fa-bell"></i>
                  <label>SMS Notifications</label>
                </div>
                <div className="toggle-switch">
                  <input type="checkbox" id="sms-notifications" defaultChecked />
                  <label htmlFor="sms-notifications"></label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-label">
                  <i className="fas fa-globe"></i>
                  <label>Language</label>
                </div>
                <select className="language-select">
                  <option value="english">English</option>
                  <option value="french">French</option>
                  <option value="spanish">Spanish</option>
                  <option value="swahili">Swahili</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-section security">
            <h3>Security</h3>
            <div className="settings-content">
              <form className="password-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="password-input">
                    <input type="password" />
                    <button type="button" className="toggle-password">
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <div className="password-input">
                    <input type="password" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <div className="password-input">
                    <input type="password" />
                  </div>
                </div>

                <button type="submit" className="update-password-button">
                  <i className="fas fa-lock"></i> Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="patient-dashboard">
      {renderSidebar()}

      <div className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
        <header className="dashboard-header">
          <h1>SPEC-LINK Health</h1>

          <div className="header-actions">
            <div className="notifications">
              <button className="notification-button">
                <i className="fas fa-bell"></i>
                <span className="notification-badge">3</span>
              </button>
            </div>
          </div>
        </header>

        <main className="content-area">{renderContent()}</main>

        <footer className="dashboard-footer">
          <p>© 2025 SPEC-LINK | All Rights Reserved</p>
          <p>Contact: support@speclink.com | Phone: +256 123 456 789</p>
        </footer>
      </div>
    </div>
  )
}

export default PatientDashboard;