const Flex = ({ row = false, center = false, grow = false, shrink = false, wrap = false, vc = false, hc = false, ...props }) => {
	console.time("Flex");
	props.className = props?.className ? props.className += ' flex' : 'flex';
	row && (props.className += ' row');
	center && (props.className += ' center');
	grow && (props.className += ' grow');
	shrink && (props.className += ' shrink');
	wrap && (props.className += ' wrap');
	vc && (props.className += ' v-center');
	hc && (props.className += ' h-center');
	console.timeEnd("Flex");
	return <div {...props} />;
};

export default Flex;
