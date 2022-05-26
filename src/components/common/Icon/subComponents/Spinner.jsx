import { memo } from "react";

const Spinner = (props) => (
	<svg
		className="spinner"
		viewBox="0 0 66 66"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<circle
			className="path"
			strokeWidth="6"
			strokeLinecap="round"
			stroke="currentColor"
			fill="none"
			cx="33"
			cy="33"
			r="30"
		></circle>
	</svg>
);

const Memo = memo(Spinner);
export default Memo;
