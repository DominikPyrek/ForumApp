# ForumApp

A modern forum application built for community discussions and user engagement.

## 📖 About

ForumApp is a full-stack discussion platform that brings communities together. Built with React and Django, it provides a modern, responsive space for users to share ideas, engage in conversations, and build connections through posts, comments, and interactive features.

Perfect for building online communities, support forums, or discussion boards around any topic or interest.

## 🚀 Features

- **User Authentication**: Secure user registration and login system
- **Discussion Forums**: Create and participate in discussions
- **Post Management**: Create, edit, and delete posts
- **Comment System**: Add, edit, and delete comments on posts
- **Responsive Design**: Mobile-friendly interface
- **Like System**: Like and unlike posts and comments to show engagement

## 🛠️ Technology Stack

- **Frontend**: React.js
- **Backend**: Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT Token Authentication with HTTP-only cookies
- **Styling**: Tailwind CSS with shadcn/ui components

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Python](https://www.python.org/) (version 3.8 or higher)
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [pip](https://pip.pypa.io/en/stable/) (Python package manager)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/DominikPyrek/ForumApp.git
   cd ForumApp
   ```

2. **Backend Setup (Django)**

   ```bash
   # Create virtual environment
   python -m venv venv

   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate

   # Install Python dependencies
   pip install -r requirements.txt
   ```

3. **Frontend Setup (React)**

   ```bash
   # Navigate to frontend directory (if separate)
   cd frontend

   # Install Node.js dependencies
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the Django root directory:

   ```env
   SECRET_KEY=your_secret_key_here
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   DB_NAME=forum_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

5. **Set up the database**

   ```bash
   # Run migrations
   python manage.py makemigrations
   python manage.py migrate

   # Create superuser (optional)
   python manage.py createsuperuser
   ```

6. **Start the development servers**

   **Backend (Django):**

   ```bash
   python manage.py runserver
   ```

   Django API will be available at `http://localhost:8000`

   **Frontend (React):**

   ```bash
   # In a new terminal, navigate to frontend directory
   cd frontend
   npm start
   ```

   React app will be available at `http://localhost:3000`

## 🚀 Usage

### For Users

1. **Register**: Create a new account with email and password
2. **Login**: Access your account to start participating
3. **Browse Forums**: Explore different posts
4. **Create Posts**: Start new discussions
5. **Reply**: Engage with other users through replies and comments
6. **Profile**: Customize your profile and track your activity

## 📸 Screenshots

## 🚀 Deployment

### Using Docker

```bash
# Build and run with Docker Compose
docker compose up --build

# Or build individual containers
docker build -t forum-app-backend ./backend
docker build -t forum-app-frontend ./frontend
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

**Base URL:** `http://localhost:8000/api/`

### Authentication Endpoints

- `POST /token/` - Obtain JWT token pair
- `POST /token/refresh/` - Refresh JWT token
- `POST /logout/` - User logout

### User Endpoints

- `POST /users/` - Create new user (registration)
- `GET /users/<int:pk>/` - Get specific user details
- `GET /users/me/` - Get current user info

### Post Endpoints

- `GET /posts/list/` - Get all posts
- `POST /posts/` - Create new post
- `GET /posts/<int:pk>/` - Get specific post details
- `PUT /posts/<int:pk>/` - Update post
- `DELETE /posts/<int:pk>/` - Delete post
- `GET /posts/my/` - Get current user's posts

### Comment Endpoints

- `POST /comments/` - Create new comment
- `GET /comments/<int:pk>/` - Get specific comment details
- `PUT /comments/<int:pk>/` - Update comment
- `DELETE /comments/<int:pk>/` - Delete comment
- `GET /comments/list/<int:pk>/` - Get comments for a specific post
- `GET /comments/my/` - Get current user's comments

### Like Endpoints

- `POST /posts/<int:pk>/like/` - Toggle like on post
- `POST /comments/<int:pk>/like/` - Toggle like on comment

## 🔒 Security

- Input validation and sanitization
- XSS protection
- CSRF protection
- SQL injection prevention
- Secure password hashing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- **Dominik Pyrek** - _Initial work_ - [DominikPyrek](https://github.com/DominikPyrek)

## 📞 Support

If you have any questions or need help with setup, please:

- Open an issue on GitHub
- Contact: [pyrekdominik2025@gmail.com]

## 🔄 Changelog

### v1.0.0

- Initial release
- Basic forum functionality
- User authentication
- Post creation and management

---
