import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigation';
import MyTabs from './bottomTab';
import withoutBottomTab from './withoutBottomtab';
import Splash from "src/screens/authScreens/Splash";

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Root" options={{ headerShown: false }}>
        {props => <MyTabs {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="WithoutBottomTab" component={withoutBottomTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return <AppStackNavigator />;
};

export default MainNavigator;
