from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SubjectViewSet, ResourceViewSet, AnnouncementViewSet, StudyPlanViewSet, PageViewSet

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'announcements', AnnouncementViewSet)
router.register(r'study-plans', StudyPlanViewSet, basename='study-plan')
router.register(r'pages', PageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
