import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResourceSection from './ResourceSection';
import StudyPlanner from './StudyPlanner';

const StudentDashboard = () => {
    const [results, setResults] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            const headers = { Authorization: `Bearer ${token}` };
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            try {
                const [resResults, resAnnouncements] = await Promise.all([
                    axios.get(`${apiUrl}/api/accounts/results/`, { headers }).catch(() => ({ data: [] })),
                    axios.get(`${apiUrl}/api/portal/announcements/`, { headers }).catch(() => ({ data: [] }))
                ]);
                setResults(resResults.data);
                setAnnouncements(resAnnouncements.data);
            } catch (err) {
                console.error('Error fetching dashboard data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-20 text-center animate-pulse">Loading Your Dashboard...</div>;

    return (
        <div className="flex flex-col gap-8">
            {/* Header / Hero */}
            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-2 text-white border-none pb-0">Welcome Back, Scholar!</h1>
                    <p className="text-blue-100">"The beautiful thing about learning is that no one can take it away from you."</p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 -mr-20 -mt-20 rounded-full"></div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-4 border-b border-border pb-2 overflow-x-auto">
                {['overview', 'resources', 'planner', 'results'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full font-semibold transition-all ${
                            activeTab === tab 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-muted hover:bg-gray-100'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Announcements Section */}
                        <div className="md:col-span-2 space-y-6">
                            <h2 className="text-2xl font-bold">Latest Announcements</h2>
                            {announcements.length > 0 ? (
                                announcements.map(ann => (
                                    <div key={ann.id} className={`card ${ann.is_important ? 'border-l-4 border-l-red-500' : ''}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold">{ann.title}</h3>
                                            <span className="text-xs text-muted">{new Date(ann.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-muted">{ann.content}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="card text-center p-8 text-muted">No new announcements at this time.</div>
                            )}
                        </div>

                        {/* Quick Stats / Highlights */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Quick Stats</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="card glass text-center">
                                    <span className="text-3xl font-bold text-primary">{results.length}</span>
                                    <p className="text-sm text-muted">Courses Registered</p>
                                </div>
                                <div className="card glass text-center">
                                    <span className="text-3xl font-bold text-accent">A+</span>
                                    <p className="text-sm text-muted">Average Grade</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'resources' && <ResourceSection />}
                {activeTab === 'planner' && <StudyPlanner />}
                
                {activeTab === 'results' && (
                    <div className="card overflow-hidden">
                        <h2 className="text-2xl font-bold mb-6 px-4 pt-4">Academic Performance</h2>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-4">Subject</th>
                                    <th className="px-6 py-4">Semester</th>
                                    <th className="px-6 py-4">Grade</th>
                                    <th className="px-6 py-4">Total Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(r => (
                                    <tr key={r.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                                        <td className="px-6 py-4 font-semibold">{r.subject}</td>
                                        <td className="px-6 py-4 text-muted">{r.semester}</td>
                                        <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">A</span></td>
                                        <td className="px-6 py-4 font-bold text-primary">{r.total_marks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
