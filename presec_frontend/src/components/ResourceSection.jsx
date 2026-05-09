import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceSection = () => {
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');

    useEffect(() => {
        const fetchResources = async () => {
            const token = localStorage.getItem('access_token');
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            try {
                const res = await axios.get(`${apiUrl}/api/portal/subjects/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSubjects(res.data);
                setFilteredSubjects(res.data);
            } catch (err) {
                console.error('Error fetching subjects', err);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    useEffect(() => {
        let result = subjects;

        // Filter by Search Term
        if (searchTerm) {
            result = result.map(sub => ({
                ...sub,
                resources: sub.resources.filter(res => 
                    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            })).filter(sub => sub.resources.length > 0 || sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Filter by Subject
        if (selectedSubject !== 'all') {
            result = result.filter(sub => sub.id.toString() === selectedSubject);
        }

        setFilteredSubjects(result);
    }, [searchTerm, selectedSubject, subjects]);

    if (loading) return <div className="p-8 text-center">Loading Resources...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gradient">Academic Resources</h2>
                    <p className="text-muted">Access your study materials and textbooks</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-grow">
                        <input 
                            type="text" 
                            placeholder="Search resources..." 
                            className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select 
                        className="px-4 py-2 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        <option value="all">All Subjects</option>
                        {subjects.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubjects.map(subject => (
                    <div key={subject.id} className="card">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-primary bg-opacity-10 rounded-lg text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{subject.name}</h3>
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{subject.code}</span>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            {subject.resources && subject.resources.length > 0 ? (
                                subject.resources.map(res => (
                                    <a 
                                        key={res.id} 
                                        href={res.file || res.url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-border transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            {res.resource_type === 'pdf' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                </svg>
                                            )}
                                            <span className="text-sm font-medium">{res.title}</span>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                ))
                            ) : (
                                <p className="text-sm text-muted italic">No resources available</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourceSection;
