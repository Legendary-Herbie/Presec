from rest_framework import serializers
from .models import Subject, Resource, Announcement, StudyPlan, Page

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    resources = ResourceSerializer(many=True, read_only=True)
    class Meta:
        model = Subject
        fields = '__all__'

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

class StudyPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyPlan
        fields = '__all__'
        read_only_fields = ('user',)

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = '__all__'
