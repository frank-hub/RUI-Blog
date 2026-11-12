from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100 ,unique=True)
    description = models.SlugField( unique=True)
    slug = models.TextField(unique=True)

    created_at = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categopries"
        ordering = ['name']


    def __str__(self):
        return self.name


class Post(models.Model):

    STATUS_CHOICE = [
        ('draft','Draft'),
        ('published','Published'),
    ]

    title = models.CharField(max_length=255 ,unique=True)
    slug = models.SlugField(unique=True)
    excerpt =models.TextField(max_length=500, blank=True)
    content = models.TextField()


    featured_image = models.ImageField(
        upload_to='blog/featured',
        blank=True,
        null=True
    )

    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='blog_posts'
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='posts'
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICE,
        default='draft'
    )

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now_add=True)
    published_at = models.DateField(auto_now_add=True , null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title