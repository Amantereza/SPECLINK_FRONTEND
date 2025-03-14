import React from 'react'
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Github, Linkedin, Twitter, Mail, Code, Database, Palette, Globe } from 'lucide-react'
import '../team/team.css'

export default function TeamPage() {
  const [isVisible, setIsVisible] = useState({
    teamSection: false,
    processSection: false,
    techSection: false,
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

    const sections = ["teamSection", "processSection", "techSection"]
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
      name: "Alex Johnson",
      role: "Lead Developer & Project Manager",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Full-stack developer with 8+ years of experience specialized in healthcare applications. Alex led the architectural design and implementation of SPEC-LINK's core systems.",
      skills: ["React.js", "Next.js", "Node.js", "MongoDB", "AWS"],
      social: {
        github: "https://github.com/alexjohnson",
        linkedin: "https://linkedin.com/in/alexjohnson",
        twitter: "https://twitter.com/alexjohnson",
        email: "alex@spec-link.com",
      },
    },
    {
      id: 2,
      name: "Maya Patel",
      role: "Frontend Developer & UI/UX Designer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Talented developer with an eye for design. Maya created SPEC-LINK's user interfaces, focusing on accessibility and intuitive user experience for both patients and healthcare providers.",
      skills: ["React.js", "Tailwind CSS", "Figma", "UI/UX Design", "Animation"],
      social: {
        github: "https://github.com/mayapatel",
        linkedin: "https://linkedin.com/in/mayapatel",
        twitter: "https://twitter.com/mayapatel",
        email: "maya@spec-link.com",
      },
    },
    {
      id: 3,
      name: "David Kim",
      role: "Backend Developer & Database Architect",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Database specialist with expertise in healthcare data management. David designed SPEC-LINK's secure database architecture and implemented HIPAA-compliant data handling protocols.",
      skills: ["Node.js", "MongoDB", "Express", "AWS", "Security"],
      social: {
        github: "https://github.com/davidkim",
        linkedin: "https://linkedin.com/in/davidkim",
        twitter: "https://twitter.com/davidkim",
        email: "david@spec-link.com",
      },
    },
    {
      id: 4,
      name: "Sophia Rodriguez",
      role: "Full-Stack Developer & API Specialist",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Integration expert who connected SPEC-LINK with various healthcare systems and APIs. Sophia ensures seamless data flow between our platform and external medical systems.",
      skills: ["React.js", "Node.js", "API Integration", "GraphQL", "Testing"],
      social: {
        github: "https://github.com/sophiarodriguez",
        linkedin: "https://linkedin.com/in/sophiarodriguez",
        twitter: "https://twitter.com/sophiarodriguez",
        email: "sophia@spec-link.com",
      },
    },
    {
      id: 5,
      name: "James Wilson",
      role: "DevOps Engineer & Security Specialist",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Infrastructure and security expert. James established SPEC-LINK's deployment pipeline, monitoring systems, and implemented comprehensive security measures to protect sensitive patient data.",
      skills: ["Docker", "Kubernetes", "CI/CD", "Security", "Cloud Infrastructure"],
      social: {
        github: "https://github.com/jameswilson",
        linkedin: "https://linkedin.com/in/jameswilson",
        twitter: "https://twitter.com/jameswilson",
        email: "james@spec-link.com",
      },
    },
    {
      id: 6,
      name: "Emma Chen",
      role: "Quality Assurance & Testing Engineer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Detail-oriented QA specialist with healthcare domain expertise. Emma developed comprehensive testing protocols to ensure SPEC-LINK meets the highest quality and compliance standards.",
      skills: ["Automated Testing", "Manual Testing", "QA Processes", "User Testing", "Accessibility"],
      social: {
        github: "https://github.com/emmachen",
        linkedin: "https://linkedin.com/in/emmachen",
        twitter: "https://twitter.com/emmachen",
        email: "emma@spec-link.com",
      },
    },
  ]

  // Development process steps
  const developmentProcess = [
    {
      title: "Research & Planning",
      description:
        "In-depth research of healthcare needs, stakeholder interviews, and market analysis to define project scope and requirements.",
      icon: <Globe className="process-step-icon" />,
    },
    {
      title: "Design & Prototyping",
      description:
        "Creation of wireframes, UI/UX designs, and interactive prototypes, focusing on intuitive user experience for both patients and healthcare providers.",
      icon: <Palette className="process-step-icon" />,
    },
    {
      title: "Development & Testing",
      description:
        "Iterative development with continuous integration, rigorous testing protocols, and regular stakeholder feedback to ensure quality.",
      icon: <Code className="process-step-icon" />,
    },
    {
      title: "Deployment & Maintenance",
      description:
        "Secure deployment, thorough documentation, ongoing support, and regular updates to enhance functionality and security.",
      icon: <Database className="process-step-icon" />,
    },
  ]

  // Technology stack
  const technologyStack = [
    {
      category: "Frontend",
      technologies: ["React.js", "Next.js", "TailwindCSS", "Framer Motion"],
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express", "MongoDB", "GraphQL"],
    },
    {
      category: "DevOps & Infrastructure",
      technologies: ["AWS", "Docker", "Kubernetes", "CI/CD Pipeline"],
    },
    {
      category: "Testing & QA",
      technologies: ["Jest", "Cypress", "Playwright", "Accessibility Testing"],
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
            <a href="/signup" className="btn btn-light btn-sm">
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="team-hero-section">
        <div className="container">
          <motion.div
            className="team-hero-content text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Meet Our Development Team</h1>
            <p>The talented minds behind SPEC-LINK's innovative healthcare platform</p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-5" id="teamSection">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.teamSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Team Members</h2>
            <p className="section-subtitle">Get to know the developers who built SPEC-LINK from the ground up</p>
            <div className="section-divider"></div>
          </motion.div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="team-member-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible.teamSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="team-member-image-container">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="team-member-image" />
                </div>
                <div className="team-member-info">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                  <p className="team-member-bio">{member.bio}</p>
                  <div className="team-member-skills">
                    {member.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="team-member-social">
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="social-link"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="process-section py-5" id="processSection">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.processSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Development Process</h2>
            <p className="section-subtitle">How we turned healthcare challenges into innovative solutions</p>
            <div className="section-divider"></div>
          </motion.div>

          <div className="process-steps">
            {developmentProcess.map((step, index) => (
              <motion.div
                key={index}
                className="process-step"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible.processSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="process-step-number">{index + 1}</div>
                <div className="process-step-content">
                  <div className="process-step-icon-container">{step.icon}</div>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-description">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="tech-section py-5" id="techSection">
        <div className="container">
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.techSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Our Technology Stack</h2>
            <p className="section-subtitle">The powerful technologies behind SPEC-LINK's platform</p>
            <div className="section-divider"></div>
          </motion.div>

          <div className="tech-stack-grid">
            {technologyStack.map((category, index) => (
              <motion.div
                key={index}
                className="tech-category"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible.techSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="tech-category-title">{category.category}</h3>
                <div className="tech-list">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="tech-item">
                      {tech}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="team-cta-section">
        <div className="container">
          <div className="team-cta-content">
            <h2>Interested in Working With Us?</h2>
            <p>We're always looking for talented developers to join our team</p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Contact Us
              </Link>
              <a href="https://github.com/spec-link" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-lg">
                View Our GitHub
              </a>
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
