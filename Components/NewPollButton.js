import {BackHandler, Button, Modal, Pressable, StyleSheet, Text, ToastAndroid, View} from "react-native";
import {Colors} from "../Utils/Colors";
import PlusIcon from "../Icons/PlusIcon";
import {useEffect, useState} from "react";
import Input from "./Input";
import MinusIcon from "../Icons/MinusIcon";
import {Endpoints} from "../Utils/Endpoints";

const NewPollButton = ({refresh}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState([])
	const [error, setError] = useState("")

	const submit = async () => {
		setError("")
		if (question.length < 3) {
			setError("Your question is too short !")
			return
		}
		if (options.length < 2) {
			setError("You need at least 2 options !")
			return
		}
		for (const option of options) {
			if (!option || option.length === 0) {
				setError("An option cant be empty")
				return
			}
		}
		const res = await fetch(Endpoints.newPoll, {
			method: "POST",
			body: JSON.stringify({
				question: question,
				options: options
			}),
			headers: {"Content-Type": "application/ld+json"}
		})
		if (res.ok) {
			ToastAndroid.show("Your post have been created !", ToastAndroid.SHORT)
			setIsOpen(false)
			refresh()
		}
	}
	const onBack = () => {
		setQuestion("")
		setError("")
		setOptions([])
		setIsOpen(false)
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
		return () => backHandler.remove();
	}, []);

	const renameOption = (i, value) => {
		setError("")
		const updatedOptions = [...options];
		updatedOptions[i] = value;
		setOptions(updatedOptions);
	}

	const removeOption = (i) => {
		setError("")
		const updatedOptions = [...options];
		updatedOptions.splice(i, 1);
		setOptions(updatedOptions);
	}

	const addOption = () => {
		setError("")
		if (options.length >= 6) setError("You cannot have more than 6 options")
		else setOptions([...options, ""])
	}

	return (
		<>
			<Pressable style={styles.container} onPress={() => setIsOpen(true)}>
				<PlusIcon style={styles.icon}/>
			</Pressable>
			<Modal animationType="fade" transparent={true} visible={isOpen}>
				<Pressable style={styles.modalBackground} onPress={() => setIsOpen(false)}/>
				<View style={styles.modal}>
					<Text style={{fontSize: 20}}>New Post</Text>
					{error && <Text style={{color: Colors.danger}}>{error}</Text>}
					<Input label="Question" value={question} onChange={x => {
						setQuestion(x)
						setError("")
					}}/>
					<View style={{width: "100%"}}>
						<Text style={{fontSize: 15}}>Options</Text>
						{options.map((option, i) => (
							<View key={i} style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								marginBottom: 5
							}}>
								<Input width="85%" value={option} onChange={value => renameOption(i, value)}/>
								<Pressable style={{paddingVertical: 5}} onPress={() => removeOption(i)}>
									<MinusIcon style={{color: Colors.danger, width: 35, height: 35}}/>
								</Pressable>
							</View>
						))}
						<Pressable style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}
						           onPress={addOption}>
							<PlusIcon style={{color: Colors.primary, width: 15, height: 15}}/>
							<Text style={{color: Colors.primary}}>
								New Option
							</Text>
						</Pressable>
					</View>
					<View style={{width: "100%", marginTop: 10}}>
						<Button title={"Create Post"} color={Colors.primary} onPress={submit}/>
					</View>
				</View>
			</Modal>
		</>
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
	modalBackground: {
		position: "absolute",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	modal: {
		width: "90%",
		backgroundColor: Colors.surface,
		padding: 25,
		gap: 15,
		top: "10%",
		alignSelf: "center",
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	}
});

export default NewPollButton
