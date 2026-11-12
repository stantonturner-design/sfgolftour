import { describe, expect, it } from "vitest";
import { EVENTS, FINALE_CHAMPIONSHIP } from "@/data/events";
import { getChampionshipGroupPlayers } from "@/data/finale";

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
  it("advances the top 4 to a nine-hole North Course playoff", () => {
    expect(FINALE_CHAMPIONSHIP.playoffPlayers).toBe(4);
    expect(FINALE_CHAMPIONSHIP.playoffHoles).toBe(9);
    expect(FINALE_CHAMPIONSHIP.playoffCourse).toBe("North Course");
  });
  it("plays regulation on the South Course", () => {
    expect(FINALE_CHAMPIONSHIP.regulationCourse).toBe("South Course");
  });
  it("leaves unconfirmed field, times, rules, prizes, and results empty", () => {
    expect(FINALE_CHAMPIONSHIP.qualifiedPlayers).toEqual([]);
    expect(FINALE_CHAMPIONSHIP.groups).toEqual([]);
    expect(FINALE_CHAMPIONSHIP.schedule.every((item) => item.detail === null)).toBe(true);
    expect(FINALE_CHAMPIONSHIP.scoring.every((item) => item.detail === null)).toBe(true);
    expect(FINALE_CHAMPIONSHIP.rules.every((item) => item.detail === null)).toBe(true);
    expect(FINALE_CHAMPIONSHIP.prizePurse).toBeNull();
    expect(FINALE_CHAMPIONSHIP.awards.every((item) => item.detail === null)).toBe(true);
    expect(FINALE_CHAMPIONSHIP.results).toBeNull();
  });
  it("reflects field replacements and removals without displaying stale names", () => {
    const group = { id: "test", label: "Test", teeTime: null, startingInformation: null, playerIds: ["removed", "replacement"] };
    expect(getChampionshipGroupPlayers(group, [{ id: "replacement", name: "Test Player" }])).toEqual([{ id: "replacement", name: "Test Player" }]);
  });
});