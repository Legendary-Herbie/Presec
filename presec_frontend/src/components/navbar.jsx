import React from 'react'

import { Link } from 'react-router-dom';

function UserDisplay({ isAuthenticated, handleLogout }) {
    if (isAuthenticated) {
        return (
            <div className="flex items-center">
                <Link to="/dashboard" className="navbar-link link">Dashboard</Link>
                <button onClick={handleLogout} className="navbar-link link bg-transparent border-none cursor-pointer">Logout</button>
            </div>
        );
    } else {
        return (
            <div>
                <Link to="/login" className="navbar-link link">Login</Link>
                <Link to="/register" className="navbar-link link">Register</Link>
            </div>
        );
    }
}

export default function Navbar() {
    const isAuthenticated = !!localStorage.getItem('access_token');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    };

    return (
        <nav className="navbar">
            <div className="navbar-text font-bold text-xl">Presec</div>
            <div className="navbar-links-container">
                <Link to="/" className="navbar-link link">Home</Link>
                <Link to="/about" className="navbar-link link">About</Link>
                <Link to="/contact" className="navbar-link link">Contact</Link>
                <UserDisplay isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            </div>
        </nav>
    );
}
