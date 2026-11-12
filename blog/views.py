from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Post, Category
from .serializers import PostSerializer, CategorySerializer


class PublishedPostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Post.objects.filter(
            status='published'
        ).select_related(
            'author',
            'category'
        ).order_by('-published_at', '-created_at')


class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return Post.objects.filter(status='published')


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
