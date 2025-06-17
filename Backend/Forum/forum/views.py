from django.shortcuts import render
from rest_framework import generics 
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from .models import User, Post, Comment
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwner

class CreateUserAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwner]
        
class CreatePostAPIView(generics.CreateAPIView):
    queryset = Post.objects.all
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class PostsAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated] 
    queryset = Post.objects.all().select_related('creator').prefetch_related('liked_by')
    serializer_class = PostSerializer

class PostAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsOwner] 
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CreateCommentAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class CommentsAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated] 
    queryset = Comment.objects.all().select_related('creator', 'post')
    serializer_class = CommentSerializer

class CommentAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsOwner] 
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
