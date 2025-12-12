# Island Concierge - Backend Setup Guide

This guide will help you set up the backend services for Island Concierge.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Get API Keys](#get-api-keys)
3. [Configure Netlify](#configure-netlify)
4. [Local Development](#local-development)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Island Concierge uses three backend services:

1. **Gemini AI** - Powers the AI chat concierge
2. **Google Places API** - Provides real POI data for Explore screen
3. **Tours JSON Database** - Serves tour listings (no API key needed)

All services run as **Netlify Functions** (serverless), keeping API keys secure.

---

## 🔑 Get API Keys

### Step 1: Get Gemini API Key (Free)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API key"** or **"Create API key"**
4. Select **"Create API key in new project"** (or use existing)
5. Copy the API key (starts with `AIza...`)
6. **Free tier**: 15 requests per minute, 1,500 requests per day

### Step 2: Get Google Places API Key (Free $200 credit)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click project dropdown → "New Project"
   - Name it "IslandConcierge"
   - Click "Create"

3. Enable required APIs:
   - Go to **"APIs & Services"** → **"Enable APIs and Services"**
   - Search for **"Places API"** → Click → **"Enable"**
   - Search for **"Maps JavaScript API"** → Click → **"Enable"**

4. Create API key:
   - Go to **"Credentials"** → **"Create Credentials"** → **"API Key"**
   - Copy the key

5. (Recommended) Restrict API key:
   - Click the key you just created
   - Under "Application restrictions":
     - Select "HTTP referrers"
     - Add your Netlify domain: `*.netlify.app/*`
   - Under "API restrictions":
     - Select "Restrict key"
     - Check "Places API" and "Maps JavaScript API"
   - Click "Save"

6. **Pricing**:
   - $200 free credit per month
   - Places Nearby Search: $32 per 1,000 requests
   - With free credit: ~6,000 free requests/month

---

## ⚙️ Configure Netlify

### Option 1: Netlify Dashboard (Recommended)

1. Go to your Netlify site dashboard
2. Click **"Site configuration"** → **"Environment variables"**
3. Click **"Add a variable"** and add:

```
Key: GEMINI_API_KEY
Value: [paste your Gemini API key]
```

4. Add another variable:

```
Key: GOOGLE_PLACES_API_KEY
Value: [paste your Google Places API key]
```

5. Click **"Save"**

6. Redeploy your site:
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Deploy site"**

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link to your site
cd IslandConcierge
netlify link

# Add environment variables
netlify env:set GEMINI_API_KEY "your_gemini_key_here"
netlify env:set GOOGLE_PLACES_API_KEY "your_google_key_here"

# Deploy
netlify deploy --prod
```

---

## 💻 Local Development

### Setup

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Create `.env` file in `IslandConcierge/` directory:
```bash
cp .env.example .env
```

3. Edit `.env` and add your API keys:
```env
GEMINI_API_KEY=your_actual_gemini_key
GOOGLE_PLACES_API_KEY=your_actual_google_key
```

4. **Important**: `.env` is gitignored - never commit it!

### Run Locally

```bash
cd IslandConcierge

# Start Netlify Dev (runs functions + app)
netlify dev

# Or start just the app
npm start
```

Netlify Dev will:
- Run your Expo app
- Run Netlify Functions at `http://localhost:8888/.netlify/functions/`
- Load environment variables from `.env`

### Test Functions Locally

```bash
# Test chat function
curl -X POST http://localhost:8888/.netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the best beaches in SVG?"}'

# Test places function
curl http://localhost:8888/.netlify/functions/places?category=BEACHES

# Test tours function
curl http://localhost:8888/.netlify/functions/tours?activityType=sailing
```

---

## 🧪 Testing

### Test Chat AI

1. Open the app (web or mobile)
2. Go to **Chat** tab
3. Send a message: "What should I do in Saint Vincent?"
4. You should get an AI response about SVG attractions

**If it doesn't work**:
- Check Netlify deploy logs for errors
- Verify `GEMINI_API_KEY` is set correctly
- Check browser console for errors

### Test Places/Explore

1. Go to **Explore** tab
2. Try different filter chips (THINGS TO DO, BEACHES, etc.)
3. You should see real places from Google Places API

**If placeholder data still shows**:
- The app might be using cached data
- Check browser console for API errors
- Verify `GOOGLE_PLACES_API_KEY` is set

### Test Tours

1. Go to **Tours** tab
2. Filter by activity type
3. You should see 6 curated tours

**This works without API keys** - uses local JSON database

---

## 🔧 Troubleshooting

### "API configuration error"

**Problem**: API key environment variable not set

**Solution**:
- For Netlify: Add env vars in dashboard, then redeploy
- For local: Check `.env` file exists and has correct keys

### "Invalid API key" (Gemini)

**Problem**: Wrong or expired Gemini key

**Solution**:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Verify your key is active
3. Generate a new key if needed
4. Update environment variable

### "Invalid API key" (Google Places)

**Problem**: Wrong Google Cloud API key or APIs not enabled

**Solution**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Verify "Places API" is enabled
3. Check API key restrictions aren't blocking requests
4. Generate a new key if needed

### "OVER_QUERY_LIMIT" (Google Places)

**Problem**: Exceeded free tier quota

**Solution**:
- Google gives $200 free credit/month
- Check usage in Google Cloud Console
- Consider caching responses longer
- Reduce number of API calls

### "Rate limit exceeded" (Gemini)

**Problem**: Too many requests to Gemini API

**Free tier limits**:
- 15 requests per minute
- 1,500 requests per day

**Solution**:
- Wait a few minutes
- Implement client-side rate limiting
- Upgrade to paid tier if needed

### Netlify Functions not deploying

**Problem**: Functions folder not detected

**Solution**:
1. Verify folder structure:
```
IslandConcierge/
├── netlify/
│   └── functions/
│       ├── chat.js
│       ├── places.js
│       └── tours.js
```

2. Check `netlify.toml` has correct base:
```toml
[build]
  base = "IslandConcierge"
```

3. Redeploy with cache clear

### CORS Errors

**Problem**: Browser blocks API requests

**Solution**:
- Netlify Functions have CORS headers enabled
- Check function responses include:
```javascript
headers: {
  'Access-Control-Allow-Origin': '*'
}
```

---

## 📊 Monitoring

### Check Netlify Function Logs

1. Go to Netlify dashboard
2. Click **"Functions"** tab
3. Click on a function to see logs
4. Look for errors or successful requests

### Check API Usage

**Gemini AI**:
- No usage dashboard (free tier)
- Monitor via Netlify function logs

**Google Places**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **"APIs & Services"** → **"Dashboard"**
4. Click **"Places API"** to see usage stats

---

## 🚀 Next Steps

Once backend is working:

1. **Enhance Chat**:
   - Add conversation memory
   - Implement suggested questions
   - Add typing indicators

2. **Enhance Explore**:
   - Add detail pages for POIs
   - Implement map view
   - Add user reviews

3. **Enhance Tours**:
   - Build booking flow
   - Add payment integration
   - Create admin panel for tour management

4. **Scale**:
   - Implement caching layer
   - Add database for user data
   - Set up analytics

---

## 🔒 Security Best Practices

✅ **DO**:
- Keep API keys in environment variables only
- Never commit `.env` file
- Restrict API keys to your domains
- Monitor API usage regularly
- Use HTTPS only

❌ **DON'T**:
- Put API keys in client-side code
- Commit API keys to Git
- Share API keys publicly
- Use unrestricted API keys in production

---

## 💰 Cost Estimates

### Free Tier (Good for MVP/Testing):
- **Gemini AI**: Free (15 req/min, 1,500/day)
- **Google Places**: $200 free credit/month (~6,000 requests)
- **Netlify Functions**: 125,000 requests/month free
- **Total**: $0/month for moderate usage

### Paid (If you exceed free tier):
- **Gemini AI**: Contact sales (likely minimal for chat use case)
- **Google Places**: ~$32 per 1,000 requests (after $200 credit)
- **Netlify Functions**: $25/month for 1M requests
- **Estimated**: $25-50/month for moderate traffic (100-500 daily users)

---

## 📞 Support

If you need help:

1. Check Netlify function logs
2. Check browser console errors
3. Review this guide's troubleshooting section
4. Contact Google Cloud support for API issues

---

**Ready to test?** Follow the steps above and you'll have a fully functional backend! 🎉
