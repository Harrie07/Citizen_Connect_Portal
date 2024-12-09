# Citizen Complaint Portal

## 🌐 Project Overview
The Citizen Complaint Portal is a web application designed to empower citizens by providing a streamlined platform for lodging and tracking municipal complaints. The application bridges the gap between citizens and local government by offering an intuitive interface for reporting issues and an administrative dashboard for efficient complaint management.

## ✨ Key Features
- User-friendly complaint registration system
- Interactive Google Maps integration for location-based complaints
- Admin dashboard for complaint tracking and escalation
- Real-time status updates
- Secure authentication and authorization

## 🛠 Tech Stack
- **Frontend**: ReactJS
- **Backend**: NodeJS
- **Database**: MongoDB
- **Mapping**: Google Maps API
- **Authentication**: JWT (JSON Web Tokens)

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v14.0.0 or later)
- MongoDB
- Google Maps API Key

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/Harrie07/citizen-complaint-portal.git

# Navigate to backend directory
cd citizen-complaint-portal/backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file with your configurations
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 📦 Project Structure
```
citizen-complaint-portal/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin/
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   └── AdminLogin.js
│   │   │   ├── Authentication/
│   │   │   │   ├── Login.js
│   │   │   │   └── SignUp.js
│   │   │   ├── Grievance/
│   │   │   │   ├── LodgeGrievance.js
│   │   │   │   └── ViewGrievanceStatus.js
│   │   │   ├── Navigation/
│   │   │   │   └── HomePage.js
│   │   │   ├── Offices/
│   │   │   │   └── NearbyGovernmentOffices.js
│   │   │   └── Schemes/
│   │   │       └── Scheme.js
│   │   │
│   │   ├── styles/
│   │   │   ├── HomePage.css
│   │   │   ├── LodgeGrievance.css
│   │   │   ├── NearbyGovernmentOffices.css
│   │   │   └── Scheme.css
│   │   │
│   │   ├── App.js
│   │   └── index.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── README.md
└── package.json
```

## 🗺️ Google Maps Integration
The portal uses Google Maps API to:
- Pinpoint complaint locations
- Help users find nearby government offices
- Provide geographical context to complaints

## 🔐 Security Features
- JWT-based user authentication
- Role-based access control
- Input validation and sanitization
- Secure API endpoints

## 📝 Usage Workflow
1. Citizens register/login
2. Submit a complaint with details and location
3. Upload supporting documents
4. Track complaint status
5. Receive notifications

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📊 Future Roadmap
- [ ] Mobile application development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Machine learning-based complaint categorization

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact
Harshal Sakpal - [harshalsakpal21@gmail.com](mailto:harshalsakpal21@gmail.com)

Project Link: [https://github.com/Harrie07/citizen-complaint-portal](https://github.com/Harrie07/citizen-complaint-portal)
