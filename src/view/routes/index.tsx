import { createFileRoute } from "@tanstack/react-router";

import { DotGrid, FrostedGlass, Fullscreen, Stack, Waves } from "view/components";

import styles from "./index.module.scss";

export const Route = createFileRoute("/")({
	component: IndexRoute
});

export function IndexRoute() {
	return (
		<>
			<Stack spacing={15}>
				<Fullscreen
					center
					zIndex={1}
					position="relative"
					padding="1rem 2rem"
					style={{ height: "70vh" }}
				>
					<FrostedGlass>
						<div className={styles["picture-frame"]}>
							<h1 className={styles["header"]}>Adrift</h1>
							<FrostedGlass>
								<h4>Template react app with batteries included 🔋</h4>
							</FrostedGlass>
							<Waves />
						</div>
					</FrostedGlass>
				</Fullscreen>
			</Stack>

			<DotGrid position="fixed" refForMousePosition="window" spacing={50} />
		</>
	);
}
