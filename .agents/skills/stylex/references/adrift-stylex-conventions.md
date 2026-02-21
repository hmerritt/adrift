# Adrift StyleX Conventions

## Table of contents

- Scope
- Key files
- Component API conventions
- Style composition conventions
- Shared token conventions
- Build/compiler conventions
- Known gaps and migration targets
- Quick implementation playbook

## Scope

Apply these rules for work inside this repository. Use these conventions before introducing new StyleX patterns.

## Key files

- `config/stylex.ts`: custom Vite StyleX plugin integration and compile pipeline.
- `src/lib/type-assertions.ts`: shared `SxProp` type (`sx?: StyleXStyles`).
- `src/lib/styles/colors.stylex.ts`: shared color variables.
- `src/lib/styles/shadows.stylex.ts`: shared shadow variables and reusable style functions.
- `src/lib/styles/variables.stylex.ts`: general variables.
- `src/lib/styles/keyframes.stylex.ts`: shared keyframes exposed through vars.
- `src/lib/styles/mixins.stylex.ts`: shared utility style patterns.

## Component API conventions

- For reusable components, accept `sx` using `SxProp`.
- Compose style extensions through `stylex.props(...)`; do not merge `className` as a parallel style channel.
- Keep `sx` last in style composition to preserve consumer overrides.
- Keep component style API narrow. Use typed booleans/enums/limited unions at module boundaries.

Example pattern:

```tsx
type FlexProps = React.JSX.IntrinsicElements["div"] &
	SxProp & {
		center?: boolean;
	};

export const Flex = ({ sx, center = false, ...props }: FlexProps) => (
	<div {...props} {...stylex.props(styles.base, center && styles.center, sx)} />
);
```

## Style composition conventions

- Prefer explicit style keys with small focused responsibility.
- Use boolean composition in `stylex.props` for variant states.
- Use style functions when a value must come from runtime props.
- Avoid passing broad, untyped data into style functions.
- Keep responsive and state styles colocated with the style key they modify.

## Shared token conventions

- Before adding new vars, check:
    - `src/lib/styles/colors.stylex.ts`
    - `src/lib/styles/shadows.stylex.ts`
    - `src/lib/styles/variables.stylex.ts`
    - `src/lib/styles/keyframes.stylex.ts`
- Add reusable cross-component values to shared files.
- Keep local one-off values local to the component.
- Use semantic names over presentation-only names.

## Build/compiler conventions

`config/stylex.ts` includes these important constraints:

- StyleX styles are compiled and injected via `@stylex stylesheet;` replacement in `src/lib/styles/stylex.css`.
- A custom plugin error path surfaces static-analysis failures (`Only static values are allowed inside of a stylex.create() call.`).
- Alias resolution is integrated into StyleX module resolution. If style imports use aliases, aliases must resolve in both Vite and StyleX plugin options.
- Libraries include `@stylexjs/open-props` plus configured extras.

When compile errors occur:

1. Confirm values in `stylex.create` are static analyzable.
2. Confirm aliases are configured and mapped consistently.
3. Move runtime-dependent style values into safe style-function patterns or variable channels.

## Known gaps and migration targets

- `src/view/components/experimental/Loader/subComponents/DotGrid.tsx` contains an explicit TODO to replace direct `style` prop variable wiring with a more idiomatic StyleX-driven approach.
- Treat this as a migration target when touching the loader.

## Quick implementation playbook

1. Reuse existing vars and mixins first.
2. Add local `stylex.create` map with small, semantic keys.
3. Compose variants through conditional `stylex.props`.
4. Expose `sx` only when the component is intended for extension.
5. Put `sx` last.
6. Run lint/tests for changed surfaces.
