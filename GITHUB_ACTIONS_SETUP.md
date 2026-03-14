# GitHub Actions Setup Guide for Vercel Deployment

## Required Secrets

Your GitHub Actions workflow needs these 3 secrets:
1. `VERCEL_TOKEN` - Your Vercel authentication token
2. `VERCEL_ORG_ID` - Your Vercel organization/team ID
3. `VERCEL_PROJECT_ID` - Your specific project ID

---

## Step 1: Generate Vercel Token

### 1.1 Go to Vercel Dashboard
1. Visit [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Sign in to your Vercel account
3. Click **"Create Token"** or **"Create"** button

### 1.2 Create the Token
1. **Token Name**: Enter a descriptive name (e.g., `GitHub Actions Deploy`)
2. **Scope**: Select your scope:
   - **Recommended**: Select specific projects if available
   - Or choose "Full Account" if you want to deploy multiple projects
3. **Expiration**: Choose expiration time
   - **Recommended**: No expiration (for continuous deployment)
   - Or set a custom expiration date
4. Click **"Create Token"**

### 1.3 Copy the Token
⚠️ **IMPORTANT**: Copy the token immediately! You won't be able to see it again.
```
Example: vercel_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 2: Get Vercel Organization ID

### Method 1: Via Vercel CLI (Recommended)
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (run this in your project directory)
cd e:/Portfolio
vercel link

# This will create a .vercel folder with project.json
# The file contains your ORG_ID and PROJECT_ID
```

Then read the file:
```bash
cat .vercel/project.json
```

You'll see something like:
```json
{
  "orgId": "team_xxxxxxxxxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxxxxxxxxx"
}
```

### Method 2: Via Vercel Dashboard
1. Go to [https://vercel.com/](https://vercel.com/)
2. Click on your project
3. Go to **Settings**
4. Look at the URL in your browser:
   ```
   https://vercel.com/YOUR_ORG_ID/your-project-name/settings
                        ↑
                   This is your ORG_ID
   ```

### Method 3: Via API
```bash
curl -H "Authorization: Bearer YOUR_VERCEL_TOKEN" \
  https://api.vercel.com/v2/teams
```

---

## Step 3: Get Vercel Project ID

### Method 1: Via Vercel CLI (Already done in Step 2)
If you ran `vercel link`, check:
```bash
cat .vercel/project.json
```

### Method 2: Via Vercel Dashboard
1. Go to your project in Vercel
2. Click **Settings** → **General**
3. Scroll down to **Project ID**
4. Copy the ID (looks like: `prj_xxxxxxxxxxxxxxxxxxxx`)

### Method 3: Via API
```bash
curl -H "Authorization: Bearer YOUR_VERCEL_TOKEN" \
  "https://api.vercel.com/v9/projects?teamId=YOUR_ORG_ID"
```

Look for your project name and copy its `id`.

---

## Step 4: Add Secrets to GitHub

### 4.1 Go to Your Repository Settings
1. Open your GitHub repository: `https://github.com/YOUR_USERNAME/YOUR_REPO`
2. Click **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**

### 4.2 Add Each Secret
Click **"New repository secret"** and add these **3 secrets**:

#### Secret 1: VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Value**: Paste your Vercel token from Step 1
- Click **"Add secret"**

#### Secret 2: VERCEL_ORG_ID
- **Name**: `VERCEL_ORG_ID`
- **Value**: Paste your org ID (e.g., `team_xxxxxxxxxxxxxxxxxxxx`)
- Click **"Add secret"**

#### Secret 3: VERCEL_PROJECT_ID
- **Name**: `VERCEL_PROJECT_ID`
- **Value**: Paste your project ID (e.g., `prj_xxxxxxxxxxxxxxxxxxxx`)
- Click **"Add secret"**

---

## Step 5: Add MongoDB and NextAuth Secrets (Required for Your App)

Your app also needs these environment variables to work:

### 5.1 In GitHub Secrets
Add these additional secrets:

#### MONGODB_URI
- **Name**: `MONGODB_URI`
- **Value**: Your MongoDB connection string
  ```
  mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
  ```

#### NEXTAUTH_SECRET
- **Name**: `NEXTAUTH_SECRET`
- **Value**: Generate a random secret
  ```bash
  # Generate using this command:
  openssl rand -base64 32
  ```

#### NEXTAUTH_URL
- **Name**: `NEXTAUTH_URL`
- **Value**: Your production URL
  ```
  https://your-project.vercel.app
  ```

### 5.2 In Vercel Dashboard
These MUST also be added to Vercel:

1. Go to your Vercel project
2. Click **Settings** → **Environment Variables**
3. Add the same variables:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `JWT_SECRET` (use the same value as NEXTAUTH_SECRET)

---

## Step 6: Update GitHub Actions Workflow

Your deploy.yml needs these environment variables uncommented:

```yaml
# In .github/workflows/deploy.yml
- name: Build project
  run: npm run build
  env:
    NODE_ENV: production
    MONGODB_URI: ${{ secrets.MONGODB_URI }}
    NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
    NEXTAUTH_URL: ${{ secrets.NEXTAUTH_URL }}
    JWT_SECRET: ${{ secrets.JWT_SECRET }}
```

---

## Step 7: Test the Deployment

### 7.1 Commit and Push
```bash
git add .
git commit -m "chore: configure GitHub Actions deployment"
git push origin master
```

### 7.2 Watch the Workflow
1. Go to your GitHub repository
2. Click **Actions** tab
3. You should see your workflow running
4. Click on the workflow to see detailed logs

### 7.3 Verify Deployment
- Check Vercel dashboard for the deployment
- Visit your site URL
- Test all functionality

---

## Troubleshooting

### Error: "Vercel token is invalid"
- Regenerate your token in Vercel dashboard
- Make sure you copied the entire token
- Update the `VERCEL_TOKEN` secret in GitHub

### Error: "Project not found"
- Verify your `VERCEL_PROJECT_ID` is correct
- Make sure the project exists in Vercel
- Check that the `VERCEL_ORG_ID` matches

### Error: "Build failed"
- Check that all environment variables are set in both GitHub and Vercel
- Verify MongoDB connection string is correct
- Check the Actions logs for specific error messages

### Deployment succeeds but app doesn't work
- Environment variables might be missing in Vercel
- Go to Vercel → Settings → Environment Variables
- Add all required variables (MONGODB_URI, NEXTAUTH_SECRET, etc.)
- Trigger a new deployment

---

## Quick Reference Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project and get IDs
vercel link

# View project info
cat .vercel/project.json

# Generate NextAuth secret
openssl rand -base64 32

# Test deployment locally
vercel dev

# Manual deploy
vercel --prod
```

---

## Summary Checklist

- [ ] Created Vercel token
- [ ] Got Vercel Org ID
- [ ] Got Vercel Project ID
- [ ] Added `VERCEL_TOKEN` to GitHub Secrets
- [ ] Added `VERCEL_ORG_ID` to GitHub Secrets
- [ ] Added `VERCEL_PROJECT_ID` to GitHub Secrets
- [ ] Added `MONGODB_URI` to GitHub Secrets
- [ ] Added `NEXTAUTH_SECRET` to GitHub Secrets
- [ ] Added `NEXTAUTH_URL` to GitHub Secrets
- [ ] Added environment variables to Vercel Dashboard
- [ ] Updated deploy.yml with environment variables
- [ ] Pushed changes and tested deployment
- [ ] Verified app works in production

---

## Additional Resources

- [Vercel Tokens Documentation](https://vercel.com/docs/rest-api#authentication)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [NextAuth.js Environment Variables](https://next-auth.js.org/configuration/options#environment-variables)
