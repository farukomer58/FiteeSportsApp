import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Platform, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as activityActions from '../../../store/actions/activityActions';
import axios from 'axios';

// Custom
import ActivityItem from '../../../components/activities/ActivityItem';
import Values from '../../../constants/Values';
import CustomText from '../../../components/native/CustomText';

export default UserActivitiesScreen = props => {
  const dispatch = useDispatch();
  const userActivities = useSelector(state => state.activities.userActivities); // Get User Activities of redux 
  const auth = useSelector(state => state.auth); // Get User Activities of redux 

  const [ownActivities, setOwnActivities] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getActivityData()
  }, [])

  const getActivityData = async () => {
    setIsFetching(true)
    const response = await dispatch(activityActions.fetchOwnActivities())
    setOwnActivities([...response.data])
    setIsFetching(false)
  }

  // Handler for redirecting to edit screen Activity
  const editActivityHandler = (id, activity) => {
    props.navigation.navigate('ManageActivity', { activityId: id, activity: activity });
  };

  // Handler for deleting activity
  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(activityActions.deleteActivity(id));
          // TODO: cascade problem, so not working compeletly
        }
      }
    ]);
  };

  if (ownActivities.length === 0) {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#313131" }}>

        <View style={{ margin: 20 }}>
          <Button style={{ width: "50%", justifyContent: "center", alignItems: "center" }} title="Create New Activity" onPress={() => props.navigation.navigate('ManageActivity')} />
        </View>
        <CustomText>No activities found, maybe start creating some?</CustomText>
      </View>
    );
  }

  // TODO Here also PAGINATION MAYBE
  return (
    <View style={styles.background} >
      <View style={{ marginHorizontal: 30, marginTop: 20 }}>
        <Button style={{ width: "50%", justifyContent: "center", alignItems: "center" }} title="Create New Activity" onPress={() => props.navigation.navigate('ManageActivity')} />
      </View>
      {/* <Button color={Values.primaryColor} onPress={() => props.navigation.navigate('Home')} style={{margin:10}}>Create New Activity</Button> */}

      <FlatList
        data={ownActivities}
        keyExtractor={item => item.id}
        onRefresh={() => getActivityData()}
        refreshing={isFetching}
        renderItem={itemData => (
          <ActivityItem
            image={"https://images.unsplash.com/photo-1562088287-bde35a1ea917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"}
            title={itemData.item.title}
            price={15}
            onSelect={() => {
              editActivityHandler(itemData.item.id, itemData.item);
            }}
          >
            <Button
              color={Values.primaryColorDark}
              title="Edit"
              onPress={() => {
                editActivityHandler(itemData.item.id, itemData.item);
              }}
            />
            <Button
              color={Values.primaryColorDark}
              title="Delete"
              onPress={deleteHandler.bind(this, itemData.item.id)}
            />
          </ActivityItem>
        )}
      />
    </View>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Your Activities',
  };
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#313131"
  },
})