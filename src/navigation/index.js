import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './authNavigation'
import AppNavigation from './appNavigation'
import MyTabs from './bottomTab'

const StackNavigator = createNativeStackNavigator()


const AppStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Root" options={{ headerShown: false }}>
        {props => <MyTabs {...props} />}
      </StackNavigator.Screen>
      {/* <StackNavigator.Screen name="AppNavigation" component={AppNavigation} options={{ headerShown: false }}/> */}
    </StackNavigator.Navigator>
  )
}

const MainNavigator = () => {
  const user = null
  if (user !== null) {
    return <AppStackNavigator />
  }
  else {
    return <AuthNavigator />
  }
}
export default MainNavigator

