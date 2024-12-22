# Bike Store

#### Live Deployment Link

[https://blog-project-a3-ten.vercel.app/](https://blog-project-a3-ten.vercel.app/)

1. User Roles:

   - Admin: Can delete any blog, block users, cannot update blogs.
   - User: Can register, login, create, update, delete their own blogs.

2. Authentication:

   - Register: Registers a user with name, email, password.
   - Login: Authenticates user, returns a JWT token.

3. Blog Management:

   - Create Blog: Logged-in users can create blogs with title and content.
   - Update Blog: Logged-in users can update their own blogs by ID.
   - Delete Blog: Logged-in users can delete their own blogs by ID.
   - Get All Blogs (Public): View all blogs with search, sort, filter options.

4. Admin Actions:

   - Block User: Admin can block users by setting `isBlocked: true`.
   - Delete Blog: Admin can delete any blog by ID.

5. Models:

   - User Model: Includes `name`, `email`, `password`, `role`, `isBlocked`, timestamps.
   - Blog Model: Includes `title`, `content`, `author`, `isPublished`, timestamps.

6. API Endpoints:

   - POST /api/auth/register: Register a new user.
   - POST /api/auth/login: User login.
   - POST /api/blogs: Create a blog.
   - PATCH /api/blogs/:id: Update a blog by ID.
   - DELETE /api/blogs/:id: Delete a blog by ID.
   - GET /api/blogs: Fetch blogs with search, sort, filter.
   - PATCH /api/admin/users/:userId/block: Admin blocks a user.
   - DELETE /api/admin/blogs/:id: Admin deletes a blog.

7. Bonus:
   - Consistent error handling: Manage Zod validation, authentication, authorization, and server errors.

Submission:

- Provide live deployment link, GitHub repo, admin credentials, and project overview video.
  Deadline:
- Full marks: Dec 21, 2024.
- Reduced marks: Dec 22, 2024.

## Setup Instructions

### 1. Installation and Environment Setup

1. Add the following variables in your `.env` file:

   - `PORT`: The port number you want to run the application on.
   - `DATABASE_URL`: The MongoDB URI.

### 2. Install Dependencies

Run the following command to install the required npm dependencies:

```
npm install
```

### 3. Run the Project

Start the development server with the following command:

#### run project

```
npm run start:dev
```

#### Live Deployment Link

[https://bike-store-a2.vercel.app/](https://bike-store-a2.vercel.app/)
