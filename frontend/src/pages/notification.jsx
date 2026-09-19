import { useEffect, useState } from "react";
import "./notification.css";
import API_URL from "../api";

function Notification({ setPage }) {
  const [token, setToken] = useState(null);
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const loadNotification = () => {
    const tokenId = localStorage.getItem("myTokenId");

    if (tokenId) {
      fetch(
        `${API_URL}/api/my-token/${tokenId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setToken(data.token);
          setDepartment(data.department);
          setStatus(data.status);
        });
    }
  };

  useEffect(() => {
    loadNotification();

    const interval = setInterval(() => {
      loadNotification();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notification-page">
      <div className="notification-box">

        <h1>🔔 Notifications</h1>

        {token && (
          <div className="notification-card">
            <h3>🎫 Token Generated</h3>
            <p>
              Your token #{token} for {department} Department
              has been generated successfully.
            </p>
            <small>Token Status: {status}</small>
          </div>
        )}

        {status === "Serving" && (
          <div className="notification-card">
            <h3>🔔 It's Your Turn!</h3>
            <p>
              Your token #{token} is now being served.
            </p>
            <small>Please visit the {department} Department.</small>
          </div>
        )}

        {status === "Waiting" && (
          <div className="notification-card">
            <h3>⏳ Please Wait</h3>
            <p>
              Your token #{token} is still waiting in the queue.
            </p>
            <small>We will update your status automatically.</small>
          </div>
        )}

        {status === "Completed" && (
          <div className="notification-card">
            <h3>✅ Token Completed</h3>
            <p>
              Your token #{token} has been completed.
            </p>
            <small>Thank you for using the queue system.</small>
          </div>
        )}

        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default Notification;