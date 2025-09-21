from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    date_joined = models.DateTimeField(auto_now_add=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.username

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=20, unique=True)
    class_name = models.CharField(max_length=25)
    date_of_birth = models.DateField()
    profile_pic = models.ImageField(upload_to='student_pics/', blank=True, null=True)
    address = models.TextField()
    phone = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.user.username} - {self.student_id}"
    
class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    teacher_id = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    profile_pic = models.ImageField(upload_to='teacher_pics/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.department}"

class Resources(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    resource_file = models.FileField(upload_to='resources/')
    description = models.TextField()
    title = models.CharField(max_length=200)
    uploaded_by = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)

    def __str__(self):
        return self.title
class Notice(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    posted_by = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
class Result(models.Model):
    TERM_CHOICES = (
        ('term1', 'First Term'),
        ('term2', 'Second Term'),
        ('term3', 'Third Term'),
    )

    student = models.ForeignKey('Student', on_delete=models.CASCADE)  # Link to the student
    subject = models.CharField(max_length=100)
    semester = models.CharField(max_length=10, choices=TERM_CHOICES)
    recorded_at = models.DateTimeField(auto_now_add=True)
    exam_score = models.FloatField()
    class_score = models.FloatField()
    total_marks = models.FloatField()
    exam_date = models.DateField()

    def __str__(self):
        return f"{self.student.user.username} - {self.subject}"

class Event(models.Model):
    EVENT_TYPES = (
        ('event', 'Event'),
        ('announcement', 'Announcement'),
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES, default='event')
    date = models.DateTimeField()  # Date and time of the event or announcement
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # Teacher or Admin

    def __str__(self):
        return f"{self.title} ({self.event_type})"

class Resource(models.Model):
    RESOURCE_TYPES = (
        ('pdf', 'PDF Document'),
        ('video', 'Video'),
        ('link', 'External Link'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    resource_type = models.CharField(max_length=10, choices=RESOURCE_TYPES, default='pdf')
    file = models.FileField(upload_to='resources/', blank=True, null=True)  # For PDFs or video files
    external_link = models.URLField(blank=True, null=True)  # For YouTube or other links
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # Teacher or Admin

    def __str__(self):
        return self.title
