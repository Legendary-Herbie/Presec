from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import Student, Teacher, Event, Resources, Result
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['user', 'student_id', 'class_name', 'date_of_birth', 'profile_pic', 'address']
        read_only_fields = ['user']

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['teacher_id', 'user', 'department', 'profile_pic', 'phone']
        read_only_fields = ['user']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        # Event model does not have a `location` field; keep fields that exist
        fields = ['id', 'title', 'description', 'event_type', 'date', 'created_at', 'updated_at', 'created_by']
        read_only_fields = ['id']

class ResourcesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resources
        fields = ['id', 'subject', 'title', 'description', 'resource_type', 'resource_file', 'external_link', 'uploaded_at', 'uploaded_by']
        read_only_fields = ['id']

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['id', 'student', 'subject', 'semester', 'recorded_at', 'exam_score', 'class_score', 'total_marks', 'exam_date']
        read_only_fields = ['id']