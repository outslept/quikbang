import type { BangCommand } from "../../scripts/fetch-bang";

export function loadRecentBangs(): BangCommand[] {
  try {
    const saved = localStorage.getItem("recentBangs");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading recent bangs:", error);
  }
  return [];
}

export function saveRecentBangs(bangs: BangCommand[]): void {
  try {
    localStorage.setItem("recentBangs", JSON.stringify(bangs));
  } catch (error) {
    console.error("Error saving recent bangs:", error);
  }
}

export function extractSearchTerm(query: string): string {
  const bangMatch = query.match(/^!(\w+)(?:\s(.*))?$/);
  if (bangMatch) {
    return bangMatch[1];
  } else if (!query.startsWith("!")) {
    return query;
  }
  return "";
}
