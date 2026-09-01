import seasonImg from "@/assets/news/season-preview.jpg";
import baylandsImg from "@/assets/news/baylands-recap.jpg";
import presidioImg from "@/assets/news/presidio-spotlight.jpg";
import membersImg from "@/assets/news/new-members.jpg";
import coricaRecapImg from "@/assets/news/corica-north-recap.jpg";
import coyoteCreekImg from "@/assets/news/coyote-creek-preview.jpg";
import stretchRunImg from "@/assets/news/stretch-run.jpg";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishDate: string; // ISO string
  category: "Tour News" | "Schedule" | "Event News" | "Event Preview" | "Anchor Day" | "Event Recap";
  body: string; // HTML string — will be replaced by rich text from backend later
}

export const newsArticles: NewsArticle[] = [
  {
    id: "8",
    slug: "stretch-run-barker-returns-poppy-window-extended",
    title:
      "The Stretch Run Is Here: Barker Returns, Poppy Window Extended & Anchor Day Set",
    excerpt:
      "Jake Barker returned from a broken rib and immediately won Chardonnay. Now the Major window is extended, Poppy Ridge has 2X points on the table, and the final 10 weeks of the SFGT season are set up for chaos.",
    coverImage: stretchRunImg,
    publishDate: "2026-09-01T12:00:00Z",
    category: "Tour News",
    body: `
      <p>The back half of the SFGT season snuck all the way up on us, but somehow the leaderboard is only getting messier.</p>
      <p>At Chardonnay, Jake Barker made his 2026 season debut in style, returning from a broken rib and immediately taking down the event.</p>
      <p>Apparently the preferred recovery plan is rest, rehab, and then showing up months into the season and beating everyone.</p>
      <p>The win launched Barker straight into the playoff picture, and as things currently stand, he holds a spot in the field for the Finale. With plenty of golf still left to play, his arrival adds another name to an already crowded race for the postseason.</p>
      <p>And that race is about to get even more interesting.</p>

      <h2>More Time to Take a Shot at the Major</h2>
      <p>We are officially extending the Poppy Ridge play-by date through the end of the regular season.</p>
      <p>That means both Poppy Ridge and Presidio can now be played anytime between now and <strong>November 11</strong>, when the regular-season points standings will officially close ahead of the <strong>SFGT Finale on November 14</strong>.</p>
      <p>The goal is simple: give everybody a real opportunity to get the biggest round of the season on the books.</p>
      <p>Because Poppy isn't just another stop.</p>
      <p><strong>Poppy Ridge is the 2026 Major, and 2X points are up for grabs.</strong></p>
      <p>With roughly 10 weeks remaining in the regular season, that gives players plenty of time to make a move — while also creating the possibility for some absolute leaderboard chaos down the stretch.</p>
      <p>Someone sitting outside the playoff field today could look very different after a big Major finish. Someone comfortably inside the cut line might suddenly find themselves sweating in November.</p>
      <p>In other words: no spot is safe yet.</p>

      <h2>Poppy Ridge Anchor Day — September 27</h2>
      <p>For anyone looking to play the Major with the group, the official Poppy Ridge Anchor Day is set:</p>
      <p><strong>Sunday, September 27 at 11:00 AM</strong></p>
      <p>We'll have a group heading out together for what should be one of the biggest days of the Tour season.</p>
      <p>If you can make the Anchor Day, get it on the calendar. If you can't, you've now got all the way through November 11 to get your Major round completed.</p>
      <p>Either way, get it played.</p>

      <h2>Ten Weeks. Two Rounds. One Finale.</h2>
      <p>The season has reached the part where every point starts to matter.</p>
      <p>Barker just went from making his season debut to sitting in a playoff position. Poppy Ridge has double points sitting on the table. Presidio is still waiting. And the Finale field won't be locked until November 11.</p>
      <p>There is a lot of golf left.</p>
      <p>There is also a lot of room for things to get weird.</p>
      <p><strong>Welcome to the stretch run.</strong></p>
    `,
  },
  {
    id: "7",
    slug: "coyote-creek-awaits-tour-heads-south",
    title: "Coyote Creek Awaits: The Tour Heads South",
    excerpt:
      "Event No. 2 takes the SFGT to Coyote Creek Golf Club's Valley Course in San Jose — a brand new stop, an Anchor Day on May 31, and a June 13 payout date keeping the chase rolling.",
    coverImage: coyoteCreekImg,
    publishDate: "2026-05-16T12:00:00Z",
    category: "Event Preview",
    body: `
      <p>After a great season opener at Corica, the SFGT is officially back in motion — and the next stop takes the tour somewhere brand new.</p>
      <p>Event No. 2 brings the tour to Coyote Creek Golf Club's Valley Course, located in San Jose. Coyote Creek is home to 36 Jack Nicklaus-designed holes across the Valley and Tournament courses, making this a fitting first-time stop for the tour.</p>
      <p>The Valley Course should be a great follow-up to Corica: playable enough for everyone to post a number, but with enough trouble to punish loose swings and shaky decisions. The hole everyone will be talking about is likely No. 7, the course's signature par 3 — the kind of hole that can change a round quickly and give the group chat plenty to work with after the cards come in.</p>
      <p>Our Anchor Day is Sunday, May 31, with 24 spots available. It will give players a chance to tee it up together, build momentum, climb the standings, and start making an early case that they belong in the mix.</p>
      <p>With the June 13 payout date approaching, and golf season starting to hit full stride, now is the time to get going. Get your round declared, get your group together, and get back into the chase.</p>
      <p>Corica got the season started. Coyote Creek is where the chase continues.</p>
    `,
  },
  {
    id: "6",
    slug: "corica-north-event-recap-champ-cashes-first",
    title: "Corica North Event Recap: The Champ Cashes First",
    excerpt:
      "Reigning Tour Champion Theo Tydingco opened the 2026 SFGT season with a statement, sweeping the top Net Score and Gross Score prizes at Corica North.",
    coverImage: coricaRecapImg,
    publishDate: "2026-05-03T12:00:00Z",
    category: "Event Recap",
    body: `
      <p>The 2026 SFGT season opened at Corica North, and the first payouts of the year went exactly where the rest of the field probably hoped they wouldn't: straight into the hands of the reigning Tour Champion.</p>
      <p>Theo Tydingco started his title defense with a complete performance, shooting 70 gross / 70 net to win both the top Net Score and top Gross Score prizes for our first event. It was the cleanest round on the board and, more importantly, the kind of opening statement that makes the rest of the tour take notice.</p>
      <p>Theo did most of his damage with consistency. He went out in 34, came home in 36, and kept the card under control from start to finish. On a leaderboard where plenty of players had flashes, Theo separated himself by avoiding the big number and stacking pars. He finished as the only player at 70 net, the low gross player by three shots, and the clear winner of the first event of the season.</p>
      <p>The 2nd Place Net prize went to Mattia Bortolotto, who kept his Corica form rolling with a 78 gross / 71 net. Mattia was last year's net winner at Corica North, and while he came up one shot short of defending that top net spot, he still opened the year exactly where he left off: right near the top of the leaderboard.</p>
      <p>Behind the two cash winners, there was plenty of movement worth watching. Harry Takizawa and Brandon Choy both posted strong 73 gross scores, good enough to split second in gross rank. James Walsh finished with a 75 gross, while Kevin Novakovic and Connor Crain both carded fantastic net 72s, narrowly missing the payout line but grabbing valuable early-season points. With the top 24 ultimately fighting for a spot in the finale, those points matter already.</p>
      <p>Event 1 also gave the tour its first real look at what the expanded 2026 format can feel like. With the entry moving from $50 to $75, the prize pool is bigger, the payouts are more meaningful, and the leaderboard has a little more bite. The new structure rewards the top net finishers, the low gross player, and adds more ways for players to stay engaged across the season.</p>
      <p>Corica North was also the first stop in a year built around making the SFGT feel more connected. The first Anchor Day of the 2026 season was a success, and the Round Recap partnership has already seen tremendous user traffic, giving players more than just a final score.</p>
      <p>For the full breakdown of the round, including hole-by-hole scoring, player stats, and a deeper look at how the leaderboard shook out, tour members can head over to Round Recap and dig into the numbers.</p>
      <p><a href="https://app.roundrecap.com/auth" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Open Round Recap &rarr;</a></p>
    `,
  },
  {
    id: "5",
    slug: "new-sfgt-tour-hub-live",
    title: "The New SFGT Tour Hub Is Live",
    excerpt:
      "The San Francisco Golf Tour has a new home. The SFGT Tour Hub is now live, giving players one place to follow standings, events, tee sheets, news, and direct links into Round Recap for deeper stats and performance tracking.",
    coverImage: seasonImg,
    publishDate: "2026-03-29T12:00:00Z",
    category: "Tour News",
    body: `
      <p>The San Francisco Golf Tour officially has a new home.</p>
      <p>Today, we're excited to launch the new <strong>SFGT Tour Hub</strong> — a central place for players to follow the 2026 season, keep up with events, and stay connected to everything happening across the tour.</p>
      <p>The goal with the Hub is simple: make the tour easier to follow, easier to navigate, and more fun to be a part of week to week. Instead of information living in scattered places, players can now go to one spot to check standings, browse events, view tee sheets, read updates, and follow the story of the season as it unfolds.</p>

      <h2>What's now live</h2>
      <ul>
        <li><strong>Season leaderboard</strong> with current standings and player rankings</li>
        <li><strong>Player pages</strong> with individual tour snapshots and season results</li>
        <li><strong>Event pages</strong> for each stop on the 2026 schedule</li>
        <li><strong>Tee sheets</strong> that make it easier to see who's in and where open spots remain</li>
        <li><strong>Tour news</strong> so major updates, announcements, and event moments have a permanent home</li>
        <li><strong>Rules and structure</strong> available in one clean, easy-to-reference place</li>
      </ul>

      <h2>Built to work with Round Recap</h2>
      <p>One of the biggest additions to the new Hub is its connection to <strong>Round Recap</strong>.</p>
      <p>Round Recap brings a much deeper layer of stats, scoring detail, and player performance tracking to the SFGT experience. While the Tour Hub serves as the front door for the season, Round Recap gives players access to the numbers behind it — from round-by-round results to player-specific stat pages and a broader view of performance over time.</p>
      <p>Together, the two platforms give the tour something it has never fully had before: a true digital home base paired with a real data engine behind the competition.</p>

      <h2>Why this matters</h2>
      <p>The SFGT has continued to grow, and with that growth comes a need for a better experience around the tour itself. This launch is about more than just having a website. It's about giving the season a stronger identity, making the competition easier to follow, and creating a better experience for everyone playing in it.</p>
      <p>Whether you want to check the latest standings, find your next event, see who's on the tee sheet, or dive into Round Recap for a deeper look at the numbers, the new setup is designed to make all of it feel more connected.</p>

      <h2>This is just the beginning</h2>
      <p>The new Tour Hub is live now, but it is still only the start.</p>
      <p>More refinements, added functionality, and better integrations will continue rolling out as the season moves forward. The vision is to keep building a tour experience that feels organized, modern, competitive, and worthy of the players who make the SFGT what it is.</p>
      <p>We're excited to get it out into the world and even more excited to keep improving it.</p>
      <p><strong>The 2026 season has its home. The SFGT Tour Hub is live.</strong></p>
    `,
  },
  {
    id: "1",
    slug: "2026-enhancements-announced",
    title: "2026 Enhancements Announced",
    excerpt:
      "The SFGT is leveling up for 2026 with Anchor Days, a bigger prize pool, a new Tour Hub, Round Recap integration, and updated membership expectations.",
    coverImage: seasonImg,
    publishDate: "2026-03-08T12:00:00Z",
    category: "Tour News",
    body: `
      <p>The 2026 SFGT season is bringing some major upgrades.</p>
      <p>After listening to player feedback and looking at how we can make the tour more competitive, more connected, and more fun to follow, we're rolling out a set of enhancements across the board this season.</p>
      <p>The biggest addition is Anchor Days. All five regular-season events will feature a dedicated Anchor Day with 6–8 consecutive tee times, giving players more chances to compete alongside each other, build camaraderie, and make the tour feel more connected week to week.</p>
      <p>We're also increasing the entry fee from $50 to $75. That extra buy-in is going directly back into the events through larger cash prizes. In 2026, each event will now feature payouts for Net 1, Net 2, and Gross winner, along with a season-long race for Most Birdies.</p>
      <p>Another major step forward is the launch of the new Tour Hub. This will be the central home for standings, schedules, event details, and season storylines. We're also partnering with Round Recap, a more detailed data engine for stats and performance, to give players a deeper look into their games and add a whole new layer to how the season is tracked.</p>
      <p>Finally, all players — new and returning — will be expected to maintain an active GHIN / NCGA membership. This helps ensure accurate handicap tracking, clean payout eligibility, and access to discounted rates for the 2026 Major.</p>
      <p>More structure. More visibility. More competition.<br />2026 is going to be the biggest SFGT season yet.</p>
    `,
  },
  {
    id: "2",
    slug: "2026-course-list-revealed",
    title: "2026 Course List Revealed",
    excerpt:
      "The 2026 SFGT schedule is here, featuring a strong mix of favorites, major venues, and season-defining tests.",
    coverImage: baylandsImg,
    publishDate: "2026-03-09T12:00:00Z",
    category: "Schedule",
    body: `
      <p>The official 2026 SFGT course list has arrived.</p>
      <p>This season's schedule brings together a balanced mix of competition styles, course personalities, and layouts that should test every part of the bag. From strategic public tracks to event-worthy favorites, the lineup was built to create a season that feels competitive, fair, and fun to follow from start to finish.</p>
      <p>The 2026 slate includes:</p>
      <ul>
        <li>Corica Park – North Course</li>
        <li>Coyote Creek – Valley Course</li>
        <li>Chardonnay Golf Club</li>
        <li>Poppy Ridge</li>
        <li>Presidio Golf Course</li>
        <li>Corica Park – South Course</li>
      </ul>
      <p>A few of these stops will serve as especially big moments on the calendar, with select events also carrying cash prize payouts, Anchor Days, and added season implications as the standings take shape.</p>
      <p>This year's mix should create a little bit of everything: scoring opportunities, tough stretches, different visual styles, and a few courses that players will absolutely want revenge on the second time around.</p>
      <p>The full schedule, event pages, payout details, and tee information will live inside the Tour Hub as the season unfolds.</p>
      <p>The courses are set.<br />Now it's time to see who shows up.</p>
    `,
  },
  {
    id: "3",
    slug: "opening-event-corica-park-north",
    title: "Opening Event: Corica Park North",
    excerpt:
      "The 2026 season starts at Corica Park North, where the first points, first payouts, and first storylines of the year will be on the line.",
    coverImage: presidioImg,
    publishDate: "2026-03-10T12:00:00Z",
    category: "Event News",
    body: `
      <p>The SFGT season officially gets underway at Corica Park North.</p>
      <p>As the first stop of the 2026 campaign, this event is about more than just one round. It's the first look at who came into the season ready, who made offseason improvements, and who wants to grab an early lead in both the standings and the storylines.</p>
      <p>The event will feature a payout date of May 2 and a prize structure of:</p>
      <ul>
        <li>Net 1: $300</li>
        <li>Net 2: $50</li>
        <li>Gross: $50</li>
      </ul>
      <p>Players will compete from the Blue tees at 6,087 yards, playing the course as a par 72.</p>
      <p>Corica North is a great opener because it demands solid all-around golf. It gives players chances to score, but it also punishes loose swings and rewards those who stay disciplined. That makes it a fitting place to start a season where every point matters.</p>
      <p>Whether you're chasing the win, trying to get off to a strong start in the standings, or just looking to put your first full round on the board, this opening event should give us an early read on the field.</p>
      <p>New season. Fresh leaderboard.<br />Let's get it rolling.</p>
    `,
  },
  {
    id: "4",
    slug: "first-anchor-day-april-4",
    title: "First Anchor Day Set for April 4",
    excerpt:
      "The first Anchor Day of the 2026 season is locked in for April 4 at Corica Park North, with 24 spots available.",
    coverImage: membersImg,
    publishDate: "2026-03-15T12:00:00Z",
    category: "Anchor Day",
    body: `
      <p>The first Anchor Day of the 2026 SFGT season is officially on the calendar.</p>
      <p>Set for April 4 at Corica Park North, this Anchor Day will bring players together across a run of consecutive tee times, making it one of the best chances of the season to compete alongside each other and feel the energy of the tour in real time.</p>
      <p>The tee times for the day are:</p>
      <ul>
        <li>9:05</li>
        <li>9:15</li>
        <li>9:25</li>
        <li>9:35</li>
        <li>9:45</li>
        <li>9:55</li>
      </ul>
      <p>That gives us 24 total spots available, with the day priced at $130 to ride.</p>
      <p>Anchor Days are one of the biggest additions to the tour this year. They're designed to create more connection between players, more visible competition, and more of a shared-event feel than the standard scattered-round format can offer. Instead of everyone playing in isolation, Anchor Days give the tour a stronger pulse.</p>
      <p>For players who want the full SFGT experience, this is the kind of day to circle. You'll get the competition, the camaraderie, and the feeling that the season is truly underway.</p>
      <p>Spots are limited, so this one should fill quickly.</p>
    `,
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
