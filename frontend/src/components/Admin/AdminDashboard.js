import React, { useState } from 'react';

const AdminDashboard = () => {
  // Sample grievance data for presentation
  const initialGrievances = [
    {
      _id: '1',
      complaintName: 'Water Supply Issue',
      description: 'No water supply in building for last 2 days',
      user: { username: 'dipesh', email: 'dipesh@example.com' },
      status: 'pending',
      createdAt: '2024-10-26T09:30:00',
      department: 'Municipal Services'
    },
    {
      _id: '2',
      complaintName: 'Street Light Malfunction',
      description: 'Street lights not working in sector 7',
      user: { username: 'harshal', email: 'harshal@example.com' },
      status: 'in progress',
      createdAt: '2024-10-26T10:15:00',
      department: 'Electricity'
    },
    {
      _id: '3',
      complaintName: 'Garbage Collection',
      description: 'Regular garbage collection not happening',
      user: { username: 'jayesh', email: 'jayesh@example.com' },
      status: 'resolved',
      createdAt: '2024-10-26T11:00:00',
      department: 'Sanitation'
    }
  ];

  const [grievances, setGrievances] = useState(initialGrievances);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '⏳';
      case 'in progress':
        return '🔄';
      case 'resolved':
        return '✅';
      default:
        return '❓';
    }
  };

  const updateGrievanceStatus = (id, newStatus) => {
    setGrievances(prevGrievances =>
      prevGrievances.map(grievance =>
        grievance._id === id ? { ...grievance, status: newStatus } : grievance
      )
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Grievance Management Dashboard</h1>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grievances.map(grievance => (
                <tr key={grievance._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{grievance.user.username}</div>
                    <div className="text-sm text-gray-500">{grievance.user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{grievance.complaintName}</div>
                    <div className="text-sm text-gray-500">{grievance.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grievance.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(grievance.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(grievance.status)}`}>
                      <span className="mr-1">{getStatusIcon(grievance.status)}</span>
                      {grievance.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      className="rounded-md border border-gray-300 shadow-sm px-3 py-1"
                      value={grievance.status}
                      onChange={(e) => updateGrievanceStatus(grievance._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;