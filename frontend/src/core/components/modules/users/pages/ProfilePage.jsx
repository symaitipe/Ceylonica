import React, { useState, useRef } from "react";
import { useAuth } from "../../auth/services/auth.context";
import { changePassword, changeEmail } from "../services/user.service";
import Notification from "../../../common/Notification";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const notifRef = useRef();

  const [activeTab, setActiveTab] = useState("password");
  const [loading, setLoading] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [emailForm, setEmailForm] = useState({
    currentPassword: "",
    newEmail: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      notifRef.current.show("New passwords do not match", "error");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      notifRef.current.show("Password must be at least 6 characters", "error");
      return;
    }

    try {
      setLoading(true);
      await changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
      );
      notifRef.current.show("Password changed successfully", "success");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      const status = err.response?.status;

      if (status === 404) {
        notifRef.current.show("User not found", "error");
      } else if (status === 400) {
        notifRef.current.show("Current password is incorrect", "error");
      } else if (status === 409) {
        notifRef.current.show("Email already in use", "error");
      } else {
        notifRef.current.show(
          err.response?.data?.message || "Something went wrong",
          "error",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await changeEmail(emailForm.currentPassword, emailForm.newEmail);
      notifRef.current.show(
        "Email changed successfully. Please log in again.",
        "success",
      );
      setTimeout(() => logout(), 2000);
    } catch (err) {
      const status = err.response?.status;

      if (status === 400) {
        notifRef.current.show("Password is incorrect", "error");
      } else if (status === 409) {
        notifRef.current.show("Email already in use", "error");
      } else {
        notifRef.current.show(
          err.response?.data?.message || "Failed to change email",
          "error",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <Notification ref={notifRef} />

      <h2>My Profile</h2>
      <p className="profile-email">
        Logged in as: <strong>{user?.email}</strong>
      </p>

      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
        <button
          className={`tab-btn ${activeTab === "email" ? "active" : ""}`}
          onClick={() => setActiveTab("email")}
        >
          Change Email
        </button>
      </div>

      {/* Change Password Form */}
      {activeTab === "password" && (
        <form className="profile-form" onSubmit={handleSubmitPassword}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      )}

      {/* Change Email Form */}
      {activeTab === "email" && (
        <form className="profile-form" onSubmit={handleSubmitEmail}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={emailForm.currentPassword}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Email</label>
            <input
              type="email"
              name="newEmail"
              value={emailForm.newEmail}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Change Email"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
