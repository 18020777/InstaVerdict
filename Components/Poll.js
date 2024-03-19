import {ActivityIndicator, Button, StyleSheet, Text, View} from "react-native";
import {Colors} from "../Utils/Colors";
import {useEffect, useState} from "react";
import {Storage} from "../Utils/Storage";
import {Endpoints} from "../Utils/Endpoints";

const Poll = ({poll}) => {
    // state to manage the vote
    const [vote, setVote] = useState()
    // state to manage the loading state
    const [isLoading, setIsLoading] = useState(false)

    // function to check if the user has already voted
    const checkVote = async () => {
        // we get the saved vote from the storage
        const savedVote = await Storage.get("poll-" + poll.id)
        // if the vote is saved, we set it to the state
        setVote(savedVote ? Number(savedVote) : null)
    }

    // function to add a vote
    const addVote = async (index) => {
        setIsLoading(true)
        try {
            // we increment the vote count for the selected option
            const votes = poll.votes
            votes[index] += 1
            // we send a PATCH request to the server to update the poll
            const res = await fetch(Endpoints.vote(poll.id, index), {
                method: "PATCH",
                headers: {"Content-Type": "application/json"}
            })
            // if the request is successful, we set the vote to the state and save it to the storage
            if (res.ok) {
                setVote(index)
                await Storage.set("poll-" + poll.id, index.toString())
            }
        } catch (e) {
            // if an error occurs, we log it
            console.log(e)
        }
        setIsLoading(false)
    }

    // we check if the user has already voted when the component is mounted
    useEffect(() => {
        checkVote()
    }, [])

    // poll component
    return (
        <View style={styles.questionContainer}>
            <Text style={styles.question}>{poll.question}</Text>
            {isLoading ? (
                <ActivityIndicator style={{marginVertical: 10}} color={Colors.primary}/>
            ) : vote !== undefined && poll.options.map((option, i) => vote !== null ? (
                // if the user has already voted, we show the votes count
                <View key={i} style={{...styles.vote, ...(i === vote ? styles.voted : styles.unvoted)}}>
                    <Text>{option}</Text>
                    <Text>{poll.votes[i]}</Text>
                </View>
            ) : (
                // if the user has not voted, we show the vote buttons
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
