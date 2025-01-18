# API Documentation

This document provides detailed information about the available API endpoints for creating and retrieving posts.

## Base URL
The base URL for the API is:https://idea-usher-assignment.onrender.com


## POST /post

### Description:
This endpoint allows you to create a new post. You can upload an image, specify a title, description, author, tags, and the creation date of the post.

### Request
- **Method**: `POST`
- **Endpoint**: `/post`
- **Body**: `multipart/form-data`
- **Required Fields**:
  - `image`: The image to be uploaded (binary data).
  - `data`: A JSON string containing the post details (title, description, author, tags, and createdAt).

#### Example Request Body:
- `image`: (Binary image file)
- `data`: 
  ```json
  {
    "title": "My First Post",
    "description": "This is a sample post with an image.",
    "author": "John Doe",
    "tags": ["Tech", "Programming"],
    "createdAt": "2025-01-01T00:00:00Z"
  }

  
## GET /post

### Description:
This endpoint retrieves a list of posts. It supports filtering, sorting, and pagination based on various query parameters.

### Request
- **Method**: `GET`
- **Endpoint**: `/post`
- **Query Parameters**:
  - `sort`: Field to sort by (e.g., `createdAt:asc` or `title:desc`).
  - `page`: The page number for pagination (default is `1`).
  - `limit`: The number of posts per page (default is `10`).
  - `keyword`: A keyword to search in either the title or description.
  - `tag`: A tag to filter posts by (matches the `name` field in the `tags` array).

#### Example Request:
```http
GET /post?sort=createdAt:asc&page=1&limit=10&keyword=sample&tag=Tech
# Idea_usher_assignment
