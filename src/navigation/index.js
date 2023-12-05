import React, { useEffect } from "react"
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigation';
import TooltipNavigator from './tooltipNavigation';
import MyTabs from './bottomTab'
import AsyncStorage from '@react-native-async-storage/async-storage';
import withoutBottomtab from './withoutBottomtab'
import Splash from "src/screens/authScreens/Splash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { CognitoAPI, getCognitoUser, refreshSession } from "src/services/cognitoApi";
import Config from "react-native-config";
import axios from "axios";
import ShowMessage from "src/components/ShowMessage";
import { setJwtToken, setRefreshToken, setSportsList, setDMA, setToken, setUser, setUserData } from 'src/store/types';
import { Easing } from "react-native";


const StackNavigator = createNativeStackNavigator()

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

const AppStackNavigator = () => {
  const navigation = useNavigation();
  const navigateState = useNavigationState(state => state)
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.user);

  const setDMACode = async () => {
    try {
      let dmaCode = ''
      if (reduxData?.userData && reduxData?.userData?.email) {
        const dmaResponse = await axios.get(`${Config?.GEO_LOC_URL}/geo`, {
          params: { zip: reduxData?.userData?.['custom:zipcode'] }
        })
        const dma = dmaResponse?.data?.dma ?? ''
        dmaCode = dma
        if ((!reduxData?.userData?.['custom:dma'] && dma !== '') || dma !== reduxData?.userData?.['custom:dma']) {
          await CognitoAPI(reduxData, 'updateUser', dma)
          const updatedSession = { ...reduxData?.userData, 'custom:dma': dma }
          dispatch(setUserData(updatedSession))
        } else {
          dmaCode = reduxData?.userData?.['custom:dma']
        }
      } else {
        const response = await axios.get(`${Config?.GEO_NBC_URL}`)
        const geoData = response.data
        console.log('GEO_NBC_URL : ', Config?.GEO_NBC_URL, geoData)
        dmaCode = geoData?.dma ?? null
      }
      console.log('dmaCode: ', dmaCode)
      dispatch(setDMA(dmaCode))
    } catch (error) {
      console.log('setDMACode error : ', error)
      dispatch(setDMA(reduxData?.userData?.['custom:dma'] ?? null))
    }
  }

  useEffect(() => {
    if (reduxData?.guest || (reduxData?.userData && reduxData?.userData?.email)) {
      setDMACode()
    }
  }, [reduxData?.userData, reduxData?.guest])

  const verifySession = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const cognitoUser = getCognitoUser(reduxData?.userData?.email)
      await refreshSession(JSON.parse(refreshToken), cognitoUser)
    } catch (error) {
      dispatch(setUser(false));
      dispatch(setUserData({}));
      dispatch(setToken(''));
      dispatch(setJwtToken(''));
      dispatch(setRefreshToken(''));
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('accessToken');
      dispatch(setSportsList([]));
      navigation.navigate('Auth');
      ShowMessage('Session expired.')
    }
  }

  useEffect(() => {
    if (reduxData?.userData?.email) {
      verifySession()
    };
  }, [navigateState]);

  return (
    <StackNavigator.Navigator
      screenOptions={{
        gestureEnabled: true,
        transitionpec: {
          open: config,
          close: closeConfig
        },
        // cardStyleInterpolator: cardStyleInterpolators.forHorizontalIOS,
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
      <StackNavigator.Screen name="Splash" component={Splash} options={{ headerShown: false, }} />
      <StackNavigator.Screen name="Root" options={{ headerShown: false, gestureEnabled: true }}>
        {props => <MyTabs {...props} />}
      </StackNavigator.Screen>
      {/* Auth Navigator: Include Login and Signup */}
      <StackNavigator.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false, gestureEnabled: true }}
      />
      <StackNavigator.Screen
        name="Tooltip"
        component={TooltipNavigator}
        options={{ headerShown: false, gestureEnabled: true }}
      />
      <StackNavigator.Screen
        name="withoutBottomtab"
        component={withoutBottomtab}
        options={{ headerShown: false, gestureEnabled: true }}
      />
    </StackNavigator.Navigator>
  )
}

const MainNavigator = () => {
  return <AppStackNavigator />;
}
export default MainNavigator;
