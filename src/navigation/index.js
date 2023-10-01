import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashNavigator from './splashNavigation'
import MyTabs from './bottomTab'
import withoutBottomtab from './withoutBottomtab'
import Splash from "src/screens/authScreens/Splash";
const StackNavigator = createNativeStackNavigator()

const AppStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <StackNavigator.Screen name="Root" options={{ headerShown: false }}>
        {props => <MyTabs {...props} />}
      </StackNavigator.Screen>
      <StackNavigator.Screen name="withoutBottomtab" component={withoutBottomtab} options={{ headerShown: false }} />
    </StackNavigator.Navigator>
  )
}

const MainNavigator = () => {
  const data = !null
  if (data) {
    return <AppStackNavigator />
  }
  else {
    return <SplashNavigator />
  }
}
export default MainNavigator

