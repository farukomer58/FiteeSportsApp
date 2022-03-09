import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'

import { Platform } from 'react-native'
import Colors from '../constants/Colors'

const options = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : "white"
    },
    headerTintColor: Platform.OS === 'android' ? "white" : Colors.primaryColor,
}

const FiteeNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        // navigationOptions: options
    },
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen,
}, {
    // initialRouteName:"Categoies", Inital Screen, takes first by default
    mode: "modal", //has efect on IOS
    defaultNavigationOptions: options
})


export default createAppContainer(MealsNavigator)
