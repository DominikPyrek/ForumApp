from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar', 'bio']

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
