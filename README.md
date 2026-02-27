# 🔋 MBT Battery Search App

React + Tailwind CSS + Vite — deploys to Vercel free tier.

## Setup (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev
# Open http://localhost:5173

# 3. Build for production
npm run build
```

## Deploy to Vercel (Free)

**Option A — Drag & Drop (easiest)**
1. Run `npm run build`
2. Go to vercel.com → New Project → drag the `dist/` folder → Deploy ✅

**Option B — GitHub**
1. Push this folder to GitHub
2. Go to vercel.com → Import GitHub repo
3. Framework: Vite | Root: ./  
4. Click Deploy ✅

## Project Structure

```
src/
  data/
    batteries.json      ← All 2,741 battery records
  components/
    Navbar.jsx          ← Top header with cart count
    SearchSection.jsx   ← Search input + autocomplete dropdown
    CartSection.jsx     ← Cart table + customer form + export buttons
  hooks/
    useSearch.js        ← Fuse.js fuzzy search logic
  utils/
    export.js           ← Excel (CSV) + PDF/Print generation
  App.jsx               ← Root component + cart state
  main.jsx              ← Entry point
  index.css             ← Tailwind directives
```

## Features
- ⚡ Instant search across 2,741 batteries (Fuse.js)
- 🛒 Cart with +/- quantity controls
- 📊 Download Excel (CSV, opens in Excel perfectly)
- 🖨️ Print / Save as PDF
- 💾 Cart persists on page refresh (localStorage)
- 📱 Mobile responsive
