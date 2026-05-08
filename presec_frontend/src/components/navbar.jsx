import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserDisplay({ user, onLogout }) {
    if (user) {
        return (
            <div className="flex items-center space-x-4">
                <span className="navbar-text">Welcome {user.username}</span>
                <button
                    onClick={onLogout}
                    className="navbar-link link bg-red-500 text-white px-2 py-1 rounded"
                >
                    Logout
                </button>
            </div>
        );
    } else {
        return (
            <div className="flex items-center space-x-4">
                <Link to="/login" className="navbar-link link">Login</Link>
                <Link to="/register" className="navbar-link link">Register</Link>
            </div>
        );
    }
}

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/api/profile/', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(response.data);
                } catch (err) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };
        fetchUser();

        // Listen for storage changes to update navbar on login/logout
        window.addEventListener('storage', fetchUser);
        return () => window.removeEventListener('storage', fetchUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Presec</Link>
                <div className="flex space-x-4">
                    <Link to="/" className="navbar-link link">Home</Link>
                    <Link to="/dashboard" className="navbar-link link">Dashboard</Link>
                </div>
                <UserDisplay user={user} onLogout={handleLogout} />
            </div>
        </nav>
    );
}
