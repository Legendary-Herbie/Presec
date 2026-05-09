import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../logo.png';

function NavLink({ to, children }) {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    return (
        <Link 
            to={to} 
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive 
                ? 'bg-blue-700 text-white shadow-sm' 
                : 'text-blue-100 hover:bg-blue-800 hover:text-white'
            }`}
        >
            {children}
        </Link>
    );
}

export default function Navbar() {
    const isAuthenticated = !!localStorage.getItem('access_token');
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    };

    return (
        <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <img src={logo} alt="Presec Logo" className="h-10 w-10 transition-transform group-hover:rotate-12" />
                    <span className="text-2xl font-bold tracking-tight">PRESEC <span className="text-accent">PORTAL</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-2">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/profile">Profile</NavLink>
                            <button 
                                onClick={handleLogout} 
                                className="ml-4 px-4 py-2 border border-blue-400 text-blue-100 rounded-lg font-medium hover:bg-white hover:text-primary transition-all"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="ml-4 px-6 py-2 bg-accent text-primary-dark rounded-lg font-bold hover:bg-accent-light transition-all shadow-sm"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="ml-2 px-6 py-2 bg-white text-primary rounded-lg font-bold hover:bg-blue-50 transition-all shadow-sm"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button (Placeholder) */}
                <div className="md:hidden">
                    <button className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
