from django.urls import path
from .views import (
    CreateUserAPIView,
    UserAPIView,
    CreatePostAPIView,
    PostAPIView,
    MyPostsApiView,
    PostsAPIView,
    CreateCommentAPIView,
    CommentAPIView,
    CommentsAPIView,
    CookieTokenObtainView,
    CookieTokenRefreshView,
    Logout
)


urlpatterns = [
    #User
    path('users/', CreateUserAPIView.as_view(),  name='user-create'),
    path('users/<int:pk>', UserAPIView.as_view(), name='user-detail'),
    #Post
    path('posts/', CreatePostAPIView.as_view(), name='post-create'),
    path('posts/my/', MyPostsApiView.as_view(), name='users-posts'),
    path('posts/<int:pk>/', PostAPIView.as_view(), name='post-detail'),
    path('posts/list/', PostsAPIView.as_view(), name='post-list'),
    #Comment
    path('comments/', CreateCommentAPIView.as_view(), name='comment-create'),
    path('comments/<int:pk>/', CommentAPIView.as_view(), name='comment-detail'),
    path('comments/list/', CommentsAPIView.as_view(), name='comment-list-user'),
    #Tokens
    path('token/', CookieTokenObtainView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', Logout.as_view())
]