import React, { useState, useEffect, useCallback, useReducer } from 'react';
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
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

// Custom
import CustomText from '../../../components/native/CustomText';
import CustomDefaultInput from '../../../components/UI/CustomDefaultInput';
import Styles from '../../../constants/Styles';
import IconButton from '../../../components/IconButton/IconButton';

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
  const editedActivity = useSelector(state => state.activities.userActivities.find(activity => activity.id === activityId));

  const [prices, setPrices] = useState([
    { lessons: 1, price: 10.00, discount: "10%" },
    { lessons: 5, price: 10.00, discount: "10%" },
  ])

  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: editedActivity ? editedActivity.title : "",
      imageUrl: editedActivity ? editedActivity.imageUrl : "",
      price: "",
      description: editedActivity ? editedActivity.description : "",
      address: editedActivity ? editedActivity.activityAddress : "",
      city: editedActivity ? editedActivity.city : "",
    },
    inputValidities: {
      title: false,
      imageUrl: false,
      price: false,
      description: false,
      address: false,
      city: false,
    },
    formIsValid: false,
  })

  const priceInputChangeHandler = useCallback((fieldName, priceIndex, value) => {
    console.log(fieldName + priceIndex)
    console.log(prices[priceIndex].lessons)
    console.log("New Value:" + value)

    // 1. Make a shallow copy of the items
    let items = [...prices];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...prices[priceIndex] };
    // 3. Replace the property you're intested in
    item[fieldName] = value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[priceIndex] = item;
    // 5. Set the state to our new copy
    setPrices([...items])

  }, [])
  const addPrice = () => {
    const lessonsAmount = prices[prices.length - 1].lessons + 1
    const priceArray = [...prices]
    priceArray.push({ lessons: lessonsAmount, price: "", discount: "" })
    console.log(priceArray)
    setPrices(priceArray)
  }
  const removePrice = (priceIndex) => {
    console.log("remove item with index: " + priceIndex)

    console.log("Array before: ")
    console.log(prices)

    const pricesArray = [...prices]
    const removedArray = pricesArray.splice(priceIndex, 1)

    console.log("Array After: ")
    console.log(pricesArray)

    setPrices(pricesArray)
  }

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputIsValid) => {
    dispatchForm({ type: "UPDATE", value: inputValue, isValid: inputIsValid, input: inputIdentifier })
  }, [dispatchForm])


  // Handler when Submited save or edit Activity
  const saveOrUpdateActivity = async () => {

    // Check Form validity
    let body = {
      title: formState.inputValues.title,
      description: formState.inputValues.description,
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
    console.log(body)
    const response = await dispatch(editedActivity ? activityActions.updateActivity(body) : activityActions.createActivity(body))

    if (response.status === 201) {
      props.navigation.replace("UserActivities")
    }
  };

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
          />

        </View>
        <View style={styles.formControl}>
          <CustomText style={styles.label}>Image URL</CustomText>
          <CustomDefaultInput
            // leftElement={<MaterialIcons name="account-circle" size={32} color="white" style={styles.inputIcon} />}
            errorText="Please Enter a ImageUrl"
            onInputChange={inputChangeHandler.bind(this, "imageUrl")}
            color="white"
            required
            testId="imageInput"
          />

        </View>
        {editedActivity ? null : (
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
                  value={prices[index].lessons ? prices[index].lessons.toString() : prices[index].lessons}
                  onChangeText={(value) => { priceInputChangeHandler("lessons", index, value) }}
                />
                <TextInput
                  placeholder="Price"
                  style={styles.input}
                  color="white"
                  placeholderTextColor="#C6C6C6"
                  value={prices[index].price ? prices[index].price.toString() : prices[index].price}
                  onChangeText={(value) => { priceInputChangeHandler("price", index, value) }}
                />
                <TextInput
                  color="white"
                  placeholder="Discount"
                  style={styles.input}
                  placeholderTextColor="#C6C6C6"
                  value={prices[index].discount ? prices[index].discount.toString() : prices[index].discount}
                  onChangeText={(value) => { priceInputChangeHandler("discount", index, value) }}
                />
                {/* Remove Icon */}
                {/* <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} /> */}

                {index === 0 ? (<Icon
                  size={20}
                  name='plus'
                  type='font-awesome'
                  color='green'
                  onPress={() => addPrice()} />) : (<Icon
                    size={20}
                    name='eraser'
                    type='font-awesome'
                    color='red'
                    onPress={() => removePrice(index)} />)}


              </View>
            ))}
            {/* TODO: 3 fields next to each other, price, lessons, discount and a plus Icon */}



          </View>



        )}
        <View style={styles.formControl}>
          <CustomText style={styles.label}>Description</CustomText>
          <CustomDefaultInput
            // leftElement={<MaterialIcons name="account-circle" size={32} color="white" style={styles.inputIcon} />}
            errorText="Please Enter a Description"
            color="white"
            onInputChange={inputChangeHandler.bind(this, "description")}
            required
            testId="descriptionInput"
          />

          {/* TODO: Add the fields for Activity Date, Price and Categorie adding */}
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
          />

        </View>
        <View>
          {/* TODO: Categories dropdown */}
        </View>

        {/* TODO: activityDates same as prices, can add date and maxParticipants and a plus icon */}

        {/* TODO: Add the fields for Activity Date, Price and Categorie adding */}

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
