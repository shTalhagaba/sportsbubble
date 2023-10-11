import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images, Colors } from 'src/utils';
import { Image, Platform, View } from 'react-native';
import Guide from 'src/screens/appScreens/Guide';
import Watch from 'src/screens/appScreens/Watch';
import About from 'src/screens/appScreens/About';
import Search from 'src/screens/appScreens/Search';
import Setting from 'src/screens/appScreens/Setting';
import Legal from 'src/screens/appScreens/Legal';
import MySports from 'src/screens/appScreens/MySports';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { refreshData, setMysportGuest } from 'src/store/types';

const Tab = createBottomTabNavigator();
const SettingNavigator = createNativeStackNavigator();
const GuideNavigator = createNativeStackNavigator();
const SearchNavigator = createNativeStackNavigator();

const GuideNavigation = () => {
  return (
    <GuideNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <GuideNavigator.Screen name="GuideMain" component={Guide}
        options={{
          sportPressFlag: Math.random(),
        }} />
      <GuideNavigator.Screen name="Watch" component={Watch} />
    </GuideNavigator.Navigator>
  );
};

const SettingNavigation = () => {
  return (
    <SettingNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingNavigator.Screen name="SettingMain" component={Setting} />
      <SettingNavigator.Screen name="Legal" component={Legal} />
      <SettingNavigator.Screen name="About" component={About} />
    </SettingNavigator.Navigator>
  );
};

const SearchNavigation = () => {
  return (
    <SearchNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SearchNavigator.Screen name="SearchMain" component={Search} />
      <SearchNavigator.Screen name="SearchWatch" component={Watch} />
    </SearchNavigator.Navigator>
  );
};

const BottomTab = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.user);

  const tabBarGuideListeners = ({ navigation, route }) => ({
    tabPress: () => {
      console.log("GuideMain => ")
      if (!reduxData?.guest) {
        navigation.navigate('Guide', { sportPressFlag: Math.random() })
        dispatch(refreshData(!reduxData?.refresh)); // Dispatch the action
      } else {
        const randomValue = Math.random();
        console.log("Random NumberGuideMain => =>", randomValue);
        navigation.navigate('Guide', { sportPressFlag: randomValue });
        dispatch(refreshData(!reduxData?.refresh)); // Dispatch the action
      }
    }
  });

  const tabBarSearchListeners = ({ navigation, route }) => ({
    tabPress: () => {
      navigation.navigate('Search')
    }
  });

  const tabBarSettingListeners = ({ navigation, route }) => ({
    tabPress: () => {
      navigation.navigate('Setting')
    }
  });
  const tabBarMySportListeners = ({ navigation, route }) => ({
    tabPress: () => {
      if (reduxData?.guest) {
        const randomValue = Math.random();
        console.log("Random Number =>", randomValue);
        navigation.navigate('Guide', { sportPressFlag: randomValue });
      }
    }
  });


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
          backgroundColor:
            Platform.OS === 'ios'
              ? Colors.appColorBackground90
              : Colors.backBlack,
          height:
            Platform.OS === 'android'
              ? moderateScale(72, 0.3)
              : moderateScale(80, 0.3),
          paddingTop:
            Platform.OS === 'android'
              ? moderateScale(2, 0.3)
              : moderateScale(15, 0.3),
          borderTopWidth: 2,
          borderTopColor: '#3E4349',
        },
      }}>
      <Tab.Screen
        name="Guide"
        component={GuideNavigation}
        listeners={tabBarGuideListeners}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.bottomContainer}>
              <Image
                source={focused ? Images.GuideGreen : Images.Guide}
                style={[
                  styles.iconImage,
                  {
                    tintColor: focused ? Colors.lightGreen : Colors.white,
                  },
                ]}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MySports"
        component={!reduxData?.guest ? MySports : Guide}
        listeners={tabBarMySportListeners}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.bottomContainer}>
              <Image
                source={focused && !reduxData?.guest ? Images.MySportsFiiled : Images.MySports}
                style={[
                  styles.iconImage,
                  {
                    tintColor: focused && !reduxData?.guest ? Colors.lightGreen : Colors.white,
                  },
                ]}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        listeners={tabBarSearchListeners}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.bottomContainer}>
              <Image
                source={
                  focused ? Images.SearchBottomGreen : Images.SearchBottom
                }
                style={[
                  styles.iconImage,
                  {
                    tintColor: focused ? Colors.lightGreen : Colors.white,
                  },
                ]}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingNavigation}
        listeners={tabBarSettingListeners}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.bottomContainer}>
              <Image
                source={
                  focused ? Images.SettingBottomGreen : Images.SettingBottom
                }
                style={[
                  styles.iconImage,
                  {
                    tintColor: focused ? Colors.lightGreen : Colors.white,
                  },
                ]}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
const styles = ScaledSheet.create({
  txt: {
    fontSize: '12@ms0.3',
    fontWeight: '700',
    lineHeight: '16@ms0.3',
    marginTop: '5@ms0.3',
    textTransform: 'uppercase',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  iconImage: {
    height: '36@ms0.3',
    width: '70@ms0.3',
  },
});
