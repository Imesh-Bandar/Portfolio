# Quick Setup Reference

## 🚀 Fast Track: Get Your Tokens in 5 Minutes

### Step 1: Get Vercel Token (2 min)
```
1. Visit: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: "GitHub Actions"
4. Click Create
5. COPY THE TOKEN (you'll only see it once!)
```

### Step 2: Get IDs via CLI (1 min)
```bash
# Run these commands in your project folder:
npm i -g vercel
vercel login
vercel link

# Get your IDs:
cat .vercel/project.json
```

You'll see:
```json
{
  "orgId": "team_xxxxx",     ← VERCEL_ORG_ID
  "projectId": "prj_xxxxx"   ← VERCEL_PROJECT_ID
}
```

### Step 3: Add to GitHub (2 min)
```
1. Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions
2. Click "New repository secret" and add these 3:

   Name: VERCEL_TOKEN
   Value: [paste your token]

   Name: VERCEL_ORG_ID
   Value: team_xxxxx

   Name: VERCEL_PROJECT_ID
   Value: prj_xxxxx
```

### Step 4: Add App Secrets
Also add these (check your .env.local file):
```
MONGODB_URI          → Your MongoDB connection string
NEXTAUTH_SECRET      → Run: openssl rand -base64 32
NEXTAUTH_URL         → https://your-project.vercel.app
JWT_SECRET           → Same as NEXTAUTH_SECRET
```

### Step 5: Add Same Variables to Vercel
```
1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add the same 4 environment variables:
   - MONGODB_URI
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - JWT_SECRET
```

### Step 6: Deploy! 🎉
```bash
git add .
git commit -m "chore: configure deployment"
git push origin master
```

Watch it deploy at: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`

---

## 📋 Checklist

**In GitHub Secrets:**
- [ ] VERCEL_TOKEN
- [ ] VERCEL_ORG_ID
- [ ] VERCEL_PROJECT_ID
- [ ] MONGODB_URI
- [ ] NEXTAUTH_SECRET
- [ ] NEXTAUTH_URL
- [ ] JWT_SECRET

**In Vercel Environment Variables:**
- [ ] MONGODB_URI
- [ ] NEXTAUTH_SECRET
- [ ] NEXTAUTH_URL
- [ ] JWT_SECRET

---

## 🆘 Quick Troubleshooting

**Can't find .vercel/project.json?**
```bash
# Make sure you're in the right directory
cd e:/Portfolio
vercel link
```

**Build fails?**
- Check all secrets are added in GitHub
- Check all env vars are in Vercel dashboard
- Check Actions tab for error logs

**Deployment works but app broken?**
- Environment variables missing in Vercel
- MongoDB connection string incorrect
- Check Vercel deployment logs

---

## 📚 Full Documentation
See [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) for detailed instructions.
