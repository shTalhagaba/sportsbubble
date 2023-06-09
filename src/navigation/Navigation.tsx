// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Local imports
import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;