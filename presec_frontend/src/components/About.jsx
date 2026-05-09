import React from 'react';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto py-20 px-6 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-extrabold text-gradient">Our Legacy of Excellence</h1>
                <p className="text-xl text-muted">Presbyterian Boys' Secondary School (PRESEC)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Who We Are</h2>
                    <p className="text-muted leading-relaxed">
                        Founded in 1938, PRESEC Legon has consistently been at the forefront of academic excellence in Ghana. 
                        Our mission is to provide quality education based on Christian principles, fostering a spirit of 
                        hard work, integrity, and discipline.
                    </p>
                    <p className="text-muted leading-relaxed">
                        We take pride in our "Odadeɛ" alumni who continue to lead and innovate in various fields globally.
                    </p>
                </div>
                <div className="card glass p-8 bg-primary bg-opacity-5 border-blue-100">
                    <h3 className="text-xl font-bold mb-4 text-primary">Core Values</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                            <span className="font-semibold">Academic Rigor</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                            <span className="font-semibold">Christian Character</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                            <span className="font-semibold">Innovation</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                            <span className="font-semibold">Global Citizenship</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card bg-primary text-white p-12 rounded-3xl text-center">
                <h2 className="text-3xl font-bold mb-4 text-white">7-Time NSMQ Champions</h2>
                <p className="text-blue-100 text-lg">
                    The highest number of National Science & Maths Quiz trophies in the country. 
                    Excellence is not just an act, but a habit.
                </p>
            </div>
        </div>
    );
};

export default About;
