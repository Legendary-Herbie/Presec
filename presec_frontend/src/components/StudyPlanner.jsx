import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudyPlanner = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newPlan, setNewPlan] = useState({
        subject: '',
        goal: '',
        days_per_week: 5,
        hours_per_day: 4,
        start_date: '',
        end_date: ''
    });

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchPlans = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/portal/study-plans/`, { headers });
            setPlans(res.data);
        } catch (err) {
            console.error('Error fetching study plans', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/api/portal/study-plans/`, newPlan, { headers });
            setShowForm(false);
            fetchPlans();
            setNewPlan({
                subject: '',
                goal: '',
                days_per_week: 5,
                hours_per_day: 4,
                start_date: '',
                end_date: ''
            });
        } catch (err) {
            console.error('Error creating study plan', err);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Study Plans...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gradient">Study Planner</h2>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                >
                    {showForm ? 'Cancel' : '+ Create Plan'}
                </button>
            </div>

            {showForm && (
                <div className="card glass mb-8">
                    <h3 className="text-xl font-bold mb-4">New Study Plan</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold">Subject</label>
                            <input 
                                type="text" 
                                value={newPlan.subject}
                                onChange={e => setNewPlan({...newPlan, subject: e.target.value})}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold">Goal</label>
                            <input 
                                type="text" 
                                value={newPlan.goal}
                                onChange={e => setNewPlan({...newPlan, goal: e.target.value})}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold">Days per week</label>
                            <input 
                                type="number" 
                                value={newPlan.days_per_week}
                                onChange={e => setNewPlan({...newPlan, days_per_week: e.target.value})}
                                min="1" max="7"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold">Hours per day</label>
                            <input 
                                type="number" 
                                value={newPlan.hours_per_day}
                                onChange={e => setNewPlan({...newPlan, hours_per_day: e.target.value})}
                                min="1" max="24"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold">Start Date</label>
                            <input 
                                type="date" 
                                value={newPlan.start_date}
                                onChange={e => setNewPlan({...newPlan, start_date: e.target.value})}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold">End Date</label>
                            <input 
                                type="date" 
                                value={newPlan.end_date}
                                onChange={e => setNewPlan({...newPlan, end_date: e.target.value})}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="btn-primary w-full mt-2">Save Plan</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {plans.map(plan => (
                    <div key={plan.id} className="card relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{plan.subject}</h3>
                        <p className="text-primary font-medium mb-4">{plan.goal}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="text-muted block">Intensity</span>
                                <span className="font-bold">{plan.hours_per_day}h/day, {plan.days_per_week} days/wk</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="text-muted block">Duration</span>
                                <span className="font-bold">{new Date(plan.start_date).toLocaleDateString()} - {new Date(plan.end_date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyPlanner;
