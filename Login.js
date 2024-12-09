import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate for navigation

    // Handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = { username, password }; // Ensure these are correct
        console.log('Login data being sent:', loginData); // Log the data sent to the server
    
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', { // Ensure this is the correct URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            console.log('Response status:', res.status); // Log the response status
            const data = await res.json();
            console.log('Response from login:', data); // Log the response
    
            if (res.status === 200) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username)
                console.log('Login successful, token saved');
                navigate('/');
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login request:', error);
        }
    };
    
    // Handle redirection to the signup page
    const handleSignupRedirect = () => {
        navigate('/signup'); // Redirect to signup page
    };
    
    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignupRedirect}>Go to Signup</button> {/* Button to redirect to signup */}
        </div>
    );
};

export default Login;
