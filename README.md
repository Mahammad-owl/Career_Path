# Riyaz's Personal Career Operating System (COS)
> **Engineering Empire Building: GATE ECE 2028 &bull; VLSI Design Verification &bull; English &bull; Japanese**

Built specifically for **Shaik Mahammad Riyaz** (RGUKT RK Valley, B.Tech ECE, Class of 2029).

---

## 🏛️ The Four Pillars Architecture

```
Pillar 1: GATE ECE (Primary Academic Target - February 2028)
   ↓
Pillar 2: VLSI Design Verification (Career Technical Specialization)
   ↓
Pillar 3: English Communication (Daily 90-sec Technical Verbal Drill)
   ↓
Pillar 4: Japanese Language (10 Words/Day Sustainable Engine - Started Oct 2, 2026)
```

---

## ⚡ Key Features

1. **Precision GATE 2028 Countdown & War Deck:**
   - Real-time countdown clock to GATE 2028 (February 5, 2028 - 3rd-year attempt).
   - Daily Action Protocol with interactive task check-offs and streak counters.

2. **Life Modality Selector (Anti-Fantasy System):**
   - Seamlessly switch between **Normal Day** (2h GATE), **Busy College Day** (75m problem sprint), **Weekend Deep-Dive** (3h GATE + 1.5h DV simulation), **College Exam Season Shield** (protecting 8.0+ CGPA), and **Minimum Viable Day (MVD)** (20-min zero-friction maintenance).

3. **College + GATE + DV Triple-Overlap Matrix:**
   - Strategically links your current 2nd-year 1st-semester subjects (**Digital Logic Design**, **Control Systems**, **DSP**, and **IoT**) to GATE marks and VLSI DV skills to eliminate duplicate study effort.

4. **1-3-7-14-30 Spaced Repetition Error Book:**
   - Log errors with the 5-fold root-cause taxonomy (Concept Hole, Formula Slip, Virtual Calculator Slip, Trap Interpretation, Time Trap).
   - Automated spaced intervals ensure mistakes are permanently eliminated before exam day.

5. **16-Stage VLSI Design Verification Curriculum & 5-Tier Project Ladder:**
   - From Digital Logic, Verilog, and RTL Synthesis to SystemVerilog OOP, Assertions (SVA), Functional Coverage, APB/AXI Protocols, and full UVM 1.2 environments.
   - Includes layered testbench architecture diagrams and GitHub deliverable specifications.

6. **Language Wing:**
   - **English:** 90-second technical Feynman challenge with audio timer, required engineering terminology, and model executive responses.
   - **Japanese:** Started October 2, 2026. Interactive 10 words/day tracker, JLPT N5 vocabulary vault, and flashcard review simulator.

7. **Backlog Triage & Resilience Calculator:**
   - Select days missed to generate an actionable, non-burnout recovery schedule without dragging a dead calendar.

8. **Offline-First & Local Storage Persistence:**
   - Zero cloud lock-in. All tasks, streaks, errors, and vocabulary progress persist locally in your browser. Includes 1-click JSON backup and restore.

---

## 📱 Mobile-First Access & PWA

Since you won't be on your laptop all day around campus (RGUKT RK Valley lectures, library, hostels):
- **Fixed Thumb Bottom Navigation Bar:** Rapid 1-thumb switching between Today's Action Deck, GATE War Room, 4-Year Roadmap, VLSI DV Studio, and the Language/Triage drawer.
- **PWA / Add to Home Screen:** In Chrome or Safari on your phone, tap **"Add to Home Screen"** to install it as a standalone, distraction-free fullscreen mobile app.
- **Cross-Device Sync (Export / Restore):** Use the 1-click **Export Backup** in the Reviews tab to copy your JSON state and restore it across laptop and phone.

---

## 🚀 Deployment Guide (GitHub & Vercel)

### Step 1: Push to your GitHub
```bash
# 1. Stage and commit
git add .
git commit -m "feat: launch Riyaz Career OS (Clean Slate Day 0, Mobile Optimized)"

# 2. Create the GitHub repository using the GitHub CLI (already authenticated):
gh repo create Career_Path --public --source=. --remote=origin --push

# (Or if creating manually on github.com):
# git remote add origin https://github.com/Mahammad-owl/Career_Path.git
# git branch -M main
# git push -u origin main
```

### Step 2: Deploy to Vercel (Free Public Link)

#### Option A: 1-Click via Vercel Web Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account (`Mahammad-owl`).
2. Click **"Add New..."** &rarr; **"Project"**.
3. Select your repository `Career_Path` from the list.
4. Framework Preset will auto-detect as **Vite**.
5. Click **Deploy**.
6. Within 30 seconds, Vercel will give you a public URL (e.g. `https://career-path-*.vercel.app`) that you can bookmark on your phone!

#### Option B: Deploy via Vercel CLI
```bash
npx vercel
# Follow the interactive prompts (defaults are pre-configured in vercel.json)
```

---

## 🛠️ Local Development

```bash
npm run dev
# Open http://localhost:5173
```

To create an optimized production build:
```bash
npm run build
npm run preview
```

