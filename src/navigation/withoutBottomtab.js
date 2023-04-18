import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdatePassword from 'src/screens/appScreens/UpdatePassword'
import PersonalInfo from 'src/screens/appScreens/PersonalInfo'
import SportStreaming from 'src/screens/appScreens/SportStreaming'


const AppNavigator = createNativeStackNavigator()

const authNavigation = () => {
    return (

        <AppNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <AppNavigator.Screen name="UpdatePassword" component={UpdatePassword} />
            <AppNavigator.Screen name="PersonalInfo" component={PersonalInfo} />
            <AppNavigator.Screen name="SportStreaming" component={SportStreaming} />


        </AppNavigator.Navigator>
    )
}
export default authNavigation