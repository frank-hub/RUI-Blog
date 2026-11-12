
from django.urls import path
from .api_views import api_health

from .views import (
    PublishedPostListView,
    PostDetailView,
    CategoryListView,
)

urlpatterns = [
    path('posts/', PublishedPostListView.as_view(), name='post-list'),
    path('posts/<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('health/', api_health, name='api-health'),
]
