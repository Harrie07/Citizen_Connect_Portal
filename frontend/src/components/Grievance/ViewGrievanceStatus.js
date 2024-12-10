import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewGrievanceStatus.css';

function ViewGrievanceStatus(props) {
  const navigate = useNavigate();
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    // Get grievances from localStorage and combine with demo data
    const storedGrievances = JSON.parse(localStorage.getItem('grievances') || '[]');
    
    // Demo grievances for presentation
    const demoGrievances = [
      {
        _id: '1',
        complaintName: 'Street Light Not Working',
        description: 'The street light in front of house number 123 has not been working for a week',
        category: 'streetlights',
        status: 'In Progress',
        createdAt: '2024-10-20T10:00:00.000Z'
      },
      {
        _id: '2',
        complaintName: 'Water Supply Issue',
        description: 'No water supply in Block B for the last 2 days',
        category: 'water',
        status: 'Pending',
        createdAt: '2024-10-25T09:30:00.000Z'
      },
      {
        _id: '3',
        complaintName: 'Garbage Collection',
        description: 'Regular garbage collection not happening in sector 7',
        category: 'sanitation',
        status: 'Resolved',
        createdAt: '2024-10-23T11:15:00.000Z'
      }
    ];

    // Combine demo grievances with any submitted ones
    setGrievances([...demoGrievances, ...storedGrievances]);
  }, []);

  return (
    <div className="view-grievance-container">
      <header className="header">
        <button onClick={() => navigate('/')} className="menu-toggle">
          ☰
        </button>
        <h1>View Your Grievance Status</h1>
      </header>

      <main className="grievance-content">
        <div className="grievance-table-container">
          {grievances.length > 0 ? (
            <table className="grievance-table">
              <thead>
                <tr>
                  <th>Complaint Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {grievances.map((grievance) => (
                  <tr key={grievance._id}>
                    <td>{grievance.complaintName}</td>
                    <td>{grievance.description}</td>
                    <td>{grievance.category}</td>
                    <td>
                      <span className={`status-${grievance.status.toLowerCase().replace(' ', '-')}`}>
                        {grievance.status}
                      </span>
                    </td>
                    <td>{new Date(grievance.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-grievances">No grievances found.</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ViewGrievanceStatus;


