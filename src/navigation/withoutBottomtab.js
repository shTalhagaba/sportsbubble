import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdatePassword from 'src/screens/appScreens/UpdatePassword'


const AppNavigator = createNativeStackNavigator()

const authNavigation = () => {
    return (

        <AppNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <AppNavigator.Screen name="UpdatePassword" component={UpdatePassword} />


        </AppNavigator.Navigator>
    )
}
export default authNavigation