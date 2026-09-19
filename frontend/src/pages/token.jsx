import { useState } from "react";
import "./token.css";
import API_URL from "../api";

function Token({ setPage }) {
  const savedDepartment =
    localStorage.getItem("selectedDepartment") || "";

  const [department, setDepartment] = useState(savedDepartment);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const generateToken = async () => {
    if (!department) {
      alert("Please select department");
      return;
    }

    const email = localStorage.getItem("studentEmail");

    if (!email) {
      alert("Please login first");
      setPage("login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            department: department,
            email: email
          })
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      if (!data.id || !data.token) {
        alert("Token generate failed");
        return;
      }

      setToken(data.token);

      localStorage.setItem("myTokenId", data.id);
      localStorage.setItem("myToken", data.token);
      localStorage.setItem("myDepartment", department);
      localStorage.setItem("selectedDepartment", department);

      alert(`Token #${data.token} generated successfully!`);

    } catch (error) {
      console.log(error);
      alert(
        "Server connection failed. Please make sure Flask backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="token-page">

      <div className="token-box">

        <div className="token-icon">
          🎫
        </div>

        <p className="token-tag">
          ✦ SMART QUEUE SYSTEM ✦
        </p>

        <h1>
          Get Your <span>Token</span>
        </h1>

        <p className="token-text">
          Select your department and generate your queue token easily.
        </p>

        <label>
          Select Department
        </label>

        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setToken("");
          }}
        >

          <option value="">
            Select Department
          </option>

          <option value="Accounts">
            Accounts
          </option>

          <option value="Examination">
            Examination
          </option>

          <option value="Admission">
            Admission
          </option>

          <option value="Student Section">
            Student Section
          </option>

        </select>


        <button
          onClick={generateToken}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Token 🎫"}
        </button>


        {token && (
          <div className="token-result">

            <p>
              Your Token Number
            </p>

            <h2>
              #{token}
            </h2>

            <span>
              {department} Department
            </span>

          </div>
        )}


        <button
          onClick={() => setPage("home")}
          style={{ marginTop: "15px" }}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default Token;