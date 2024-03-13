import {Pressable, StyleSheet} from "react-native";
import {Colors} from "../Utils/Colors";
import PlusIcon from "../Icons/PlusIcon";

const NewPollButton = () => {
	return (
		<Pressable style={styles.container} onPress={() => {
		}}>
			<PlusIcon style={styles.icon}/>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 16,
		right: 16,
		backgroundColor: Colors.primary,
		borderRadius: 20,
		padding: 16,
		shadowOffset: "10px",
		shadowColor: Colors.onSurface
	},
	icon: {
		color: Colors.onPrimary,
		height: 36,
		width: 36
	},
});

export default NewPollButton
