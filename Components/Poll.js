import {Button, StyleSheet, Text, View} from "react-native";
import {Colors} from "../Utils/Colors";
import {useEffect, useState} from "react";
import {Storage} from "../Utils/Storage";
import {Endpoints} from "../Utils/Endpoints";

const Poll = ({poll}) => {
	const [vote, setVote] = useState()
	const [isLoading, setIsLoading] = useState(false)

	const checkVote = async () => setVote(Number(await Storage.get("poll-" + poll.id)))

	const addVote = async (index) => {
		setIsLoading(true)
		try {
			const votes = poll.votes
			votes[index] += 1
			const res = await fetch(Endpoints.vote(poll.id), {
				method: "PATCH",
				body: JSON.stringify({votes: votes}),
				headers: {
					"Content-Type": "application/merge-patch+json",
				}
			})
			if (res.ok) {
				await Storage.set("poll-" + poll.id, index.toString())
				setVote(index)
			}
		} catch (e) {
			console.log(e)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		checkVote()
	}, [])

	return (
		<View style={styles.questionContainer}>
			<Text style={styles.question}>{poll.question}</Text>
			{!isLoading && vote !== undefined && poll.options.map((option, i) => vote ? (
				<View key={i} style={{...styles.vote, ...(i === vote ? styles.voted : styles.unvoted)}}>
					<Text>{option}</Text>
					<Text>{poll.votes[i]}</Text>
				</View>
			) : (
				<Button key={i} title={option} color={Colors.primary} onPress={() => addVote(i)}/>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	questionContainer: {
		padding: 10,
		borderColor: Colors.outline,
		borderWidth: 1,
		borderRadius: 10,
		width: "90%",
		display: "flex",
		flexDirection: "column",
		gap: 10,
	},
	question: {
		fontSize: 15,
		fontWeight: "bold"
	},
	vote: {
		width: "100%",
		padding: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 5,
	},
	unvoted: {
		borderColor: Colors.outline + "AA",
		borderWidth: 1,
	},
	voted: {
		backgroundColor: Colors.primary + "55"
	}
})

export default Poll
