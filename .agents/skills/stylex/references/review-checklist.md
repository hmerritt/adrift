# StyleX Review Checklist

Use this checklist before finalizing StyleX work.

## 1) Trigger and scope fit

- Confirm the task is StyleX-related and not better solved by unrelated styling systems.
- Confirm any reusable component style API uses `sx` conventions where appropriate.

## 2) Compile-safety checks

- Confirm style objects are statically analyzable.
- Confirm no raw runtime-only values are embedded in static style declarations.
- Confirm dynamic style requirements are handled with style functions or variables.

## 3) Composition checks

- Confirm style composition uses `stylex.props(...)`.
- Confirm overrides are intentionally ordered.
- Confirm `sx` is last in reusable components.
- Confirm no `className` merge path was added for StyleX composition.
- Confirm no `style` merge path was added for StyleX composition.

## 4) Token and theme checks

- Confirm existing shared vars were reused before adding new tokens.
- Confirm new shared vars were placed in the right `src/lib/styles/*.stylex.ts` file.
- Confirm theme or variable changes are semantic and consistent.

## 5) Component boundary checks

- Confirm module boundaries remain strictly typed.
- Confirm style function inputs are constrained (no broad `any`-like inputs).
- Confirm style API does not expose unnecessary knobs.

## 6) Regression checks

- Confirm interaction states and responsive behavior still match expected UI behavior.
- Confirm no accidental layout drift from style ordering changes.
- Confirm known migration targets were not worsened (for example DotGrid inline style TODO area).

## 7) Verification commands

- Run `bun lint` for style/plugin/type checks.
- Run targeted tests for touched components.
- Run broader tests when shared style utilities or tokens were changed.

## 8) Acceptance criteria

- Build passes StyleX compile path.
- Lint and relevant tests pass.
- New behavior is covered by tests when behavior changed.
- The result follows both upstream StyleX semantics and Adrift local conventions.
