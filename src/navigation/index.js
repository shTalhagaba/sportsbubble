import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigation'
import MyTabs from './bottomTab'
import withoutBottomtab from './withoutBottomtab'

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
  const user = null
  if (user === null) {
    return <AppStackNavigator />
  }
  else {
    return <AuthNavigator />
  }
}
export default MainNavigator

