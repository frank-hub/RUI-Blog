
from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html

from .models import Category, Post


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'author',
        'category',
        'status',
        'published_at',
    )

    list_filter = (
        'status',
        'category',
        'created_at',
    )

    search_fields = (
        'title',
        'excerpt',
        'content',
    )

    prepopulated_fields = {
        'slug': ('title',)
    }

    list_editable = ('status',)

    date_hierarchy = 'created_at'

    ordering = ('-created_at',)

    list_per_page = 20

    save_on_top = True

    readonly_fields = (
        'created_at',
        'updated_at',
        'featured_image_preview',
    )

    fieldsets = (
        ('Article Information', {
            'fields': (
                'title',
                'slug',
                'excerpt',
                'content',
            )
        }),
        ('Featured Image', {
            'fields': (
                'featured_image',
                'featured_image_preview',
            )
        }),
        ('Organisation', {
            'fields': (
                'author',
                'category',
                'status',
            )
        }),
        ('Timestamps', {
            'classes': ('collapse',),
            'fields': (
                'created_at',
                'updated_at',
            )
        }),
    )

    formfield_overrides = {
        Post.content.field: {
            'widget': admin.widgets.AdminTextareaWidget(
                attrs={'rows': 30, 'cols': 100}
            )
        }
    }

    def featured_image_preview(self, obj):
        if obj.featured_image:
            return format_html(
                '<img src="{}" style="max-height:200px; max-width:300px;" />',
                obj.featured_image.url
            )

        return 'No image uploaded'

    featured_image_preview.short_description = 'Image Preview'

    def save_model(self, request, obj, form, change):
        if not obj.author_id:
            obj.author = request.user

        if obj.status == 'published' and not obj.published_at:
            obj.published_at = timezone.now()

        super().save_model(request, obj, form, change)
