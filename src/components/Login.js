import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

function LoginPage() {
  
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [work, setWork] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    localStorage.setItem("EMAIL", email);

    const res = await fetch('/Login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password, work
      })
    });
    
    const data = await res.json();
    if (data === "exist") {
      console.log("yes");
      if (work === 'Administrator') {
        history.push("/Administrator");
      } else {
        history.push("/Employee");
      }
    } else if (data === "notexist") {
      alert("User is not registered");
    }
  };

  return (
    <div className="signup-page">
      <div className="card">
        <div className="">
          <div className="">
            <div style={{color:"black", fontSize:"40px"}} >Log In</div>
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
              <button className="btn" type="submit" >
                <span class="circle1"></span>
                <span class="circle2"></span>
                <span class="circle3"></span>
                <span class="circle4"></span>
                <span class="circle5"></span>
                <span class="text">Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
