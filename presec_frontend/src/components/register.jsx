import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        try {
            await axios.post(`${apiUrl}/api/accounts/register/`, formData);
            window.location.href = '/login';
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Username may already exist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-12 px-4">
            <div className="w-full max-w-lg">
                <div className="card glass p-10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gradient">Create Account</h2>
                        <p className="text-muted mt-2">Join the Presec academic community</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium mb-6 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-primary-dark">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="John"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-primary-dark">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="Doe"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-sm font-semibold text-primary-dark">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="johndoe123"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-sm font-semibold text-primary-dark">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-sm font-semibold text-primary-dark">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn-primary w-full py-4 text-lg mt-4"
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm text-muted">
                        Already have an account? {' '}
                        <Link to="/login" className="text-primary font-bold hover:underline">
                            Log in instead
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
