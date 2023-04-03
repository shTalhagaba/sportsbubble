import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images, Colors, Fonts } from 'src/utils';
import { Image, View, StyleSheet, Text } from 'react-native';

import Guide from 'src/screens/appScreens/Guide';
import Search from 'src/screens/appScreens/Search';
import Setting from 'src/screens/appScreens/Setting';
import Legal from 'src/screens/appScreens/Legal';
import { moderateScale, ScaledSheet } from "react-native-size-matters";

const Tab = createBottomTabNavigator();

const bottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Guide'}
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        keyboardHidesTabBar: true,
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.appColorBackground,
          height: moderateScale(80, 0.3),
          paddingTop: moderateScale(10, 0.3),
        },
      }}>
      <Tab.Screen
        name="Guide"
        component={Guide}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.bottomContainer}>
              <Image
                source={Images.Guide}
                style={[styles.iconImage, {
                  tintColor: focused ? Colors.lightGreen : Colors.greyText
                }]}
                resizeMode={'contain'}
              /></View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.bottomContainer}>
              <Image
                source={Images.SearchBottom}
                style={[styles.iconImage, {
                  tintColor: focused ? Colors.lightGreen : Colors.greyText
                }]}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Legal}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.bottomContainer}>
              <Image
                source={Images.SettingBottom}
                style={[styles.iconImage, {
                  tintColor: focused ? Colors.lightGreen : Colors.greyText
                }]}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default bottomTab;
const styles = ScaledSheet.create({
  txt: {
    fontSize: "12@ms0.3",
    fontWeight: '700',
    lineHeight: "16@ms0.3",
    marginTop: "5@ms0.3",
    textTransform: 'uppercase',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  iconImage: {
    height: "47@ms0.3",
    width: "80@ms0.3",
  }
  ,
});
