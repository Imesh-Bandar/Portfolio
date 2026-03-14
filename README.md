# Portfolio Website with Admin Dashboard

A modern, full-stack portfolio website built with Next.js 14, MongoDB, and Tailwind CSS. Features a complete admin dashboard for managing projects, skills, technologies, certifications, and education.

## Features

### Portfolio Frontend
- **Hero Section** - Professional introduction with social links
- **About Section** - Brief bio and current role
- **Tech Stack** - Visual display of technologies
- **Skills** - Categorized skills with proficiency levels
- **Projects** - Showcase featured projects with details
- **Education** - Academic background timeline
- **Certifications** - Professional certifications display
- **Responsive Design** - Mobile-first, works on all devices

### Admin Dashboard
- **Authentication** - Secure login system with JWT
- **Projects Management** - Full CRUD operations
- **Skills Management** - Add/edit skills with categories and levels
- **Technologies Management** - Manage your tech stack
- **Certifications Management** - Track professional certifications
- **Education Management** - Manage academic records
- **Dashboard Overview** - Quick stats and navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Feather Icons)
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and update:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your-secret-key-here
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Portfolio: http://localhost:3000
   - Admin: http://localhost:3000/admin/login

### Create Admin Account

Use MongoDB to create an admin user (password: admin123):

```javascript
use portfolio

db.users.insertOne({
  email: "admin@example.com",
  password: "$2a$10$rBV2kYe.Rm8lQG7swnXw8.DH2M3Y0y9VlYFz5qpZmVkXKQmXqxqgO",
  name: "Admin User",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Deployment

Deploy to Vercel:
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## License

MIT License

---

Built with ❤️ by Imesh Bandara
