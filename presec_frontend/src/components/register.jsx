import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            setError("Passwords don't match");
            return;
        }
        try {
            await axios.post('http://localhost:8000/api/register/', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.username?.[0] || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-96">
                <h3 className="text-2xl font-bold text-center">Register an account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password2"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={handleChange}
                            required
                        />
                        <div className="flex items-baseline justify-between">
                            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Register</button>
                            <Link to="/login" className="text-sm text-blue-600 hover:underline">Login</Link>
                        </div>
                    </div>
                </form>
                {error && <p className="mt-4 text-xs text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default Register;
