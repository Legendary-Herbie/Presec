from django.shortcuts import render
from rest_framework import generics
from .models import Student, Teacher, Event, Resources, Result
from .serializers import StudentSerializer, TeacherSerializer, ResourcesSerializer, ResultSerializer, EventSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsTeacherOrAdmin
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response



User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = 'admin'
        profile_data = None

        try:
            student = Student.objects.get(user=user)
            role = 'student'
            profile_data = StudentSerializer(student).data
        except Student.DoesNotExist:
            try:
                teacher = Teacher.objects.get(user=user)
                role = 'teacher'
                profile_data = TeacherSerializer(teacher).data
            except Teacher.DoesNotExist:
                if user.is_staff or user.is_superuser:
                    role = 'admin'
                else:
                    role = 'user'

        return Response({
            "username": user.username,
            "email": user.email,
            "role": role,
            "profile": profile_data
        })

class EventListView(generics.ListAPIView):
    queryset = Event.objects.all().order_by('-date')  # Latest events first
    serializer_class = EventSerializer

class EventCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsTeacherOrAdmin]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class StudentListView(generics.ListAPIView):
    queryset = Student.objects.all().order_by('student_id')
    serializer_class = StudentSerializer


class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated, IsTeacherOrAdmin]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TeacherListView(generics.ListAPIView):
    queryset = Teacher.objects.all().order_by('department', 'id')
    serializer_class = TeacherSerializer

class TeacherCreateView(generics.CreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAuthenticated, IsTeacherOrAdmin]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ResourceListView(generics.ListAPIView):
    serializer_class = ResourcesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # For simplicity, students and staff see all resources for now,
        # but we could filter by subject if needed.
        return Resources.objects.all().order_by('-uploaded_at')

class ResourceCreateView(generics.CreateAPIView):
    queryset = Resources.objects.all()
    serializer_class = ResourcesSerializer
    permission_classes = [IsAuthenticated, IsTeacherOrAdmin]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

class ResultListView(generics.ListAPIView):
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            student = Student.objects.get(user=user)
            return Result.objects.filter(student=student).order_by('subject')
        except Student.DoesNotExist:
            if user.is_staff or user.is_superuser:
                return Result.objects.all().order_by('student__student_id', 'subject')
            return Result.objects.none()

class ResultCreateView(generics.CreateAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated, IsTeacherOrAdmin]

    def perform_create(self, serializer):
        # We might want to add more validation here to ensure only staff can create results
        serializer.save()