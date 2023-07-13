import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdatePassword from 'src/screens/appScreens/UpdatePassword'
import PersonalInfo from 'src/screens/appScreens/PersonalInfo'
import SportStreaming from 'src/screens/appScreens/SportStreaming'
import UpgradeAccount from 'src/screens/appScreens/UpgradeAccount'
import Payment from 'src/screens/appScreens/Payment'
import Connect from 'src/screens/appScreens/Connect'



const AppNavigator = createNativeStackNavigator()

const WithoutBottomnavigation = () => {
    return (

        <AppNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <AppNavigator.Screen name="UpdatePassword" component={UpdatePassword} />
            <AppNavigator.Screen name="PersonalInfo" component={PersonalInfo} />
            <AppNavigator.Screen name="SportStreaming" component={SportStreaming} />
            <AppNavigator.Screen name="UpgradeAccount" component={UpgradeAccount} />
            <AppNavigator.Screen name="Payment" component={Payment} />
            <AppNavigator.Screen name="Connect" component={Connect} />


        </AppNavigator.Navigator>
    )
}
export default WithoutBottomnavigation