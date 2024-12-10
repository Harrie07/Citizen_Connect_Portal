import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NearbyGovernmentOffices.css';

function NearbyGovernmentOffices(props) {
  console.log('NearbyGovernmentOffices component rendered');
  console.log('Props:', props);

  const navigate = useNavigate();

  const [offices, setOffices] = useState([]);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [taluka, setTaluka] = useState('');

  const toggleMenu = () => {
    console.log("Toggling menu. Current state:", props.isMenuOpen);
    props.setMenuOpen(!props.isMenuOpen);
    navigate('/'); // Navigate back to homepage when menu is toggled
  };

  useEffect(() => {
    if (state) {
        // Using full URL for clarity
        fetch(`http://localhost:5000/api/offices?state=${state}&district=${district}&taluka=${taluka}`)
            .then(response => response.json())
            .then(data => {
                setOffices(data);
            })
            .catch(error => {
                console.error('Error fetching offices:', error);
            });
    } else {
        setOffices([]); // Clear offices if no state is selected
    }
}, [state, district, taluka]);

  
  
 
  
    // Function to get districts based on the selected state
    const getDistricts = () => {
      switch (state) {
        case 'Maharashtra':
          return ['Mumbai City', 'Mumbai Suburban', 'Thane', 'Pune']; // Add more districts as needed
        // Add cases for other states if required
        default:
          return [];
      }
    };
  
    // Function to get talukas based on the selected district
    const getTalukas = () => {
      // TODO: Replace with your actual data for talukas based on district
      // For this example, let's assume some sample data
      switch (district) {
        case 'Mumbai City':
          return ['A ward', 'B ward', 'C ward']; // Add more talukas
        case 'Mumbai Suburban':
          return ['Andheri', 'Borivali', 'Goregaon']; // Add more talukas
        case 'Thane':
          return ['Thane', 'Kalyan', 'Dombivali']; // Add more talukas
        case 'Pune':
          return ['Pune City', 'Pimpri-Chinchwad', 'Haveli']; // Add more talukas
        default:
          return [];
      }
    };
  return (
    <div className="nearby-offices-page">
      <header>
        <div className="hamburger-menu" onClick={toggleMenu}>
          ☰ {/* Hamburger icon */}
        </div>
        <div className="logo">
          <img src="logo.svg" alt="Sampark Logo" /> 
        </div>
      </header>

      <main>
        <div className="nearby-offices-container">
          <h2 className="page-heading">Nearby Government Offices</h2>

          <div className="location-filters">
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <select id="state" value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                {/* Add state options here */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="district">District:</label>
              <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
                <option value="">Select District</option>
                {/* Add district options based on selected state */}

                {getDistricts().map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="taluka">Taluka:</label>
              <select id="taluka" value={taluka} onChange={(e) => setTaluka(e.target.value)}>
                <option value="">Select Taluka</option>
                {/* Add taluka options based on selected district */}
                {getTalukas().map(taluka => (
                  <option key={taluka} value={taluka}>{taluka}</option>
                ))}
              </select>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Nearby Government Offices</th>
              </tr>
            </thead>
            <tbody>
              {offices.map((office, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{office.name}</td> 
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

export default NearbyGovernmentOffices;