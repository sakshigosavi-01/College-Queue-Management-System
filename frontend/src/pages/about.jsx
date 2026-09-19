import "./about.css";

function About({ setPage }) {
  return (
    <div className="about-page">

      <div className="about-box">
        <button onClick={() => setPage("home")}>
  ← Back to Home
</button>

        <p className="about-tag">✦ ABOUT OUR SYSTEM ✦</p>

        <h1>
          Smart <span>Queue Management</span>
        </h1>

        <p className="about-text">
          The College Queue Management System helps students
          get queue tokens online and check their waiting status
          without standing in long queues.
        </p>

        <div className="about-cards">

          <div className="about-card">
            <div>🎫</div>
            <h2>Easy Token</h2>
            <p>Get your queue token online in seconds.</p>
          </div>

          <div className="about-card">
            <div>📊</div>
            <h2>Live Queue</h2>
            <p>Check your current queue status easily.</p>
          </div>

          <div className="about-card">
            <div>⏱️</div>
            <h2>Save Time</h2>
            <p>Reduce waiting time at college departments.</p>
          </div>

        </div>

        <p className="college-name">
          🎓 SGM College Karad • @2026
        </p>

      </div>

    </div>
  );
}

export default About;