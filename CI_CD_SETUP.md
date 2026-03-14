# CI/CD Setup Guide

This project uses GitHub Actions for continuous integration and deployment.

## Workflows

### 1. CI Workflow ([.github/workflows/ci.yml](.github/workflows/ci.yml))

**Triggers:**
- Push to `master`, `main`, or `develop` branches
- Pull requests to `master`, `main`, or `develop` branches

**Steps:**
- Checkout code
- Setup Node.js 20.x
- Install dependencies with caching
- Run ESLint
- Type check with TypeScript
- Build the project
- Upload build artifacts

### 2. PR Checks Workflow ([.github/workflows/pr-checks.yml](.github/workflows/pr-checks.yml))

**Triggers:**
- Pull request opened, synchronized, or reopened

**Steps:**
- All CI steps (lint, type check, build)
- Check for large files
- Post automated comment on PR with check results

### 3. Deploy Workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml))

**Triggers:**
- Push to `master` or `main` branch
- Manual workflow dispatch

**Steps:**
- Build the project
- Deploy to your chosen platform (requires configuration)

## Setup Instructions

### 1. Required GitHub Secrets

Navigate to your repository → Settings → Secrets and variables → Actions, and add:

**For all environments:**
```
MONGODB_URI - Your MongoDB connection string
NEXTAUTH_SECRET - Secret for NextAuth.js
NEXTAUTH_URL - Your application URL
JWT_SECRET - Secret for JWT tokens
```

**For Vercel deployment (optional):**
```
VERCEL_TOKEN - Your Vercel API token
VERCEL_ORG_ID - Your Vercel organization ID
VERCEL_PROJECT_ID - Your Vercel project ID
```

**For AWS deployment (optional):**
```
AWS_ACCESS_KEY_ID - AWS access key
AWS_SECRET_ACCESS_KEY - AWS secret key
S3_BUCKET - S3 bucket name
CLOUDFRONT_ID - CloudFront distribution ID
```

**For VPS deployment (optional):**
```
VPS_HOST - Your server IP/hostname
VPS_USERNAME - SSH username
VPS_SSH_KEY - Private SSH key
```

### 2. Configure Deployment

Edit [.github/workflows/deploy.yml](.github/workflows/deploy.yml) and uncomment the deployment method you want to use:

#### Option A: Vercel (Recommended for Next.js)
1. Get your Vercel token from https://vercel.com/account/tokens
2. Get org and project IDs: `vercel project ls`
3. Add secrets to GitHub
4. Uncomment the Vercel deployment section

#### Option B: AWS S3 + CloudFront
1. Create an S3 bucket and CloudFront distribution
2. Configure AWS credentials with appropriate permissions
3. Add AWS secrets to GitHub
4. Uncomment the AWS deployment section

#### Option C: Custom VPS/Server
1. Setup your server with Node.js and PM2
2. Configure SSH access
3. Add VPS secrets to GitHub
4. Uncomment the VPS deployment section

### 3. Branch Protection Rules (Recommended)

Navigate to Settings → Branches → Add rule:

**For `main`/`master` branch:**
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
  - Select: `Lint and Build`
  - Select: `Validate Pull Request`
- ✅ Require branches to be up to date before merging
- ✅ Do not allow bypassing the above settings

## Environment Variables

Copy [.env.example](.env.example) to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Then fill in your actual values.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm start
```

## Workflow Status Badges

Add these to your README.md:

```markdown
![CI](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI/badge.svg)
![Deploy](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Deploy/badge.svg)
```

## Troubleshooting

### Build fails with "Cannot find module"
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### TypeScript errors in CI
- Run `npx tsc --noEmit` locally to see the same errors
- Fix type errors before pushing

### Deployment fails
- Check that all required secrets are set
- Verify environment variables are correct
- Check deployment platform logs

## Monitoring

After deployment, monitor:
- GitHub Actions runs for any failures
- Deployment platform logs (Vercel/AWS/VPS)
- Application runtime errors

## Security Notes

- ⚠️ Never commit `.env.local` or any file containing secrets
- ⚠️ All sensitive values should be stored in GitHub Secrets
- ⚠️ Regularly rotate API tokens and secrets
- ⚠️ Review PR checks before merging

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
