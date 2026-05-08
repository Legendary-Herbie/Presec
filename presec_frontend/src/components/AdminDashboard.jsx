import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ user }) => {
    const [students, setStudents] = useState([]);
    const [resultForm, setResultForm] = useState({
        student: '',
        subject: '',
        semester: 'term1',
        exam_score: '',
        class_score: '',
        total_marks: ''
    });
    const [resourceForm, setResourceForm] = useState({
        subject: '',
        title: '',
        description: '',
        resource_type: 'pdf',
        resource_file: null,
        external_link: ''
    });

    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:8000/api/students/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStudents(res.data);
            } catch (err) {
                console.error("Failed to fetch students", err);
            }
        };
        fetchStudents();
    }, []);

    const handleResultSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:8000/api/results/create/', resultForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Result recorded successfully!");
        } catch (err) {
            alert("Failed to record result");
        }
    };

    const handleResourceSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        Object.keys(resourceForm).forEach(key => {
            formData.append(key, resourceForm[key]);
        });
        try {
            await axios.post('http://localhost:8000/api/resources/create/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Resource uploaded successfully!");
        } catch (err) {
            alert("Failed to upload resource");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Admin/Teacher Dashboard</h1>
            <p className="mb-8">Welcome, {user.username}!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">Record Student Result</h2>
                    <form onSubmit={handleResultSubmit}>
                        <select
                            className="w-full p-2 mb-2 border rounded"
                            value={resultForm.student}
                            onChange={(e) => setResultForm({...resultForm, student: e.target.value})}
                            required
                        >
                            <option value="">Select Student</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.student_id} - {s.user.username}</option>
                            ))}
                        </select>
                        <input
                            type="text" placeholder="Subject" className="w-full p-2 mb-2 border rounded"
                            value={resultForm.subject} onChange={(e) => setResultForm({...resultForm, subject: e.target.value})} required
                        />
                        <select
                            className="w-full p-2 mb-2 border rounded"
                            value={resultForm.semester} onChange={(e) => setResultForm({...resultForm, semester: e.target.value})}
                        >
                            <option value="term1">First Term</option>
                            <option value="term2">Second Term</option>
                            <option value="term3">Third Term</option>
                        </select>
                        <input
                            type="number" placeholder="Exam Score" className="w-full p-2 mb-2 border rounded"
                            value={resultForm.exam_score} onChange={(e) => setResultForm({...resultForm, exam_score: e.target.value})} required
                        />
                        <input
                            type="number" placeholder="Class Score" className="w-full p-2 mb-2 border rounded"
                            value={resultForm.class_score} onChange={(e) => setResultForm({...resultForm, class_score: e.target.value})} required
                        />
                        <input
                            type="number" placeholder="Total Marks" className="w-full p-2 mb-2 border rounded"
                            value={resultForm.total_marks} onChange={(e) => setResultForm({...resultForm, total_marks: e.target.value})} required
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded">Record Result</button>
                    </form>
                </section>

                <section className="bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">Upload Learning Resource</h2>
                    <form onSubmit={handleResourceSubmit}>
                        <input
                            type="text" placeholder="Subject" className="w-full p-2 mb-2 border rounded"
                            value={resourceForm.subject} onChange={(e) => setResourceForm({...resourceForm, subject: e.target.value})} required
                        />
                        <input
                            type="text" placeholder="Title" className="w-full p-2 mb-2 border rounded"
                            value={resourceForm.title} onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})} required
                        />
                        <textarea
                            placeholder="Description" className="w-full p-2 mb-2 border rounded"
                            value={resourceForm.description} onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                        />
                        <input
                            type="file" className="w-full p-2 mb-2 border rounded"
                            onChange={(e) => setResourceForm({...resourceForm, resource_file: e.target.files[0]})}
                        />
                        <input
                            type="text" placeholder="External Link" className="w-full p-2 mb-2 border rounded"
                            value={resourceForm.external_link} onChange={(e) => setResourceForm({...resourceForm, external_link: e.target.value})}
                        />
                        <button className="bg-green-600 text-white px-4 py-2 rounded">Upload Resource</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
