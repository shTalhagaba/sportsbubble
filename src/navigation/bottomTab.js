import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Images, Colors, Fonts} from 'src/utils';
import {Image, View, StyleSheet, Text} from 'react-native';

import Guide from 'src/screens/appScreens/Guide';
import Search from 'src/screens/appScreens/Search';
import Setting from 'src/screens/appScreens/Setting';

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
          height: 90,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        name="Guide"
        component={Guide}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.bottomContainer}>
              <Image
                source={Images.Guide}
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? Colors.buttonGreen : Colors.greyText,
                }}
                resizeMode={'contain'}
              />
              <Text
                style={[
                  styles.txt,
                  {color: focused ? Colors.buttonGreen : Colors.greyText},
                ]}>
                Guide
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.bottomContainer}>
              <Image
                source={Images.Search}
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? Colors.buttonGreen : Colors.greyText,
                }}
                resizeMode={'contain'}
              />
              <Text
                style={[
                  styles.txt,
                  {color: focused ? Colors.buttonGreen : Colors.greyText},
                ]}>
                Search
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.bottomContainer}>
              <Image
                source={Images.Settings}
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? Colors.buttonGreen : Colors.greyText,
                }}
                resizeMode={'contain'}
              />
              <Text
                style={[
                  styles.txt,
                  {color: focused ? Colors.buttonGreen : Colors.greyText},
                ]}>
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default bottomTab;
const styles = StyleSheet.create({
  txt: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  notificationContainer: {
    height: 14,
    width: 14,
    backgroundColor: Colors.appColor,
    borderRadius: 14,
    position: 'absolute',
    right: 14,
    top: -3,
  },
  notificationCount: {
    fontSize: 8,
    fontWeight: '600',
    lineHeight: 12,
    color: Colors.white,
    fontFamily: Fonts.Regular,
    textAlign: 'center',
  },
});
