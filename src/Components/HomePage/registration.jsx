import React from 'react';
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Upload,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Stethoscope,
  FileText,
  Calendar,
} from "lucide-react"
import { Link } from "react-router-dom"
import "../HomePage/registration.css"

export default function DoctorRegistration() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    profileImage: "",

    // Professional Information
    medicalLicense: "",
    licenseNumber: "",
    specialization: "",
    subSpecialization: "",
    yearsOfExperience: "",
    medicalSchool: "",
    graduationYear: "",
    residency: "",
    fellowship: "",

    // Practice Information
    hospitalAffiliations: "",
    clinicName: "",
    clinicAddress: "",
    clinicPhone: "",
    acceptingNewPatients: "yes",
    insuranceAccepted: "",
    languages: "",

    // Account Information
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: "",
  })

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology",
    "Hematology",
    "Infectious Disease",
    "Internal Medicine",
    "Nephrology",
    "Neurology",
    "Obstetrics & Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Surgery",
    "Urology",
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: "Passwords do not match.",
      })
      return
    }

    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: "",
    })

    try {
      const result = await registerDoctor(formData)

      if (result.success) {
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message:
            "Your registration has been submitted successfully! We will review your information and send you an email once your account is approved.",
        })
      } else {
        throw new Error(result.error || "Registration failed")
      }
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
      })
    }
  }

  // Render progress bar
  const renderProgressBar = () => {
    return (
      <div className="registration-progress">
        <div className="progress-steps">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
            <div className="step-number">1</div>
            <div className="step-label">Personal Info</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <div className="step-label">Professional Info</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <div className="step-label">Practice Details</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 4 ? "active" : ""}`}>
            <div className="step-number">4</div>
            <div className="step-label">Account Setup</div>
          </div>
        </div>
      </div>
    )
  }

  // Step 1: Personal Information
  const renderPersonalInfoStep = () => {
    return (
      <motion.div
        className="registration-step"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Personal Information</h3>
        <p>Please provide your personal details to begin the registration process.</p>

        <div className="profile-image-upload">
          <div className="upload-placeholder">
            {formData.profileImage ? (
              <img
                src={formData.profileImage || "/placeholder.svg"}
                alt="Profile Preview"
                className="profile-preview"
              />
            ) : (
              <User size={50} />
            )}
          </div>
          <div className="upload-controls">
            <h4>Profile Photo</h4>
            <p>Upload a professional photo for your profile</p>
            <div className="upload-button">
              <label htmlFor="profileImage" className="btn btn-outline-primary btn-sm">
                <Upload size={16} className="me-2" /> Upload Photo
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                className="d-none"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    // In a real app, you would upload to a server
                    // For now, we'll just create a data URL
                    const reader = new FileReader()
                    reader.onload = () => {
                      setFormData((prev) => ({
                        ...prev,
                        profileImage: reader.result,
                      }))
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="firstName">First Name*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="lastName">Last Name*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">Email Address*</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="phone">Phone Number*</label>
              <div className="input-with-icon">
                <Phone size={18} className="input-icon" />
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth*</label>
              <div className="input-with-icon">
                <Calendar size={18} className="input-icon" />
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="gender">Gender*</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address*</label>
          <div className="input-with-icon">
            <Building size={18} className="input-icon" />
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="city">City*</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="state">State*</label>
              <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code*</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="next-button" onClick={nextStep}>
            Next: Professional Information
          </button>
        </div>
      </motion.div>
    )
  }

  // Step 2: Professional Information
  const renderProfessionalInfoStep = () => {
    return (
      <motion.div
        className="registration-step"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Professional Information</h3>
        <p>Please provide details about your medical qualifications and experience.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="medicalLicense">Medical License Type*</label>
              <div className="input-with-icon">
                <FileText size={18} className="input-icon" />
                <input
                  type="text"
                  id="medicalLicense"
                  name="medicalLicense"
                  value={formData.medicalLicense}
                  onChange={handleChange}
                  placeholder="e.g., MD, DO, MBBS"
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="licenseNumber">License Number*</label>
              <div className="input-with-icon">
                <FileText size={18} className="input-icon" />
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="specialization">Specialization*</label>
              <div className="input-with-icon">
                <Stethoscope size={18} className="input-icon" />
                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="subSpecialization">Sub-specialization (if any)</label>
              <input
                type="text"
                id="subSpecialization"
                name="subSpecialization"
                value={formData.subSpecialization}
                onChange={handleChange}
                placeholder="e.g., Interventional Cardiology"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="yearsOfExperience">Years of Experience*</label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="medicalSchool">Medical School*</label>
              <div className="input-with-icon">
                <GraduationCap size={18} className="input-icon" />
                <input
                  type="text"
                  id="medicalSchool"
                  name="medicalSchool"
                  value={formData.medicalSchool}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="graduationYear">Graduation Year*</label>
              <input
                type="number"
                id="graduationYear"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                min="1950"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="residency">Residency*</label>
          <input
            type="text"
            id="residency"
            name="residency"
            value={formData.residency}
            onChange={handleChange}
            placeholder="Institution name and department"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fellowship">Fellowship (if applicable)</label>
          <input
            type="text"
            id="fellowship"
            name="fellowship"
            value={formData.fellowship}
            onChange={handleChange}
            placeholder="Institution name and specialty"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="back-button" onClick={prevStep}>
            Back
          </button>
          <button type="button" className="next-button" onClick={nextStep}>
            Next: Practice Details
          </button>
        </div>
      </motion.div>
    )
  }

  // Step 3: Practice Information
  const renderPracticeInfoStep = () => {
    return (
      <motion.div
        className="registration-step"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Practice Information</h3>
        <p>Please provide details about your current practice and affiliations.</p>

        <div className="form-group">
          <label htmlFor="hospitalAffiliations">Hospital Affiliations*</label>
          <textarea
            id="hospitalAffiliations"
            name="hospitalAffiliations"
            value={formData.hospitalAffiliations}
            onChange={handleChange}
            rows={3}
            placeholder="List the hospitals you are affiliated with"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="clinicName">Clinic/Practice Name*</label>
          <div className="input-with-icon">
            <Building size={18} className="input-icon" />
            <input
              type="text"
              id="clinicName"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="clinicAddress">Clinic/Practice Address*</label>
          <textarea
            id="clinicAddress"
            name="clinicAddress"
            value={formData.clinicAddress}
            onChange={handleChange}
            rows={2}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="clinicPhone">Clinic/Practice Phone*</label>
          <div className="input-with-icon">
            <Phone size={18} className="input-icon" />
            <input
              type="tel"
              id="clinicPhone"
              name="clinicPhone"
              value={formData.clinicPhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Are you accepting new patients?*</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="acceptingYes"
                name="acceptingNewPatients"
                value="yes"
                checked={formData.acceptingNewPatients === "yes"}
                onChange={handleChange}
              />
              <label htmlFor="acceptingYes">Yes</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="acceptingNo"
                name="acceptingNewPatients"
                value="no"
                checked={formData.acceptingNewPatients === "no"}
                onChange={handleChange}
              />
              <label htmlFor="acceptingNo">No</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="insuranceAccepted">Insurance Plans Accepted*</label>
          <textarea
            id="insuranceAccepted"
            name="insuranceAccepted"
            value={formData.insuranceAccepted}
            onChange={handleChange}
            rows={3}
            placeholder="List the insurance plans you accept"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="languages">Languages Spoken*</label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="e.g., English, Spanish, Mandarin"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="back-button" onClick={prevStep}>
            Back
          </button>
          <button type="button" className="next-button" onClick={nextStep}>
            Next: Account Setup
          </button>
        </div>
      </motion.div>
    )
  }

  // Step 4: Account Setup
  const renderAccountSetupStep = () => {
    return (
      <motion.div
        className="registration-step"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Account Setup</h3>
        <p>Create your account password and review your information.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
              <small className="form-text text-muted">
                Password must be at least 8 characters long and include a mix of letters, numbers, and special
                characters.
              </small>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
          </div>
        </div>

        <div className="registration-summary">
          <h4>Registration Summary</h4>
          <p>Please review your information before submitting:</p>

          <div className="summary-section">
            <h5>Personal Information</h5>
            <div className="summary-details">
              <div className="summary-item">
                <span className="summary-label">Name:</span>
                <span className="summary-value">
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Email:</span>
                <span className="summary-value">{formData.email}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Phone:</span>
                <span className="summary-value">{formData.phone}</span>
              </div>
            </div>
          </div>

          <div className="summary-section">
            <h5>Professional Information</h5>
            <div className="summary-details">
              <div className="summary-item">
                <span className="summary-label">Specialization:</span>
                <span className="summary-value">{formData.specialization}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">License:</span>
                <span className="summary-value">
                  {formData.medicalLicense} #{formData.licenseNumber}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Experience:</span>
                <span className="summary-value">{formData.yearsOfExperience} years</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group terms-checkbox">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeToTerms">
            I confirm that the information provided is accurate and I agree to the{" "}
            <Link href="/terms">terms and conditions</Link> and <Link href="/privacy">privacy policy</Link>.
          </label>
        </div>

        {formStatus.isSuccess && (
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <CheckCircle className="me-2" size={20} />
            <div>{formStatus.message}</div>
          </div>
        )}

        {formStatus.isError && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <AlertCircle className="me-2" size={20} />
            <div>{formStatus.message}</div>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="back-button" onClick={prevStep}>
            Back
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={formStatus.isSubmitting || !formData.agreeToTerms}
            onClick={handleSubmit}
          >
            {formStatus.isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin me-2" />
                Submitting...
              </>
            ) : (
              "Submit Registration"
            )}
          </button>
        </div>
      </motion.div>
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
            <a href="/doctor/login" className="btn btn-light btn-sm">
              Doctor Login
            </a>
          </div>
        </div>
      </nav>

      {/* Registration Section */}
      <section className="registration-section">
        <div className="container">
          <div className="registration-header text-center">
            <h2>Doctor Registration</h2>
            <p>Join our network of healthcare professionals and connect with patients</p>
          </div>

          {renderProgressBar()}

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="registration-form-container">
                <form>
                  {step === 1 && renderPersonalInfoStep()}
                  {step === 2 && renderProfessionalInfoStep()}
                  {step === 3 && renderPracticeInfoStep()}
                  {step === 4 && renderAccountSetupStep()}
                </form>
              </div>
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

