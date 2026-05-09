import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import StudentDashboard from './components/StudentDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import DynamicPage from './components/DynamicPage.jsx';
import Profile from './components/Profile.jsx';

function App() {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('access_token');
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            if (token) {
                try {
                    const res = await axios.get(`${apiUrl}/api/profile/`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUserProfile(res.data);
                } catch (err) {
                    localStorage.removeItem('access_token');
                }
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <Router>
            <div className="App flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={
                            <div className="py-20 space-y-20">
                                {/* Hero Section */}
                                <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
                                    <h1 className="text-6xl font-extrabold tracking-tight text-primary-dark border-none pb-0">
                                        Academic Excellence at <span className="text-gradient">PRESEC Legon</span>
                                    </h1>
                                    <p className="text-xl text-muted leading-relaxed">
                                        Access learning resources, manage your study schedule, and track your academic progress all in one secure place.
                                    </p>
                                    <div className="flex justify-center gap-4 pt-4">
                                        {userProfile ? (
                                            <Link to="/dashboard" className="btn-primary text-lg px-8">Go to Dashboard</Link>
                                        ) : (
                                            <>
                                                <Link to="/login" className="btn-primary text-lg px-8">Get Started</Link>
                                                <Link to="/about" className="px-8 py-3 rounded-xl border border-border font-bold hover:bg-gray-50 transition-all">Learn More</Link>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Features Section */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                                    <div className="card glass text-center p-8">
                                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">Resource Hub</h3>
                                        <p className="text-muted text-sm">Download past questions, lecture notes, and study guides for all subjects.</p>
                                    </div>
                                    <div className="card glass text-center p-8">
                                        <div className="w-16 h-16 bg-accent bg-opacity-20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">Study Planner</h3>
                                        <p className="text-muted text-sm">Organize your study time effectively with our smart planning tools.</p>
                                    </div>
                                    <div className="card glass text-center p-8">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">Results Tracking</h3>
                                        <p className="text-muted text-sm">Monitor your academic performance across semesters with detailed insights.</p>
                                    </div>
                                </div>
                            </div>
                        } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/page/:slug" element={<DynamicPage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                            path="/dashboard"
                            element={
                                userProfile ? (
                                    userProfile.is_staff ? <AdminDashboard /> : <StudentDashboard />
                                ) : <Navigate to="/login" />
                            }
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
