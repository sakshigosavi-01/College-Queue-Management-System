import { useEffect, useState } from "react";
import "./App.css";

import Token from "./pages/token";
import Queue from "./pages/queue";
import Departments from "./pages/departments";
import Login from "./pages/login";
import About from "./pages/about";
import MyToken from "./pages/mytoken";
import Notification from "./pages/notification";
import Admin from "./pages/admin";
import Register from "./pages/register";
import API_URL from "./api";

function App() {
  const [page, setPage] = useState("home");

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  useEffect(() => {
    const checkStatus = async () => {
      const tokenId = localStorage.getItem("myTokenId");

      if (!tokenId) {
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/my-token/${tokenId}`
        );

        const data = await response.json();

        if (data.status !== "Serving") {
          return;
        }

        const notificationKey = `notificationShown_${tokenId}`;

        if (localStorage.getItem(notificationKey) === "true") {
          return;
        }

        setNotificationText(
          `Token #${data.token} is now being served. Please visit ${data.department} Department.`
        );

        setShowNotification(true);

        localStorage.setItem(notificationKey, "true");
      } catch (error) {
        console.log("Notification check failed");
      }
    };

    checkStatus();

    const interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  let pageContent;

  if (page === "token") {
    pageContent = <Token setPage={setPage} />;
  }

  else if (page === "queue") {
    pageContent = <Queue setPage={setPage} />;
  }

  else if (page === "departments") {
    pageContent = <Departments setPage={setPage} />;
  }

  else if (page === "about") {
    pageContent = <About setPage={setPage} />;
  }

  else if (page === "login") {
    pageContent = <Login setPage={setPage} />;
  }

  else if (page === "mytoken") {
    pageContent = <MyToken setPage={setPage} />;
  }

  else if (page === "notification") {
    pageContent = <Notification setPage={setPage} />;
  }

  else if (page === "register") {
    pageContent = <Register setPage={setPage} />;
  }

  else if (page === "admin") {
    const isAdmin = localStorage.getItem("adminLoggedIn");

    if (isAdmin === "true") {
      pageContent = <Admin setPage={setPage} />;
    } else {
      pageContent = <Login setPage={setPage} />;
    }
  }

  else {
    pageContent = (
      <div className="home">

        <div className="stars"></div>

        <header className="header">

          <div className="logo">
            🎓 SGM COLLEGE
          </div>

          <nav>

            <a onClick={() => setPage("home")}>
              Home
            </a>

            <a onClick={() => setPage("token")}>
              Get Token
            </a>

            <a onClick={() => setPage("departments")}>
              Departments
            </a>

            <a onClick={() => setPage("about")}>
              About
            </a>

            <a onClick={() => setPage("login")}>
              Login
            </a>

            <a onClick={() => setPage("notification")}>
              Notification
            </a>

            <a onClick={() => setPage("admin")}>
              Admin
            </a>

            <a onClick={() => setPage("register")}>
              Register
            </a>

          </nav>

        </header>


        <main className="hero">

          <div className="hero-content">

            <p className="tag">
              ✦ SMART COLLEGE QUEUE SYSTEM ✦
            </p>

            <h1>
              No More
              <br />
              <span>Waiting.</span>
            </h1>

            <p className="description">
              Get your token online, track your queue,
              <br />
              and save your valuable time.
            </p>


            <div className="buttons">

              <button
                onClick={() => setPage("mytoken")}
              >
                🎫 My Token
              </button>


              <button
                onClick={() => setPage("token")}
              >
                🎫 Get Your Token
              </button>


              <button
                className="outline"
                onClick={() => setPage("queue")}
              >
                📊 Check Queue
              </button>

            </div>

          </div>


          <div className="queue-card">

            <div className="moon">
              🌙
            </div>

            <p>
              NOW SERVING
            </p>

            <h2>
              24
            </h2>

            <span>
              Accounts Department
            </span>

            <div className="line"></div>

            <small>
              Next Token : 25
            </small>

          </div>

        </main>


        <section className="stats">

          <div>
            <h3>04</h3>
            <p>Departments</p>
          </div>

          <div>
            <h3>128</h3>
            <p>Today's Tokens</p>
          </div>

          <div>
            <h3>12</h3>
            <p>Now Waiting</p>
          </div>

          <div>
            <h3>24/7</h3>
            <p>Easy Access</p>
          </div>

        </section>


        <footer>
          🎓 SGM College Karad &nbsp; • &nbsp; @2026
        </footer>

      </div>
    );
  }


  return (
    <>

      {pageContent}


      {showNotification && (

        <div className="screen-notification">

          <div className="notification-popup">

            <div className="popup-icon">
              🔔
            </div>

            <h2>
              It's Your Turn!
            </h2>

            <p>
              {notificationText}
            </p>

            <button
              onClick={() => setShowNotification(false)}
            >
              OK
            </button>

          </div>

        </div>

      )}

    </>
  );
}

export default App;