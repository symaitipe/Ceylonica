import React, { useState, useRef } from "react";
import { useAuth } from "../../auth/services/auth.context";
import { changePassword, changeEmail } from "../services/user.service";
import Notification from "../../../common/Notification";
import styles from "./ProfilePage.module.css";

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
      if (status === 404) notifRef.current.show("User not found", "error");
      else if (status === 400)
        notifRef.current.show("Current password is incorrect", "error");
      else if (status === 409)
        notifRef.current.show("Email already in use", "error");
      else
        notifRef.current.show(
          err.response?.data?.message || "Something went wrong",
          "error",
        );
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
      if (status === 400)
        notifRef.current.show("Password is incorrect", "error");
      else if (status === 409)
        notifRef.current.show("Email already in use", "error");
      else
        notifRef.current.show(
          err.response?.data?.message || "Failed to change email",
          "error",
        );
    } finally {
      setLoading(false);
    }
  };

  const passwordFields = [
    { label: "Current Password", name: "currentPassword" },
    { label: "New Password", name: "newPassword" },
    { label: "Confirm New Password", name: "confirmPassword" },
  ];

  const emailFields = [
    { label: "Current Password", name: "currentPassword", type: "password" },
    { label: "New Email", name: "newEmail", type: "email" },
  ];

  return (
    <div className={styles.page}>
      <Notification ref={notifRef} />

      <h2 className={styles.pageTitle}>My Profile</h2>
      <p className={styles.emailText}>
        Logged in as:{" "}
        <strong className={styles.emailBold}>{user?.email}</strong>
      </p>

      {/* Tabs */}
      <div className={styles.tabs}>
        {[
          { key: "password", label: "Change Password" },
          { key: "email", label: "Change Email" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={activeTab === key ? styles.tabActive : styles.tabBtn}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Change Password Form */}
      {activeTab === "password" && (
        <form onSubmit={handleSubmitPassword} className={styles.form}>
          {passwordFields.map(({ label, name }) => (
            <div key={name} className={styles.fieldGroup}>
              <label className={styles.label}>{label}</label>
              <input
                type="password"
                name={name}
                value={passwordForm[name]}
                onChange={handlePasswordChange}
                required
                className={styles.input}
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      )}

      {/* Change Email Form */}
      {activeTab === "email" && (
        <form onSubmit={handleSubmitEmail} className={styles.form}>
          {emailFields.map(({ label, name, type }) => (
            <div key={name} className={styles.fieldGroup}>
              <label className={styles.label}>{label}</label>
              <input
                type={type}
                name={name}
                value={emailForm[name]}
                onChange={handleEmailChange}
                required
                className={styles.input}
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? "Updating..." : "Change Email"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
