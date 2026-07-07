import coricaImg from "@/assets/courses/corica-north.jpg";
import chardonnayImg from "@/assets/courses/chardonnay.jpg";
import poppyImg from "@/assets/courses/poppy-ridge.jpg";
import presidioImg from "@/assets/courses/presidio.jpg";
import finaleImg from "@/assets/courses/finale.jpg";

export interface EventData {
  name: string;
  subtitle: string;
  image: string;
  payoutDate: string;
  anchorDay: string;
  prizes: { place: string; amount: string }[];
  teeSheet: string;
  handicaps: string;
  results: string;
  courseUrl?: string;
  note?: string;
  isFinale?: boolean;
}

export const EVENTS: EventData[] = [
  {
    name: "Corica",
    subtitle: "The North Course",
    image: coricaImg,
    payoutDate: "May 2",
    anchorDay: "April 4",
    prizes: [
      { place: "Net 1", amount: "$300" },
      { place: "Net 2", amount: "$50" },
      { place: "Gross", amount: "$50" },
    ],
    teeSheet: "#",
    handicaps: "",
    results: "https://app.roundrecap.com/rounds/2df0ef64-663e-4ea0-9c11-b8d3623af707",
    courseUrl: "https://www.coricapark.com/",
  },
  {
    name: "Coyote Creek",
    subtitle: "The Valley Course",
    image: "https://playeasy.com/cdn-cgi/image/width=1200,fit=scale-down,format=auto,quality=85/https://storage.playeasy.com/facility-mgmt/060f01d2-5808-4a3f-b62d-d2d9e884398c",
    payoutDate: "June 13",
    anchorDay: "May 31",
    prizes: [
      { place: "Net 1", amount: "$300" },
      { place: "Net 2", amount: "$50" },
      { place: "Gross", amount: "$50" },
    ],
    teeSheet: "#",
    handicaps: "",
    results: "https://roundrecap.com/g/sfgt/rounds/2026-cayote-creek-valley-course-481bed80-e95b-49be-babf-576e8710ff0d",
    courseUrl: "https://coyotecreekgolf.com/",
  },
  {
    name: "Chardonnay",
    subtitle: "",
    image: chardonnayImg,
    payoutDate: "August 1",
    anchorDay: "July 11",
    prizes: [
      { place: "Net 1", amount: "$TBD" },
      { place: "Net 2", amount: "$TBD" },
      { place: "Gross", amount: "$TBD" },
    ],
    teeSheet: "#",
    handicaps: "",
    results: "",
    courseUrl: "https://www.chardonnaygolfclub.com/",
  },
  {
    name: "Poppy Ridge",
    subtitle: "",
    image: poppyImg,
    payoutDate: "September 26",
    anchorDay: "TBD",
    prizes: [
      { place: "Net 1", amount: "$TBD" },
      { place: "Net 2", amount: "$TBD" },
      { place: "Gross", amount: "$TBD" },
    ],
    teeSheet: "#",
    handicaps: "",
    results: "",
    courseUrl: "https://poppyridgegolf.ncga.org/",
  },
  {
    name: "Presidio",
    subtitle: "",
    image: presidioImg,
    payoutDate: "November 7",
    anchorDay: "TBD",
    prizes: [
      { place: "Net 1", amount: "$TBD" },
      { place: "Net 2", amount: "$TBD" },
      { place: "Gross", amount: "$TBD" },
    ],
    teeSheet: "#",
    handicaps: "",
    results: "",
    courseUrl: "https://www.presidiogolf.com/",
  },
  {
    name: "Finale",
    subtitle: "Details coming soon",
    image: finaleImg,
    payoutDate: "TBD",
    anchorDay: "TBD",
    prizes: [],
    teeSheet: "#",
    handicaps: "",
    results: "",
    isFinale: true,
  },
];

/**
 * Returns the index of the next/current event based on payoutDate (assumed in current year).
 * Falls back to 0 if all events are past or dates can't be parsed.
 */
export function getCurrentEventIndex(events: EventData[] = EVENTS, now: Date = new Date()): number {
  const year = now.getFullYear();
  for (let i = 0; i < events.length; i++) {
    const d = new Date(`${events[i].payoutDate} ${year}`);
    if (!isNaN(d.getTime()) && d.getTime() >= now.getTime()) return i;
  }
  return 0;
}
