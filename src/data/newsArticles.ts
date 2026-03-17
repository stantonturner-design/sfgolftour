import baylandsImg from "@/assets/news/baylands-recap.jpg";
import seasonImg from "@/assets/news/season-preview.jpg";
import trophyImg from "@/assets/news/championship-trophy.jpg";
import membersImg from "@/assets/news/new-members.jpg";
import presidioImg from "@/assets/news/presidio-spotlight.jpg";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishDate: string; // ISO string
  category: "Recap" | "Announcement" | "Course Spotlight" | "Tour Update";
  body: string; // HTML string — will be replaced by rich text from backend later
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "baylands-season-opener-recap",
    title: "Baylands Season Opener: A Day to Remember",
    excerpt:
      "The 2026 SFGT season kicked off at Baylands Golf Links with 24 players battling morning fog and afternoon sunshine across one of the Bay Area's most demanding layouts.",
    coverImage: baylandsImg,
    publishDate: "2026-03-15T10:00:00Z",
    category: "Recap",
    body: `
      <p>The 2026 San Francisco Golf Tour season got underway at Baylands Golf Links in Palo Alto, and what a start it was. Twenty-four players teed it up under a blanket of early morning fog that gradually gave way to clear skies and ideal scoring conditions by the back nine.</p>
      <p>The course was in superb shape after recent rains, with firm and fast greens that rewarded precision over power. Several groups reported pin positions that were as demanding as anything they'd seen on the SFGT circuit.</p>
      <h3>Highlights from the Field</h3>
      <p>The low gross honor went to a sizzling 74 — two over par on a course that rarely yields scores in the 70s for amateurs. Three players broke 80, marking one of the strongest opening-round performances in tour history.</p>
      <p>On the net side, the competition was even tighter. The top five net scores were separated by just three strokes, setting the stage for a fiercely competitive season ahead.</p>
      <h3>Looking Ahead</h3>
      <p>The tour heads to Callippe Preserve next month, where the hillside layout will offer a very different challenge. Registration is now open on the Events page.</p>
    `,
  },
  {
    id: "2",
    slug: "2026-season-preview",
    title: "2026 Season Preview: Five Courses, One Champion",
    excerpt:
      "A look at this year's schedule, the courses on the rotation, and what's new for SFGT members heading into the 2026 season.",
    coverImage: seasonImg,
    publishDate: "2026-03-01T12:00:00Z",
    category: "Announcement",
    body: `
      <p>The 2026 San Francisco Golf Tour season promises to be the best yet. With five events across some of the Bay Area's finest public courses, there's no shortage of variety and challenge on this year's schedule.</p>
      <h3>The 2026 Course Rotation</h3>
      <ul>
        <li><strong>Baylands Golf Links</strong> — Season opener in Palo Alto</li>
        <li><strong>Callippe Preserve</strong> — Hillside challenge in Pleasanton</li>
        <li><strong>Presidio Golf Course</strong> — Historic San Francisco gem</li>
        <li><strong>Poppy Hills</strong> — Pebble Beach's public treasure</li>
        <li><strong>Corica Park (North)</strong> — Season finale in Alameda</li>
      </ul>
      <h3>What's New</h3>
      <p>This season introduces a revised points system that rewards consistency across all five events. The player who accumulates the most points across the full schedule will be crowned SFGT Season Champion at a post-season awards gathering.</p>
      <p>We've also expanded the tour to welcome new members. If you know someone who'd be a great fit, send them to the sign-up page.</p>
    `,
  },
  {
    id: "3",
    slug: "season-championship-format-announced",
    title: "Season Championship Format Announced",
    excerpt:
      "The SFGT Season Championship will crown its winner through a cumulative points system across all five tour events. Here's how it works.",
    coverImage: trophyImg,
    publishDate: "2026-02-20T09:00:00Z",
    category: "Announcement",
    body: `
      <p>We're excited to announce the format for the inaugural SFGT Season Championship. Rather than a single event deciding the champion, we're rewarding consistency and performance across the entire 2026 schedule.</p>
      <h3>Points System</h3>
      <p>After each event, points will be awarded based on net score placement:</p>
      <ul>
        <li>1st Place — 100 points</li>
        <li>2nd Place — 85 points</li>
        <li>3rd Place — 70 points</li>
        <li>Top 10 — sliding scale from 60 to 20 points</li>
        <li>All other finishers — 10 participation points</li>
      </ul>
      <p>At the end of the five-event season, the player with the highest total points will be named Season Champion. Tiebreakers will be decided by head-to-head results, then lowest average net score.</p>
      <h3>The Trophy</h3>
      <p>The Season Champion will receive a custom SFGT trophy and permanent recognition on the tour's leaderboard page. Details about the awards celebration will be shared later in the season.</p>
    `,
  },
  {
    id: "4",
    slug: "welcome-new-members-spring-2026",
    title: "Welcome to the Tour: Spring 2026 New Members",
    excerpt:
      "The SFGT family grows! Meet the newest players joining the tour this spring and get to know a bit about their games.",
    coverImage: membersImg,
    publishDate: "2026-02-10T14:00:00Z",
    category: "Tour Update",
    body: `
      <p>One of the best things about the San Francisco Golf Tour is the community, and this spring we're thrilled to welcome a new group of players to the fold.</p>
      <p>Our newest members bring a wide range of skill levels and backgrounds, but they all share a love for competitive golf and the camaraderie that comes with it. Whether they're single-digit handicaps or working to break 100, everyone has a place on the SFGT.</p>
      <h3>Getting Started</h3>
      <p>New members can sign up for events through the Events page and reserve tee times once registration opens. We recommend joining the group chat to stay connected between rounds and don't be shy about introducing yourself.</p>
      <p>Welcome aboard — we'll see you on the first tee.</p>
    `,
  },
  {
    id: "5",
    slug: "course-spotlight-presidio",
    title: "Course Spotlight: The Presidio Golf Course",
    excerpt:
      "Nestled among towering cypress and eucalyptus trees in San Francisco's Presidio, this historic course offers one of the most unique rounds in the Bay Area.",
    coverImage: presidioImg,
    publishDate: "2026-01-28T11:00:00Z",
    category: "Course Spotlight",
    body: `
      <p>Few courses in the Bay Area can match the atmosphere of the Presidio Golf Course. Surrounded by the towering trees of San Francisco's Presidio national park, the course feels miles removed from the city despite being just minutes from the Golden Gate Bridge.</p>
      <h3>The Layout</h3>
      <p>Originally designed by Robert Johnstone in 1895, the course has been renovated several times but retains its classic character. At just over 6,500 yards from the tips, it's not the longest course on the tour, but the tight, tree-lined fairways and elevated greens demand accuracy.</p>
      <p>The signature stretch comes at holes 7 through 10, where the course weaves through dense forest with dramatic elevation changes. Missing the fairway here means a difficult recovery from the trees — or worse.</p>
      <h3>SFGT History</h3>
      <p>The Presidio has been a fan-favorite on the SFGT rotation since the tour's founding. Its walkable layout, strong conditioning, and proximity to the city make it an ideal venue for a Saturday tournament.</p>
      <p>The tour returns to the Presidio in July. Mark your calendars and start practicing those approach shots.</p>
    `,
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
