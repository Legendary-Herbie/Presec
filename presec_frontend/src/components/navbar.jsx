import React from 'react'

function UserDisplay({ name, isAuthenticated }) {
    if (isAuthenticated) {
        return (
            <div>
                <span className="navbar-text">Welcome {name}</span>
            </div>
        );
    } else {
        return (
            <div>
                <a href="/" className="navbar-link link">Login</a>
                <a href="/" className="navbar-link link">Register</a>
            </div>
        );
    }
}

export default function Navbar() {

    return (
        <nav className="navbar">
            <div className="container mx-auto flex justify-between items-center">
                <div className="navbar-text">Presec</div>
                <div>
                    <a href="/" className="navbar-link link">Home</a>
                    <a href="/" className="navbar-link link">About</a>
                    <a href="/" className="navbar-link link">Contact</a>
                </div>
            <UserDisplay name="John Doe" isAuthenticated={true} /> 
            </div>
        </nav>
    );
    }
