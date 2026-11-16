
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

            <header className="career-header">
                <div className="career-container">
                    <Link to="/career" className="career-logo">
                        CAREER
                    </Link>

                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/career">Jobs</Link>
                    </nav>
                </div>
            </header>

            <section className="career-banner">
                <div className="career-container">
                    <h1>Find Your Next Opportunity</h1>
                    <p>
                        Explore opportunities and take the next step
                        in your professional journey.
                    </p>
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
