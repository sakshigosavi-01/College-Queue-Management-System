import { useState } from "react";
import "./login.css";
import API_URL from "../api";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/login`,
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

        if (data.role === "admin") {
          localStorage.setItem("adminLoggedIn", "true");
          setPage("admin");
        }

        if (data.role === "student") {
          localStorage.setItem("studentEmail", data.email);
          setPage("home");
        }
      }

    } catch (error) {
      alert("Server connection failed");
    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <button
          className="back-home"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>

        <div className="login-icon">🎓</div>

        <p className="login-tag">
          ✦ SGM COLLEGE ✦
        </p>

        <h1>
          Welcome <span>Back</span>
        </h1>

        <p className="login-text">
          Login to manage your queue easily.
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          🔐 Login
        </button>

        <p className="login-bottom">
          SGM College Karad • @2026
        </p>

      </div>

    </div>
  );
}

export default Login;