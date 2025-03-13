import React from 'react'
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, Star, ChevronDown, X } from "lucide-react"
import '../HomePage/doctor.css'

export default function ViewDoctors() {
   // State for search and filters
   const [searchTerm, setSearchTerm] = useState("")
   const [selectedSpecialty, setSelectedSpecialty] = useState("")
   const [selectedLocation, setSelectedLocation] = useState("")
   const [isFilterOpen, setIsFilterOpen] = useState(false)
   const [doctors, setDoctors] = useState([])
   const [filteredDoctors, setFilteredDoctors] = useState([])
   const [isLoading, setIsLoading] = useState(true)
 
   // Mock data - in a real app, you would fetch this from an API
   useEffect(() => {
     // Simulate API call
     setTimeout(() => {
       const mockDoctors = [
         {
           id: 1,
           name: "Dr. Sarah Johnson",
           specialty: "Cardiology",
           location: "New York, NY",
           experience: "15+ years",
           rating: 4.9,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: true,
           availableSlots: 5,
         },
         {
           id: 2,
           name: "Dr. Michael Chen",
           specialty: "Neurology",
           location: "Boston, MA",
           experience: "12+ years",
           rating: 4.8,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: true,
           availableSlots: 3,
         },
         {
           id: 3,
           name: "Dr. Emily Rodriguez",
           specialty: "Pediatrics",
           location: "Chicago, IL",
           experience: "10+ years",
           rating: 4.7,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: true,
           availableSlots: 7,
         },
         {
           id: 4,
           name: "Dr. James Wilson",
           specialty: "Orthopedics",
           location: "Los Angeles, CA",
           experience: "18+ years",
           rating: 4.9,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: false,
         },
         {
           id: 5,
           name: "Dr. Lisa Thompson",
           specialty: "Dermatology",
           location: "Miami, FL",
           experience: "8+ years",
           rating: 4.6,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: true,
           availableSlots: 2,
         },
         {
           id: 6,
           name: "Dr. Robert Davis",
           specialty: "Cardiology",
           location: "New York, NY",
           experience: "20+ years",
           rating: 4.9,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: true,
           availableSlots: 4,
         },
         {
           id: 7,
           name: "Dr. Jennifer Lee",
           specialty: "Obstetrics & Gynecology",
           location: "Seattle, WA",
           experience: "14+ years",
           rating: 4.8,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: true,
           availableSlots: 6,
         },
         {
           id: 8,
           name: "Dr. David Kim",
           specialty: "Psychiatry",
           location: "San Francisco, CA",
           experience: "11+ years",
           rating: 4.7,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: false,
         },
         {
           id: 9,
           name: "Dr. Maria Garcia",
           specialty: "Endocrinology",
           location: "Houston, TX",
           experience: "9+ years",
           rating: 4.5,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: true,
           availableSlots: 3,
         },
         {
           id: 10,
           name: "Dr. Thomas Brown",
           specialty: "Gastroenterology",
           location: "Philadelphia, PA",
           experience: "16+ years",
           rating: 4.8,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: true,
           availableSlots: 5,
         },
         {
           id: 11,
           name: "Dr. Jessica Martinez",
           specialty: "Pediatrics",
           location: "Denver, CO",
           experience: "7+ years",
           rating: 4.6,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: true,
           availableSlots: 8,
         },
         {
           id: 12,
           name: "Dr. William Taylor",
           specialty: "Neurology",
           location: "Atlanta, GA",
           experience: "13+ years",
           rating: 4.7,
           image: "/placeholder.svg?height=300&width=300",
           acceptingNewPatients: false,
         },
       ]
 
       setDoctors(mockDoctors)
       setFilteredDoctors(mockDoctors)
       setIsLoading(false)
     }, 1000)
   }, [])
 
   // Get unique specialties and locations for filters
   const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))].sort()
   const locations = [...new Set(doctors.map((doctor) => doctor.location))].sort()
 
   // Filter doctors based on search term and filters
   useEffect(() => {
     let results = doctors
 
     if (searchTerm) {
       results = results.filter(
         (doctor) =>
           doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
       )
     }
 
     if (selectedSpecialty) {
       results = results.filter((doctor) => doctor.specialty === selectedSpecialty)
     }
 
     if (selectedLocation) {
       results = results.filter((doctor) => doctor.location === selectedLocation)
     }
 
     setFilteredDoctors(results)
   }, [searchTerm, selectedSpecialty, selectedLocation, doctors])
 
   // Reset all filters
   const resetFilters = () => {
     setSearchTerm("")
     setSelectedSpecialty("")
     setSelectedLocation("")
   }
 
   // Pagination
   const [currentPage, setCurrentPage] = useState(1)
   const doctorsPerPage = 6
   const indexOfLastDoctor = currentPage * doctorsPerPage
   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage
   const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor)
   const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage)
 
   const paginate = (pageNumber) => setCurrentPage(pageNumber)
 
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
       <section className="doctors-hero-section">
         <div className="container">
           <motion.div
             className="doctors-hero-content text-center"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <h1>Our Healthcare Specialists</h1>
             <p>Find and connect with top-rated doctors across various specialties</p>
           </motion.div>
         </div>
       </section>
 
       {/* Search and Filter Section */}
       <section className="search-filter-section py-4">
         <div className="container">
           <div className="search-filter-container">
             <div className="search-box">
               <Search size={20} className="search-icon" />
               <input
                 type="text"
                 placeholder="Search by name or specialty..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
               {searchTerm && (
                 <button className="clear-search" onClick={() => setSearchTerm("")}>
                   <X size={16} />
                 </button>
               )}
             </div>
 
             <div className="filter-box">
               <button className="filter-toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                 <Filter size={20} />
                 <span>Filters</span>
                 <ChevronDown size={16} className={`chevron ${isFilterOpen ? "open" : ""}`} />
               </button>
             </div>
           </div>
 
           {isFilterOpen && (
             <motion.div
               className="filter-dropdown"
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
             >
               <div className="filter-options">
                 <div className="filter-group">
                   <label>Specialty</label>
                   <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
                     <option value="">All Specialties</option>
                     {specialties.map((specialty, index) => (
                       <option key={index} value={specialty}>
                         {specialty}
                       </option>
                     ))}
                   </select>
                 </div>
 
                 <div className="filter-group">
                   <label>Location</label>
                   <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                     <option value="">All Locations</option>
                     {locations.map((location, index) => (
                       <option key={index} value={location}>
                         {location}
                       </option>
                     ))}
                   </select>
                 </div>
 
                 <div className="filter-actions">
                   <button className="reset-filters" onClick={resetFilters}>
                     Reset Filters
                   </button>
                 </div>
               </div>
             </motion.div>
           )}
 
           <div className="search-results-info">
             <p>
               {isLoading
                 ? "Loading doctors..."
                 : `Showing ${filteredDoctors.length} ${filteredDoctors.length === 1 ? "doctor" : "doctors"}`}
             </p>
           </div>
         </div>
       </section>
 
       {/* Doctors Listing Section */}
       <section className="doctors-listing-section py-5">
         <div className="container">
           {isLoading ? (
             <div className="loading-container">
               <div className="spinner"></div>
               <p>Loading doctors...</p>
             </div>
           ) : filteredDoctors.length === 0 ? (
             <div className="no-results">
               <h3>No doctors found</h3>
               <p>Try adjusting your search or filters to find more doctors.</p>
               <button className="btn btn-primary" onClick={resetFilters}>
                 Reset Filters
               </button>
             </div>
           ) : (
             <>
               <div className="doctors-grid">
                 {currentDoctors.map((doctor) => (
                   <motion.div
                     key={doctor.id}
                     className="doctor-card"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}
                     whileHover={{ y: -10, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)" }}
                   >
                     <div className="doctor-image-container">
                       <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="doctor-image" />
                       {doctor.acceptingNewPatients && <div className="accepting-badge">Accepting New Patients</div>}
                     </div>
                     <div className="doctor-info">
                       <h3 className="doctor-name">{doctor.name}</h3>
                       <p className="doctor-specialty">{doctor.specialty}</p>
                       <div className="doctor-location">
                         <MapPin size={16} />
                         <span>{doctor.location}</span>
                       </div>
                       <p className="doctor-experience">{doctor.experience} Experience</p>
                       <div className="doctor-rating">
                         <div className="stars">
                           {[...Array(5)].map((_, i) => (
                             <Star
                               key={i}
                               className={`star ${i < Math.floor(doctor.rating) ? "filled" : ""}`}
                               size={16}
                             />
                           ))}
                         </div>
                         <span className="rating-value">{doctor.rating}</span>
                       </div>
                       <div className="doctor-actions">
                         <Link href={`/viewProfile/${doctor.id}`} className="btn btn-outline-primary btn-sm view-profile">
                           View Profile
                         </Link>
                         {doctor.acceptingNewPatients && (
                           <Link
                             href={`/appointment?doctor=${doctor.id}`}
                             className="btn btn-primary btn-sm book-appointment"
                           >
                             Book Appointment
                           </Link>
                         )}
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
 
               {/* Pagination */}
               {totalPages > 1 && (
                 <div className="pagination-container">
                   <button
                     className="pagination-button"
                     onClick={() => paginate(currentPage - 1)}
                     disabled={currentPage === 1}
                   >
                     Previous
                   </button>
                   <div className="pagination-numbers">
                     {[...Array(totalPages)].map((_, index) => (
                       <button
                         key={index}
                         className={`pagination-number ${currentPage === index + 1 ? "active" : ""}`}
                         onClick={() => paginate(index + 1)}
                       >
                         {index + 1}
                       </button>
                     ))}
                   </div>
                   <button
                     className="pagination-button"
                     onClick={() => paginate(currentPage + 1)}
                     disabled={currentPage === totalPages}
                   >
                     Next
                   </button>
                 </div>
               )}
             </>
           )}
         </div>
       </section>
 
       {/* CTA Section */}
       <section className="cta-section">
         <div className="container">
           <div className="cta-content">
             <h2 className="cta-title">Are you a healthcare professional?</h2>
             <p className="cta-text">
               Join our network of specialists and connect with patients seeking your expertise.
             </p>
             <Link href="/doctor/register" className="btn btn-light btn-lg">
               Register as a Doctor
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

