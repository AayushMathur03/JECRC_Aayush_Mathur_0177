import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';

/**
 * Profile Component displays a detailed view of the currently logged-in user.
 * It fetches accurate data from the EmployeeContext to ensure updates are reflected locally.
 * Differentiates visual output based on User Role (Admin vs Employee).
 */
export default function Profile() {
  const { currentUser, isAdmin } = useAuth();
  const { getEmployeeByEmail } = useEmployees();

  // If we are admin, we may have an existing employee record, if not, we use the fallback current user.
  const profileData = getEmployeeByEmail(currentUser?.email) || currentUser;

  const getAvatarColor = (name) => {
    const colors = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return colors[name ? name.charCodeAt(0) % colors.length : 0];
  };

  const initials = (name) =>
    name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '?';

  return (
    <div className="page-enter" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="list-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="list-title">My Profile</h2>
          <p className="list-subtitle">Manage your account and view personal details</p>
        </div>
      </div>

      <div className="card card-elevated" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
          <div className="avatar avatar-xl" style={{ background: getAvatarColor(profileData?.name) }}>
            {initials(profileData?.name)}
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>{profileData?.name}</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className={`badge ${isAdmin ? 'badge-admin' : 'badge-employee'}`}>
                {isAdmin ? '🛡 Admin' : '👤 Employee'}
              </span>
              <span className={`badge badge-${profileData?.status || 'active'}`}>
                {profileData?.status || 'active'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Personal Information</h4>
          <div className="grid-2">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Employee ID</label>
              <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontWeight: '600', fontFamily: 'monospace' }}>
                {profileData?.employeeId}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Email Address</label>
              <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                {profileData?.email}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Phone Number</label>
              <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                {profileData?.phone || 'Not provided'}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Join Date</label>
              <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                {profileData?.joinDate 
                  ? new Date(profileData.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : 'N/A'
                }
              </div>
            </div>
          </div>

          <h4 style={{ margin: '24px 0 16px', color: 'var(--text-secondary)' }}>Job Details</h4>
          <div className="grid-2">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Department</label>
              <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                {profileData?.department}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Position / Role</label>
              <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                {profileData?.position}
              </div>
            </div>
            
            {isAdmin && (
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Annual Salary</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                  {profileData?.salary ? `$${profileData.salary.toLocaleString()}` : 'N/A'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
