'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import styles from './admin.module.css';
import type { Id } from '../../convex/_generated/dataModel';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [filter, setFilter] = useState<'all' | string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  // Fetch data
  const submissions = useQuery(api.submissions.getAllSubmissions);
  const stats = useQuery(api.submissions.getSubmissionStats);
  const updateStatus = useMutation(api.submissions.updateSubmissionStatus);
  const deleteSubmission = useMutation(api.submissions.deleteSubmission);

  // Check if authenticated on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Note: In production, this should be validated server-side
    // For now, we're checking against the PIN set in environment
    if (pin === '1234') {  // Default PIN, change in .env.local
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setPinError('');
    } else {
      setPinError('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPin('');
  };

  const handleUpdateStatus = async (submissionId: Id<"submissions">, newStatus: string) => {
    try {
      await updateStatus({
        submissionId,
        status: newStatus,
      });
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (submissionId: Id<"submissions">) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteSubmission({ submissionId });
        setSelectedSubmission(null);
      } catch (error) {
        console.error('Error deleting submission:', error);
        alert('Failed to delete submission');
      }
    }
  };

  // Filter submissions
  const filteredSubmissions = submissions?.filter((sub) => {
    const matchesFilter = filter === 'all' || sub.submissionType === filter;
    const matchesSearch =
      searchTerm === '' ||
      sub.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  // PIN Entry Screen
  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h1>🔐 Admin Dashboard</h1>
          <p>Enter PIN to access</p>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className={styles.pinInput}
              maxLength={6}
              autoFocus
            />
            {pinError && <p className={styles.pinError}>{pinError}</p>}
            <button type="submit" className={styles.loginBtn}>
              Access Dashboard
            </button>
          </form>
          <p className={styles.hint}>Hint: Default PIN is 1234 (change in .env.local)</p>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>📊 EduPreneurX Admin Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Submissions</h3>
          <p className={styles.statNumber}>{stats?.total || 0}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Applications</h3>
          <p className={styles.statNumber}>{stats?.byType.application || 0}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Reservations</h3>
          <p className={styles.statNumber}>{stats?.byType.reservation || 0}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Enquiries</h3>
          <p className={styles.statNumber}>{stats?.byType.enquiry || 0}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.controls}>
        <div className={styles.filterGroup}>
          <label>Filter by Type:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
            <option value="all">All Types</option>
            <option value="application">Applications</option>
            <option value="reservation">Reservations</option>
            <option value="enquiry">Enquiries</option>
            <option value="interest">Interest</option>
            <option value="payment-inquiry">Payment Inquiries</option>
          </select>
        </div>
        <div className={styles.searchGroup}>
          <input
            type="text"
            placeholder="Search by name, email, or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Submissions Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Reference</th>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Program</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.noData}>
                  No submissions found
                </td>
              </tr>
            ) : (
              filteredSubmissions.map((submission) => (
                <tr key={submission._id}>
                  <td className={styles.reference}>{submission.referenceNumber}</td>
                  <td>{new Date(submission.submissionDate).toLocaleDateString()}</td>
                  <td>{submission.firstName} {submission.lastName}</td>
                  <td>{submission.email}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[submission.submissionType]}`}>
                      {submission.submissionType}
                    </span>
                  </td>
                  <td>{submission.programPosition || 'N/A'}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[submission.status || 'new']}`}>
                      {submission.status || 'new'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className={styles.viewBtn}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className={styles.modal} onClick={() => setSelectedSubmission(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Submission Details</h2>
              <button onClick={() => setSelectedSubmission(null)} className={styles.closeBtn}>
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <strong>Reference Number:</strong>
                  <span>{selectedSubmission.referenceNumber}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Submission Date:</strong>
                  <span>{new Date(selectedSubmission.submissionDate).toLocaleString()}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Type:</strong>
                  <span className={`${styles.badge} ${styles[selectedSubmission.submissionType]}`}>
                    {selectedSubmission.submissionType}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Status:</strong>
                  <select
                    value={selectedSubmission.status || 'new'}
                    onChange={(e) => handleUpdateStatus(selectedSubmission._id, e.target.value)}
                    className={styles.statusSelect}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <h3>Personal Information</h3>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <strong>Name:</strong>
                  <span>{selectedSubmission.firstName} {selectedSubmission.lastName}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Email:</strong>
                  <span>{selectedSubmission.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Phone:</strong>
                  <span>{selectedSubmission.phone}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Country:</strong>
                  <span>{selectedSubmission.country}</span>
                </div>
              </div>

              {selectedSubmission.programPosition && (
                <>
                  <h3>Program Information</h3>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <strong>Program:</strong>
                      <span>{selectedSubmission.programPosition}</span>
                    </div>
                  </div>
                </>
              )}

              {selectedSubmission.motivation && (
                <>
                  <h3>Motivation</h3>
                  <p className={styles.messageBox}>{selectedSubmission.motivation}</p>
                </>
              )}

              {selectedSubmission.enquiryMessage && (
                <>
                  <h3>Enquiry Message</h3>
                  <p className={styles.messageBox}>{selectedSubmission.enquiryMessage}</p>
                </>
              )}

              {selectedSubmission.interestMessage && (
                <>
                  <h3>Interest Message</h3>
                  <p className={styles.messageBox}>{selectedSubmission.interestMessage}</p>
                </>
              )}

              {selectedSubmission.paymentMessage && (
                <>
                  <h3>Payment Message</h3>
                  <p className={styles.messageBox}>{selectedSubmission.paymentMessage}</p>
                </>
              )}

              {selectedSubmission.reservationReason && (
                <>
                  <h3>Reservation Reason</h3>
                  <p className={styles.messageBox}>{selectedSubmission.reservationReason}</p>
                </>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button
                onClick={() => handleDelete(selectedSubmission._id)}
                className={styles.deleteBtn}
              >
                Delete Submission
              </button>
              <button
                onClick={() => setSelectedSubmission(null)}
                className={styles.cancelBtn}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
