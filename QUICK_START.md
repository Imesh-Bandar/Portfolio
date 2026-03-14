# Portfolio Website - Quick Start Guide

## ✨ New Features Added

### 🎨 Motion Animations
- Smooth entrance animations on all sections
- Hover effects on cards, buttons, and tech icons
- Mouse-tracking gradient background
- Rotating social icons on hover (360°)
- Scale effects on project cards

### 🎨 Developer Doodle Background
- Animated SVG code symbols (`</>`, `{}`, brackets, shapes)
- Gradient-colored doodles
- Smooth color transitions

### 💼 Work Experience Section
- Full CRUD in admin panel
- Timeline display on frontend
- Technologies badges
- "Currently Working" indicator
- Smooth scroll animations

### 📄 CV Download
- Download CV button in hero section
- Gradient styling with hover effects
- PDF file at `/public/cv.pdf` (replace with yours)

### 🔐 Updated Admin Credentials
- **Email**: imesh.fsd.info@gmail.com
- **Password**: Imesh@9451

---

## 🚀 Get Started in 5 Minutes

### 1. Install MongoDB

**Windows:**
- Download from https://www.mongodb.com/try/download/community
- Install and run MongoDB as a service

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Start the Development Server

```bash
npm run dev
```

### 3. Update Admin User

Open a new terminal and run:

```bash
node scripts/update-admin.js
```

This updates admin to:
- **Email**: imesh.fsd.info@gmail.com
- **Password**: Imesh@9451

Or create a new admin with default credentials:
```bash
npm run create-admin
```

### 4. Access Your Portfolio

- **Portfolio**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login

### 5. Add Your Content

1. Login to admin dashboard
2. Add your content through these sections:
   - 📂 **Projects** - Showcase your work
   - 💡 **Skills** - Display proficiency levels
   - 🔧 **Technologies** - Tech stack with icons
   - 💼 **Work Experience** - Professional timeline (NEW!)
   - 🎓 **Education** - Academic background
   - 📜 **Certifications** - Certificates with credentials
3. Mark projects as "Featured" to show on homepage
4. View your portfolio at http://localhost:3000

## 📝 What to Customize

### Update Your Information

Edit [app/page.tsx](app/page.tsx):
- Name: Search for "Imesh Bandara"
- Title: Search for "Full Stack Developer"
- Bio: Search for "Crafting elegant solutions"
- GitHub URL: Search for "github.com/Imesh-Bandar"
- LinkedIn URL: Search for "linkedin.com/in/YOUR_PROFILE"
- Email: Search for "imesh.fsd.info@gmail.com"

### Replace Your CV

Replace the placeholder PDF:
```bash
# Replace this file with your actual CV
public/cv.pdf
```

### Change the Logo/Colors

- Edit Tailwind classes in components
- Modify theme colors in `tailwind.config.js`

## 🎨 Animation Features

### Mouse Tracking
The background gradient follows your cursor for an interactive experience.

### Scroll Animations
Elements fade and slide in as you scroll using Framer Motion's `whileInView`.

### Hover Effects
- **Tech Cards**: Scale up and lift on hover
- **Project Cards**: Scale and lift with image zoom
- **Social Icons**: Rotate 360° on hover
- **Buttons**: Scale effects with tap feedback

## 🔒 Security Checklist

- [x] Admin credentials updated to imesh.fsd.info@gmail.com
- [ ] Update JWT_SECRET in `.env.local`
- [ ] Enable MongoDB authentication (production)
- [ ] Use environment-specific .env files
- [ ] Replace placeholder CV with actual file

## 🚀 Deploy to Production

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Deploy

### Other Platforms

Works on: Netlify, Railway, DigitalOcean, AWS, etc.

## 📚 Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review the API documentation in README
- Open an issue on GitHub

---

Happy coding! 🎉
