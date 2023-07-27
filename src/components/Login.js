import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Navbar from './Navbar';

function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [work, setWork] = useState('');
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  useEffect(() => {
    const loggedInUser = localStorage.getItem('EMAIL');
    const loggedInRole = localStorage.getItem('WORK');
    if (loggedInUser && loggedInRole) {
      // User is already logged in, redirect to the appropriate page
      if (loggedInRole === 'Administrator') {
        history.push('/Administrator');
      } else {
        history.push('/Employee');
      }
    } else {
      // No user logged in, clear local storage and redirect to login page
      logout();
    }

    // Start monitoring user activity for automatic logout
    const interval = setInterval(checkUserActivity, 60000); // Check activity every minute (60000 ms)

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [history]);

  const checkUserActivity = () => {
    // Get the current time
    const currentTime = Date.now();

    // Calculate the time difference in milliseconds
    const timeDifference = currentTime - lastActivityTime;

    // If the time difference is greater than one minute (60000 ms), log out the user
    if (timeDifference > 60000) {
      logout();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Update the last activity time when the user logs in or performs any activity
    setLastActivityTime(Date.now());

    const res = await fetch('/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        work,
      }),
    });

    const data = await res.json();
    if (data === 'exist') {
      localStorage.setItem('EMAIL', email);
      localStorage.setItem('WORK', work);
      if (work === 'Administrator') {
        history.push('/Administrator');
      } else {
        history.push('/Employee');
      }
    } else if (data === 'notexist') {
      alert('User is not registered');
    }
  };

  const logout = () => {
    localStorage.removeItem('EMAIL');
    localStorage.removeItem('WORK');
    history.push('/login'); // Redirect to the login page after logout
  };

  return (
    <div>
      <header>
        <Navbar showLogout={false} />
      </header>
      <div className="signup-page">
        <div className="card">
          <div className="">
            <div className="">
              <div style={{ color: 'black', fontSize: '40px' }}>Log In</div>
            </div>

            <form method="POST" onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  placeholder="email"
                  type="email"
                  className="input"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Password"
                  type="password"
                  className="input"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <select
                  className="input"
                  id="work"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                >
                  <option value="">Select Work</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <div className="text-center">
                <button className="btn" type="submit">
                  <span className="circle1"></span>
                  <span className="circle2"></span>
                  <span className="circle3"></span>
                  <span className="circle4"></span>
                  <span className="circle5"></span>
                  <span className="text">Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
