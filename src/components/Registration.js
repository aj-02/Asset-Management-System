import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Registration.css';
import { useHistory } from 'react-router-dom';

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
    setUser({ ...user, [id]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, mobile, work, password } = user;
    if (!email || !password || !work || !name || !mobile) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const response = await fetch('/Registration', {
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

      const res = await response.json();

      if (res.status === 422) {
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
  };

  return (
    <div className="registration-page">
      <div className=" registration-container">
        <div className="row justify-content-center">
          <div className="col-md-20">
            <div className="card">
              <div className="card-body">
                <h3 style={{color:"black", fontSize:"40px", marginTop:"0px"}}>Sign Up</h3>
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
  );
};

export default SignupPage;
