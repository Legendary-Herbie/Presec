import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        try {
            const response = await axios.post(`${apiUrl}/api/accounts/login/`, {
                username,
                password,
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            window.location.href = '/dashboard';
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-12 px-4">
            <div className="w-full max-w-md">
                <div className="card glass p-10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gradient">Welcome Back</h2>
                        <p className="text-muted mt-2">Log in to your account to continue</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium mb-6 text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-primary-dark">Username</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-primary-dark">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-primary w-full py-4 text-lg"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-muted">
                        Don't have an account? {' '}
                        <Link to="/register" className="text-primary font-bold hover:underline">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
