import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LodgeGrievance.css';

function LodgeGrievance() {
  const navigate = useNavigate();
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [grievanceData, setGrievanceData] = useState({
    complaintName: '',
    description: '',
    category: '',
    attachments: [],
    location: ''
  });

  // Simplified OTP verification - just for demo
  const handleVerifyOtp = () => {
    setIsOtpVerified(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Directly store the grievance data in localStorage for demo
      const existingGrievances = JSON.parse(localStorage.getItem('grievances') || '[]');
      const newGrievance = {
        ...grievanceData,
        _id: Date.now().toString(), // Generate a simple ID
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      
      existingGrievances.push(newGrievance);
      localStorage.setItem('grievances', JSON.stringify(existingGrievances));

      alert('Grievance submitted successfully!');
      navigate('/view-grievance');
      
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit grievance. Please try again.');
    }
  };

  const handleGrievanceChange = (event) => {
    const { name, value } = event.target;
    setGrievanceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="lodge-grievance-page">
      <header>
        <div className="hamburger-menu" onClick={() => navigate('/')}>☰</div>
        <div className="logo">
          <img src="logo.svg" alt="Sampark Logo" />
        </div>
      </header>

      <main>
        <div className="lodge-grievance-container">
          <h2 className="grievance-heading">Lodge Your Grievance</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="grievance-form">
            <div className="form-group">
              <label htmlFor="complaintName">Complaint Name:</label>
              <input
                type="text"
                id="complaintName"
                name="complaintName"
                value={grievanceData.complaintName}
                onChange={handleGrievanceChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Grievance Description:</label>
              <textarea
                id="description"
                name="description"
                value={grievanceData.description}
                onChange={handleGrievanceChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                value={grievanceData.category}
                onChange={handleGrievanceChange}
                required
              >
                <option value="">Select a category</option>
                <option value="potholes">Potholes</option>
                <option value="traffic">Traffic</option>
                <option value="sanitation">Sanitation</option>
                <option value="streetlights">Street Lights</option>
                <option value="water">Water Supply</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              Submit Grievance
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LodgeGrievance;



