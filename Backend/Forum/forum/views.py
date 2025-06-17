from django.shortcuts import render
from rest_framework import generics 
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from .models import User, Post, Comment
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import IsOwner

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
