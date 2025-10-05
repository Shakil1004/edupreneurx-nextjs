'use client';

import { useState, FormEvent } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import styles from '../app/styles.module.css';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: string;
  programName?: string;
}

export default function FormModal({ isOpen, onClose, formType, programName }: FormModalProps) {
  const createSubmission = useMutation(api.submissions.createSubmission);

  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    age: '',

    // Program/Position
    programPosition: programName || '',

    // Additional fields
    education: '',
    field: '',
    businessExperience: '',
    businessTracks: '',
    businessIdea: '',
    motivation: '',
    startDate: '',
    financing: '',

    // Reservation
    reservationReason: '',
    preferredStartDate: '',
    reservationMessage: '',

    // Interest
    interestType: '',
    interestMessage: '',

    // Payment
    paymentFor: '',
    paymentMethod: '',
    paymentMessage: '',

    // Job Application
    totalExperience: '',
    currentSalary: '',
    relevantExperience: '',
    whyJoin: '',
    availabilityDate: '',

    // Enquiry
    enquiryType: '',
    enquiryMessage: '',

    // Common
    internationalExperience: '',
    languageSkills: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string>('');

  const getFormTitle = () => {
    switch (formType) {
      case 'apply':
        return 'Program Application';
      case 'reserve':
        return 'Book/Reserve Program Seat';
      case 'interested':
        return 'Expression of Interest';
      case 'payment':
        return 'Payment Information';
      case 'enquiry':
        return 'General Enquiry';
      default:
        return 'Contact Form';
    }
  };

  const getSubmissionType = () => {
    switch (formType) {
      case 'apply':
        return 'application';
      case 'reserve':
        return 'reservation';
      case 'interested':
        return 'interest';
      case 'payment':
        return 'payment-inquiry';
      case 'enquiry':
        return 'enquiry';
      default:
        return 'enquiry';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create submission object with proper typing for Convex
      const submissionData: any = {
        submissionType: getSubmissionType(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
      };

      // Add program if not enquiry
      if (formType !== 'enquiry' && formData.programPosition) {
        submissionData.programPosition = formData.programPosition;
      }

      // Add specific fields based on form type
      if (formType === 'apply') {
        if (formData.businessIdea) submissionData.businessIdea = formData.businessIdea;
        if (formData.motivation) submissionData.motivation = formData.motivation;
        if (formData.education) submissionData.education = formData.education;
        if (formData.businessExperience) submissionData.businessExperience = formData.businessExperience;
      } else if (formType === 'enquiry') {
        if (formData.enquiryMessage) submissionData.enquiryMessage = formData.enquiryMessage;
      } else if (formType === 'interested') {
        if (formData.interestMessage) submissionData.interestMessage = formData.interestMessage;
      } else if (formType === 'payment') {
        if (formData.paymentMessage) submissionData.paymentMessage = formData.paymentMessage;
      } else if (formType === 'reserve') {
        if (formData.reservationMessage) submissionData.reservationReason = formData.reservationMessage;
      }

      // Submit to Convex
      const result = await createSubmission(submissionData);

      setIsSubmitting(false);
      setSubmitStatus('success');
      setReferenceNumber(result.referenceNumber);

      // Reset form after 3 seconds
      setTimeout(() => {
        resetForm();
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      age: '',
      programPosition: programName || '',
      education: '',
      field: '',
      businessExperience: '',
      businessTracks: '',
      businessIdea: '',
      motivation: '',
      startDate: '',
      financing: '',
      reservationReason: '',
      preferredStartDate: '',
      reservationMessage: '',
      interestType: '',
      interestMessage: '',
      paymentFor: '',
      paymentMethod: '',
      paymentMessage: '',
      totalExperience: '',
      currentSalary: '',
      relevantExperience: '',
      whyJoin: '',
      availabilityDate: '',
      enquiryType: '',
      enquiryMessage: '',
      internationalExperience: '',
      languageSkills: '',
    });
    setSubmitStatus(null);
    setReferenceNumber('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>

        <h2 className={styles.modalTitle}>{getFormTitle()}</h2>

        {submitStatus === 'success' && (
          <div className={styles.successMessage}>
            <strong>Thank you! Your submission has been received successfully.</strong>
            {referenceNumber && (
              <p style={{ marginTop: '10px', fontSize: '14px' }}>
                Your reference number: <strong>{referenceNumber}</strong>
                <br />
                Please save this for your records.
              </p>
            )}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className={styles.errorMessage}>
            Sorry, something went wrong. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name *</label>
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

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number (with country code) *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 123 456 7890"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="country">Country/Region *</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select country</option>
                <option value="India">India</option>
                <option value="UK">United Kingdom</option>
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Singapore">Singapore</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                <option value="China">China</option>
                <option value="Brazil">Brazil</option>
                <option value="Mexico">Mexico</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="age">Age *</label>
              <select
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              >
                <option value="">Select age range</option>
                <option value="15-18">15-18 years</option>
                <option value="19-22">19-22 years</option>
                <option value="23-26">23-26 years</option>
                <option value="27-35">27-35 years</option>
                <option value="36-45">36-45 years</option>
                <option value="45+">45+ years</option>
              </select>
            </div>
          </div>

          {/* Program Selection - Show for apply, reserve, interested, payment */}
          {formType !== 'enquiry' && (
            <div className={styles.formGroup}>
              <label htmlFor="programPosition">Program of Interest *</label>
              <select
                id="programPosition"
                name="programPosition"
                value={formData.programPosition}
                onChange={handleChange}
                required
              >
                <option value="">Select a program</option>
                <option value="GEEP">GEEP - Global Executive Entrepreneurship Program</option>
                <option value="IEEP">IEEP - International Engineering Enterprise Program</option>
                <option value="GBLP">GBLP - Global Business Leadership Program</option>
                <option value="EIP">EIP - Express Innovation Program</option>
                <option value="ERBP">ERBP - Elite Royal Business Program</option>
              </select>
            </div>
          )}

          {/* Application Specific Fields */}
          {formType === 'apply' && (
            <>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="education">Current Education Level</label>
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                  >
                    <option value="">Select education level</option>
                    <option value="10th-grade">10th Grade Completed</option>
                    <option value="12th-grade">12th Grade Completed</option>
                    <option value="bachelor-ongoing">Bachelor's Degree (Ongoing)</option>
                    <option value="bachelor-completed">Bachelor's Degree Completed</option>
                    <option value="master-ongoing">Master's Degree (Ongoing)</option>
                    <option value="master-completed">Master's Degree Completed</option>
                    <option value="professional">Professional Qualification</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="field">Field of Study/Specialization</label>
                  <input
                    type="text"
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science, Mechanical Engineering"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="businessExperience">Business Experience</label>
                <select
                  id="businessExperience"
                  name="businessExperience"
                  value={formData.businessExperience}
                  onChange={handleChange}
                >
                  <option value="">Select experience level</option>
                  <option value="none">No prior business experience</option>
                  <option value="personal-projects">Personal projects/side hustles</option>
                  <option value="internship">Business internships</option>
                  <option value="family-business">Family business involvement</option>
                  <option value="own-business">Own existing business</option>
                  <option value="corporate">Corporate experience</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="businessTracks">Preferred International Business Track</label>
                <select
                  id="businessTracks"
                  name="businessTracks"
                  value={formData.businessTracks}
                  onChange={handleChange}
                >
                  <option value="">Select business track</option>
                  <option value="cybersecurity">Global Cybersecurity Services</option>
                  <option value="ai-automation">International AI & Automation</option>
                  <option value="ecommerce">Global E-Commerce & Digital Trading</option>
                  <option value="manufacturing">International Manufacturing</option>
                  <option value="marketing-media">Global Marketing & Media</option>
                  <option value="robotics">International Robotics</option>
                  <option value="ai-agentic">Global AI-Agentic Systems</option>
                  <option value="telecommunication">International Telecommunication</option>
                  <option value="satellite">Global Satellite Communication</option>
                  <option value="existing-business">Scale Existing Business Internationally</option>
                  <option value="open">Open to International Suggestions</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="businessIdea">International Business Idea Description</label>
                <textarea
                  id="businessIdea"
                  name="businessIdea"
                  value={formData.businessIdea}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your business idea, global market potential, what international problem it solves, and your target markets..."
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="motivation">Why EduPreneurX for International Success?</label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={3}
                  placeholder="What motivates you to join our international program? What global achievements do you hope to accomplish?"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="startDate">Preferred International Start Date</label>
                  <select
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  >
                    <option value="">Select start date</option>
                    <option value="booking-2026">Booking (Global) - January 15, 2026</option>
                    <option value="interview-2026">Interview + Selection - March 15, 2026</option>
                    <option value="admission-2026">Admissions & Registered - March 15, 2026</option>
                    <option value="flexible">Flexible (International)</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="financing">International Financing Capability</label>
                  <select
                    id="financing"
                    name="financing"
                    value={formData.financing}
                    onChange={handleChange}
                  >
                    <option value="">Select option</option>
                    <option value="self-funded">Self-funded (International)</option>
                    <option value="family-support">Family support (Global)</option>
                    <option value="scholarship-needed">International scholarship needed</option>
                    <option value="loan-required">International education loan required</option>
                    <option value="partial-funding">Partial international funding available</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Reservation Specific Fields */}
          {formType === 'reserve' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="reservationReason">Reason for Reservation</label>
                <select
                  id="reservationReason"
                  name="reservationReason"
                  value={formData.reservationReason}
                  onChange={handleChange}
                >
                  <option value="">Select reason</option>
                  <option value="preparation-time">Need more preparation time</option>
                  <option value="financial-planning">Financial planning required</option>
                  <option value="current-commitments">Current academic/work commitments</option>
                  <option value="family-consultation">Family consultation needed</option>
                  <option value="early-bird-discount">Want early bird pricing</option>
                  <option value="other">Other reason</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reservationMessage">Additional Information</label>
                <textarea
                  id="reservationMessage"
                  name="reservationMessage"
                  value={formData.reservationMessage}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any additional information about your reservation..."
                />
              </div>
            </>
          )}

          {/* Interest Specific Fields */}
          {formType === 'interested' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="interestType">Type of Interest</label>
                <select
                  id="interestType"
                  name="interestType"
                  value={formData.interestType}
                  onChange={handleChange}
                >
                  <option value="">Select interest type</option>
                  <option value="future-application">Future program application</option>
                  <option value="partnership">Partnership opportunities</option>
                  <option value="investment">Investment opportunities</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="research">Research purposes</option>
                  <option value="media">Media/Press inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="interestMessage">Details of Interest</label>
                <textarea
                  id="interestMessage"
                  name="interestMessage"
                  value={formData.interestMessage}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Please describe your interest in detail..."
                />
              </div>
            </>
          )}

          {/* Payment Specific Fields */}
          {formType === 'payment' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="paymentFor">Payment For</label>
                <select
                  id="paymentFor"
                  name="paymentFor"
                  value={formData.paymentFor}
                  onChange={handleChange}
                >
                  <option value="">Select payment purpose</option>
                  <option value="admission-fee">Admission Fee ($10,000)</option>
                  <option value="monthly-fee">Monthly Fee ($1,000)</option>
                  <option value="full-program">Full Program Payment</option>
                  <option value="reservation-fee">Reservation Fee</option>
                  <option value="other">Other payment</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="paymentMethod">Preferred Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="">Select payment method</option>
                  <option value="wire-transfer">International Wire Transfer</option>
                  <option value="online-payment">Online Payment Gateway</option>
                  <option value="cryptocurrency">Cryptocurrency</option>
                  <option value="installments">Payment Plan/Installments</option>
                  <option value="other">Other method</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="paymentMessage">Payment Details/Questions</label>
                <textarea
                  id="paymentMessage"
                  name="paymentMessage"
                  value={formData.paymentMessage}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any specific questions about payment process..."
                />
              </div>
            </>
          )}

          {/* Enquiry Specific Fields */}
          {formType === 'enquiry' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="enquiryType">Enquiry Type</label>
                <select
                  id="enquiryType"
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleChange}
                >
                  <option value="">Select enquiry type</option>
                  <option value="program-info">Program Information</option>
                  <option value="admission-process">Admission Process</option>
                  <option value="fees-scholarships">Fees & Scholarships</option>
                  <option value="international-students">International Students Support</option>
                  <option value="partnerships">Business Partnerships</option>
                  <option value="careers">Career Opportunities</option>
                  <option value="payment">Payment Options</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="enquiryMessage">Your Enquiry</label>
                <textarea
                  id="enquiryMessage"
                  name="enquiryMessage"
                  value={formData.enquiryMessage}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Please describe your enquiry in detail..."
                />
              </div>
            </>
          )}

          {/* Common Fields */}
          <div className={styles.formGroup}>
            <label htmlFor="internationalExperience">Previous International Experience</label>
            <textarea
              id="internationalExperience"
              name="internationalExperience"
              value={formData.internationalExperience}
              onChange={handleChange}
              rows={3}
              placeholder="Describe any previous international experience - travel, work, study abroad, global projects, etc."
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="languageSkills">Language Skills</label>
            <input
              type="text"
              id="languageSkills"
              name="languageSkills"
              value={formData.languageSkills}
              onChange={handleChange}
              placeholder="e.g., English (Fluent), Spanish (Intermediate), Mandarin (Basic)"
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit International Form Securely'}
          </button>
        </form>
      </div>
    </div>
  );
}
