import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../services/auth.context";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Full Name", id: "name", type: "text", placeholder: "John Doe" },
    {
      label: "Email",
      id: "email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      label: "Password",
      id: "password",
      type: "password",
      placeholder: "••••••••",
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <div className={styles.page}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.logoSection}>
          <Link
            to="/"
            className={styles.logoText}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ceylonica
          </Link>
          <div className={styles.logoDivider} />
          <p className={styles.logoSubtext}>Create your account</p>
        </div>

        <div className={styles.card}>
          <h2
            className={styles.title}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Register
          </h2>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            {fields.map(({ label, id, type, placeholder }) => (
              <div key={id} className={styles.fieldGroup}>
                <label htmlFor={id} className={styles.label}>
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className={styles.input}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.footerLink}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
