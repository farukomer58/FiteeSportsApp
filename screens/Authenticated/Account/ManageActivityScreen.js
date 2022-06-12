import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert
} from 'react-native';
import { Button } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import * as activityActions from '../../../store/actions/activityActions';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

// Custom
import CustomText from '../../../components/native/CustomText';
import CustomDefaultInput from '../../../components/UI/CustomDefaultInput';
import Styles from '../../../constants/Styles';
import IconButton from '../../../components/IconButton/IconButton';
import DatePicker from 'react-native-datepicker'

const formReducer = (state, action) => {
  if (action.type === "UPDATE") {
    const updatedValues = { ...state.inputValues, [action.input]: action.value }
    const updatedValidities = { ...state.inputValidities, [action.input]: action.isValid }

    let formIsValid = true
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key]
    }

    return { ...state, inputValues: updatedValues, inputValidities: updatedValidities, formIsValid: formIsValid }
  }
  return state;
}
export default ManageActivityScreen = props => {
  const dispatch = useDispatch();

  const activityId = props.route.params ? props.route.params.activityId : null;
  const [activity, setActivity] = useState(props.route.params ? props.route.params.activity : null);

  const [prices, setPrices] = useState(activity ? activity.activityPrices : [
    { lessons: 1, price: 10.00, discount: "10" },
  ])

  const [activityDates, setActivityDates] = useState(activity ? activity.activityDates : [
    { date: "2022-05-26 18:00", maxParticipants: 15 },
    { date: "2022-05-29 18:00", maxParticipants: 15 }
  ])

  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: activity ? activity.title : "",
      imageUrl: activity ? activity.coverImage : "",
      description: activity ? activity.description : "",
      address: activity ? activity.activityAddress : "",
      city: activity ? activity.city : "",
    },
    inputValidities: {
      title: activity ? activity.title : false,
      imageUrl: activity ? activity.coverImage : false,
      description: activity ? activity.description : false,
      address: activity ? activity.activityAddress : false,
      city: activity ? activity.city : false,
    },
    formIsValid: true,
  })

  const multipleFieldInputChangeHandler = (fieldName, priceIndex, value) => {
    console.log(fieldName + priceIndex)
    console.log("New Value:" + value)

    // 1. Make a shallow copy of the items
    let items = [...prices];
    console.log(items)
    items[priceIndex][fieldName] = value
    // 2. Make a shallow copy of the item you want to mutate
    // let item = { ...prices[priceIndex], [fieldName]: value };

    // item[fieldName] = value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    // items[priceIndex] = item;
    // 5. Set the state to our new copy
    setPrices(oldPrice => [...items])
  }

  const addPrice = () => {
    if (prices.length >= 5) {
      Alert.alert("Can not add more then 5 Price items")
      return
    }

    const lessonsAmount = prices[prices.length - 1].lessons + 1
    let items = [...prices, { lessons: lessonsAmount, price: null, discount: null }];
    console.log(items)
    setPrices(oldArray => [...oldArray, { lessons: lessonsAmount, price: null, discount: null }])
  }
  const removePrice = (priceIndex) => {
    const pricesArray = [...prices]
    const removedArray = pricesArray.splice(priceIndex, 1)
    setPrices(pricesArray)
  }
  const multipleFieldInputChangeHandlerDate = (fieldName, index, value) => {
    console.log(fieldName + index)
    console.log(activityDates[index].date)
    console.log("New Value:" + value)

    // 1. Make a shallow copy of the items
    let items = [...activityDates];
    // 2. Make a shallow copy of the item you want to mutate

    items[index][fieldName] = value


    // let item = { ...activityDates[index] };
    // 3. Replace the property you're intested in
    // item[fieldName] = value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    // items[index] = item;
    // 5. Set the state to our new copy
    setActivityDates(oldDate => [...items])

  }
  const addDate = () => { setActivityDates(oldDate => [...oldDate, { date: "", maxParticipants: "" }]) }
  const removeDate = (index) => {
    const datesArray = [...activityDates]
    const removedArray = datesArray.splice(index, 1)
    setActivityDates(datesArray)
  }

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputIsValid) => {
    dispatchForm({ type: "UPDATE", value: inputValue, isValid: inputIsValid, input: inputIdentifier })
  }, [dispatchForm])


  // Handler when Submited save or edit Activity
  const saveOrUpdateActivity = async () => {

    // Check Form validity
    // if (formState.formIsValid) {
    //   Alert.alert("Please Enter All Fields Correctly")
    //   return
    // }

    let body = {
      title: formState.inputValues.title,
      description: formState.inputValues.description,
      activityAddress: formState.inputValues.address,
      city: formState.inputValues.city,
      prices: prices,
      categories: [],
      activityDates: activityDates
    }

    const response = await dispatch(activity ? activityActions.updateActivity(body, activityId) : activityActions.createActivity(body))

    if (response.status === 201 || response.status === 200) {
      props.navigation.replace("UserActivities")
    }
  };

  useEffect(() => {
    // const activityFetched = props.route.params ? props.route.params.activity : null;
    // console.log(activityFetched)
  }, [])

  return (
    <ScrollView style={styles.background}>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <CustomText style={styles.label}>Title</CustomText>
          <CustomDefaultInput
            // leftElement={<MaterialIcons name="account-circle" size={32} color="white" style={styles.inputIcon} />}
            errorText="Please Enter a valid Title"
            color="white"
            onInputChange={inputChangeHandler.bind(this, "title")}
            required
            testId="titleInput"
            initialValue={formState.inputValues.title}
            intialValidity={formState.inputValidities.title}
          />

        </View>
        <View style={styles.formControl}>
          <CustomText style={styles.label}>Image URL</CustomText>
          <CustomDefaultInput
            // leftElement={<MaterialIcons name="account-circle" size={32} color="white" style={styles.inputIcon} />}
            intialValidity={true}
            initialValue={formState.inputValues.imageUrl}
            errorText="Please Enter a ImageUrl"
            onInputChange={inputChangeHandler.bind(this, "imageUrl")}
            color="white"
            required
            testId="imageInput"
          />

        </View>
        <View style={styles.formControl}>
          <CustomText style={styles.label}>Price</CustomText>

          {/* Map By Price Values */}
          {prices.map((price, index) => (
            <View key={price.lessons} style={Styles.flexDirectionRowSpace}>
              <TextInput
                placeholder="Lessons"
                style={styles.input}
                placeholderTextColor="#C6C6C6"
                color="white"
                keyboardType='numeric'
                value={prices[index].lessons ? prices[index].lessons.toString() : prices[index].lessons}
                onChangeText={(value) => { multipleFieldInputChangeHandler("lessons", index, value) }}
              />
              <TextInput
                placeholder="Price"
                style={styles.input}
                color="white"
                keyboardType='numeric'
                placeholderTextColor="#C6C6C6"
                value={prices[index].price ? prices[index].price.toString() : prices[index].price}
                onChangeText={(value) => { multipleFieldInputChangeHandler("price", index, value) }}
              />
              <TextInput
                color="white"
                placeholder="Discount"
                style={styles.input}
                keyboardType='numeric'
                placeholderTextColor="#C6C6C6"
                value={prices[index].discount ? prices[index].discount.toString() : prices[index].discount}
                onChangeText={(value) => { multipleFieldInputChangeHandler("discount", index, value) }}
              />

              {/* Remove or Add Icon */}
              {index === 0 ? (<Icon
                size={23}
                name='plus'
                type='font-awesome'
                color='green'
                onPress={() => addPrice()} />) : (<Icon
                  size={23}
                  name='eraser'
                  type='font-awesome'
                  color='red'
                  onPress={() => removePrice(index)} />)}
            </View>
          ))}

        </View>

        <View style={styles.formControl}>
          <CustomText style={styles.label}>Description</CustomText>
          <CustomDefaultInput
            // leftElement={<MaterialIcons name="account-circle" size={32} color="white" style={styles.inputIcon} />}
            errorText="Please Enter a Description"
            color="white"
            onInputChange={inputChangeHandler.bind(this, "description")}
            required
            testId="descriptionInput"
            intialValidity={formState.inputValidities.description}
            initialValue={formState.inputValues.description}
          />
        </View>

        <View style={styles.formControl}>
          <CustomText style={styles.label}>Address</CustomText>
          <CustomDefaultInput
            // leftElement={<MaterialIcons name="account-circle" size={32} color="white" style={styles.inputIcon} />}
            errorText="Please Enter a Address"
            color="white"
            onInputChange={inputChangeHandler.bind(this, "address")}
            required
            testId="addressInput"
            intialValidity={formState.inputValidities.address}
            initialValue={formState.inputValues.address}
          />

        </View>
        <View style={styles.formControl}>
          <CustomText style={styles.label}>City</CustomText>
          <CustomDefaultInput
            // leftElement={<MaterialIcons name="account-circle" size={32} color="white" style={styles.inputIcon} />}
            color="white"
            errorText="Please Enter a City"
            onInputChange={inputChangeHandler.bind(this, "city")}
            required
            testId="cityInput"
            intialValidity={formState.inputValidities.city}
            initialValue={formState.inputValues.city}
          />

        </View>
        {/* COULD: Categories dropdown */}
        <View style={styles.formControl}>
          <CustomText style={styles.label}>Activity Dates</CustomText>

          {/* Map By ActivityDates Values */}
          {activityDates.map((activity, index) => (
            <View key={activity.date} style={Styles.flexDirectionRowSpace}>
              <TextInput
                placeholder="Date"
                style={{ ...styles.input, width: "45%" }}
                placeholderTextColor="#C6C6C6"
                color="white"
                value={activityDates[index].date ? activityDates[index].date.toString() : activityDates[index].date}
                onChangeText={(value) => { multipleFieldInputChangeHandlerDate("date", index, value) }}
              />
              {/* <DatePicker
                style={{ width: "50%", borderTopWidth:0, borderBottomColor:"red", borderBottomWidth:2 }}
                date={activityDates[index].date}
                mode="date"
                placeholder="Select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2023-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                hideText={false}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              /> */}




              <TextInput
                placeholder="Max Participants"
                style={{ ...styles.input, width: "45%" }}
                color="white"
                keyboardType='numeric'
                placeholderTextColor="#C6C6C6"
                value={activityDates[index].maxParticipants ? activityDates[index].maxParticipants.toString() : activityDates[index].maxParticipants}
                onChangeText={(value) => { multipleFieldInputChangeHandlerDate("maxParticipants", index, value) }}
              />

              {/* Remove or Add Icon */}
              {index === 0 ? (<Icon
                size={23}
                name='plus'
                type='font-awesome'
                color='green'
                onPress={() => addDate()} />) : (<Icon
                  size={23}
                  name='eraser'
                  type='font-awesome'
                  color='red'
                  onPress={() => removeDate(index)} />)}
            </View>
          ))}

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
    width: "30%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  //   input: {
  //     width: "100%",
  //     // color: "#fff",
  //     // padding: 15,
  //     // backgroundColor:"blue",
  //     paddingHorizontal: 2,
  //     paddingVertical: 5,
  //     borderBottomColor: '#ccc',
  //     borderBottomWidth: 1
  // },

  customButton: {
    // width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
});
