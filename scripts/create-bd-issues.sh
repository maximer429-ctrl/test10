#!/usr/bin/env bash
set -euo pipefail

echo "This script creates bd issues for the frontend work. Run this inside the project's development container."

PARENT_JSON=$(bd create "Frontend: Implement frontend scaffold from shell mockups" \
  --description "Create a Vue + Vite scaffold from mockups/app-shell.html and mockups/1.1.1-counting-game.html. Tasks: tokens, styles, components, game logic, dev container. Implement inside container per AGENTS.md." \
  -t feature -p 1 --json)

echo "Parent creation response: $PARENT_JSON"
PARENT_ID=$(echo "$PARENT_JSON" | sed -n 's/.*"id"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')
if [ -z "$PARENT_ID" ]; then
  echo "Failed to parse parent id from bd output:" >&2
  echo "$PARENT_JSON" >&2
  exit 1
fi

echo "Parent issue id: $PARENT_ID"

bd create "Tokens: Map design tokens to CSS variables" --description "Extract tokens from design-system/TOKENS.md into src/styles/tokens.css and verify mapping." -t task -p 2 --deps discovered-from:$PARENT_ID --json
bd create "Styles: Implement global component styles" --description "Create src/styles/components.css for buttons, cards, inputs, focus states." -t task -p 2 --deps discovered-from:$PARENT_ID --json
bd create "Components: Port mockup markup into Vue components" --description "Add App.vue, pages/Game.vue, and small presentational components." -t task -p 2 --deps discovered-from:$PARENT_ID --json
bd create "Game: Add counting-game interactivity and state" --description "Implement basic game logic, tap interactions, and progress tracking in pages/Game.vue." -t task -p 2 --deps discovered-from:$PARENT_ID --json
bd create "Infra: Add dev container and Dockerfile" --description "Add Dockerfile or .devcontainer to enforce containerized development per AGENTS.md." -t chore -p 2 --deps discovered-from:$PARENT_ID --json
bd create "Workflow: Commit, bd updates, and push" --description "Use bd to claim, update statuses, and push changes to remote; ensure git sync." -t task -p 3 --deps discovered-from:$PARENT_ID --json

echo "Marking parent issue $PARENT_ID as in_progress"
bd update $PARENT_ID --status in_progress --json

echo "All issues created and parent claimed (in_progress)."
