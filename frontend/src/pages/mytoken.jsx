import { useEffect, useState } from "react";
import "./mytoken.css";
import API_URL from "../api";

function MyToken({ setPage }) {
  const [token, setToken] = useState("—");
  const [department, setDepartment] = useState("Not Selected");
  const [status, setStatus] = useState("Waiting");

  const loadToken = () => {
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
    loadToken();

    const interval = setInterval(() => {
      loadToken();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mytoken-page">
      <div className="mytoken-box">

        <button
          className="back-home"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>

        <div className="mytoken-icon">🎫</div>

        <p className="mytoken-tag">✦ MY TOKEN ✦</p>

        <h1>
          Your <span>Token</span>
        </h1>

        <div className="token-number">
          <p>YOUR TOKEN NUMBER</p>
          <h2>{token}</h2>
        </div>

        <div className="token-info">

          <div>
            <p>Department</p>
            <h3>{department}</h3>
          </div>

          <div>
            <p>Status</p>
            <h3>{status}</h3>
          </div>

          <div>
            <p>Queue</p>
            <h3>Active</h3>
          </div>

        </div>

        <p className="mytoken-bottom">
          {status === "Completed"
            ? "Your token is completed ✅"
            : status === "Serving"
            ? "It's your turn! 🔔"
            : "Please wait for your turn 🔔"}
        </p>

      </div>
    </div>
  );
}

export default MyToken;