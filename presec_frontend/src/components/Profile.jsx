import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/accounts/profile/`, { headers });
                setProfile(res.data);
                setFormData(res.data);
            } catch (err) {
                console.error('Error fetching profile', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${apiUrl}/api/accounts/profile/`, formData, { headers });
            setProfile(res.data);
            setEditing(false);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error('Error updating profile', err);
            setMessage('Failed to update profile.');
        }
    };

    if (loading) return <div className="p-20 text-center">Loading Profile...</div>;

    const info = profile.student_info || profile.teacher_info || {};

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold text-gradient">My Profile</h1>
                <button 
                    onClick={() => setEditing(!editing)}
                    className="btn-primary"
                >
                    {editing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg mb-6 text-center ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="card text-center p-8">
                        <div className="w-32 h-32 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold border-4 border-accent">
                            {info.profile_pic ? (
                                <img src={info.profile_pic} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                profile.username.charAt(0).toUpperCase()
                            )}
                        </div>
                        <h2 className="text-2xl font-bold">{profile.first_name} {profile.last_name}</h2>
                        <p className="text-muted capitalize">{profile.role}</p>
                        <div className="mt-4 px-3 py-1 bg-blue-50 text-primary text-xs font-bold rounded-full inline-block">
                            {info.student_id || info.teacher_id || 'ID Pending'}
                        </div>
                    </div>
                </div>

                {/* Details Card */}
                <div className="md:col-span-2">
                    <div className="card p-8">
                        {editing ? (
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold">First Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.first_name || ''} 
                                            onChange={e => setFormData({...formData, first_name: e.target.value})}
                                            className="w-full px-4 py-2 bg-gray-50 border border-border rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold">Last Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.last_name || ''} 
                                            onChange={e => setFormData({...formData, last_name: e.target.value})}
                                            className="w-full px-4 py-2 bg-gray-50 border border-border rounded-xl"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={formData.email || ''} 
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-50 border border-border rounded-xl"
                                    />
                                </div>
                                
                                {profile.student_info && (
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold">Address</label>
                                        <textarea 
                                            value={formData.student_info?.address || ''} 
                                            onChange={e => setFormData({
                                                ...formData, 
                                                student_info: {...formData.student_info, address: e.target.value}
                                            })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-border rounded-xl"
                                        />
                                    </div>
                                )}

                                <button type="submit" className="btn-primary w-full py-3">Save Changes</button>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm text-muted font-semibold uppercase mb-1">Account Info</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs text-muted block">Username</span>
                                            <span className="font-medium">{profile.username}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted block">Email</span>
                                            <span className="font-medium">{profile.email}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="pt-6 border-t border-gray-50">
                                    <h3 className="text-sm text-muted font-semibold uppercase mb-1">Academic Info</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs text-muted block">{profile.role === 'student' ? 'Class' : 'Department'}</span>
                                            <span className="font-medium">{info.class_name || info.department || 'N/A'}</span>
                                        </div>
                                        {profile.role === 'student' && (
                                            <div>
                                                <span className="text-xs text-muted block">Address</span>
                                                <span className="font-medium">{info.address || 'N/A'}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
