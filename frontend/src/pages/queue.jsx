import { useState } from "react";
import "./queue.css";
import API_URL from "../api";

function Queue({ setPage }) {
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

  return (
    <div className="queue-page">
      <div className="queue-box">

        <div className="queue-icon">📊</div>

        <p className="queue-tag">✦ QUEUE STATUS ✦</p>

        <h1>
          Check <span>Queue</span>
        </h1>

        <p className="queue-text">
          Select your department and check the current queue.
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
          Check Queue 📊
        </button>

        {queue && (
          <div className="queue-result">

            {queue.token > 0 ? (
              <>
                <p>NOW SERVING</p>

                <h2>{queue.token}</h2>

                <span>
                  {queue.department} Department
                </span>

                <hr />

                <small>
                  Current Serving Token
                </small>
              </>
            ) : (
              <>
                <p>NO TOKEN SERVING</p>

                <h2>—</h2>

                <span>
                  {queue.department} Department
                </span>

                <hr />

                <small>
                  No token is currently being served.
                </small>
              </>
            )}

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

export default Queue;