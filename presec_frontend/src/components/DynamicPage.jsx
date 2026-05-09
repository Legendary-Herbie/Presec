import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DynamicPage = () => {
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            try {
                const res = await axios.get(`${apiUrl}/api/portal/pages/${slug}/`);
                setPage(res.data);
            } catch (err) {
                setError('Page not found');
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [slug]);

    if (loading) return <div className="p-20 text-center animate-pulse text-xl">Loading Content...</div>;
    if (error) return <div className="p-20 text-center text-red-500 text-xl">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-5xl font-bold mb-8 text-primary-dark">{page.title}</h1>
            <div className="prose prose-lg max-w-none text-muted leading-relaxed whitespace-pre-wrap">
                {page.content}
            </div>
            <div className="mt-12 pt-8 border-t border-border text-sm text-muted italic">
                Last updated: {new Date(page.updated_at).toLocaleDateString()}
            </div>
        </div>
    );
};

export default DynamicPage;
