# RUII – Blog & Career Platform

A multi-application web platform for **RUII**, built using Django REST Framework and React.

The platform currently consists of two applications:

- **RUII Blog:** A content management and publishing platform for sharing articles, insights and stories.
- **Career:** A job listing platform where visitors can explore available vacancies and apply directly to employers via email.

Both applications share the same Django backend, database, API infrastructure and React frontend.

---

## Features

### 1. RUII Blog

- Responsive blog homepage and article listing.
- Individual article pages with unique URLs (slugs).
- Article categories and category filtering.
- Search functionality.
- Featured article images.
- Markdown support for article content.
- Django Admin for managing posts and categories.
- REST API for delivering published content.
- Draft and published article statuses.

### 2. Career

- Job vacancy listing.
- Individual job detail pages.
- Company and location information.
- Job types: Full-time, Part-time, Contract, Internship and Temporary.
- Salary information.
- Application deadlines.
- Job search and filtering (planned).
- Django Admin for managing job vacancies.
- Draft, Published and Closed job statuses.
- Email-based job applications.
- Apply Now button that opens the applicant's email application with a pre-filled recipient and subject.

Applicants can attach their CV and send their applications directly to the employer. The platform does not currently collect or store applicant CVs.

---

## Technology Stack

### Backend

- Python
- Django
- Django REST Framework
- django-cors-headers
- Pillow

### Frontend

- React
- Vite
- Axios
- React Router
- React Markdown
- Remark GFM

### Database

- SQLite (development)

---

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
├── career/
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
│   │   ├── Career.jsx
│   │   ├── CareerDetail.jsx
│   │   ├── App.css
│   │   ├── Career.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── media/
├── manage.py
├── requirements.txt
├── .gitignore
└── README.md
```

---

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

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows Git Bash:

```bash
source venv/Scripts/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
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

Backend:

http://127.0.0.1:8000/

Django Admin:

http://127.0.0.1:8000/admin/

### 3. Set up the React frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Frontend:

http://localhost:5173/

---

## Application URLs

### Frontend

| Route | Description |
|---|---|
| `/` | RUII homepage/blog listing |
| `/blog` | Blog listing |
| `/blog/:slug` | Individual blog article |
| `/career` | Available job vacancies |
| `/career/:slug` | Individual job details |

### Backend API

#### Blog API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health/` | API health check |
| GET | `/api/posts/` | Retrieve published posts |
| GET | `/api/posts/<slug>/` | Retrieve an individual published post |
| GET | `/api/categories/` | Retrieve blog categories |

#### Career API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/career/jobs/` | Retrieve published job vacancies |
| GET | `/api/career/jobs/<slug>/` | Retrieve an individual published vacancy |

---

## Content Management

All content is managed through Django Admin.

### Blog Management

1. Sign in at `/admin/`.
2. Create or manage categories.
3. Create a new post.
4. Add a title, excerpt and article content.
5. Select a category and upload a featured image.
6. Set the post status to **Published** when ready.

Only published posts are returned by the public API.

Article content supports Markdown formatting, including headings, paragraphs, lists, links, tables and blockquotes.

### Career Management

1. Sign in at `/admin/`.
2. Navigate to Jobs.
3. Create a new job vacancy.
4. Add the job title and company.
5. Specify the location and job type.
6. Provide the job description and requirements.
7. Add salary information where applicable.
8. Enter the employer's application email address.
9. Set an application deadline.
10. Change the status to **Published** when ready.

Only published vacancies appear on the public Career platform.

When a visitor clicks **Apply Now**, their default email application opens with the employer's email address and a pre-filled subject. Applicants can then attach their CV and submit their application.

---

## Development Notes

- The Django backend and React frontend run independently during development.
- Both applications share the same Django project and database.
- The frontend communicates with Django through Axios.
- React Router handles frontend navigation.
- Uploaded blog images are served through Django's media configuration during development.
- CORS is configured to allow the local Vite development server.
- Django Admin provides content management for both applications.
- The original RUII website is maintained separately from this platform.
- Environment variables and sensitive configuration should not be committed to GitHub.

---

## Future Improvements

### Blog

- Pagination for blog posts.
- Individual author profiles.
- Related articles.
- SEO metadata and social sharing.
- Improved content editor.

### Career

- Job search functionality.
- Location and job-type filters.
- Job categories and departments.
- Featured job vacancies.
- Job expiry automation.
- Pagination.
- Improved SEO for job listings.

### Platform

- Production deployment configuration.
- Improved security and environment configuration.
- API documentation.
- Automated testing.
- Performance optimisation.

---

## Licence

This project is maintained for **RUII**. All rights reserved unless otherwise stated.