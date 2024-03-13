import React from 'react'
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../Utils/Colors";

const Input = ({label, value, onChange, width = "100%"}) => {
	return (
		<View style={{width: width}}>
			{label && <Text>{label}</Text>}
			<TextInput placeholder={label} value={value} onChangeText={onChange}
			           style={styles.input} placeholderTextColor={Colors.onSurface + "55"}/>
		</View>
	)
}
export default Input

const styles = StyleSheet.create({
	input: {
		width: "100%",
		marginTop: 3,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderColor: Colors.outline,
		borderWidth: 1,
		borderRadius: 5
	}
});
