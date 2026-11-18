
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
                        <a href="https://ruiinternet.co.ke/frontend_cms/blog">Blog</a>
                        <a href="https://ruiinternet.co.ke/frontend_cms/career" className="active">Careers</a>
                        <a href="https://ruiinternet.co.ke/contact.html">Contact</a>
                    </nav>

                    <a href="https://ruiinternet.co.ke/contact.html" className="header-button">
                        Get in touch <span>↗</span>
                    </a>
                </div>
            </header>

            {/* Page banner */}
            <section className="page-banner">
                <div className="banner-overlay"></div>
                <div className="banner-content">
                    <span className="eyebrow">RUII CAREERS</span>
                    <h1>Job Details</h1>
                    <p>Discover the details of this exciting opportunity.</p>
                    <div className="breadcrumbs">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span>{job.title}</span>
                    </div>
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
                        <p>
                            Alternatively, you can also apply through our platform by sending your application to <a href={applicationLink}>{job.application_email}</a>.
                        </p>
                        
                    </p>

                </aside>

            </main>

        </div>
    );
}

export default CareerDetail;
