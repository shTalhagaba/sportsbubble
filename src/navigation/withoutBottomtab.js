import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdatePassword from 'src/screens/appScreens/UpdatePassword';
import PersonalInfo from 'src/screens/appScreens/PersonalInfo';
import SportStreaming from 'src/screens/appScreens/SportStreaming';
import UpgradeAccount from 'src/screens/appScreens/UpgradeAccount';
import Payment from 'src/screens/appScreens/Payment';
import Connect from 'src/screens/appScreens/Connect';
import Term from 'src/screens/appScreens/Term';
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
const WithoutBottomnavigation = () => {
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
      <AppNavigator.Screen name="UpdatePassword" component={UpdatePassword} />
      <AppNavigator.Screen name="PersonalInfo" component={PersonalInfo} />
      <AppNavigator.Screen name="SportStreaming" component={SportStreaming} />
      <AppNavigator.Screen name="UpgradeAccount" component={UpgradeAccount} />
      <AppNavigator.Screen name="Payment" component={Payment} />
      <AppNavigator.Screen name="Connect" component={Connect} />
      <AppNavigator.Screen name="Term" component={Term} />
    </AppNavigator.Navigator>
  );
};
export default WithoutBottomnavigation;
