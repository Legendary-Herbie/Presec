from django.contrib import admin
from .models import Subject, Resource, Announcement, StudyPlan, Page

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'resource_type', 'created_at')
    list_filter = ('subject', 'resource_type')

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_important', 'created_at')

@admin.register(StudyPlan)
class StudyPlanAdmin(admin.ModelAdmin):
    list_display = ('user', 'subject', 'start_date', 'end_date')
    list_filter = ('user',)

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_published', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
