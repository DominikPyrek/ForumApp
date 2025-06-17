from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Post, Comment

User = get_user_model()

class BaseTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user1 = User.objects.create_user(
            username='user1',
            email='user1@example.com',
            password='password123'
        )
        cls.user2 = User.objects.create_user(
            username='user2',
            email='user2@example.com',
            password='password123'
        )
        cls.post = Post.objects.create(
            creator=cls.user1,
            title='Test Post',
            preview_text='Preview',
            content='Test content'
        )
        cls.comment = Comment.objects.create(
            creator=cls.user1,
            post=cls.post,
            content='Test comment'
        )

    def setUp(self):
        Comment.objects.exclude(id=self.comment.id).delete()
        Post.objects.exclude(id=self.post.id).delete()
        User.objects.exclude(id__in=[self.user1.id, self.user2.id]).delete()

class UserAPITests(BaseTestCase):
    def test_user_registration(self):
        url = reverse('user-create')
        data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'newpass123',
            'bio': 'New user bio'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 3)
        self.assertNotIn('password', response.data)

    def test_retrieve_own_profile(self):
        url = reverse('user-detail', kwargs={'pk': self.user1.pk})
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'user1')

    def test_cannot_retrieve_other_profile(self):
        url = reverse('user-detail', kwargs={'pk': self.user2.pk})
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class PostAPITests(BaseTestCase):
    def test_create_post(self):
        url = reverse('post-create')
        self.client.force_authenticate(user=self.user1)
        data = {
            'title': 'New Post',
            'preview_text': 'New preview',
            'content': 'New content'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 2)
        self.assertEqual(response.data['creator']['username'], 'user1')

    def test_list_posts(self):
        url = reverse('post-list')
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertIn('count', response.data)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], 'Test Post')
        self.assertEqual(response.data['count'], 1)
    

    def test_retrieve_post(self):
        url = reverse('post-detail', kwargs={'pk': self.post.pk})
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Post')

    def test_update_own_post(self):
        url = reverse('post-detail', kwargs={'pk': self.post.pk})
        self.client.force_authenticate(user=self.user1)
        data = {'title': 'Updated title'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.post.refresh_from_db()
        self.assertEqual(self.post.title, 'Updated title')

    def test_cannot_update_others_post(self):
        url = reverse('post-detail', kwargs={'pk': self.post.pk})
        self.client.force_authenticate(user=self.user2)
        data = {'title': 'Hacked title'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class CommentAPITests(BaseTestCase):
    def test_create_comment(self):
        url = reverse('comment-create')
        self.client.force_authenticate(user=self.user1)
        data = {
            'post': self.post.pk,
            'content': 'New comment'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 2)
        self.assertEqual(response.data['creator']['username'], 'user1')

    def test_list_comments(self):
        url = reverse('comment-list')
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['content'], 'Test comment')
        self.assertEqual(response.data['count'], 1)

    def test_retrieve_comment(self):
        url = reverse('comment-detail', kwargs={'pk': self.comment.pk})
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], 'Test comment')

    def test_update_own_comment(self):
        url = reverse('comment-detail', kwargs={'pk': self.comment.pk})
        self.client.force_authenticate(user=self.user1)
        data = {'content': 'Updated comment'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.comment.refresh_from_db()
        self.assertEqual(self.comment.content, 'Updated comment')

    def test_cannot_update_others_comment(self):
        url = reverse('comment-detail', kwargs={'pk': self.comment.pk})
        self.client.force_authenticate(user=self.user2)
        data = {'content': 'Hacked comment'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class LikeTests(BaseTestCase):
    def test_like_post(self):
        self.client.force_authenticate(user=self.user1)
        self.post.liked_by.add(self.user1)
        self.assertEqual(self.post.like_count, 1)

    def test_like_comment(self):
        self.client.force_authenticate(user=self.user1)
        self.comment.liked_by.add(self.user1)
        self.assertEqual(self.comment.like_count, 1)