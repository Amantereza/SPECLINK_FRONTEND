import React from 'react'
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Users, Award, Heart, CheckCircle } from "lucide-react"
import "../HomePage/about.css"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState({
    mission: false,
    team: false,
    history: false,
    values: false,
  })

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

    const sections = ["mission", "team", "history", "values"]
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

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Johnson is a board-certified cardiologist with over 15 years of experience. She leads our medical team with a focus on patient-centered care and innovation.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Medical Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Chen specializes in neurology and has been instrumental in developing our telemedicine services. He is passionate about making healthcare accessible to all.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Chief Technology Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emily has over a decade of experience in healthcare technology. She leads our digital transformation initiatives to enhance patient and doctor experiences.",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Chief Operations Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "James oversees the day-to-day operations of SPEC-LINK, ensuring that our services run smoothly and efficiently for both patients and healthcare providers.",
    },
  ]

  // Timeline data
  const timeline = [
    {
      year: "2015",
      title: "Foundation",
      description: "SPEC-LINK was founded with a mission to connect patients with specialized healthcare providers.",
    },
    {
      year: "2017",
      title: "Digital Platform Launch",
      description: "Launched our first digital platform, allowing patients to book appointments online.",
    },
    {
      year: "2019",
      title: "Telemedicine Integration",
      description: "Integrated telemedicine services to provide remote consultations and follow-ups.",
    },
    {
      year: "2021",
      title: "National Expansion",
      description: "Expanded our network to include healthcare providers across the country.",
    },
    {
      year: "2023",
      title: "AI-Powered Diagnostics",
      description: "Introduced AI-powered preliminary diagnostics to enhance patient care and provider efficiency.",
    },
    {
      year: "2025",
      title: "Global Partnerships",
      description: "Formed strategic partnerships with international healthcare organizations to expand our reach.",
    },
  ]

  // Core values data
  const coreValues = [
    {
      icon: <Heart size={40} />,
      title: "Patient-Centered Care",
      description:
        "We put patients at the center of everything we do, ensuring their needs and preferences guide our decisions.",
    },
    {
      icon: <Award size={40} />,
      title: "Excellence",
      description:
        "We strive for excellence in all aspects of our service, from medical care to technological innovation.",
    },
    {
      icon: <CheckCircle size={40} />,
      title: "Integrity",
      description: "We uphold the highest ethical standards and are committed to transparency in all our interactions.",
    },
    {
      icon: <Users size={40} />,
      title: "Collaboration",
      description: "We believe in the power of collaboration between patients, healthcare providers, and technology.",
    },
  ]

  return (
    <div className="page-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            {/* <span className="brand-logo me-2">SL</span> */}
            <span className="brand-text">SPEC-LINK</span>
          </a>
          <div className="ms-auto">
            <a href="/registration" className="btn btn-light btn-sm">
              Doctor Registration
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div
                className="about-hero-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1>About SPEC-LINK</h1>
                <p>
                  Connecting patients with specialized healthcare providers through innovative technology and
                  compassionate care.
                </p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">1,500+</span>
                    <span className="stat-label">Doctors</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">50,000+</span>
                    <span className="stat-label">Patients</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">25+</span>
                    <span className="stat-label">Specialties</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <motion.div
                className="about-hero-image"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                    src="../Images/doctor.png"
                    alt="Healthcare professionals"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-5" id="mission">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.mission ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Mission & Vision</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <motion.div
                className="mission-image"
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible.mission ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8 }}
              >
                <img src="/placeholder.svg?height=400&width=500" alt="Our mission" />
              </motion.div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <motion.div
                className="mission-content"
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible.mission ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mission-card">
                  <h3>Our Mission</h3>
                  <p>
                    To transform healthcare delivery by connecting patients with specialized medical professionals
                    through innovative technology, ensuring timely, efficient, and personalized care for all.
                  </p>
                </div>
                <div className="mission-card">
                  <h3>Our Vision</h3>
                  <p>
                    To create a world where everyone has access to specialized healthcare when they need it, regardless
                    of location or circumstances, through a seamless digital healthcare ecosystem.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-5" id="team">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.team ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Leadership Team</h2>
            <p className="section-subtitle">Meet the experts behind SPEC-LINK's success</p>
            <div className="section-divider"></div>
          </motion.div>

          <div className="row">
            {teamMembers.map((member, index) => (
              <div className="col-lg-3 col-md-6 mb-4" key={member.id}>
                <motion.div
                  className="team-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible.team ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="team-image">
                    <img src={member.image || "/placeholder.svg"} alt={member.name} />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section py-5" id="history">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.history ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">The evolution of SPEC-LINK through the years</p>
            <div className="section-divider"></div>
          </motion.div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isVisible.history ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-5" id="values">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.values ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
            <div className="section-divider"></div>
          </motion.div>

          <div className="row">
            {coreValues.map((value, index) => (
              <div className="col-lg-3 col-md-6 mb-4" key={index}>
                <motion.div
                  className="value-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible.values ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="join-section">
        <div className="container">
          <div className="join-content">
            <h2>Join Our Network of Healthcare Professionals</h2>
            <p>Become part of our growing community of specialists and transform healthcare delivery together.</p>
            <div className="join-buttons">
              <Link to="/registration" className="btn btn-primary btn-lg">
                Register as a Doctor
              </Link>
              <Link href="/contact" className="btn btn-outline-light btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-center py-4">
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
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/doctors">Doctors</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
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
    </div>
  )
}

