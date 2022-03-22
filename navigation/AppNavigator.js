import React from 'react';
import { Platform } from 'react-native'

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { createAppContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'

// Pages
import LoginScreen from '../screens/UnAuthenticated/LoginScreen'
import RegisterScreen from '../screens/UnAuthenticated/RegisterScreen';

// Constants

// const options = {
//     headerStyle: {
//         backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : "white"
//     },
//     headerTintColor: Platform.OS === 'android' ? "white" : Colors.primaryColor,
// }

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Login" component={LoginScreen}  options={{ title: 'Overview' }}/>
                <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



// createStackNavigator({
//     Categories: {
//         screen: CategoriesScreen,
//         // navigationOptions: options
//     },
//     CategoryMeals: CategoryMealsScreen,
//     MealDetail: MealDetailScreen,
// }, {
//     // initialRouteName:"Categoies", Inital Screen, takes first by default
//     mode: "modal", //has efect on IOS
//     defaultNavigationOptions: options
// })


// export default createAppContainer(MealsNavigator)
