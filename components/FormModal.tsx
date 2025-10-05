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
    fullName: '',
    email: '',
    phone: '',
    program: programName || '',
    message: '',
    country: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string>('');

  const getFormTitle = () => {
    switch (formType) {
      case 'apply':
        return 'Application Form';
      case 'reserve':
        return 'Reserve Your Seat';
      case 'interested':
        return 'Express Interest';
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
      // Split full name into first and last
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || nameParts[0];

      // Create submission object
      const submissionData: any = {
        submissionType: getSubmissionType(),
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
      };

      // Add program if not enquiry
      if (formType !== 'enquiry' && formData.program) {
        submissionData.programPosition = formData.program;
      }

      // Add message based on form type
      if (formData.message) {
        if (formType === 'enquiry') {
          submissionData.enquiryMessage = formData.message;
        } else if (formType === 'interested') {
          submissionData.interestMessage = formData.message;
        } else if (formType === 'payment') {
          submissionData.paymentMessage = formData.message;
        } else if (formType === 'reserve') {
          submissionData.reservationReason = formData.message;
        } else {
          submissionData.motivation = formData.message;
        }
      }

      // Submit to Convex
      const result = await createSubmission(submissionData);

      setIsSubmitting(false);
      setSubmitStatus('success');
      setReferenceNumber(result.referenceNumber);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          program: programName || '',
          message: '',
          country: '',
        });
        setSubmitStatus(null);
        setReferenceNumber('');
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
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
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

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
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country">Country *</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select your country</option>
              <option value="usa">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="india">India</option>
              <option value="singapore">Singapore</option>
              <option value="uae">United Arab Emirates</option>
              <option value="canada">Canada</option>
              <option value="australia">Australia</option>
              <option value="germany">Germany</option>
              <option value="france">France</option>
              <option value="other">Other</option>
            </select>
          </div>

          {formType !== 'enquiry' && (
            <div className={styles.formGroup}>
              <label htmlFor="program">Program of Interest *</label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
              >
                <option value="">Select a program</option>
                <option value="GEEP">GEEP - Global Entrepreneurship Excellence Program</option>
                <option value="IEEP">IEEP - International Executive Entrepreneurship Program</option>
                <option value="GBLP">GBLP - Global Business Leadership Program</option>
                <option value="EIP">EIP - Entrepreneurship Immersion Program</option>
                <option value="ERBP">ERBP - Entrepreneurial Residency & Business Program</option>
              </select>
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="message">
              {formType === 'payment' ? 'Payment Details / Questions' : 'Message'}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={
                formType === 'payment'
                  ? 'Please provide any payment-related questions or information...'
                  : 'Tell us more about yourself and your goals...'
              }
              rows={4}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
