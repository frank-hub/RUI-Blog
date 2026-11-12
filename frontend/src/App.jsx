
import { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const [postsResponse, categoriesResponse] =
                    await Promise.all([
                        api.get('posts/'),
                        api.get('categories/'),
                    ]);

                setPosts(postsResponse.data.results ?? postsResponse.data);
                setCategories(
                    categoriesResponse.data.results ?? categoriesResponse.data
                );
            } catch (err) {
                console.error(err);
                setError('Unable to load blog content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, []);

    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === 'All' ||
            post.category?.name === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const formatDate = (date) => {
        if (!date) return 'Recently published';

        return new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="blog-site">
            {/* Header */}
            <header className="site-header">
                <div className="header-inner">
                    <a href="/" className="brand">
                        <span className="brand-name">RUII<span>.</span></span>
                        <span className="brand-tagline">INSIGHTS & STORIES</span>
                    </a>

                    <nav className="main-nav">
                        <a href="/">Home</a>
                        <a href="/about.html">About</a>
                        <a href="/services.html">Services</a>
                        <a href="/blog" className="active">Blog</a>
                        <a href="/contact.html">Contact</a>
                    </nav>

                    <a href="/contact.html" className="header-button">
                        Get in touch <span>↗</span>
                    </a>
                </div>
            </header>

            {/* Page banner */}
            <section className="page-banner">
                <div className="banner-overlay"></div>
                <div className="banner-content">
                    <span className="eyebrow">RUII JOURNAL</span>
                    <h1>Blog News</h1>
                    <p>Ideas, insights and stories that move business forward.</p>
                    <div className="breadcrumbs">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span>Blog News</span>
                    </div>
                </div>
            </section>

            {/* Blog content */}
            <main className="blog-container">
                <div className="blog-layout">
                    <section className="posts-column">
                        <div className="section-heading">
                            <div>
                                <span className="eyebrow">OUR LATEST THINKING</span>
                                <h2>Latest Articles</h2>
                            </div>
                            <span className="post-count">
                                {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
                            </span>
                        </div>

                        {loading && (
                            <div className="message-card">
                                <p>Loading the latest articles...</p>
                            </div>
                        )}

                        {!loading && error && (
                            <div className="message-card error-message">
                                <p>{error}</p>
                            </div>
                        )}

                        {!loading && !error && posts.length === 0 && (
                            <div className="message-card">
                                <h3>Nothing published yet</h3>
                                <p>Our latest articles will appear here. Check back soon.</p>
                            </div>
                        )}

                        {!loading && !error && posts.length > 0 && (
                            <>
                                <div className="mobile-search">
                                    <input
                                        type="search"
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(event) => setSearchTerm(event.target.value)}
                                    />
                                </div>

                                {filteredPosts.length === 0 ? (
                                    <div className="message-card">
                                        <h3>No articles found</h3>
                                        <p>Try another search or choose a different category.</p>
                                    </div>
                                ) : (
                                    <div className="posts-list">
                                        {filteredPosts.map((post) => (
                                            <article className="post-card" key={post.id}>
                                                <a
                                                    href={`/blog/${post.slug}`}
                                                    className="post-image-link"
                                                >
                                                    {post.featured_image ? (
                                                        <img
                                                            src={post.featured_image}
                                                            alt={post.title}
                                                            className="post-image"
                                                        />
                                                    ) : (
                                                        <div className="image-placeholder">
                                                            <span>RUII JOURNAL</span>
                                                        </div>
                                                    )}
                                                </a>

                                                <div className="post-content">
                                                    <div className="post-meta">
                                                        <span>
                                                            {post.category?.name || 'General'}
                                                        </span>
                                                        <span className="meta-dot">•</span>
                                                        <time>
                                                            {formatDate(post.published_at || post.created_at)}
                                                        </time>
                                                    </div>

                                                    <h3>
                                                        <a href={`/blog/${post.slug}`}>
                                                            {post.title}
                                                        </a>
                                                    </h3>

                                                    <p className="post-excerpt">
                                                        {post.excerpt || 'Read the full article to discover more.'}
                                                    </p>

                                                    <a
                                                        href={`/blog/${post.slug}`}
                                                        className="read-more"
                                                    >
                                                        Read article <span>→</span>
                                                    </a>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </section>

                    {/* Sidebar */}
                    <aside className="blog-sidebar">
                        <div className="sidebar-widget search-widget">
                            <h3>Search Articles</h3>
                            <input
                                type="search"
                                placeholder="Type and search..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                        </div>

                        <div className="sidebar-widget">
                            <h3>Categories</h3>
                            <ul className="category-list">
                                <li>
                                    <button
                                        className={selectedCategory === 'All' ? 'selected' : ''}
                                        onClick={() => setSelectedCategory('All')}
                                    >
                                        <span>All Articles</span>
                                        <span>{posts.length}</span>
                                    </button>
                                </li>

                                {categories.map((category) => {
                                    const count = posts.filter(
                                        (post) => post.category?.id === category.id
                                    ).length;

                                    return (
                                        <li key={category.id}>
                                            <button
                                                className={
                                                    selectedCategory === category.name
                                                        ? 'selected'
                                                        : ''
                                                }
                                                onClick={() =>
                                                    setSelectedCategory(category.name)
                                                }
                                            >
                                                <span>{category.name}</span>
                                                <span>{count}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="sidebar-cta">
                            <span className="eyebrow">STAY INFORMED</span>
                            <h3>Ideas worth sharing.</h3>
                            <p>Explore perspectives, updates and insights from RUII.</p>
                            <a href="/contact.html">
                                Talk to our team <span>↗</span>
                            </a>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Footer */}
            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <a href="/" className="brand footer-logo">
                            <span className="brand-name">RUII<span>.</span></span>
                            <span className="brand-tagline">INSIGHTS & STORIES</span>
                        </a>
                        <p>Ideas, technology and solutions for a connected future.</p>
                    </div>

                    <div className="footer-links">
                        <h4>Explore</h4>
                        <a href="/">Home</a>
                        <a href="/about.html">About RUII</a>
                        <a href="/services.html">Our Services</a>
                        <a href="/blog">Blog</a>
                    </div>

                    <div className="footer-links">
                        <h4>Get in touch</h4>
                        <a href="/contact.html">Contact us</a>
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

export default App;
