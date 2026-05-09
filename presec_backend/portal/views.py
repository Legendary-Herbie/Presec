from rest_framework import viewsets, permissions
from .models import Subject, Resource, Announcement, StudyPlan, Page
from .serializers import SubjectSerializer, ResourceSerializer, AnnouncementSerializer, StudyPlanSerializer, PageSerializer

class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticated]

class AnnouncementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]

class StudyPlanViewSet(viewsets.ModelViewSet):
    serializer_class = StudyPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StudyPlan.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Page.objects.filter(is_published=True)
    serializer_class = PageSerializer
    lookup_field = 'slug'
