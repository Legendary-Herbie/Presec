import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        try {
            const response = await axios.post(`${apiUrl}/api/login/`, {
                username,
                password,
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            window.location.href = '/dashboard';
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
