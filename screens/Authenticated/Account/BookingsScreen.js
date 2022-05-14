import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as activityActions from '../../../store/actions/activityActions';

// Custom
import CustomText from '../../../components/native/CustomText';
import OrderItem from '../../../components/bookings/OrderItem';

export default BookingsSceen = props => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  // const orders = useSelector(state => state.orders.orders);
  const orders = [{
    id:1,
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
    id:2,
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

  // useEffect(() => {
  //   setIsLoading(true);
  //   dispatch(ordersActions.fetchOrders()).then(() => {
  //     setIsLoading(false);
  //   });
  // }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={{ ...styles.background, alignItems: 'center', justifyContent: 'center' }}>
        <CustomText style={{ textAlign: "center" }}>No orders found, maybe start participating to some activities?</CustomText>
      {/* See activity title */}
      {/* Total price */}
        {/* How many Lessons purchased */}


      </View>
    );
  }

  return (
    <View style={styles.background}>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items} // Ordered Acitivty
          />
        )}
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
