import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({ isTeacherView = false }) => {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [stats, setStats] = useState({ students: 0, resources: 0, plans: 0 });
    const [loading, setLoading] = useState(true);

    // Modal states
    const [showResourceModal, setShowResourceModal] = useState(false);
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

    // Form states
    const [resourceForm, setResourceForm] = useState({
        title: '',
        subject: '',
        resource_type: 'pdf',
        file: null,
        url: ''
    });
    const [announcementForm, setAnnouncementForm] = useState({
        title: '',
        content: '',
        is_important: false
    });

    const [formMessage, setFormMessage] = useState({ type: '', text: '' });

    const fetchData = async () => {
        const token = localStorage.getItem('access_token');
        const headers = { Authorization: `Bearer ${token}` };
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        try {
            const [resStudents, resSubjects] = await Promise.all([
                axios.get(`${apiUrl}/api/accounts/students/`, { headers }).catch(() => ({ data: [] })),
                axios.get(`${apiUrl}/api/portal/subjects/`, { headers }).catch(() => ({ data: [] }))
            ]);
            setStudents(resStudents.data);
            setSubjects(resSubjects.data);
            setStats({
                students: resStudents.data.length,
                resources: resSubjects.data.reduce((acc, sub) => acc + (sub.resources?.length || 0), 0),
                plans: 0
            });
        } catch (err) {
            console.error('Error fetching admin data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleResourceSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

        const formData = new FormData();
        formData.append('title', resourceForm.title);
        formData.append('subject', resourceForm.subject);
        formData.append('resource_type', resourceForm.resource_type);
        if (resourceForm.file) {
            formData.append('file', resourceForm.file);
        }
        if (resourceForm.url) {
            formData.append('url', resourceForm.url);
        }

        try {
            await axios.post(`${apiUrl}/api/portal/resources/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormMessage({ type: 'success', text: 'Resource uploaded successfully!' });
            fetchData();
            setTimeout(() => {
                setShowResourceModal(false);
                setResourceForm({ title: '', subject: '', resource_type: 'pdf', file: null, url: '' });
                setFormMessage({ type: '', text: '' });
            }, 2000);
        } catch (err) {
            setFormMessage({ type: 'error', text: 'Failed to upload resource.' });
        }
    };

    const handleAnnouncementSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

        try {
            await axios.post(`${apiUrl}/api/portal/announcements/`, announcementForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFormMessage({ type: 'success', text: 'Announcement posted successfully!' });
            setTimeout(() => {
                setShowAnnouncementModal(false);
                setAnnouncementForm({ title: '', content: '', is_important: false });
                setFormMessage({ type: '', text: '' });
            }, 2000);
        } catch (err) {
            setFormMessage({ type: 'error', text: 'Failed to post announcement.' });
        }
    };

    if (loading) return <div className="p-20 text-center">Loading Administrative Suite...</div>;

    return (
        <div className="space-y-8">
            {!isTeacherView && (
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold border-none pb-0">Admin Control Center</h1>
                        <p className="text-muted">Manage academic resources and student data</p>
                    </div>
                    <div className="flex gap-4">
                        <a href="http://localhost:8000/admin/" target="_blank" rel="noreferrer" className="btn-primary bg-primary-dark">
                            Open Django Admin
                        </a>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card border-l-4 border-l-blue-500">
                    <span className="text-muted text-sm font-semibold uppercase">Total Students</span>
                    <h3 className="text-3xl font-bold text-primary">{stats.students}</h3>
                </div>
                <div className="card border-l-4 border-l-green-500">
                    <span className="text-muted text-sm font-semibold uppercase">Learning Resources</span>
                    <h3 className="text-3xl font-bold text-green-600">{stats.resources}</h3>
                </div>
                <div className="card border-l-4 border-l-purple-500">
                    <span className="text-muted text-sm font-semibold uppercase">Active Subjects</span>
                    <h3 className="text-3xl font-bold text-purple-600">{subjects.length}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Student Management */}
                <div className="card">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Student Directory</h2>
                        <button className="text-primary font-bold text-sm hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-muted text-sm border-b border-gray-100">
                                    <th className="pb-3">ID</th>
                                    <th className="pb-3">Name</th>
                                    <th className="pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {students.slice(0, 5).map(s => (
                                    <tr key={s.id}>
                                        <td className="py-3 font-mono text-xs">{s.student_id}</td>
                                        <td className="py-3 font-medium">{s.user}</td>
                                        <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">Active</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card glass">
                    <h2 className="text-xl font-bold mb-6">Administrative Tasks</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={() => setShowResourceModal(true)}
                            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-white hover:shadow-md transition-all text-left w-full"
                        >
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold">Upload New Resource</h4>
                                <p className="text-xs text-muted">Add PDFs or links for students</p>
                            </div>
                        </button>
                        <button
                            onClick={() => setShowAnnouncementModal(true)}
                            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-white hover:shadow-md transition-all text-left w-full"
                        >
                            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold">Post Announcement</h4>
                                <p className="text-xs text-muted">Broadcast to all students</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Resource Modal */}
            {showResourceModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100] p-4">
                    <div className="card w-full max-w-lg animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Upload Resource</h2>
                            <button onClick={() => setShowResourceModal(false)} className="text-muted hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {formMessage.text && (
                            <div className={`p-4 rounded-lg mb-4 text-sm font-bold ${formMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {formMessage.text}
                            </div>
                        )}

                        <form onSubmit={handleResourceSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    required
                                    value={resourceForm.title}
                                    onChange={e => setResourceForm({...resourceForm, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Subject</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    required
                                    value={resourceForm.subject}
                                    onChange={e => setResourceForm({...resourceForm, subject: e.target.value})}
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Type</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={resourceForm.resource_type}
                                    onChange={e => setResourceForm({...resourceForm, resource_type: e.target.value})}
                                >
                                    <option value="pdf">PDF Document</option>
                                    <option value="link">External Link</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>
                            {resourceForm.resource_type === 'pdf' || resourceForm.resource_type === 'video' ? (
                                <div>
                                    <label className="block text-sm font-bold mb-1">File</label>
                                    <input
                                        type="file"
                                        className="w-full p-2 border rounded"
                                        onChange={e => setResourceForm({...resourceForm, file: e.target.files[0]})}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-bold mb-1">URL</label>
                                    <input
                                        type="url"
                                        className="w-full p-2 border rounded"
                                        value={resourceForm.url}
                                        onChange={e => setResourceForm({...resourceForm, url: e.target.value})}
                                    />
                                </div>
                            )}
                            <button type="submit" className="btn-primary w-full mt-4">Upload Resource</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Announcement Modal */}
            {showAnnouncementModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100] p-4">
                    <div className="card w-full max-w-lg animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Post Announcement</h2>
                            <button onClick={() => setShowAnnouncementModal(false)} className="text-muted hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {formMessage.text && (
                            <div className={`p-4 rounded-lg mb-4 text-sm font-bold ${formMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {formMessage.text}
                            </div>
                        )}

                        <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    required
                                    value={announcementForm.title}
                                    onChange={e => setAnnouncementForm({...announcementForm, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Content</label>
                                <textarea
                                    className="w-full p-2 border rounded min-h-[100px]"
                                    required
                                    value={announcementForm.content}
                                    onChange={e => setAnnouncementForm({...announcementForm, content: e.target.value})}
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="important"
                                    checked={announcementForm.is_important}
                                    onChange={e => setAnnouncementForm({...announcementForm, is_important: e.target.checked})}
                                />
                                <label htmlFor="important" className="text-sm font-bold">Mark as Important</label>
                            </div>
                            <button type="submit" className="btn-primary w-full mt-4">Post Announcement</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
