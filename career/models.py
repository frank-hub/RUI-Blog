from django.db import models

class Job(models.Model):

    JOB_TYPES = [
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
        ('temporary', 'Temporary'),
    ]

    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('closed', 'Closed'),
    ]



    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True ,blank=True)

    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)

    job_type = models.CharField(max_length=20, choices=JOB_TYPES,default='full_time')

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')

    description = models.TextField()
    requirements = models.TextField(blank=True)

    salary = models.CharField(max_length=100, blank=True)
    application_email = models.EmailField(blank=True ,default='careers@ruiinternet.co.ke')

    deadline = models.DateField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.title.lower().replace(' ', '-')
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} at {self.company}"

