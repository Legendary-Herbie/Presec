import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
    const [results, setResults] = useState([]);
    const [resources, setResources] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            const headers = { Authorization: `Bearer ${token}` };
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            try {
                const fetchResults = axios.get(`${apiUrl}/api/results/`, { headers }).catch(err => {
                    console.error('Error fetching results', err);
                    return { data: [] };
                });
                const fetchResources = axios.get(`${apiUrl}/api/resources/`, { headers }).catch(err => {
                    console.error('Error fetching resources', err);
                    return { data: [] };
                });
                const fetchEvents = axios.get(`${apiUrl}/api/events/`, { headers }).catch(err => {
                    console.error('Error fetching events', err);
                    return { data: [] };
                });

                const [resResults, resResources, resEvents] = await Promise.all([
                    fetchResults,
                    fetchResources,
                    fetchEvents,
                ]);
                setResults(resResults.data);
                setResources(resResources.data);
                setEvents(resEvents.data);
            } catch (err) {
                console.error('Unexpected error fetching dashboard data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard">
            <h1>Student Dashboard</h1>

            <section>
                <h2>My Results</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Semester</th>
                            <th>Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(r => (
                            <tr key={r.id}>
                                <td>{r.subject}</td>
                                <td>{r.semester}</td>
                                <td>{r.total_marks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Resources</h2>
                <ul>
                    {resources.map(res => (
                        <li key={res.id}>
                            <a href={res.resource_file} target="_blank" rel="noreferrer">{res.title}</a> ({res.subject})
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Upcoming Events</h2>
                <ul>
                    {events.map(e => (
                        <li key={e.id}>
                            <strong>{e.title}</strong> - {new Date(e.date).toLocaleDateString()}
                            <p>{e.description}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default StudentDashboard;
