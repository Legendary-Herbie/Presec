from django.shortcuts import render
from rest_framework import generics
from .models import Event
from .serializers import EventSerializer

class EventListView(generics.ListAPIView):
    queryset = Event.objects.all().order_by('-date')  # Latest events first
    serializer_class = EventSerializer

