import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../logo.png';

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/" style={{ paddingRight: '10px' }}>
            <img src={logo} alt="logo" style={{ width: '30px', height: 'auto', marginRight: '10px' }} />
            <span style={{ marginLeft: '5px', color: 'white' }}>Asset Management System</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/login" style={{ color: 'white' }}>
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/registration" style={{ color: 'white' }}>
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
