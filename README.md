# Hemant Codes — Blog API

A full stack blog platform with JWT authentication, a comment system, and a clean editorial frontend. Built with Node.js, Express, PostgreSQL, and Prisma ORM.

**Live:** [hemant-codes-blog.netlify.app](https://hemant-codes-blog.netlify.app)

---

## Features

- **Authentication** — JWT-based auth with Passport.js local strategy
- **Single author model** — Only the admin can create posts; any user can read
- **Comments** — Authenticated users can comment on posts
- **RESTful API** — Clean, predictable route structure
- **Input validation** — express-validator on all auth and comment routes
- **Rate limiting** — express-rate-limit on auth routes to prevent brute force
- **Conditional UI** — Frontend renders differently for logged-in vs anonymous users

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | PostgreSQL |
| ORM | Prisma v7 |
| Auth | Passport.js + JWT |
| Validation | express-validator |
| Frontend | React (separate repo) |
| Deployment | Render (API) + Netlify (frontend) |

---

## Project Structure

```
├── app.js                  # Entry point
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── routes/
│   │   ├── authRouter.js   # Sign up + login routes
│   │   ├── postsRouter.js  # Posts routes
│   │   └── commentsRouter.js # Comments routes
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   ├── middleware/
│   │   └── auth.js         # JWT verification middleware
│   └── config/
│       └── passport.js     # Passport strategies
```

---

## API Reference

### Auth

| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/users` | Sign up | No |
| POST | `/sessions` | Login — returns JWT | No |

### Posts

| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/posts` | Get all posts | No |
| GET | `/posts/:postId` | Get single post with comments | No |
| POST | `/posts` | Create a post (admin only) | Yes |

### Comments

| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/posts/:postId/comments` | Create a comment | Yes |

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database
- Prisma CLI

### Installation

```bash
# Clone the repo
git clone https://github.com/HemantDahiyaCodes/blog-api-backend
cd blog-api-backend

# Install dependencies
npm install

# Set up environment variables
Create an env file to get going!
# Fill in your DATABASE_URL and JWT_SECRET

# Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/blog"
JWT_SECRET="your-secret-key"
NODE_ENV="development"
```

---

## What I Learned Building This

- How JWT authentication works end to end — signing tokens, verifying them in middleware, and sending them securely to the client
- How to structure an Express app with clean separation between routes, controllers, and middleware
- Prisma v7 setup with PostgreSQL including the `adapter-pg` configuration
- Rate limiting auth routes to prevent brute force attacks
- How to think about single-author vs multi-author data models

---

<br>

**Hemant Dahiya** — [x.com/Hemant_codes](https://x.com/Hemant_codes) · [hemant-codes-blog.netlify.app](https://hemant-codes-blog.netlify.app)