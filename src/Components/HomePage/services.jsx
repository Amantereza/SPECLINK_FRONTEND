"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Heart, Brain, Baby, Bone, Shield, Stethoscope, ArrowRight, User } from "lucide-react"
import "./styles.css"

function ServicesPage() {
  const [activeService, setActiveService] = useState(null)
  const [isVisible, setIsVisible] = useState({
    services: false,
    features: false,
    faq: false,
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

    const sections = ["services", "features", "faq"]
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

  // Services data
  const services = [
    {
      id: "cardiology",
      name: "Cardiology",
      icon: <Heart size={32} />,
      description:
        "Our cardiology department provides comprehensive care for heart conditions, including diagnostic testing, treatment, and preventive care.",
      features: [
        "Advanced cardiac imaging",
        "Heart disease management",
        "Cardiac rehabilitation",
        "Preventive cardiology",
        "Electrophysiology services",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "neurology",
      name: "Neurology",
      icon: <Brain size={32} />,
      description:
        "Our neurology specialists diagnose and treat disorders of the nervous system, including the brain, spinal cord, and peripheral nerves.",
      features: [
        "Neurological evaluations",
        "EEG and EMG testing",
        "Stroke care and prevention",
        "Headache and migraine treatment",
        "Movement disorder management",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      icon: <Baby size={32} />,
      description:
        "Our pediatric care focuses on the health and development of children from birth through adolescence, providing preventive care and treatment.",
      features: [
        "Well-child visits",
        "Immunizations",
        "Developmental assessments",
        "Acute illness treatment",
        "Behavioral health support",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      icon: <Bone size={32} />,
      description:
        "Our orthopedic specialists diagnose and treat conditions affecting the musculoskeletal system, including bones, joints, muscles, and ligaments.",
      features: [
        "Joint replacement surgery",
        "Sports medicine",
        "Fracture care",
        "Spine disorders",
        "Physical therapy",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "preventive",
      name: "Preventive Care",
      icon: <Shield size={32} />,
      description:
        "Our preventive care services focus on maintaining health and preventing disease through regular screenings, assessments, and lifestyle guidance.",
      features: [
        "Annual physical exams",
        "Health risk assessments",
        "Immunizations",
        "Cancer screenings",
        "Lifestyle counseling",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "general",
      name: "General Medicine",
      icon: <Stethoscope size={32} />,
      description:
        "Our general medicine practitioners provide primary care for a wide range of health concerns, serving as your first point of contact for healthcare needs.",
      features: [
        "Routine check-ups",
        "Chronic disease management",
        "Acute illness treatment",
        "Health education",
        "Referrals to specialists",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  // FAQ data
  const faqs = [
    {
      question: "How do I schedule an appointment?",
      answer:
        "You can schedule an appointment through our online booking system, by calling our office, or by visiting our facility in person. Our staff will help you find a convenient time to meet with the appropriate healthcare provider.",
    },
    {
      question: "What insurance plans do you accept?",
      answer:
        "We accept most major insurance plans, including Medicare and Medicaid. Please contact our billing department or check our website for a complete list of accepted insurance providers. We recommend verifying your coverage before your appointment.",
    },
    {
      question: "How should I prepare for my appointment?",
      answer:
        "Please arrive 15 minutes early to complete any necessary paperwork. Bring your insurance card, photo ID, list of current medications, and any relevant medical records or test results. For specific appointments, you may receive additional preparation instructions.",
    },
    {
      question: "Can I request a specific doctor?",
      answer:
        "Yes, you can request to see a specific doctor when scheduling your appointment. However, availability may vary based on the doctor's schedule. We'll do our best to accommodate your preferences.",
    },
    {
      question: "What telehealth services do you offer?",
      answer:
        "We offer virtual consultations for many of our services, allowing you to meet with healthcare providers from the comfort of your home. Telehealth appointments are available for follow-up visits, medication management, and certain types of consultations.",
    },
  ]

  const handleServiceClick = (serviceId) => {
    setActiveService(activeService === serviceId ? null : serviceId)
  }

  return (
    <div className="page-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold">
            SPEC-LINK
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/doctors" className="nav-link">
                  Doctors
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link active">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="services-hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div
                className="services-hero-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1>Our Healthcare Services</h1>
                <p>
                  Comprehensive medical care tailored to your needs with a focus on quality, compassion, and innovation.
                </p>
                <Link to="/appointment" className="btn btn-primary btn-lg">
                  Book an Appointment
                </Link>
              </motion.div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <motion.div
                className="services-hero-image"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img src="/placeholder.svg?height=500&width=600" alt="Healthcare services" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5" id="services">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.services ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Medical Specialties</h2>
            <p className="section-subtitle">
              Explore our range of specialized healthcare services designed to address your specific needs
            </p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`service-card ${activeService === service.id ? "active" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible.services ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <button className="service-expand-button">
                  {activeService === service.id ? "Show Less" : "Learn More"}
                </button>

                {activeService === service.id && (
                  <motion.div
                    className="service-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="service-image">
                      <img src={service.image || "/placeholder.svg"} alt={service.name} />
                    </div>
                    <div className="service-features">
                      <h4>Key Features</h4>
                      <ul>
                        {service.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <Link to={`/appointment?service=${service.id}`} className="btn btn-primary btn-sm">
                      Book Appointment <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5" id="features">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.features ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Why Choose Our Healthcare Services</h2>
            <p className="section-subtitle">We are committed to providing exceptional care with these key advantages</p>
          </motion.div>

          <div className="row">
            <div className="col-lg-6">
              <motion.div
                className="feature-image"
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible.features ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8 }}
              >
                <img src="/placeholder.svg?height=500&width=600" alt="Healthcare features" />
              </motion.div>
            </div>
            <div className="col-lg-6">
              <div className="feature-list">
                <motion.div
                  className="feature-item"
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible.features ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="feature-icon">
                    <Shield size={24} />
                  </div>
                  <div className="feature-content">
                    <h3>Comprehensive Care</h3>
                    <p>
                      Our integrated approach ensures all your healthcare needs are addressed under one roof, from
                      preventive care to specialized treatments.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="feature-item"
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible.features ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="feature-icon">
                    <User size={24} />
                  </div>
                  <div className="feature-content">
                    <h3>Patient-Centered Approach</h3>
                    <p>
                      We prioritize your individual needs and preferences, involving you in decisions about your care
                      for better outcomes and satisfaction.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="feature-item"
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible.features ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="feature-icon">
                    <Stethoscope size={24} />
                  </div>
                  <div className="feature-content">
                    <h3>Expert Medical Team</h3>
                    <p>
                      Our healthcare professionals are leaders in their fields, bringing extensive experience and
                      advanced training to your care.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="feature-item"
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible.features ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="feature-icon">
                    <Heart size={24} />
                  </div>
                  <div className="feature-content">
                    <h3>Compassionate Care</h3>
                    <p>
                      We deliver healthcare with empathy and respect, recognizing the emotional aspects of your health
                      journey.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-5" id="faq">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.faq ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Find answers to common questions about our services and procedures</p>
          </motion.div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.faq ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="faq-question" data-bs-toggle="collapse" data-bs-target={`#faq-${index}`}>
                  <h3>{faq.question}</h3>
                  <div className="faq-icon"></div>
                </div>
                <div className="collapse" id={`faq-${index}`}>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-5">
            <p>Don't see your question? Contact us for more information.</p>
            <Link to="/contact" className="btn btn-outline-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to experience better healthcare?</h2>
            <p className="cta-text">Schedule an appointment with one of our specialists today.</p>
            <Link to="/appointment" className="btn btn-light btn-lg">
              Get Started
            </Link>
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
    </div>
  )
}

export default ServicesPage

