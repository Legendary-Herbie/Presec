import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

const TeacherDashboard = () => {
    const [teacherInfo, setTeacherInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacherProfile = async () => {
            const token = localStorage.getItem('access_token');
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            try {
                const res = await axios.get(`${apiUrl}/api/accounts/profile/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTeacherInfo(res.data.teacher_info);
            } catch (err) {
                console.error('Error fetching teacher profile', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeacherProfile();
    }, []);

    if (loading) return <div className="p-20 text-center">Loading Teacher Dashboard...</div>;

    return (
        <div className="space-y-8">
            <div className="bg-green-600 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-2 text-white border-none pb-0">Teacher Portal</h1>
                    <p className="text-green-100">Welcome, {teacherInfo?.user || 'Educator'}. Manage your classes and resources.</p>
                    {teacherInfo && (
                        <div className="mt-4 inline-block px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm font-semibold">
                            Department: {teacherInfo.department}
                        </div>
                    )}
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 -mr-20 -mt-20 rounded-full"></div>
            </div>

            {/* Reuse AdminDashboard logic for resources and announcements as teachers have same permissions now */}
            <AdminDashboard isTeacherView={true} />
        </div>
    );
};

export default TeacherDashboard;
