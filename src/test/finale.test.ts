import { describe, expect, it } from "vitest";
import { EVENTS, FINALE_CHAMPIONSHIP } from "@/data/events";
import { getFinaleActions } from "@/components/events/FinaleEventCard";

describe("Finale championship details", () => {
  it("updates the single existing Finale", () => {
    expect(EVENTS.filter((evt) => evt.isFinale)).toHaveLength(1);
  });
  it("takes place on November 14, 2026", () => {
    expect(FINALE_CHAMPIONSHIP.date).toBe("November 14, 2026");
    expect(FINALE_CHAMPIONSHIP.weekday).toBe("Saturday");
  });
  it("has 24 qualifying players", () => {
    expect(FINALE_CHAMPIONSHIP.qualifyingPlayers).toBe(24);
  });
  it("has an 18-hole championship round", () => {
    expect(FINALE_CHAMPIONSHIP.roundHoles).toBe(18);
  });
  it("advances the top 4 to a four-hole playoff", () => {
    expect(FINALE_CHAMPIONSHIP.playoffPlayers).toBe(4);
    expect(FINALE_CHAMPIONSHIP.playoffHoles).toBe(4);
  });
  it("does not activate unavailable destinations", () => {
    const finale = EVENTS.find((evt) => evt.isFinale);
    if (!finale) throw new Error("Existing Finale is missing");
    expect(getFinaleActions(finale)).toEqual({ scorecard: null, teeSheet: null, roundRecap: null });
  });
});