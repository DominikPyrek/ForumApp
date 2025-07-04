from rest_framework import permissions
from .models import User

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        if isinstance(obj, User):
            return obj == request.user

        if hasattr(obj, 'creator'):
            return obj.creator == request.user

        return False

class IsOwnerOrReadOnly(permissions.BasePermission):
     def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.creator == request.user