import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            const headers = { Authorization: `Bearer ${token}` };
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            try {
                const resStudents = await axios.get(`${apiUrl}/api/students/`, { headers });
                setStudents(resStudents.data);
            } catch (err) {
                console.error('Error fetching data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <section>
                <h2>Manage Students</h2>
                <ul>
                    {students.map(s => (
                        <li key={s.id}>{s.student_id} - {s.user}</li>
                    ))}
                </ul>
            </section>
            <p>Admin features like creating results, resources, and events can be added here.</p>
        </div>
    );
};

export default AdminDashboard;
