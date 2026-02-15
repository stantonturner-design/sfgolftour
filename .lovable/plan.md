

# San Francisco Golf Tour (SFGT) — App Plan

## Overview
A classic, traditional-styled hub for managing the San Francisco Golf Tour. Members can create accounts, sign up for events, submit scores, and follow tour news. Admins manage content, events, and oversee the tour.

---

## Pages & Features

### 1. Landing / Home Page
- Hero section with tour name, logo area, and tagline
- Quick links to upcoming events, leaderboard, and news
- Player Spotlight section (featured player, rotated by admin)
- Recent news feed preview

### 2. Event Schedule
- List of upcoming and past events (course name, date, format)
- Click into an event for details (course info, rules, tee sheet)

### 3. Tee Sheet Sign-Up
- For each upcoming event, show available tee time slots
- Logged-in members can reserve a tee time slot
- View who's signed up for each slot

### 4. Leaderboard & Standings
- Season-long standings table (points, wins, scoring average)
- Per-event leaderboard after scores are submitted
- Sortable/filterable by player name or rank

### 5. Score Tracking
- After an event, players submit their own scores (hole-by-hole or total)
- Admin can review/approve submitted scores
- Scores feed into leaderboard and player profiles

### 6. Player Profiles
- Each member has a profile page (name, photo, bio, stats)
- Shows event history, scores, and standings position

### 7. Rules Page
- Static page with tour rules and format details
- Admin can update rules content

### 8. News Feed
- Admin-posted articles/updates with titles, images, and text
- Chronological feed, viewable by all visitors

### 9. Player Spotlight
- Featured on the home page
- Admin selects a player and writes a short spotlight blurb

### 10. Content Uploads
- Admin can upload images/photos for news posts, spotlights, and events

---

## Authentication & Roles
- **Member accounts** — sign up, log in, manage profile, reserve tee times, submit scores
- **Admin role** — create/edit events, post news, manage spotlights, approve scores, update rules

## Backend (Supabase)
- User accounts with profiles table (name, photo, bio, handicap)
- Tables for: events, tee_sheet_slots, scores, news_posts, rules, player_spotlights
- Row-level security so members manage their own data, admins manage everything

## Design Style
- Classic & traditional aesthetic — muted greens, navy, cream/white palette
- Clean typography, subtle textures, golf-inspired accents
- Responsive for desktop and mobile

