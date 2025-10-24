from django.shortcuts import render
from rest_framework import generics
from .models import Student, Teacher, Event, Resources, Result
from .serializers import StudentSerializer, TeacherSerializer, ResourcesSerializer, ResultSerializer, EventSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
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
        return Response({
            "username": request.user.username,
            "email": request.user.email
        })

class EventListView(generics.ListAPIView):
    queryset = Event.objects.all().order_by('-date')  # Latest events first
    serializer_class = EventSerializer

class EventCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class StudentListView(generics.ListAPIView):
    queryset = Student.objects.all().order_by('student_id')
    serializer_class = StudentSerializer


class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TeacherListView(generics.ListAPIView):
    queryset = Teacher.objects.all().order_by('department', 'id')
    serializer_class = TeacherSerializer

class TeacherCreateView(generics.CreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ResourceListView(generics.ListAPIView):
    queryset = Resources.objects.all().order_by('-uploaded_at')  # Latest resources first
    serializer_class = ResourcesSerializer

class ResourceCreateView(generics.CreateAPIView):
    queryset = Resources.objects.all()
    serializer_class = ResourcesSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

class ResultListView(generics.ListAPIView):
    queryset = Result.objects.all().order_by('student__student_id', 'subject')
    serializer_class = ResultSerializer

class ResultCreateView(generics.CreateAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    read_only_fields = ['id']
    permission_classes = [IsAuthenticated]