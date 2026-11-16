from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Job
from .serializers import JobSerializer


class JobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Job.objects.filter(
            status='published'
        ).order_by('-created_at')


class JobDetailView(generics.RetrieveAPIView):
    serializer_class = JobSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return Job.objects.filter(status='published')


