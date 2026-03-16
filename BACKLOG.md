# BACKLOG

---

Epic 1 — Core Learning

Feature 1.1 — Mini-games (Basics)

- Epic 1 > Feature 1.1 > Story 1.1.1 — Counting game (🔴 Must have)
  - Acceptance criteria:
    1. Child can count objects on screen (1–20) by tapping or dragging.
    2. UI shows immediate visual feedback for each correct tap.
    3. Game reports score and accuracy at end of round.
    4. Game adapts: after 3 correct rounds, increase target range.

- Epic 1 > Feature 1.1 > Story 1.1.2 — Simple addition game (🔴 Must have)
  - Acceptance criteria:
    1. Presents addition problems with two addends appropriate for age/level.
    2. Child answers using taps, typed input, or draggable objects.
    3. Correct answers trigger short celebratory animation; incorrect answers offer a hint.
    4. Tracks attempts and displays a progress summary.

- Epic 1 > Feature 1.1 > Story 1.1.3 — Difficulty progression (🟡 Should have)
  - Acceptance criteria:
    1. System increases difficulty after defined success threshold (e.g., 3/3 correct).
    2. System decreases difficulty or offers practice when child repeatedly fails.
    3. Difficulty map is configurable per mini-game.

Feature 1.2 — Feedback & Retry Flow

- Epic 1 > Feature 1.2 > Story 1.2.1 — Encouraging failure screen (🔴 Must have)
  - Acceptance criteria:
    1. If the child fails a level, show an encouraging message with two CTAs: "Try again" and "Practice".
    2. "Try again" restarts the level and resets state to initial conditions.
    3. "Practice" suggests a simpler variant and records the suggestion in session state.
    4. The failure screen is accessible (keyboard/voice) and uses positive language.

- Epic 1 > Feature 1.2 > Story 1.2.2 — Immediate corrective hint (🟡 Should have)
  - Acceptance criteria:
    1. After an incorrect answer, a concise hint appears explaining the mistake.
    2. Hints are age-appropriate and limited to one short sentence.
    3. Hints do not reveal full solution but provide a scaffolded next step.

---

Epic 2 — Engagement & Rewards

Feature 2.1 — Rewards & Progress

- Epic 2 > Feature 2.1 > Story 2.1.1 — Sticker / badge system (🟡 Should have)
  - Acceptance criteria:
    1. Award stickers/badges for milestones (first win, 10 rounds completed, streaks).
    2. Badges are visible in a profile area and can be viewed by parent accounts.
    3. Rewards persist in session and (optionally) in user account when parental consent given.

- Epic 2 > Feature 2.1 > Story 2.1.2 — Daily streak encouragement (🟢 Nice to have)
  - Acceptance criteria:
    1. Track daily play and show unobtrusive streak UI.
    2. Provide small in-game bonus for maintaining a short streak (e.g., sticker).
    3. Streak data can be reset by parents.

Feature 2.2 — Customization & Avatars

- Epic 2 > Feature 2.2 > Story 2.2.1 — Simple avatar selection (🟢 Nice to have)
  - Acceptance criteria:
    1. Child can choose an avatar from a small, curated set of kid-friendly images.
    2. Avatar selection UI is accessible and illustrated.
    3. Avatar is displayed in game headers and reward screens but never used for tracking outside the session.

---

Epic 3 — Progress, Parents & Admin

Feature 3.1 — Progress Tracking

- Epic 3 > Feature 3.1 > Story 3.1.1 — Session-level progress summary (🔴 Must have)
  - Acceptance criteria:
    1. After a play session, show rounds completed, accuracy, and topics practiced.
    2. Summary uses simple visuals (bars/icons) and plain language for parents.
    3. Option to export or email a summary is available behind parental confirmation.

- Epic 3 > Feature 3.1 > Story 3.1.2 — Longitudinal progress (🟡 Should have)
  - Acceptance criteria:
    1. Provide a timeline of performance per skill when account storage is enabled.
    2. Allow parents/teachers to filter by skill and date range.
    3. Data retention is configurable and complies with privacy constraints.

Feature 3.2 — Content Management

- Epic 3 > Feature 3.2 > Story 3.2.1 — Admin: add/edit mini-game content (🟡 Should have)
  - Acceptance criteria:
    1. Admins can create or update problem pools for each mini-game via a simple UI or CSV upload.
    2. Changes are versioned and previewable before publishing.
    3. Published changes appear in the live game within a predictable deploy window.

---

Notes
- Each story should be broken into development tasks when ready for implementation.
- Priorities reflect a first-launch MVP (Core Learning + basic Progress) then Engagement and Admin features.

---

Epic 4 — Landing & Onboarding

Feature 4.1 — Landing page

- Epic 4 > Feature 4.1 > Story 4.1.1 — Public landing page (🔴 Must have)
  - Acceptance criteria:
    1. Landing page clearly communicates product value, target age (8–10), and primary CTAs: "Play Now" and "For Parents".
    2. Page loads responsively on desktop and tablet, and renders correctly on common mobile viewports.
    3. Includes concise privacy & COPPA notice and a link to parental consent flow.
    4. Hero section includes a short animated screenshot or illustration demonstrating a mini-game.
    5. Basic SEO metadata and analytics (privacy-safe) are present; analytics respect parental consent settings.

