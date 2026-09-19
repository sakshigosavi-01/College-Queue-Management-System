import "./departments.css";

function Departments({ setPage }) {

  const chooseDepartment = (department) => {
    localStorage.setItem("selectedDepartment", department);
    setPage("token");
  };

  return (
    <div className="departments-page">

      <div className="departments-box">

        <button
          className="back-home"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>

        <p className="dept-tag">✦ COLLEGE SERVICES ✦</p>

        <h1>
          Choose Your <span>Department</span>
        </h1>

        <p className="dept-text">
          Select a department to manage your queue easily.
        </p>

        <div className="dept-cards">

          <div
            className="dept-card"
            onClick={() => chooseDepartment("Accounts")}
          >
            <div>💰</div>
            <h2>Accounts</h2>
            <p>Fees &amp; payments</p>
          </div>

          <div
            className="dept-card"
            onClick={() => chooseDepartment("Examination")}
          >
            <div>📝</div>
            <h2>Examination</h2>
            <p>Exam related services</p>
          </div>

          <div
            className="dept-card"
            onClick={() => chooseDepartment("Admission")}
          >
            <div>🎓</div>
            <h2>Admission</h2>
            <p>Admission services</p>
          </div>

          <div
            className="dept-card"
            onClick={() => chooseDepartment("Student Section")}
          >
            <div>📚</div>
            <h2>Student Section</h2>
            <p>Student services</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Departments;