import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as activityActions from '../../../store/actions/activityActions';

// Custom
import CustomText from '../../../components/native/CustomText';

export default BookingsSceen = props => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    // const orders = useSelector(state => state.orders.orders);
    const orders = [{
        totalAmount:5.00,
        readableDate:"date",
        items:[]
    },{}]

    useEffect(() => {
      setIsLoading(true);
      dispatch(ordersActions.fetchOrders()).then(() => {
        setIsLoading(false);
      });
    }, [dispatch]);
  
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  
    if (orders.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No order found, maybe start ordering some products?</Text>
        </View>
      );
    }
  
    return (
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
        )}
      />
    );
};

export const screenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.productId ? 'Edit Activity' : 'Add Activity'
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
  }
});
