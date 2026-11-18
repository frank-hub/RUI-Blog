
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './services/api';
import './Career.css';

function Career() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get('career/jobs/');
                setJobs(response.data);
            } catch (err) {
                setError('Unable to load available jobs. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="career-page">

            <header className="site-header">
                <div className="header-inner">
                    <a href="/" className="brand">
                        {/* logo */}
                        <img src="https://ruiinternet.co.ke/images/logo1.PNG" alt="RUII Logo" className="header-logo logo-top"  />
                    </a>

                    <nav className="main-nav">
                        <a href="https://ruiinternet.co.ke">Home</a>
                        <a href="https://ruiinternet.co.ke/about.html">About RUII</a>
                        <a href="https://ruiinternet.co.ke/services.html">Our Services</a>
                        <a href="https://ruiinternet.co.ke/frontend_cms/blog" >Blog</a>
                        <a href="https://ruiinternet.co.ke/frontend_cms/career" className="active">Careers</a>
                        <a href="https://ruiinternet.co.ke/contact.html">Contact</a>
                    </nav>

                    <a href="https://ruiinternet.co.ke/contact" className="header-button">
                        Get in touch <span>↗</span>
                    </a>
                </div>
            </header>

            {/* Page banner */}
            <section className="page-banner">
                <div className="banner-overlay"></div>
                <div className="banner-content">
                    <span className="eyebrow">RUII CAREERS</span>
                    <h1>Available Jobs</h1>
                    <p>Discover opportunities that match your ambitions.</p>
                    <div className="breadcrumbs">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span>Available Jobs</span>
                    </div>
                </div>
            </section>


            <main className="career-container career-content">

                <div className="career-heading">
                    <div>
                        <h2>Available Jobs</h2>
                        <p>
                            Discover opportunities that match your ambitions.
                        </p>
                    </div>

                    <span>{jobs.length} Jobs Available</span>
                </div>

                {loading && <p>Loading available jobs...</p>}

                {error && <p className="career-error">{error}</p>}

                {!loading && !error && jobs.length === 0 && (
                    <p>No job vacancies are currently available.</p>
                )}

                <div className="career-job-list">
                    {jobs.map((job) => (
                        <article className="career-job-card" key={job.id}>

                            <div className="career-job-info">
                                <span className="career-job-type">
                                    {job.job_type.replace('_', ' ')}
                                </span>

                                <h3>{job.title}</h3>

                                <p className="career-company">
                                    {job.company}
                                </p>

                                <div className="career-job-meta">
                                    <span>📍 {job.location}</span>

                                    {job.salary && (
                                        <span>💰 {job.salary}</span>
                                    )}

                                    {job.deadline && (
                                        <span>
                                            Deadline: {job.deadline}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <Link
                                to={`/career/${job.slug}`}
                                className="career-view-button"
                            >
                                View Details
                            </Link>

                        </article>
                    ))}
                </div>

            </main>

        </div>
    );
}

export default Career;
