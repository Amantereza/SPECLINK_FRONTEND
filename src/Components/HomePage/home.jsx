import React from 'react';
import '../HomePage/home.css';
import '../HomePage/home2.css';
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { motion} from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import defaultProfile from '../Images/doctor.png'
import img2 from '../Images/nurse.png'
import axios from 'axios';
const list_doctor_profiles = 'https://speclink-backend.onrender.com/specLink/list_doctor_profiles'


function Home() {
 const [doctorProfile, setDoctorProfile] = useState([])
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState({
    doctors: false,
    testimonials: false,
    sponsors: false,
  })

  // fetch doctor profiles
  const fetchProfiles = async()=>{
    try{
      const response = await axios(list_doctor_profiles)
      const data = response.data
      console.log(data)
      setDoctorProfile(data)
    }catch(err){
      console.log('err', err)
    }
  }
  useEffect(()=>{
  fetchProfiles()
  }, [])
   // Animation observer
   useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }))
        }
      })
    }, observerOptions)

    const sections = ["doctors", "testimonials", "sponsors"]
    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Jennifer L.",
      text: "Spec-Link transformed my healthcare experience. The doctors are professional and the appointment system is seamless.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      id: 2,
      name: "Robert M.",
      text: "I've been using Spec-Link for my family's healthcare needs for over a year now. The convenience and quality of care is unmatched.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      id: 3,
      name: "Sophia K.",
      text: "The specialists at Spec-Link diagnosed my condition when other doctors couldn't. I'm forever grateful for their expertise.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4,
    },
  ]

  // Sponsors data
  const sponsors = [
    { id: 1, name: "MediTech Solutions", logo: "/placeholder.svg?height=80&width=180" },
    { id: 2, name: "HealthPlus", logo: "/placeholder.svg?height=80&width=180" },
    { id: 3, name: "CarePlus Insurance", logo: "/placeholder.svg?height=80&width=180" },
    { id: 4, name: "PharmaDirect", logo: "/placeholder.svg?height=80&width=180" },
    { id: 5, name: "MedEquip Innovations", logo: "/placeholder.svg?height=80&width=180" },
  ]

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }


  return (

    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="home">
            SPEC-LINK
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#doctors">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Our Team
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ContactForm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

 {/* Hero Section */}
 <div className="hero-section" id="home">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            Welcome to Spec-Link
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-subtitle"
          >
            Advanced healthcare management for patients and professionals
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-buttons"
          >
            <Link to="/login" className="btn btn-primary btn-lg me-3">
              Get Started
            </Link>
            <Link to="/services" className="btn btn-outline-light btn-lg">
              Our Services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Doctors Profiles Section */}
      <section className="doctors-section py-5" id="doctors">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.doctors ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Specialist Doctors</h2>
            <p className="section-subtitle">Expert healthcare professionals dedicated to your wellbeing</p>
          </motion.div>

          <div className="row g-4">
            {doctorProfile.slice(0,5).map((doctor, index) => (
              <div className="col-lg-3 col-md-6" key={doctor.id}>
                <motion.div
                  className="doctor-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible.doctors ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)" }}
                >
                  <div className="doctor-image-container">
                    <img src={doctor.profile.profile_picture ? doctor.profile.profile_picture : defaultProfile} alt={doctor.profile.profile_picture} className="doctor-image" />
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">{doctor.first_name} {doctor.last_name}</h3>
                    <p className="doctor-specialty">{doctor.profile.specialization}</p>
                    <p className="doctor-experience">{doctor.profile.years_of_experience} Experience</p>
                    <div className="doctor-rating">
                      <span className="rating-value">{doctor.rating}</span>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`star ${i < Math.floor(doctor.rating) ? "filled" : ""}`} size={16} />
                        ))}
                      </div> 
                    </div>
                    <Link to={`/DoctorProfile ${doctor.id}`} className="btn btn-outline-primary btn-sm view-profile">
                      View Profile <ArrowRight size={16} />
                    </Link> 
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/viewdoctors" className="btn btn-primary">
              View All Doctors
            </Link>
          </div>
        </div>
      </section>

            {/* Testimonials Section */}
            <section className="testimonials-section py-5" id="testimonials">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.testimonials ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Patient Testimonials</h2>
            <p className="section-subtitle">What our patients say about their experience</p>
          </motion.div>

          <div className="testimonial-carousel">
            <button className="carousel-control prev" onClick={prevTestimonial} aria-label="Previous testimonial">
              <ChevronLeft size={24} />
            </button>

            <motion.div
              className="testimonial-container"
              initial={{ opacity: 0 }}
              animate={isVisible.testimonials ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className={`testimonial-card ${index === activeTestimonial ? "active" : ""}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: index === activeTestimonial ? 1 : 0,
                    x: index === activeTestimonial ? 0 : 100,
                    display: index === activeTestimonial ? "flex" : "none",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="testimonial-content">
                    <div className="testimonial-text">"{testimonial.text}"</div>
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`star ${i < testimonial.rating ? "filled" : ""}`} size={16} />
                      ))}
                    </div>
                  </div>
                  <div className="testimonial-author">
                    <img
                      src={img2 || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="testimonial-image"
                    />
                    <div className="testimonial-name">{testimonial.name}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <button className="carousel-control next" onClick={nextTestimonial} aria-label="Next testimonial">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeTestimonial ? "active" : ""}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors-section py-5" id="sponsors">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.sponsors ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Partners</h2>
            <p className="section-subtitle">Trusted organizations we work with</p>
          </motion.div>

          <motion.div
            className="sponsors-container"
            initial={{ opacity: 0 }}
            animate={isVisible.sponsors ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                className="sponsor-item"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.sponsors ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} className="sponsor-logo" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="footer text-center py-4 bg-dark text-white">

        <div className="container">

           <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h4 className="footer-heading">SPEC-LINK</h4>
              <p className="footer-text">Advanced healthcare management for patients and professionals.</p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/doctors">Doctors</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h4 className="footer-heading">Contact Us</h4>
              <p className="footer-text">
                123 Healthcare Ave, Medical District
                <br />
                contact@spec-link.com
                <br />
                (555) 123-4567
              </p>
            </div>
          </div>
          <hr className="footer-divider" />
          <p className="copyright">© {new Date().getFullYear()} SPEC-LINK. All Rights Reserved.</p>
        </div>
      </footer>
      {/* end footer */}
    </>
  );
}

export default Home;