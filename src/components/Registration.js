import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Registration.css';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";

const SignupPage = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    work: '',
    password: ''
  });

  const handleInputs = (e) => {
    const { id, value } = e.target;
    if (id === 'mobile' && value.length > 10) {
      return;
    }
    setUser({ ...user, [id]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    // const fast2sms = require('fast-two-sms')
    // var options = {authorization: 'wC70iEaJeXtqKnDBx3j8lTouPzIdbAVHLfSMyg9UZhk4QRsNprwFaBuy6cKl0GR79jfQWxedIOrE1v2P',message:'This is a test message 5678',numbers:'9971324400'}
    // fast2sms.sendMessage(options);
    const { name, email, mobile, work, password } = user;
    if (!email || !password || !work || !name || !mobile) {
      alert("Please fill all the fields");
      return;
    }
    const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharactersRegex.test(password)) {
      alert("Password must contain at least one special character");
      return;
    }
    const numbersRegex = /\d/;
    if (!numbersRegex.test(password)) {
      alert("Password must contain at least one number");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch('/checkEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      });

      const res = await response.json();

      if (res.exists) {
        window.alert('Email already exists');
        console.log('Email already exists');
        return;
      }


      const mobileResponse = await fetch('/checkMobile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobile
        })
      });

      const mobileRes = await mobileResponse.json();

      if (mobileRes.exists) {
        alert('Mobile number already exists');
        return;
      }

      // Proceed with registration
      try {
        const registerResponse = await fetch('/Registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
            work,
            password
          })
        });

        const registerRes = await registerResponse.json();

        if (registerRes.status === 422) {
          window.alert('Invalid Registration');
          console.log('Invalid Registration');
        } else {
          window.alert('Successful Registration');
          console.log('Successful Registration');
          history.push('/Login');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <div className="registration-page">
        <div className=" registration-container">
          <div className="row justify-content-center">
            <div className="col-md-20">
              <div className="card">
                <div className="card-body">
                  <h3 style={{ color: "black", fontSize: "40px", marginTop: "0px" }}>Sign Up</h3>
                  <form onSubmit={PostData}>
                    <div className="form-group">

                      <input
                        placeholder='Name'
                        type="text"
                        className="form-control"
                        id="name"
                        aria-autocomplete="off"
                        value={user.name}
                        onChange={handleInputs}
                      />
                    </div>
                    <div className="form-group">

                      <input
                        placeholder='Email'
                        type="email"
                        className="form-control"
                        id="email"
                        aria-autocomplete="off"
                        value={user.email}
                        onChange={handleInputs}
                      />
                    </div>
                    <div className="form-group">
                      <div id="sign-in-button"></div>
                      <input
                        placeholder='Phone Number'
                        type="text"
                        className="form-control"
                        id="mobile"
                        aria-autocomplete="off"
                        value={user.mobile}
                        onChange={handleInputs}
                      />
                    </div>

                    <div className="form-group">

                      <select
                        placeholder='Role'
                        className="form-control"
                        id="work"
                        value={user.work}
                        onChange={handleInputs}
                      >
                        <option value="">Select Work</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>
                    <div className="form-group">

                      <input
                        placeholder='Password'
                        type="password"
                        className="form-control"
                        id="password"
                        value={user.password}
                        onChange={handleInputs}
                      />
                    </div>
                    <div className="text-center">
                      <button className='btn'
                        type="submit">
                        <span class="circle1"></span>
                        <span class="circle2"></span>
                        <span class="circle3"></span>
                        <span class="circle4"></span>
                        <span class="circle5"></span>
                        <span class="text">Register</span>

                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default SignupPage;