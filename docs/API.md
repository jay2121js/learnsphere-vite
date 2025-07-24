# API Integration Guide

This document describes how LearnSphere integrates with the backend API and provides guidance for developers working with the API endpoints.

## 📋 Table of Contents

- [Overview](#overview)
- [Environment Configuration](#environment-configuration)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Example Usage](#example-usage)

## 🌐 Overview

LearnSphere frontend communicates with a REST API backend to manage courses, users, authentication, and content delivery. The API base URL is configured through environment variables.

### Base Configuration

```javascript
const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;
```

## ⚙️ Environment Configuration

### Required Environment Variables

Set these in your `.env` file:

```env
# Backend API base URL
VITE_BACKEND_URI=http://localhost:8080/api

# Google OAuth configuration
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
VITE_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
```

### Development vs Production

**Development:**
- API usually runs on `http://localhost:8080/api`
- CORS should be configured to allow `http://localhost:3000`

**Production:**
- Use HTTPS endpoints
- Configure proper CORS policies
- Implement rate limiting and security measures

## 🔐 Authentication

### Google OAuth Flow

1. **Frontend initiates OAuth** with Google
2. **User authorizes** application
3. **Google redirects** to `VITE_GOOGLE_REDIRECT_URI`
4. **Frontend exchanges** authorization code for tokens
5. **Backend validates** and creates session

### Session Management

The application uses cookies for session management:

```javascript
// Cookie service handles authentication state
import cookieService from '../Services/cookieService.js';

// Check if user is authenticated
const isAuthenticated = cookieService.isAuthenticated();
```

## 📡 API Endpoints

### Course Management

#### Get Course Details
```
GET /Public/course/{courseId}
```

**Response:**
```json
{
  "id": 1,
  "title": "React Fundamentals",
  "description": "Learn React from scratch",
  "instructor": "John Doe",
  "duration": "4 hours",
  "level": "Beginner",
  "category": "Web Development",
  "thumbnailUrl": "https://example.com/thumbnail.jpg",
  "videoUrl": "https://example.com/video.mp4",
  "price": 99.99,
  "rating": 4.8,
  "enrollmentCount": 1250
}
```

#### Get All Courses
```
GET /courses
```

**Query Parameters:**
- `category` (optional) - Filter by category
- `level` (optional) - Filter by difficulty level
- `search` (optional) - Search term

**Response:**
```json
{
  "courses": [
    {
      "id": 1,
      "title": "Course Title",
      "description": "Course description"
    }
  ],
  "totalCount": 50,
  "page": 1,
  "pageSize": 20
}
```

#### Course Enrollment
```
POST /course/enroll/{courseId}
```

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully enrolled in course",
  "enrollmentId": 123
}
```

### User Management

#### Get User Profile
```
GET /user/profile
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "profilePicture": "https://example.com/profile.jpg",
  "enrolledCourses": [1, 2, 3],
  "completedCourses": [1],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Course Authorization

#### Check Course Ownership
```
GET /Public/AuthCourseInstructor?id={courseId}&username={email}
```

**Response:**
```json
true  // if user owns the course
false // if user doesn't own the course
```

## 🚨 Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid course ID format",
  "details": {
    "field": "courseId",
    "value": "invalid-id"
  }
}
```

#### 401 Unauthorized
```json
{
  "error": "UNAUTHORIZED",
  "message": "Authentication required"
}
```

#### 404 Not Found
```json
{
  "error": "NOT_FOUND",
  "message": "Course not found"
}
```

### Frontend Error Handling

```javascript
const courseService = {
  getCourse: async (courseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Public/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 404:
            throw new Error('Course not found');
          case 403:
            throw new Error('Access denied to this course');
          case 500:
            throw new Error('Server error. Please try again later.');
          default:
            throw new Error(data.message || 'An error occurred');
        }
      } else if (error.request) {
        throw new Error('Network error. Please check your connection.');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }
};
```

## 💡 Example Usage

### Course Service Implementation

```javascript
// src/Services/courseService.jsx
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

const courseService = {
  // Get single course
  getCourse: async (courseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Public/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      throw new Error('Failed to load course data. Please try again.');
    }
  },

  // Check course ownership
  checkCourseOwnership: async (courseId, email) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/Public/AuthCourseInstructor?id=${courseId}&username=${encodeURIComponent(email)}`,
        { withCredentials: true }
      );
      return response.data === true;
    } catch (error) {
      console.error(`Error checking ownership for course ${courseId}:`, error);
      return false;
    }
  },

  // Enroll in course
  enrollCourse: async (courseId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/course/enroll/${courseId}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(`Error enrolling in course ${courseId}:`, error);
      throw new Error('Failed to enroll in course. Please try again.');
    }
  }
};

export default courseService;
```

## 🔧 Development Tips

### API Testing

1. **Use browser dev tools** to inspect network requests
2. **Test with Postman** or similar tools for API development
3. **Mock API responses** during development if backend is not ready

### Debugging

1. **Enable detailed logging** in development
2. **Check browser console** for detailed error messages
3. **Verify environment variables** are loaded correctly

### Performance Optimization

1. **Implement caching** for frequently accessed data
2. **Use pagination** for large data sets
3. **Implement loading states** for better UX
4. **Debounce search requests** to reduce API calls

## 🔗 Related Documentation

- [Environment Setup Guide](../README.md#environment-configuration)
- [Contributing Guidelines](../CONTRIBUTING.md)

---

This guide should help you understand and work with the LearnSphere API integration. For questions or issues, please refer to the contributing guidelines or open an issue on GitHub.