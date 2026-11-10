"use client";

import { useSyncExternalStore } from "react";

/*
 * Preview-only record of the decisions made while clicking around, so Today's
 * goal fills when a decision is really made on Replies or AI activity.
 * Survives moving between pages and resets on a full reload.
 */
export type Outcome = "approved" | "archived" | "dismissed";
type Decisions = Record<string, Outcome>;

const EMPTY: Decisions = {};
let decisions: Decisions = EMPTY;
const listeners = new Set<() => void>();

function publish(next: Decisions) {
  decisions = next;
  listeners.forEach((l) => l());
}

export function recordDecision(id: string, outcome: Outcome) {
  publish({ ...decisions, [id]: outcome });
}

export function clearDecision(id: string) {
  const next = { ...decisions };
  delete next[id];
  publish(next);
}

export function clearDecisions() {
  publish(EMPTY);
}

export function getDecisions() {
  return decisions;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useDecisions() {
  return useSyncExternalStore(subscribe, getDecisions, () => EMPTY);
}
