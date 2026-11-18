import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from './services/api';

function ArticleDetail() {
    const { slug } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`posts/${slug}/`);
                setPost(response.data);
            } catch (err) {
                console.error(err);
                setError('Article not found or unavailable.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    const formatDate = (date) => {
        if (!date) return 'Recently published';

        return new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (loading) {
        return <div className="article-message">Loading article...</div>;
    }

    if (error || !post) {
        return (
            <div className="article-message">
                <h2>{error || 'Article not found.'}</h2>
                <Link to="/blog">← Back to articles</Link>
            </div>
        );
    }

    return (
        <div className="blog-site">
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
                        <a href="https://ruiinternet.co.ke/frontend_cms/blog" className="active">Blog</a>
                        <a href="https://ruiinternet.co.ke/frontend_cms/career">Careers</a>
                        <a href="https://ruiinternet.co.ke/contact.html">Contact</a>
                    </nav>

                    <a href="https://ruiinternet.co.ke/contact.html" className="header-button">
                        Get in touch <span>↗</span>
                    </a>
                </div>
            </header>

            <section className="page-banner">
                <div className="banner-overlay"></div>
                <div className="banner-content">
                    <span className="eyebrow">RUII JOURNAL</span>
                    <h1>Article</h1>
                    <div className="breadcrumbs">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to="/blog">Blog</Link>
                        <span>/</span>
                        <span>Article</span>
                    </div>
                </div>
            </section>

            <main className="article-container">
                <article className="article-content">
                    <div className="post-meta">
                        <span>{post.category?.name || 'General'}</span>
                        <span className="meta-dot">•</span>
                        <time>
                            {formatDate(post.published_at || post.created_at)}
                        </time>
                        <span className="meta-dot">•</span>
                        <span>By {post.author}</span>
                    </div>

                    <h1 className="article-title">{post.title}</h1>

                    {post.featured_image && (
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="article-image"
                        />
                    )}

                    {post.excerpt && (
                        <p className="article-excerpt">{post.excerpt}</p>
                    )}

                    <div className="article-body">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="article-back">
                        <Link to="/blog">← Back to all articles</Link>
                    </div>
                </article>
            </main>

            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <img src="https://ruiinternet.co.ke/images/logo1.PNG" alt="RUII Logo" className="header-logo logo-bottom"  />
                        <p>Ideas, technology and solutions for a connected future.</p>
                    </div>

                    <div className="footer-links">
                        <h4>Explore</h4>
                        <a href="https://ruiinternet.co.ke">Home</a>
                        <a href="https://ruiinternet.co.ke/about">About RUII</a>
                        <a href="https://ruiinternet.co.ke/services">Our Services</a>
                        <a href="https://ruiinternet.co.ke/frontend_cms/blog">Blog</a>
                        <a href="https://ruiinternet.co.ke/frontend_cms/career">Careers</a>
                    </div>

                    <div className="footer-links">
                        <h4>Get in touch</h4>
                        <a href="https://ruiinternet.co.ke/contact">Contact us</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} RUII. All rights reserved.</p>
                    <p>Built for ideas that make a difference.</p>
                </div>
            </footer>
        </div>
    );
}

export default ArticleDetail;
