import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Schemes.css';

function Scheme(props) {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);

  // Fetch schemes from the backend
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/schemes');
        const data = await response.json();
        console.log(data);  // Check if data is being fetched correctly
        setSchemes(data);
      } catch (error) {
        console.error('Error fetching schemes:', error);
      }
    };
  
    fetchSchemes();
  }, []);
  
  
  

  const toggleMenu = () => {
    props.setMenuOpen(!props.isMenuOpen);
    navigate('/');
  };

  return (
    <div className="schemes-page">
      <header>
        <div className="hamburger-menu" onClick={toggleMenu}>
          ☰ {/* Hamburger icon */}
        </div>
        <div className="logo">
          <img src="logo.svg" alt="Sampark Logo" />
        </div>
      </header>

      <main>
        <div className="schemes-container">
          <h2 className="page-heading">Maharashtra Government Schemes</h2>
          <table>
            <thead>
              <tr>
                <th>Scheme Name</th>
                <th>Eligibility Criteria</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((scheme, index) => (
                <tr key={index}>
                  <td>{scheme.name}</td>
                  <td>{scheme.eligibility}</td>
                  <td>{scheme.startDate}</td>
                  <td>{scheme.endDate}</td>
                  <td>
                    <a href={scheme.website} target="_blank" rel="noopener noreferrer">
                      {scheme.website}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer>
        <p>Copyright 2024 @Sampark</p>
      </footer>
    </div>
  );
}

export default Scheme;

