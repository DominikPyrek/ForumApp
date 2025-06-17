from django.urls import path
from .views import (
    CreateUserAPIView,
    UserAPIView,
    CreatePostAPIView,
    PostAPIView,
    PostsAPIView,
    CreateCommentAPIView,
    CommentAPIView,
    CommentsAPIView
)


urlpatterns = [
    #User
    path('users/', CreateUserAPIView.as_view(),  name='user-create'),
    path('users/<int:pk>', UserAPIView.as_view(), name='user-detail'),
    #Post
    path('posts/', CreatePostAPIView.as_view(), name='post-create'),
    path('posts/<int:pk>/', PostAPIView.as_view(), name='post-detail'),
    path('posts/list/', PostsAPIView.as_view(), name='post-list'),
    #Comment
    path('comments/', CreateCommentAPIView.as_view(), name='comment-create'),
    path('comments/<int:pk>/', CommentAPIView.as_view(), name='comment-detail'),
    path('comments/list/', CommentsAPIView.as_view(), name='comment-list'),
]