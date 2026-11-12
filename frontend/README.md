# RUII Blog

A modern blog platform for **RUII**, built with Django REST Framework and React. The platform provides a content management backend for publishing articles and categories, alongside a responsive frontend for readers.

## Features

- Responsive blog homepage and article listing.
- Individual article pages with unique URLs (slugs).
- Article categories and category filtering.
- Search functionality.
- Featured article images.
- Markdown support for article content.
- Django Admin for managing posts and categories.
- REST API for delivering published content.
- Draft and published article statuses.

## Technology Stack

### Backend
- Python
- Django
- Django REST Framework
- Pillow (image handling)

### Frontend
- React
- Vite
- Axios
- React Router
- React Markdown
- Remark GFM

## Project Structure

```text
ruii-blog-backend/
│
├── blog/
│   ├── migrations/
│   ├── admin.py
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── ArticleDetail.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── media/
├── manage.py
└── README.md
```

## Getting Started

### Prerequisites

Ensure you have installed:

- Python 3.12 or later
- Node.js and npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ruii-blog-backend.git
cd ruii-blog-backend
```

### 2. Set up the Django backend

Create and activate a virtual environment:

```bash
python -m venv venv
```

On Windows Git Bash:

```bash
source venv/Scripts/activate
```

Install the backend dependencies:

```bash
pip install django djangorestframework django-cors-headers pillow
```

Apply database migrations:

```bash
python manage.py migrate
```

Create an administrator account:

```bash
python manage.py createsuperuser
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will be available at:

`http://127.0.0.1:8000/`

Django Admin:

`http://127.0.0.1:8000/admin/`

### 3. Set up the React frontend

Open another terminal:

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

`http://localhost:5173/`

## API Endpoints

The Django backend exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health/` | API health check |
| GET | `/api/posts/` | Retrieve published posts |
| GET | `/api/posts/<slug>/` | Retrieve an individual published post |
| GET | `/api/categories/` | Retrieve blog categories |

## Content Management

Content is managed through Django Admin.

1. Sign in at `/admin/`.
2. Create or manage categories.
3. Create a new post.
4. Add a title, excerpt and article content.
5. Select a category and upload a featured image.
6. Set the post status to **Published** when ready.

Only published posts are returned by the public API.

Article content supports Markdown formatting, including headings, paragraphs, lists, links, tables and blockquotes.

## Development Notes

- The Django backend and React frontend run independently during development.
- The frontend communicates with Django through Axios.
- Uploaded images are served through Django's media configuration during development.
- CORS is configured to allow the local Vite development server.
- The original RUII website is maintained separately from the blog application.

## Future Improvements

- Pagination for blog posts.
- Individual author profiles.
- Related articles.
- SEO metadata and social sharing.
- Production deployment configuration.
- Improved content editor in Django Admin.

## Licence

This project is maintained for RUI. All rights reserved unless otherwise stated.