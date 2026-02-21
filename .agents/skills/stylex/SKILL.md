---
name: stylex
description: Hybrid StyleX skill for general StyleX authoring and Adrift-specific conventions. Use when creating, refactoring, or reviewing StyleX in React and TypeScript codebases, including defining styles, composing with stylex.props, defining variables and themes, adding keyframes, debugging static-analysis/compiler errors, and wiring typed sx style props in this repository.
---

# StyleX

Use this skill to produce compile-safe StyleX code that follows upstream StyleX guidance and local Adrift patterns.

## Workflow

1. Inspect current styling context before changing code.
2. Load `references/adrift-stylex-conventions.md` for local rules and file placement.
3. Load `references/stylex-learn.md` for API behavior and constraints.
4. Choose the smallest valid StyleX change:
   - Add styles in an existing `stylex.create` namespace when appropriate.
   - Add or reuse shared tokens in `src/lib/styles/*.stylex.ts` when the value is reusable.
   - Keep one-off component styles local to that component.
5. Compose styles with `stylex.props(...)`, placing consumer override styles (`sx`) last.
6. Validate compile safety and convention fit with `references/review-checklist.md`.
7. Run relevant checks (`bun lint`, focused tests) when behavior or API usage changes.

## Adrift Rules

- Prefer `sx` as the style extension interface for custom components.
- Use the shared `SxProp` type from `src/lib/type-assertions.ts` at component boundaries.
- Do not merge `className` for StyleX composition; use `stylex.props(...)` and `sx`.
- Reuse existing tokens in `src/lib/styles/colors.stylex.ts`, `src/lib/styles/shadows.stylex.ts`, `src/lib/styles/variables.stylex.ts`, and `src/lib/styles/keyframes.stylex.ts` before adding new ones.
- Keep dynamic values in StyleX-safe patterns:
  - Use `stylex.create` function styles for dynamic style arguments.
  - Use CSS custom properties and StyleX vars for values that must vary at runtime.
- Avoid non-static values in raw style objects.

## Debugging Rules

- If you hit `Only static values are allowed inside of a stylex.create() call`:
  - Remove forbidden patterns (object spreads, arbitrary function calls, non-StyleX imports in raw style objects).
  - Convert dynamic pieces into style functions or variables.
  - Confirm aliases are correctly configured in Vite and StyleX plugin options when importing style modules through aliases.
- For variable and theme APIs, ensure theming prerequisites are enabled in StyleX module resolution config.

## Reference Loading

- Read `references/stylex-learn.md` for upstream semantics (`create`, `props`, `defineVars`, `createTheme`, `keyframes`, static typing).
- Read `references/adrift-stylex-conventions.md` for this repo's expected file layout and composition patterns.
- Read `references/review-checklist.md` to review implementation quality before finalizing.
