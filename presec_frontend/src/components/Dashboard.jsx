import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/profile/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (err) {
                console.error("Failed to fetch profile", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>Error loading profile</div>;

    if (user.role === 'student') {
        return <StudentDashboard user={user} />;
    } else {
        return <AdminDashboard user={user} />;
    }
};

export default Dashboard;
