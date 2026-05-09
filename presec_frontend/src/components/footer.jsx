import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary-dark text-white py-12 mt-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-accent">PRESEC PORTAL</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">
                        Empowering students with modern tools for academic excellence and seamless collaboration.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-blue-200">
                        <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
                        <li><a href="/dashboard" className="hover:text-accent transition-colors">Dashboard</a></li>
                        <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
                        <li><a href="/contact" className="hover:text-accent transition-colors">Support</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Contact Info</h4>
                    <p className="text-sm text-blue-200">
                        Legon, Accra, Ghana<br />
                        Email: info@presec.edu.gh<br />
                        Phone: +233 123 456 789
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-blue-900 text-center text-sm text-blue-400">
                &copy; {new Date().getFullYear()} Presec Legon. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;