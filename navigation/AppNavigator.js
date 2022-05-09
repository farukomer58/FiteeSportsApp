import React, { useState } from 'react';
import { Platform } from 'react-native'
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import StartupScreen from '../screens/StartupScreen';

export default AppNavigator = () => {

    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
    // const [isAuthenticated, setIsAuthenticated] = useState(true)
    return (
        <NavigationContainer>

            {!isAuth && <AuthNavigator />}
            {isAuth && <MainNavigator />}
            {/* {!isAuth && !didTryAutoLogin && <StartupScreen />} */}

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
