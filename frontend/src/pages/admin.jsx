import { useState } from "react";
import "./admin.css";
import API_URL from "../api";

function Admin({ setPage }) {
  const [department, setDepartment] = useState("");
  const [queue, setQueue] = useState(null);

  const checkQueue = async () => {
    if (!department) {
      alert("Please select department");
      return;
    }

    const response = await fetch(
      `${API_URL}/api/queue/${department}`
    );

    const data = await response.json();
    setQueue(data);
  };

  const nextToken = async () => {
    if (!department) {
      alert("Please select department");
      return;
    }

    const response = await fetch(
      `${API_URL}/api/admin/next/${department}`,
      {
        method: "PUT"
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      setQueue({
        token: data.token,
        department: department
      });
    }
  };

  const completeToken = async () => {
    if (!department) {
      alert("Please select department");
      return;
    }

    const response = await fetch(
      `${API_URL}/api/admin/complete/${department}`,
      {
        method: "PUT"
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      checkQueue();
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-box">

        <div className="admin-top-buttons">

          <button onClick={() => setPage("home")}>
            ← Back to Home
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("adminLoggedIn");
              setPage("home");
            }}
          >
            🚪 Logout
          </button>

        </div>

        <div className="admin-icon">👩‍💼</div>

        <p className="admin-tag">✦ ADMIN PANEL ✦</p>

        <h1>
          Queue <span>Management</span>
        </h1>

        <p>
          Manage the college queue from one place.
        </p>

        <label>Select Department</label>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option>Accounts</option>
          <option>Examination</option>
          <option>Admission</option>
          <option>Student Section</option>
        </select>

        <button onClick={checkQueue}>
          📊 View Current Queue
        </button>

        {queue && (
          <div className="admin-result">

            <p>NOW SERVING</p>

            <h2>{queue.token}</h2>

            <span>
              {queue.department} Department
            </span>

            <div className="admin-actions">

              <button
                className="next-btn"
                onClick={nextToken}
              >
                ⏭️ Next Token
              </button>

              <button
                className="complete-btn"
                onClick={completeToken}
              >
                ✅ Complete Token
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;