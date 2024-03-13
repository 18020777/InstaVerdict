import {StatusBar} from 'expo-status-bar';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {Endpoints} from "./Utils/Endpoints";
import {Colors} from "./Utils/Colors";
import Poll from "./Components/Poll";

export default function App() {
  const [polls, setPolls] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const fetchPolls = async () => {
    const res = await fetch(Endpoints.listPolls)
    if (res.ok) {
      const json = await res.json()
      setPolls(json["hydra:member"])
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPolls()
    setRefreshing(false)
  };

  useEffect(() => {
    fetchPolls()
  }, [])

  return (
      <View style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <StatusBar style="auto"/>
        {polls ? polls.map(poll => <Poll poll={poll} key={poll.id}/>) : <Text>Loading</Text>}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    color: Colors.onSurface,
    flex: 1,
    alignItems: 'center',
    gap: 25,
    paddingVertical: 50,
  }
});
