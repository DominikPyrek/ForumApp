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
        if refresh_token:
            request.data['refresh'] = refresh_token
        
        return super().post(request, *args, **kwargs)