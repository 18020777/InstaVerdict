import Svg, {Path} from "react-native-svg";

const PlusIcon = ({style}) => {
	return (
		<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" style={style}>
			<Path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" fill="none"/>
		</Svg>

	);
}
export default PlusIcon
