from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator

class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', blank=True, validators=[FileExtensionValidator(['jpg', 'png'])])
    bio = models.TextField(blank=True)

    def __str__(self):
        return f"{self.username} ({self.email})"

class Post(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=60)
    preview_text = models.CharField(max_length=200)
    content = models.TextField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)
    liked_by = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"'{self.title[:20]}...' by {self.creator.username}"
    
    @property
    def like_count(self):
        return self.liked_by.count()

class Comment(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=1000)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    liked_by = models.ManyToManyField(User, related_name='liked_comments', blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.creator.username} on post #{self.post.id}"
    
    @property
    def like_count(self):
        return self.liked_by.count()
