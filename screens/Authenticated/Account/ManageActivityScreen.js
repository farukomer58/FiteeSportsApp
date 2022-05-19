import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native';
import { Button } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import * as activityActions from '../../../store/actions/activityActions';

// Custom
import CustomText from '../../../components/native/CustomText';

export default ManageActivityScreen = props => {
  const dispatch = useDispatch();

  const activityId = props.route.params ? props.route.params.activityId : null;
  const editedActivity = useSelector(state => state.activities.userActivities.find(activity => activity.id === activityId));

  const [title, setTitle] = useState(editedActivity ? editedActivity.title : '');
  const [imageUrl, setImageUrl] = useState(editedActivity ? editedActivity.imageUrl : '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(editedActivity ? editedActivity.description : '');

  // Handler when Submited save or edit Activity
  const saveOrUpdateActivity = useCallback(async () => {

    let body = {
      title: title,
      description: description,
      prices: [
        { lessons: 1, price: 10, discount: 0 },
        { lessons: 5, price: 27, discount: 20 }
      ],
      categories: [],
      activityDates: [
        { date: "2022-05-26 18:00", maxParticipants: 15 },
        { date: "2022-05-29 18:00", maxParticipants: 15 }
      ]
    }
    const response = await dispatch(activityActions.createActivity(body))
    console.log(response.status)
  }, []);


  return (
    <ScrollView style={styles.background}>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <CustomText style={styles.label}>Title</CustomText>
          <TextInput
            style={styles.input}
            value={title}
            color="white"
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <CustomText style={styles.label}>Image URL</CustomText>
          <TextInput
            style={styles.input}
            value={imageUrl}
            color="white"
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {editedActivity ? null : (
          <View style={styles.formControl}>
            <CustomText style={styles.label}>Price</CustomText>
            <TextInput
              style={styles.input}
              value={price}
              color="white"
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <CustomText style={styles.label}>Description</CustomText>
          <TextInput
            style={styles.input}
            value={description}
            color="white"
            onChangeText={text => setDescription(text)}
          />
        </View>
        <Button colorScheme="green" style={styles.customButton} onPress={saveOrUpdateActivity} key={1}>{activityId ? "Edit Activity" : "Add Activity"}</Button>
      </View>
    </ScrollView>
  );
};

export const screenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.activityId ? 'Edit Activity' : 'Add Activity'
  };
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "#313131"
  },

  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'nunito-regular-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  customButton: {
    // width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
});
