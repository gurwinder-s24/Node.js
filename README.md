# Node.js 
*Learning source: [YouTube playlist](https://youtube.com/playlist?list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo&si=SwtgYNYdPqvaUS_I)*

## Course Components
- HTTP Methods and Status Codes
- Server-side Rendering (using EJS)
- Stateful Authentication (using sessions and cookies)
- Stateless Authentication (using JWT)
- Authentication and Authorization using middlewares

## Tech Stack Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS templating engine
- Argon2 for password hashing
- JSON Web Tokens (JWT) for stateless authentication
- Multipart/form-data handling for file uploads ( using multer )


## Mini-Projects and navigation links to their codes

* URL shortener [&#x1F517;](./url-shortener/) <br>
  - A simple URL shortener service that allows users to create shortened URLs and redirect to the original URLs.
  - Features include custom short URL creation, and analytics for tracking URL usage, different views for admin and normal users.

* Blog Application [&#x1F517;](./blog-app/) <br>
  - A blogging platform where users can create blog posts, comment on posts and view posts created by other users.
  - Basically implemented a CRUD application illustration.
  - Learned about model static methods and instance methods to return only the required fields in the response and ensuring data privacy.
  - Thin controller, Fat model pattern to control exactly what data leaves the database, it is often called a Data Access Layer (DAL) pattern or Projection. ( promote security, DRY principle, abstraction and data encapsulation )
  - Learned about Subdocuments in Mongoose to implement comments as subdocuments of blog posts. ( by using nested schema called as embedding )