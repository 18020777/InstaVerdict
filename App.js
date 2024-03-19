import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {useEffect, useState} from "react";
import {Endpoints} from "./Utils/Endpoints";
import {Colors} from "./Utils/Colors";
import Poll from "./Components/Poll";
import NewPollButton from "./Components/NewPollButton";

export default function App() {
  // state to manage the polls
  const [polls, setPolls] = useState()
  // state to manage the refreshing state
  const [refreshing, setRefreshing] = useState(false);

  // function to fetch the polls from the server
  const fetchPolls = async () => {
    const res = await fetch(Endpoints.listPolls)
    if (res.ok) {
      const json = await res.json()
      setPolls(json)
    }
  }

  // function to refresh the polls
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPolls()
    setRefreshing(false)
  };

  // we fetch the polls when the component is mounted
  useEffect(() => {
    fetchPolls()
  }, [])

  return (
      <>
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollView}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <StatusBar style="auto"/>
          {polls ?
              // if the polls are fetched, we map them to Poll components
              polls.map(poll => <Poll poll={poll} key={poll.id}/>)
              : <ActivityIndicator style={{marginTop: 25}} size="large" color={Colors.primary}/>}
        </ScrollView>
        {polls && !refreshing && <NewPollButton refresh={onRefresh}/>}
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    color: Colors.onSurface
  },
  scrollView: {
    gap: 25,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 100
  }
});
