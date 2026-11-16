from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'slug',
            'company',
            'location',
            'job_type',
            'description',
            'requirements',
            'salary',
            'application_email',
            'deadline',
            'status',
            'created_at',
            'updated_at',
        ]


        