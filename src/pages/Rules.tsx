import { Info, ScrollText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Rules = () => (
  <div className="container max-w-3xl lg:max-w-5xl py-10 md:py-16 px-4">
    {/* Header */}
    <div className="flex items-center gap-3">
      <ScrollText className="h-8 w-8 text-primary" />
      <h1 className="font-display text-3xl md:text-4xl font-bold">SFGT Rules</h1>
    </div>
    <p className="mt-2 text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
      A permanent reference for official rounds, scoring, payouts, and on-course expectations throughout the season.
    </p>
    <p className="mt-2 text-xs md:text-sm text-muted-foreground/70 italic">
      Quick reminder: event-specific payout dates, prize details, and tee sheet information are listed on each event page.
    </p>

    {/* Quick Tour Overview Callout */}
    <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4 md:p-5">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-4 w-4 text-primary shrink-0" />
        <span className="font-semibold text-sm md:text-base">How SFGT Works</span>
      </div>
      <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
        <li>SFGT is a season-long tour made up of individual events.</li>
        <li>Players may complete their official round on their own schedule during each event.</li>
        <li>Before teeing off, you must declare which round will be your official tour round.</li>
        <li>Official rounds must be played with at least one SFGT member and submitted with a clear scorecard.</li>
        <li>Rounds submitted after the payout cutoff may still earn points, but not cash prizes.</li>
      </ul>
    </div>

    {/* Accordion Sections */}
    <Accordion type="multiple" className="mt-8 space-y-1">
      {/* 1 — Overview */}
      <AccordionItem value="overview" className="border rounded-lg px-4 md:px-5">
        <AccordionTrigger className="text-sm md:text-base font-semibold">1. Overview</AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-3">
          <p>SFGT is a season-long golf tour. Players may complete official rounds on their own schedule during each event.</p>
          <p>Each event contributes to the season standings through points. Each event also has a separate payout cutoff that determines cash prize eligibility.</p>
          <p>This structure means two things can be true at once:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>A round can still count for points</li>
            <li>But no longer be eligible for cash prizes</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      {/* 2 — Event Payouts & Deadlines */}
      <AccordionItem value="payouts" className="border rounded-lg px-4 md:px-5">
        <AccordionTrigger className="text-sm md:text-base font-semibold">2. Event Payouts & Deadlines</AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-1">What the payout date means</h4>
            <p>Each event has a posted payout date in the app. Cash prizes are awarded based on official rounds that are both completed and submitted before that event's payout cutoff.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Points after payout</h4>
            <p>Players may still submit an official round after the payout date and earn event points. However, rounds completed after the payout cutoff are not eligible for cash payouts.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Cash prizes</h4>
            <p>Each event includes a cash payout. To be eligible, your official round must meet all tour requirements and be completed and submitted before the event's payout cutoff.</p>
            <p className="mt-2">Cash payouts are awarded to:</p>
            <ul className="list-disc list-inside space-y-1 pl-1 mt-1">
              <li>1st Place Net</li>
              <li>2nd Place Net</li>
              <li>Lowest Gross</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Notes</h4>
            <p>Payout amount, payout date, and payout method are listed in the event details.</p>
            <p className="mt-2">If a payout-eligible finisher is later found to be ineligible because tour requirements were not met, the Committee may reassign the payout.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 3 — Official Round Requirements */}
      <AccordionItem value="requirements" className="border rounded-lg px-4 md:px-5">
        <AccordionTrigger className="text-sm md:text-base font-semibold">3. Official Round Requirements</AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-4">
          <p>For a round to count for points — and to be eligible for cash if submitted before the cutoff — it must meet all of the requirements below.</p>
          <div>
            <h4 className="font-semibold text-foreground mb-1">1) Pre-round declaration</h4>
            <p>Before teeing off, notify the SFGT Committee at least 36 hours before your tee time that the round will be your official round for that event.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">2) Play with a tour member</h4>
            <p>Your official round must be played with at least one other SFGT member.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">3) Scorecard submission</h4>
            <p>After finishing, submit a clear photo or screenshot of your scorecard to the SFGT Committee.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">4) Verification</h4>
            <p>The Committee will verify the scorecard and calculate the event points using the handicap on record.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">One official round per event</h4>
            <p>Each player may designate one official round per event. If you play multiple times, only the round you declared in advance will count.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Practice and warm-up rounds</h4>
            <p>Players are welcome to play practice or warm-up rounds at event courses. Those rounds do not count toward SFGT scoring unless they were declared in advance as your official tour round.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Exceptions</h4>
            <p>Exceptions are rare and must be approved by the Committee in advance.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 4 — Score Submission & Verification */}
      <AccordionItem value="submission" className="border rounded-lg px-4 md:px-5">
        <AccordionTrigger className="text-sm md:text-base font-semibold">4. Score Submission & Verification</AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-1">Submission expectation</h4>
            <p>Submit your scorecard as soon as possible after finishing. Same-day submission is preferred.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Cash cutoff</h4>
            <p>To qualify for cash, the round must be completed and the scorecard submitted before the payout cutoff listed in the event.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Points-only submissions</h4>
            <p>Rounds submitted after the payout date may still count for points, at the Committee's discretion, as long as all official round requirements were met.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Unverifiable or incomplete submissions</h4>
            <p>Missing, unclear, or unverifiable scorecards may be ruled ineligible for points and/or cash.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 5 — Handicaps, Net Scoring & Points */}
      <AccordionItem value="handicaps" className="border rounded-lg px-4 md:px-5">
        <AccordionTrigger className="text-sm md:text-base font-semibold">5. Handicaps, Net Scoring & Points</AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-1">Gross score</h4>
            <p>Gross score is the total number of strokes taken.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Net score</h4>
            <p>Net score is your gross score adjusted by the handicap strokes you receive based on your Course Handicap.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Handicap source</h4>
            <p>Players are expected to maintain an accurate handicap throughout the season whenever possible. The Tour will use the player handicap on record at the time the round is played.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Handicap integrity</h4>
            <p>If results strongly suggest that a handicap is not representative, the Committee may review it and make adjustments for fairness going forward.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Event points</h4>
            <p>Event points are calculated using a combined model:</p>
            <ul className="list-disc list-inside space-y-1 pl-1 mt-1">
              <li>Points are awarded for Net finish position</li>
              <li>Points are awarded for Gross finish position</li>
            </ul>
            <p className="mt-2 font-medium text-foreground">Total Event Points = Net Points + Gross Points</p>
            <p className="mt-2 text-xs italic text-muted-foreground/70">See the Scoring System page for the event points table.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Ties for points</h4>
            <p>There are no tiebreakers for points.</p>
            <p className="mt-2">When players tie for a position, the points for the tied places are combined and split evenly among those players.</p>
            <p className="mt-2"><span className="font-medium text-foreground">Example:</span> In a three-way tie for 3rd, the points for 3rd, 4th, and 5th are averaged, and each tied player receives that value.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 6 — On-Course Play Rules */}
      <AccordionItem value="oncourse" className="border rounded-lg px-4 md:px-5">
        <AccordionTrigger className="text-sm md:text-base font-semibold">6. On-Course Play Rules</AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-1">Tees</h4>
            <p>The required tees for each event are listed in the event details.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Maximum score per hole</h4>
            <p>To support pace of play and consistent scoring, hole scores are capped at:</p>
            <ul className="list-disc list-inside space-y-1 pl-1 mt-1">
              <li>Par 3: 8</li>
              <li>Par 4: 10</li>
              <li>Par 5: 12</li>
            </ul>
            <p className="mt-2">Once the maximum is reached, pick up and record the max.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Lost ball / out of bounds (local tour rule)</h4>
            <p>If a ball is not found, including out of bounds, SFGT uses a local rule to keep play moving.</p>
            <p className="mt-2">Drop within two club-lengths, no nearer the hole, from the nearest point where the ball is believed to have been lost or gone out of bounds. Add one penalty stroke.</p>
            <p className="mt-2">If the original ball is found, you can play it as it lies.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Putting / gimmes</h4>
            <p>If it's within a foot, pick it up and keep things moving. If it's outside 12 inches — well, you're on the SF Golf Tour, not the PGA Tour. That ain't a gimme for you. Roll 'em out.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Weather & incomplete rounds</h4>
            <p>If conditions interrupt play, follow course guidance first. The Committee will determine whether a shortened round counts for points and whether the event payout is affected based on the circumstances and available verification.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 7 — Pace of Play & Group Expectations */}
      <AccordionItem value="pace" className="border rounded-lg px-4 md:px-5">
        <AccordionTrigger className="text-sm md:text-base font-semibold">7. Pace of Play & Group Expectations</AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-4">
          <p>SFGT rounds often include players who have not met before. The expectation is simple: be friendly, be clear, and keep the round moving.</p>
          <div>
            <h4 className="font-semibold text-foreground mb-1">General pace expectations</h4>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Keep up with the group ahead. If there is a gap in front of you, your group is out of position.</li>
              <li>Play ready golf when it is safe.</li>
              <li>Limit ball searches to 3 minutes.</li>
              <li>Use the maximum-score rule to avoid blow-up holes slowing the group.</li>
              <li>Be prepared with your yardage and club when it is your turn.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">On the first tee</h4>
            <p>Introduce yourself and confirm the basics as a group:</p>
            <ul className="list-disc list-inside space-y-1 pl-1 mt-1">
              <li>Which tees are being played</li>
              <li>The gimme standard</li>
              <li>The local lost ball / out of bounds rule</li>
              <li>Who is keeping the scorecard</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Respect the course and other groups</h4>
            <p>Keep carts and bags in smart positions to help pace of play. Replace divots, fix ball marks, rake bunkers, and follow all course rules.</p>
            <p className="mt-2">If your group falls behind, take proactive steps: play ready golf, pick up at max score, and move on.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 8 — Conduct, Disputes & Committee Authority */}
      <AccordionItem value="conduct" className="border rounded-lg px-4 md:px-5">
        <AccordionTrigger className="text-sm md:text-base font-semibold">8. Conduct, Disputes & Committee Authority</AccordionTrigger>
        <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-1">Eligibility edge cases</h4>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>If you forget to declare the round before teeing off, the round may be ruled ineligible for points and/or cash.</li>
              <li>If you play without another SFGT member, the round does not qualify as an official round.</li>
              <li>If the scorecard is missing hole-by-hole detail, the round may be deemed unverifiable and ineligible.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Conduct & integrity</h4>
            <p>Players are expected to follow the Rules of Golf and course local rules unless specifically modified by these Tour Rules.</p>
            <p className="mt-2">Unsportsmanlike behavior, cheating, or repeated pace-of-play issues may result in:</p>
            <ul className="list-disc list-inside space-y-1 pl-1 mt-1">
              <li>Score adjustment</li>
              <li>Loss of points</li>
              <li>Ineligibility for payouts</li>
              <li>Removal from an event or from the Tour</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Disputes</h4>
            <p>If a rules or scoring issue comes up during or after a round, disclose it with your score submission as soon as possible.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Committee authority</h4>
            <p>The SFGT Committee is the final authority on:</p>
            <ul className="list-disc list-inside space-y-1 pl-1 mt-1">
              <li>Rule interpretations</li>
              <li>Eligibility and official round approval</li>
              <li>Score verification</li>
              <li>Standings corrections</li>
              <li>Exceptions and enforcement</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Corrections</h4>
            <p>If an error is found in scoring or standings, the Committee may correct results after review.</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export default Rules;
