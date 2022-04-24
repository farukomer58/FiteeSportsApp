import React, { useState } from 'react';
import { Platform } from 'react-native'
import { useSelector } from 'react-redux';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';


export default AppNavigator = () => {

    const isAuth = useSelector(state => !!state.auth.token);
    const [isAuthenticated, setIsAuthenticated] = useState(true)

    return (
        <NavigationContainer>
            {!isAuthenticated && <AuthNavigator />}
            {isAuthenticated && <MainNavigator />}
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
