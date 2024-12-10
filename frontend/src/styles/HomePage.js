import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import { useNavigate } from 'react-router-dom';

import './HomePage.css';
import './Login-Signup.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 20.5937, // Approximate center of India
  lng: 78.9629
};

function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWhatSamparkOpen, setIsWhatSamparkOpen] = useState(false);
  const [isWhyChooseSamparkOpen, setIsWhyChooseSamparkOpen] = useState(false);
  const [username, setUsername] = useState(''); // To store username

  const navigate = useNavigate();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbpvDa2o3CQrbmoeQlZnipUsOXwu0SfSA"
  });

  // Fetch username from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);  // Update the username state
    }
}, [username]);  // Add username as a dependency so the effect runs when username changes


  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  const handleMenuItemClick = (path) => {
    setMenuOpen(false); // Close the menu after clicking
    navigate(path); // Navigate to the corresponding page
  };

  const toggleMenu = () => {
    console.log("Toggling menu. Current state:", isMenuOpen); // Debugging
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');  // Clear the username state
    navigate('/login');
  };

  return (
    <div className="home-page">
      <header>
        <div className="logo">
          <img src="logo.svg" alt="Sampark Logo" />
        </div>
        <nav>
          <ul>
            <li><a href="#" onClick={() => handleMenuItemClick('/schemes')}>Schemes</a></li>
            <li><a href="#" onClick={() => handleMenuItemClick('/grievances/lodge')}>Lodge Grievance</a></li>
            <li><a href="#" onClick={() => handleMenuItemClick('/grievances/view')}>View Grievance Status</a></li>
            <li><a href="#" onClick={() => handleMenuItemClick('/offices')}>Government Offices Nearby</a></li>
          </ul>
        </nav>
        
        <div className="login-box">
          {username ? (
            <div>
              <p>Hello, {username}!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')}>Login</button>
          )}
        </div>
        
        <div className="hamburger-menu" onClick={toggleMenu}></div>
      </header>

      <main>
        {/* Map Section */}
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5} // Adjust zoom as needed
          >
            <Marker position={center} />
          </GoogleMap>
        </div>

        {/* About Section */}
        <section className="about-section">
          {/* First Section: What is Sampark */}
          <div className="about-header">
            <h1>What is Sampark?</h1>
            <div className="line-with-arrow">
              <button className="dropdown-button" onClick={() => setIsWhatSamparkOpen(!isWhatSamparkOpen)}>
                <span className="dropdown-arrow">{isWhatSamparkOpen ? '▲' : '▼'}</span>
              </button>
            </div>
          </div>
          {isWhatSamparkOpen && (
            <div className="about-content">
              <p>
                Sampark is a platform designed to streamline access to government services for citizens.
                From lodging grievances to staying informed about the latest schemes, we offer an easy, transparent way
                to interact with the government.
              </p>
              <p>
                With Sampark, finding nearby offices or getting real-time weather updates is just a click away. 
                Our goal is to simplify your experience and keep you connected to essential services.
              </p>
            </div>
          )}

          {/* Second Section: Why Choose Sampark */}
          <div className="about-header">
            <h1>Why Choose Sampark?</h1>
            <div className="line-with-arrow">
              <button className="dropdown-button" onClick={() => setIsWhyChooseSamparkOpen(!isWhyChooseSamparkOpen)}>
                <span className="dropdown-arrow">{isWhyChooseSamparkOpen ? '▲' : '▼'}</span>
              </button>
            </div>
          </div>
          {isWhyChooseSamparkOpen && (
            <div className="about-content">
              <p>
                Sampark stands out for its user-friendliness, transparency, and efficiency in helping citizens access key services.
                We focus on providing a hassle-free platform where every citizen can feel empowered to access the services they need.
              </p>
              <p>
                Sampark’s continuous improvements and dedication to accessibility ensure that every interaction is seamless,
                fostering trust and confidence in the platform.
              </p>
            </div>
          )}
        </section>

        <footer>
          <div className="footer-box">
            {/* Contact Us Section */}
            <div className="footer-section">
              <h2>Contact Us</h2>
              <p><strong>Address:</strong> Wagbil, Thane</p>
              <p><strong>Phone:</strong> 7651938744</p>
              <p><strong>Email:</strong> <a href="mailto:kushagrasinghrajput7@gmail.com">kushagrasinghrajput7@gmail.com</a></p>
            </div>

            {/* Help Section */}
            <div className="footer-section">
              <h2>Help</h2>
              <ul>
                <li><a href="#">Privacy Settings</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>

              {/* Social Media Icons */}
              <div className="social-media">
                <a href="https://www.facebook.com/YOUR_FACEBOOK_PAGE" target="_blank" rel="noopener noreferrer">
                  <img src="facebook-logo.jpeg" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/YOUR_INSTAGRAM_PROFILE" target="_blank" rel="noopener noreferrer">
                  <img src="instagram-logo.jpeg" alt="Instagram" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>Copyright 2024 @Sampark. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;

