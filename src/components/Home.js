import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
    
    <div className="Home">
      <main className="main-content">
        <h3>Welcome to the Asset Management System.</h3>
        <p>Track, manage, and optimize your assets with ease.</p>
      </main>
      <footer className="footer">
        <p>© 2023 Asset Management System. All rights reserved.</p>
      </footer>
    </div>
    </Router>
  );
};

export default Home;
