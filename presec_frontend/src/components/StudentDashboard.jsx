import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = ({ user }) => {
    const [results, setResults] = useState([]);
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            try {
                const resResults = await axios.get('http://localhost:8000/api/results/', { headers });
                const resResources = await axios.get('http://localhost:8000/api/resources/', { headers });
                setResults(resResults.data);
                setResources(resResources.data);
            } catch (err) {
                console.error("Failed to fetch data", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
            <p className="mb-8">Welcome, {user.profile?.user?.first_name || user.username}!</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">My Results</h2>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Semester</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Exam Score</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Class Score</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => (
                                <tr key={result.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{result.subject}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{result.semester}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{result.exam_score}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{result.class_score}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{result.total_marks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">Learning Resources</h2>
                <ul className="list-disc pl-5">
                    {resources.map(resource => (
                        <li key={resource.id} className="mb-2">
                            <span className="font-bold">{resource.subject}:</span> {resource.title} -
                            <a href={resource.resource_file} className="text-blue-500 hover:underline ml-2" target="_blank" rel="noreferrer">Download PDF</a>
                            {resource.external_link && <a href={resource.external_link} className="text-blue-500 hover:underline ml-2" target="_blank" rel="noreferrer">External Link</a>}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default StudentDashboard;
