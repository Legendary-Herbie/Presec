from django.shortcuts import render
from rest_framework import generics, status
from .models import Student, Teacher, Event, Resources, Result
from .serializers import StudentSerializer, TeacherSerializer, ResourcesSerializer, ResultSerializer, EventSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
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
        data = {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_staff": user.is_staff,
            "role": "admin" if user.is_staff else "student"
        }
        
        if hasattr(user, 'student'):
            student = user.student
            data["student_info"] = StudentSerializer(student).data
            data["role"] = "student"
        elif hasattr(user, 'teacher'):
            teacher = user.teacher
            data["teacher_info"] = TeacherSerializer(teacher).data
            data["role"] = "teacher"
            
        return Response(data)

    def put(self, request):
        user = request.user
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.email = request.data.get('email', user.email)
        user.save()
        
        if hasattr(user, 'student'):
            serializer = StudentSerializer(user.student, data=request.data.get('student_info', {}), partial=True)
            if serializer.is_valid():
                serializer.save()
        elif hasattr(user, 'teacher'):
            serializer = TeacherSerializer(user.teacher, data=request.data.get('teacher_info', {}), partial=True)
            if serializer.is_valid():
                serializer.save()
                
        return self.get(request)

class EventListView(generics.ListAPIView):
    queryset = Event.objects.all().order_by('-date')
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

class EventCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class StudentListView(generics.ListAPIView):
    queryset = Student.objects.all().order_by('student_id')
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TeacherListView(generics.ListAPIView):
    queryset = Teacher.objects.all().order_by('department', 'id')
    serializer_class = TeacherSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class TeacherCreateView(generics.CreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ResourceListView(generics.ListAPIView):
    queryset = Resources.objects.all().order_by('-uploaded_at')
    serializer_class = ResourcesSerializer
    permission_classes = [IsAuthenticated]

class ResourceCreateView(generics.CreateAPIView):
    queryset = Resources.objects.all()
    serializer_class = ResourcesSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

class ResultListView(generics.ListAPIView):
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'student'):
            return Result.objects.filter(student=user.student).order_by('-recorded_at')
        elif hasattr(user, 'teacher') or user.is_staff:
            return Result.objects.all().order_by('student__student_id', 'subject')
        return Result.objects.none()

class ResultCreateView(generics.CreateAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]