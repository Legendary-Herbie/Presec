from django.contrib import admin
from .models import Student, Teacher, Event, Resource, Result, Notice

# Register all models
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Event)
admin.site.register(Resource)
admin.site.register(Result)
admin.site.register(Notice)
admin.site.site_header = "Presec Admin"
admin.site.site_title = "Presec Admin Portal"
admin.site.index_title = "Welcome to Presec Admin Portal"
