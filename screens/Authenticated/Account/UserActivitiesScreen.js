import React from 'react';
import { View, Text, FlatList, Button, Platform, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as activityActions from '../../../store/actions/activityActions';

// Custom
import ActivityItem from '../../../components/activities/ActivityItem';
import Values from '../../../constants/Values';

export default UserActivitiesScreen = props => {
  const dispatch = useDispatch();
  const userActivities = useSelector(state => state.activities.userActivities); // Get User Activities of redux 

  // Handler for redirecting to edit screen Activity
  const editActivityHandler = id => {
    props.navigation.navigate('ManageActivity', { activityId: id });
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
        }
      }
    ]);
  };

  if (userActivities.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No activities found, maybe start creating some?</Text>
      </View>
    );
  }


  // TODO Here also PAGINATION MAYBE
  return (
    <FlatList
      data={userActivities}
      keyExtractor={item => item.id}
      style={styles.background}
      renderItem={itemData => (
        <ActivityItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editActivityHandler(itemData.item.id);
          }}
        >
          <Button
            color={Values.primaryColorDark}
            title="Edit"
            onPress={() => {
              editActivityHandler(itemData.item.id);
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
    backgroundColor: "#313131"
  },
})