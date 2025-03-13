"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import "../HomePage/styles.css"
import "../contact/contact.css"


function ContactPage() {
  return (
    <div className="page-container mt-5">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
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

      {/* Contact Hero Section */}
      <section className="contact-hero-section">
        <div className="container">
          <motion.div
            className="contact-hero-content text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Contact Us</h1>
            <p>We're here to help and answer any questions you might have</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <motion.div
                className="contact-sidebar"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2>Get in Touch</h2>
                <p>Have questions about our services or need assistance? Contact us using any of the methods below.</p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <MapPin size={24} />
                    </div>
                    <div className="contact-info-content">
                      <h3>Our Location</h3>
                      <p>
                        123 Healthcare Ave, Medical District
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Phone size={24} />
                    </div>
                    <div className="contact-info-content">
                      <h3>Phone Number</h3>
                      <p>
                        Main: (555) 123-4567
                        <br />
                        Support: (555) 987-6543
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Mail size={24} />
                    </div>
                    <div className="contact-info-content">
                      <h3>Email Address</h3>
                      <p>
                        info@spec-link.com
                        <br />
                        support@spec-link.com
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Clock size={24} />
                    </div>
                    <div className="contact-info-content">
                      <h3>Working Hours</h3>
                      <p>
                        Monday - Friday: 8:00 AM - 6:00 PM
                        <br />
                        Saturday: 9:00 AM - 1:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-8">
              <motion.div
                className="contact-form-container"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                <textarea></textarea>
                <button type="submit" className="submit-btn">Send</button>
                {/* <ContactForm /> */}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container-fluid p-0">
          <div className="map-container">
            {/* In a real application, you would embed a Google Map or other map service here */}
            <div className="map-placeholder">
              {/* <img src="/placeholder.svg?height=400&width=1200" alt="Map location" className="map-image" /> */}
              <div className="map-overlay">
                <div className="map-pin">
                  <MapPin size={32} />
                </div>
                <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63835.82688512447!2d32.71378124459197!3d0.36087755670366384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dc7b71409b0a5%3A0xdddaf82b549ec570!2sMukono!5e0!3m2!1sen!2sug!4v1741810890995!5m2!1sen!2sug"
  width={1400}
  height={450}
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

                <div className="map-address">
                  <h3>SPEC-LINK Healthcare</h3>
                  <p>
                    123 Healthcare Ave, Medical District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
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
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/services">Services</a>
                </li>
                <li>
                  <a href="/doctors">Doctors</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
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
export default ContactPage;
