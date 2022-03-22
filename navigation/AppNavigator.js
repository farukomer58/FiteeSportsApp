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
import HomeScreen from '../screens/Authenticated/HomeScreen';

// Constants
import Values from '../constants/Values'

const options = {
    headerShown: false,
    headerStyle: {
        display:"none"
        // backgroundColor: Platform.OS === 'android' ? Values.primaryColor : "white"
    },
    // headerTintColor: Platform.OS === 'android' ? "white" : Values.primaryColor,
}

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={options}>
                <Stack.Screen name="Login" component={LoginScreen}  options={{ title: 'Overview' }}/>
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={HomeScreen}/>
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
