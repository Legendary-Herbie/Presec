import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import StudentDashboard from './components/StudentDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

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
                            <div className="text-center mt-10">
                                <h1 className="text-4xl font-bold">Welcome to Presec Portal</h1>
                                <p className="mt-4">Please login to access your dashboard.</p>
                            </div>
                        } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
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
