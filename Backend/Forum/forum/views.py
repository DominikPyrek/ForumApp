from django.shortcuts import render
from rest_framework import generics 
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from .models import User, Post, Comment
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .permissions import IsOwner, IsOwnerOrReadOnly
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from .pagination import FiveOnPage, SixOnPage
from datetime import timedelta
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

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
    pagination_class = SixOnPage


class MyPostsApiView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = FiveOnPage
    def get_queryset(self):
        return Post.objects.filter(creator=self.request.user).select_related('creator').prefetch_related('liked_by')

class PostAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all().select_related('creator')    
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly] 

class CreateCommentAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class CommentsAPIView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        post_id = self.kwargs.get("pk")
        if post_id:
            return Comment.objects.filter(post_id=post_id).select_related("creator", "post")
        return Comment.objects.none()

class CommentAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all().select_related('creator') 
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwner]

class MyCommentsApiView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    def get_queryset(self):
        return Comment.objects.filter(creator=self.request.user).select_related('creator').prefetch_related('liked_by')

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
        try:
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
                    httponly=False,
                    secure=False, 
                    samesite= "Lax",
                    max_age=timedelta(minutes=60),
                    domain=None,
                )

            new_refresh_token = serializer.validated_data.get('refresh')
            if new_refresh_token:
                response.set_cookie(
                    key='refresh_token',
                    value=new_refresh_token,
                    httponly=False,
                    secure=False,
                    samesite= "Lax",
                    max_age=timedelta(days=14),
                    domain=None,
                )

        except TokenError as e:
            return Response(
                {"detail": "Invalid or expired refresh token. Please log in again."},
                status=401
            )
        
        return response

class Logout(APIView):
    def post(self, request):
        response = Response({"detail": "Logged out successfully."}, status=200)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_post_like(request,pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    
    user = request.user
    if user in post.liked_by.all():
        post.liked_by.remove(user)
        return Response({"liked": False, "like_count": post.like_count})
    else:
        post.liked_by.add(user)
        return Response({"liked": True, "like_count": post.like_count})

from .models import Comment

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_comment_like(request, pk):
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return Response({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if user in comment.liked_by.all():
        comment.liked_by.remove(user)
        return Response({"liked": False, "like_count": comment.like_count})
    else:
        comment.liked_by.add(user)
        return Response({"liked": True, "like_count": comment.like_count})
