from django.shortcuts import render
from rest_framework import generics 
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from .models import User, Post, Comment
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import IsOwner
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from datetime import timedelta

class CreateUserAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwner]
        
class CreatePostAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class PostsAPIView(generics.ListAPIView):
    queryset = Post.objects.all().select_related('creator').prefetch_related('liked_by')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated] 

class PostAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all().select_related('creator')    
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsOwner] 

class CreateCommentAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class CommentsAPIView(generics.ListAPIView):
    queryset = Comment.objects.all().select_related('creator', 'post')
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated] 

class CommentAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all().select_related('creator') 
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwner] 

class CookieTokenObtainView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):

        response = super().post(request, *args, **kwargs)
        
        access_token = response.data.get('access')
        refresh_token = response.data.get('refresh')
        
        if access_token:
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=timedelta(minutes=60),
            )
        if refresh_token:
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=timedelta(days=14),
            )
        
        return response

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        data = request.data.copy()
        if refresh_token:
            data['refresh'] = refresh_token
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        response = Response(serializer.validated_data, status=200)
        
        new_access_token = serializer.validated_data.get('access')
        if new_access_token:
            response.set_cookie(
                key='access_token',
                value=new_access_token,
                httponly=True,
                secure=False, 
                samesite='Lax',
                max_age=timedelta(minutes=60),
            )

        new_refresh_token = serializer.validated_data.get('refresh')
        if new_refresh_token:
            response.set_cookie(
                key='refresh_token',
                value=new_refresh_token,
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=timedelta(days=14),
            )
        
        return response