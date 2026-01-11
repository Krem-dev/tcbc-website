# Sanity CMS Setup Guide for TCBC

## Overview
This guide walks you through setting up Sanity CMS for The Chosen Bible Church website. Sanity allows non-technical users to manage all content (blog posts, sermons, events, ministries, prayer requests) through an easy-to-use admin dashboard.

## Step 1: Create Sanity Account & Project

1. Go to https://www.sanity.io
2. Click "Get started" (free tier)
3. Sign up with email or GitHub
4. Create a new project:
   - **Project name:** TCBC (or similar)
   - **Template:** Blank (we've already set up schemas)
   - **Dataset:** production (default)
5. Once created, you'll see your **Project ID** and **Dataset name**

## Step 2: Get Your Credentials

After creating the project:

1. Go to **Settings** → **API** in your Sanity project
2. Copy your **Project ID** (looks like: `abc123def456`)
3. Create an **API Token**:
   - Click "Add API token"
   - Name it "TCBC Frontend"
   - Select **Editor** role (allows read/write)
   - Copy the token (you'll only see it once!)

## Step 3: Update Environment Variables

1. In your project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in your credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=your_api_token_here
   ```

## Step 4: Install Sanity Dependencies

Run this command in your project:
```bash
npm install sanity next-sanity @sanity/vision @sanity/desk
```

## Step 5: Deploy Sanity Studio (Admin Dashboard)

The Sanity Studio is where users will manage content. Deploy it:

```bash
npm run build
npm run deploy
```

Or manually deploy to Sanity:
```bash
npx sanity deploy
```

This creates a URL like: `https://your-project.sanity.studio`

## Step 6: Add Content to Sanity

1. Go to your Sanity Studio URL
2. You'll see the admin dashboard with these sections:
   - **Blog Posts** - Create articles with images and content
   - **Sermons** - Add sermons with video links
   - **Events** - Create upcoming events with dates/times
   - **Ministries** - Manage the 6 ministries
   - **Prayer Requests** - View submitted prayer requests

3. Start adding content! The website will automatically fetch and display it.

## Content Schemas

### Blog Posts
- Title, slug, excerpt, content (rich text + images)
- Author, category, featured image
- Published date

### Sermons
- Title, speaker, date, series
- Video URL (YouTube embed link)
- Excerpt and description

### Events
- Title, description, start/end dates
- Location, category, featured image
- Mark as featured event

### Ministries
- Title, description, highlights (bullet points)
- CTA button label and link
- Icon name, display order

### Prayer Requests
- Name, email, phone, category
- Prayer request text
- Confidentiality flag, status tracking

## How Users Update Content

### Adding a Blog Post
1. Go to Sanity Studio
2. Click "Blog Posts"
3. Click "Create"
4. Fill in title, content, author, etc.
5. Click "Publish"
6. Website updates automatically!

### Adding an Event
1. Go to Sanity Studio
2. Click "Events"
3. Click "Create"
4. Fill in event details, date, time, location
5. Click "Publish"
6. Event appears on calendar automatically!

### Managing Prayer Requests
1. Go to Sanity Studio
2. Click "Prayer Requests"
3. View all submitted requests
4. Change status (New → In Prayer → Answered → Archived)
5. Filter by status or category

## API Endpoints

The website fetches data from Sanity using these endpoints:

- `/api/prayer-requests` - Submit and view prayer requests
- Sanity GraphQL API - For blog, sermons, events, ministries

## Troubleshooting

**"Cannot find module 'sanity'"**
- Run: `npm install sanity next-sanity`

**Content not showing on website**
- Check that content is published in Sanity
- Verify environment variables are set correctly
- Clear browser cache and rebuild

**Prayer requests not saving**
- Check that `SANITY_API_TOKEN` is set in `.env.local`
- Verify token has "Editor" role in Sanity

## Next Steps

1. Create the Sanity account and project
2. Get your Project ID and API Token
3. Update `.env.local` with credentials
4. Run `npm install` to install dependencies
5. Deploy Sanity Studio
6. Start adding content!

## Support

For Sanity documentation: https://www.sanity.io/docs
For Next.js + Sanity: https://www.sanity.io/guides/nextjs
