# SVIT CodeLab 🎓

> A DSA practice platform built for **Sai Vidya Institute of Technology** students.

Practice **100 curated DSA problems** (Blind 75 + essentials) organized by patterns — with animated solutions, Monaco code editor, and LeetCode integration.

![SVIT CodeLab](https://img.shields.io/badge/SVIT-CodeLab-teal?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-green?style=for-the-badge&logo=supabase)

## Features

- 📋 **100 Problems** — Blind 75 + important extras across 12 DSA patterns
- 💻 **Monaco Code Editor** — Python, Java, C++, JavaScript with syntax highlighting
- 💡 **Step-by-step Solution Walkthrough** — Animated, interactive explanations
- 🔗 **Direct LeetCode Links** — Solve on LeetCode with one click
- ✅ **Progress Tracking** — Mark problems solved, synced via Supabase
- 📊 **Progress Dashboard** — Circular chart + pattern-wise breakdown
- 🔐 **Authentication** — Sign in to sync progress across devices
- 🌙 **Dark Theme** — Premium dark UI inspired by AlgoMaster.io

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Vanilla CSS (design system) |
| Code Editor | Monaco Editor |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Deployment | Vercel |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Niteesh546/SVIT-CodeLab.git
cd SVIT-CodeLab

# Install dependencies
npm install

# Create .env.local (never commit this!)
cp .env.example .env.local
# Fill in your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

Run `supabase-schema.sql` in your Supabase SQL Editor.

## DSA Patterns Covered

| Pattern | Problems |
|---------|----------|
| Arrays | 10 |
| Strings | 8 |
| Two Pointers | 7 |
| Sliding Window | 7 |
| Binary Search | 8 |
| Linked List | 7 |
| Stack & Queue | 8 |
| Trees & BST | 11 |
| Graphs & BFS/DFS | 10 |
| Dynamic Programming | 11 |
| Greedy | 6 |
| Hash Tables | 7 |

---

Built with ❤️ for SVIT students · © 2025 SVIT CodeLab
