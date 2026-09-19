import { useState } from "react";
import "./register.css";
import API_URL from "../api";

function Register({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        setPage("login");
      }

    } catch (error) {
      alert("Server connection failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">

        <button
          className="back-home"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>

        <div className="register-icon">🎓</div>

        <p className="register-tag">
          ✦ SGM COLLEGE ✦
        </p>

        <h1>
          Create <span>Account</span>
        </h1>

        <p className="register-text">
          Create your student account to use the queue system.
        </p>

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Create your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          📝 Create Account
        </button>

        <p className="register-login">
          Already have an account?
        </p>

        <button
          className="login-btn"
          onClick={() => setPage("login")}
        >
          🔐 Login
        </button>

        <p className="register-bottom">
          SGM College Karad • @2026
        </p>

      </div>
    </div>
  );
}

export default Register;