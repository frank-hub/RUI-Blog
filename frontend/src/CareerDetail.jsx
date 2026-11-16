
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from './services/api';
import './Career.css';

function CareerDetail() {
    const { slug } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`career/jobs/${slug}/`);
                setJob(response.data);
            } catch (err) {
                setError('Job not found or no longer available.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [slug]);

    if (loading) {
        return <div className="career-message">Loading job details...</div>;
    }

    if (error || !job) {
        return (
            <div className="career-message">
                <h2>{error || 'Job not found'}</h2>
                <Link to="/career">Back to available jobs</Link>
            </div>
        );
    }

    const emailSubject = `Job Application: ${job.title}`;

    const applicationLink = `mailto:${job.application_email}?subject=${encodeURIComponent(emailSubject)}`;

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
                    <p>Career Opportunities</p>
                    <h1>{job.title}</h1>
                    <p>{job.company} · {job.location}</p>
                </div>
            </section>

            <main className="career-container career-detail-layout">

                <article className="career-detail-content">

                    <section>
                        <h2>Job Description</h2>
                        <p>{job.description}</p>
                    </section>

                    {job.requirements && (
                        <section>
                            <h2>Requirements</h2>
                            <p>{job.requirements}</p>
                        </section>
                    )}

                    <Link to="/career" className="career-back-link">
                        ← Back to all jobs
                    </Link>

                </article>

                <aside className="career-application-card">

                    <h2>Job Overview</h2>

                    <div>
                        <span>Company</span>
                        <strong>{job.company}</strong>
                    </div>

                    <div>
                        <span>Location</span>
                        <strong>{job.location}</strong>
                    </div>

                    <div>
                        <span>Job Type</span>
                        <strong>{job.job_type.replace('_', ' ')}</strong>
                    </div>

                    {job.salary && (
                        <div>
                            <span>Salary</span>
                            <strong>{job.salary}</strong>
                        </div>
                    )}

                    {job.deadline && (
                        <div>
                            <span>Application Deadline</span>
                            <strong>{job.deadline}</strong>
                        </div>
                    )}

                    <a
                        href={applicationLink}
                        className="career-apply-button"
                    >
                        Apply Now
                    </a>

                    <p className="career-apply-note">
                        Send your CV and application directly to the employer.
                    </p>

                </aside>

            </main>

        </div>
    );
}

export default CareerDetail;
