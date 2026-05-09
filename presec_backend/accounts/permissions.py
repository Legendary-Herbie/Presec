from rest_framework import permissions

class IsTeacherOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow teachers or admins to edit/create objects.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated

        # Check if user is staff (admin)
        if request.user and request.user.is_staff:
            return True

        # Check if user is a teacher
        return request.user and hasattr(request.user, 'teacher')
