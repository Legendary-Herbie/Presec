from django.urls import path
from .views import RegisterView,ProfileView, StudentListView, StudentCreateView, EventListView, EventCreateView, TeacherListView, TeacherCreateView, ResourceListView, ResourceCreateView, ResultListView, ResultCreateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('api/', lambda request: None, name='api-root'),  # Placeholder for API root
    path('students/', StudentListView.as_view(), name='student-list'),
    path('students/create/', StudentCreateView.as_view(), name='student-create'),
    path('resources/', ResourceListView.as_view(), name='resource-list'),
    path('resources/create/', ResourceCreateView.as_view(), name='resource-create'),
    path('results/', ResultListView.as_view(), name='result-list'),
    path('results/create/', ResultCreateView.as_view(), name='result-create'),
    path('events/', EventListView.as_view(), name='event-list'),
    path('events/create/', EventCreateView.as_view(), name='event-create'),
    path('teachers/', TeacherListView.as_view(), name='teacher-list'),
    path('teachers/create/', TeacherCreateView.as_view(), name='teacher-create'),
]
