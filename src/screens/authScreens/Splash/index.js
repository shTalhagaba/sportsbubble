import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  StatusBar,
  Dimensions,
  View,
  Image,
  Text,
  Platform,
} from 'react-native';
import styles from './styles';
import { Images, Colors } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { useQuery } from '@apollo/client';
import { GET_SORTED_EVENTS } from 'src/screens/appScreens/Guide/queries';
import dayjs from 'dayjs';
import { setFeatureFlag, setStoreEventList } from 'src/store/types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Config from 'react-native-config';

export default function Splash() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.user);
  const flags = useSelector(state => state?.feature?.flags);
  const [startTime, setStartTime] = useState(dayjs(new Date()).toISOString());
  const height = Dimensions.get('window').height;
  const version = DeviceInfo.getVersion();
  const [flag, setFlag] = useState(undefined)
console.log('Config : ',JSON.stringify(Config,2))
  const getFeatureFlags = async () => {
    try {
      const flags = await axios.get(Config.FLAGS_URL)
      setFlag(flags?.data)
      dispatch(setFeatureFlag(flags?.data))
      return flags
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    if (!flag) {
      getFeatureFlags()
    }
  }, [])

  const { loading, refetch, error } = useQuery(GET_SORTED_EVENTS, {
    variables: {
      startTime: dayjs(startTime).set('minutes', 0)
        .set('second', 0)
        .toISOString(),
      endTime: dayjs(startTime)
        .add(24, 'hours')
        .set('minutes', 0)
        .set('second', 0)
        .toISOString(),
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      if (data && data?.sortedEvents) {
        const filteredEvents = (data?.sortedEvents || []).filter(event => {
          const { line1, line2, startTime, endTime, logo1, rightsHolders, id, rightsHoldersConnection } = event;
          // Check if the event should be excluded based on id and rightsHoldersConnection
          if (
            id === '9f25117c-78ed-4af1-a2fb-ed5cef8ed414' ||
            !rightsHoldersConnection ||
            rightsHoldersConnection.edges.length < 1
          ) {
            return false;
          }
          // Check if all required properties exist
          if (
            !line1 ||
            !line2 ||
            !startTime ||
            !logo1 ||
            !endTime ||
            !rightsHolders
          ) {
            return false;
          }
          // Check if at least one rightsholder has a logoUrl
          const hasLogoUrl = rightsHolders.some(
            rightsholder => rightsholder.logoUrl,
          );
          if (!hasLogoUrl) {
            return false;
          }
          return true;
        });
        dispatch(setStoreEventList(filteredEvents));
      }
    },
    onError: error => {
      console.log('error splash : ', error);
    },
  });

  useEffect(() => {
    if (!loading) {
      if ((reduxData?.user) && reduxData?.eventList?.length > 0) {
        navigateToMainScreen();
      } else {
        navigateToAuthScreen();
      }
    }
  }, [!loading]);

  const navigateToMainScreen = () => {
    setTimeout(() => {
      navigation.replace('Root');
    }, 1000);
  };

  const navigateToAuthScreen = () => {
    if (flags?.WEB2 || flags?.V_2_02_AUTH) {
      setTimeout(() => {
        navigation.replace('Auth');
      }, 1000);
    } else {
      setTimeout(() => {
        navigation.replace('Root');
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.Background2}
        style={{ height: '100%', width: '100%' }}
        resizeMode="cover">
        <ImageBackground
          source={Images.SplashBackTop}
          style={{ height: height / 2.5 }}
          resizeMode="cover">
          <StatusBar
            backgroundColor={Colors.transparent}
            translucent
            barStyle="light-content"
          />
        </ImageBackground>
        <View style={[styles.logoStyle, { marginTop: height / 4 }]}>
          <Image
            source={Images.LogoText}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        {/* Powered by sports bubble */}
        <View style={styles.sbContainer}>
          <Image
            source={Images.Sports}
            style={styles.leftArrowIcon}
            resizeMode="contain"
          />
          <Image
            source={Images.PoweredSB}
            style={styles.powerImage}
            resizeMode="contain"
          />
          <Text style={styles.versionTxt}>
            v {flags?.V_2_04 ? '2.04' : (flags?.WEB3 || flags?.V_2_03) ? '2.03' : (flags?.WEB2 || flags?.V_2_02) ? '2.02' : "2.01"}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
