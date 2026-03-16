#!/usr/bin/env bash
set -euo pipefail

echo "This script creates persistence-related bd issues. Run it on the HOST (not inside the container)."
echo "It writes raw JSON outputs to .beads/persistence_issues.jsonl"

mkdir -p .beads

(
bd create "Persist: Profile across sessions with parental consent" --description "Persist user profile and parental consent flags across sessions; ensure consent gating and secure storage." -t task -p 1 --json
bd create "Persist: Session stats and recent summaries" --description "Store session statistics and recent activity summaries persistently for resume and analytics." -t task -p 2 --json
bd create "Feature: Multiple profiles & profile switching UI" --description "Add UI for creating, selecting, and switching between multiple profiles, including avatar and name." -t feature -p 2 --json
bd create "Feature: Data export & deletion (parental controls / GDPR)" --description "Implement export and deletion workflows for user data with parental controls and GDPR compliance." -t feature -p 1 --json
bd create "Task: Server-backed persistence migration plan" --description "Plan migration from client-only storage to server-backed persistence, including data model, API, and migration steps." -t task -p 2 --json
bd create "Chore: Add automated tests for persistence behavior" --description "Add unit and integration tests to cover persistence, consent, and migration behavior." -t chore -p 3 --json
)
> .beads/persistence_issues.jsonl

echo "Created issues. Raw outputs saved to .beads/persistence_issues.jsonl"

echo "Tip: run 'cat .beads/persistence_issues.jsonl' to view the JSON lines, then use 'jq -r' to extract ids."

exit 0
