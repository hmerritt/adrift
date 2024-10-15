import { createFileRoute } from "@tanstack/react-router";

import theme from "lib/styles";

import { DotGrid, FrostedGlass, Halo } from "view/components";

export const Route = createFileRoute("/")({
	component: IndexRoute
});

export function IndexRoute() {
	return (
		<>
			<div>
				<FrostedGlass>
					<div className={""}>
						<h1 className={""}>Adrift</h1>
						<FrostedGlass>
							<div style={{ width: 200, height: 200 }}>
								<h4>Template react app with batteries included 🔋</h4>
							</div>
						</FrostedGlass>
						{/* <Waves /> */}
					</div>
				</FrostedGlass>
			</div>

			<DotGrid position="fixed" refForMousePosition="window" spacing={40} />
		</>
	);
}

// // This will get compiled at build time into a css file.
// // Why? - Performance is *greatly* improved over something like styled-components which compiles at run time!
// const pictureFrame = css`
// 	${theme} // Import theme object - can now use all SCSS variables and mixins set in styles/theme.ts
// 	position: relative;
// 	width: 700px;
// 	height: 350px;
// 	margin: auto;
// 	display: flex;
// 	overflow: hidden;
// 	align-items: center;
// 	flex-direction: column;
// 	justify-content: center;
// 	box-shadow: shadowBlock($blue-400);

// 	h4 {
// 		font-style: italic;
// 		padding: 1rem;
// 		opacity: 0.8;
// 		font-size: 1.5rem;
// 	}
// `;

// const header = css`
// 	${theme}
// 	text-transform: lowercase;
// 	font-style: italic;
// 	font-size: 10rem;
// 	font-weight: thin;
// 	color: $blue-100;
// 	text-shadow: shadowBlock($blue-400);
// `;
