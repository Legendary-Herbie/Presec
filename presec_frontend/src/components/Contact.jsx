import React, { useState } from 'react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="max-w-6xl mx-auto py-20 px-6">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-5xl font-extrabold text-primary-dark">Get in Touch</h1>
                <p className="text-xl text-muted">We're here to help and answer any question you might have.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="card glass p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold">Visit Us</h3>
                        </div>
                        <p className="text-muted">Legon, Accra, Ghana<br />Greater Accra Region</p>
                    </div>

                    <div className="card glass p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-accent bg-opacity-20 text-primary rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold">Email Us</h3>
                        </div>
                        <p className="text-muted">info@presec.edu.gh<br />admissions@presec.edu.gh</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    {submitted ? (
                        <div className="card bg-green-50 border-green-200 p-12 text-center space-y-4">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-green-800">Message Sent!</h2>
                            <p className="text-green-700">Thank you for reaching out. We will get back to you shortly.</p>
                            <button onClick={() => setSubmitted(false)} className="btn-primary mt-6">Send Another Message</button>
                        </div>
                    ) : (
                        <div className="card p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold">Full Name</label>
                                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="John Doe" required />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold">Email Address</label>
                                        <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="john@example.com" required />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold">Subject</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="How can we help?" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold">Message</label>
                                    <textarea rows="5" className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="Write your message here..." required></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full py-4 text-lg">Send Message</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
