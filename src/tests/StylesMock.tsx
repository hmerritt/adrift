import { css } from "@linaria/core";

import theme from "styles";

/**
 * Mini mock component to test `@linaria` theme injection works.
 *
 * Test in `styles/index.test.tsx`.
 */

export const StylesMock = () => (
	<div className={container}>
		<h1 className={title}>Title</h1>
		<h2 className={subTitle}>Sub Title</h2>
	</div>
);

const container = css`
	${theme}
	@include container(567px);
`;

const title = css`
	${theme}
	color: $red-500;
`;

const subTitle = css`
	${theme}
	color: $yellow-200;
`;

export default StylesMock;
