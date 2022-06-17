import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as activityActions from '../../../store/actions/activityActions';
import * as bookingActions from '../../../store/actions/bookingActions';

// Custom
import CustomText from '../../../components/native/CustomText';
import OrderItem from '../../../components/bookings/OrderItem';

import Values from '../../../constants/Values';

export default BookingsSceen = props => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth); // Get User Activities of redux 

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // const orders = useSelector(state => state.orders.orders);
  const orders = [{
    id: 1,
    totalAmount: 5.00,
    readableDate: "date",
    items: [{
      activityId: 1,
      activityTitle: "Activity Title",
      quantity: "1 Lesson - ",
      sum: 2
    }]
  },
  {
    id: 2,
    totalAmount: 8.00,
    readableDate: "date",
    items: [{
      activityId: 1,
      activityTitle: "Kickbox sloterplas",
      quantity: "2 Lessons - ",
      sum: 2
    }]
  },
  ]

  const loadBookings = async () => {
    
    const results = await dispatch(bookingActions.getOwnBookings())
    console.log("BOOKINGS")
    console.log(results)

    setBookings(results.data)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true);
    loadBookings()
  }, []);

  const renderBooking = (itemData) => {
    console.log("ITEMMM")
    console.log(itemData)
    return <OrderItem
      amount={itemData.item.totalAmount}
      date={itemData.item.createdDate}
      items={[]} // Ordered Acitivty
    //items={itemData.item.items} // Ordered Acitivty
    />
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Values.primaryColor} />
      </View>
    );
  }
  if (bookings.length === 0) {
    return (
      <View style={{ ...styles.background, alignItems: 'center', justifyContent: 'center' }}>
        <CustomText style={{ textAlign: "center" }}>No orders found, maybe start participating to some activities?</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.background}>

      {/* See activity title */}
      {/* Total price */}
      {/* How many Lessons purchased */}


      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={renderBooking}
      />
    </View>
  );
};

export const screenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: 'Bookings'
  };
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "#313131",

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


});
