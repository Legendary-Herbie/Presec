from django.db import models
from django.contrib.auth.models import User

class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Resource(models.Model):
    RESOURCE_TYPES = (
        ('pdf', 'PDF Document'),
        ('link', 'External Link'),
        ('video', 'Video'),
    )
    title = models.CharField(max_length=200)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='resources')
    resource_type = models.CharField(max_length=10, choices=RESOURCE_TYPES)
    file = models.FileField(upload_to='resources/', blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject.name} - {self.title}"

class Announcement(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    is_important = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class StudyPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='study_plans')
    subject = models.CharField(max_length=100)
    goal = models.CharField(max_length=255)
    days_per_week = models.IntegerField(default=5)
    hours_per_day = models.IntegerField(default=4)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s {self.subject} Plan"

class Page(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
