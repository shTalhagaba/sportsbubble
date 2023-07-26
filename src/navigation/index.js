import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigation'
import MyTabs from './bottomTab'
import withoutBottomtab from './withoutBottomtab'
import { useSelector } from "react-redux";
import Splash from "src/screens/authScreens/Splash";

const StackNavigator = createNativeStackNavigator()


const AppStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Root" options={{ headerShown: false }}>
        {props => <MyTabs {...props} />}
      </StackNavigator.Screen>
      <StackNavigator.Screen name="withoutBottomtab" component={withoutBottomtab} options={{ headerShown: false }} />
    </StackNavigator.Navigator>
  )
}

const MainNavigator = () => {
  const data = useSelector((state) => state.user);
  // const data = !null
  // if (data?.user) {
  if (data?.user) {
    return <AppStackNavigator />
  }
  else {
    return <AuthNavigator />
  }
}
export default MainNavigator

