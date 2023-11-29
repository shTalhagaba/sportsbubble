import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from 'src/screens/authScreens/Splash';
import { Easing } from "react-native";

const AppNavigator = createNativeStackNavigator();
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacmentThrehold: 0.01,
    restSpeedThrehold: 0.01
  }
}
const closeConfig = {
  animation: "timing",
  config: {
    duration: 200,
    easng: Easing.linear
  }
}
const AppNavigation = () => {
  return (
    <AppNavigator.Navigator
      screenOptions={{
        gestureEnabled: true,
        transitionpec: {
          open: config,
          close: closeConfig
        },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },


      }}>
      <AppNavigator.Screen name="Splash" component={Splash} />
    </AppNavigator.Navigator>
  );
};
export default AppNavigation;
