from django.contrib import admin
from .models import Job
# Register your models here.

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'company',
        'location',
        'job_type',
        'status',
        'deadline',
        'created_at',
    )
    list_editable = ('status',)


    list_filter = ('status','job_type','location')
    search_fields = ('title','company','location')
    prepopulated_fields = {'slug':('title',)}
    readonly_fields = ('created_at','updated_at')

    ordering = ('-created_at',)
    date_hierarchy = 'created_at'


