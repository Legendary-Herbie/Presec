from django.contrib import admin
from .models import Student, Teacher, Event, Resources, Result

# Register all models
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Event)
admin.site.register(Resources)
admin.site.register(Result)
admin.site.site_header = "Presec Admin"
admin.site.site_title = "Presec Admin Portal"
admin.site.index_title = "Welcome to Presec Admin Portal"
