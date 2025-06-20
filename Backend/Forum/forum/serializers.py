from rest_framework import serializers
from .models import (
    User,
    Post,
    Comment
)

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
    )

    class Meta:
        model = User
        fields = ['id', 'username','password', 'email', 'avatar', 'bio']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class PostSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only = True)
    like_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'creator', 'title', 'preview_text', 
                 'content', 'created_at', 'liked_by', 'like_count']
        read_only_fields = ['created_at', 'liked_by', 'like_count']

class CommentSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only = True)
    like_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'creator', 'post', 'content', 
                 'created_at', 'liked_by', 'like_count']
        read_only_fields = ['created_at', 'liked_by', 'like_count']
