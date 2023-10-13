import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigation';
import MyTabs from './bottomTab'
import withoutBottomtab from './withoutBottomtab'
import Splash from "src/screens/authScreens/Splash";

const StackNavigator = createNativeStackNavigator()

const AppStackNavigator = () => {
  const [appState, setAppState] = useState(AppState.currentState);


  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('App is in the foreground');
      } else if (nextAppState === 'inactive') {
        console.log('App is being killed');
        dispatch(setUserVerifiedFlag(null));
        dispatch(setUserEmail(''));
      } else {
        if (nextAppState === "background") {
          console.log('App is in the background');
        } else {
          console.log('App is in the KIll inactive');
          dispatch(setUserVerifiedFlag(null));
          dispatch(setUserEmail(''));
        }
      }
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      appStateSubscription.remove();
    };
  }, []);
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <StackNavigator.Screen name="Root" options={{ headerShown: false }}>
        {props => <MyTabs {...props} />}
      </StackNavigator.Screen>
      {/* Auth Navigator: Include Login and Signup */}
      <StackNavigator.Screen
        component={AuthNavigator}
        options={{ headerShown: false }}
        name="Auth"
      />
      <StackNavigator.Screen
        name="withoutBottomtab"
        component={withoutBottomtab}
        options={{ headerShown: false }}
      />
    </StackNavigator.Navigator>
  )
}

const MainNavigator = () => {
  return <AppStackNavigator />;
}
export default MainNavigator;
