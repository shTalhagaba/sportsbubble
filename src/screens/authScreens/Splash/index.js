import React, { useEffect, useRef, useState } from 'react';
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
import { setSplashEventList } from 'src/store/types';
import { useDispatch, useSelector } from 'react-redux';
import Config from 'react-native-config';

export default function Splash() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.user);
  const [startTime, setStartTime] = useState(dayjs(new Date()).toISOString());
  const height = Dimensions.get('window').height;
  const version = DeviceInfo.getVersion();
  const stageToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJodHRwczovL2Rldi0zNTM5MjYyLm9rdGEuY29tL29hdXRoMi92MS90b2tlbiIsImlzcyI6IjBvYTlrN2RpYWRqOUxJN0tkNWQ2Iiwic3ViIjoiMG9hOWs3ZGlhZGo5TEk3S2Q1ZDYifQ.sJCxcymR_X_OtWCZxJ5_AfUbWvKkd1ML8JW-Wl91xV8uJ2paw067kEgfR7QYz6dk3-1-egBjyf1Mifm1cTN1S8JPpkd1NN1Aw6uuky3lt5jmjeHwwqL-XHzIkSjLN_t8zdO5OpDqtlbEqyNGtJFCONJ9K-hCjp7u5FWCZ1nKwIK3X1w-FVjRDLbvJrTrh8IJriqPhiWHfkGbz-jm6yStYXMw3uhcKd164RA2l8utz4jnVRn9ebcOiN_BQb3yvtqBc0CsxB6YKQmmW7Rbpg8cRU3B1zfLfMMu2QVPLYr5vDD2mhK1PwixUZ6UnYrYirXWNNTqyZquGZPQWpIlY9sIwA'


  const { loading, refetch, error } = useQuery(GET_SORTED_EVENTS, {
    variables: {
      startTime: startTime,
      endTime: dayjs(startTime)
        .add(2, 'hours')
        .set('minutes', 59)
        .set('second', 0)
        .toISOString(),
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    context: {
      headers: {
        authorization:
          Platform.OS === "android" ? stageToken :
            Config?.BEARER_TOKEN
              ? `Bearer ${Config.BEARER_TOKEN}`
              : '',
      },
    },
    onCompleted: data => {
      if (data && data?.sortedEvents) {
        const filteredEvents = (data?.sortedEvents || []).filter(event => {
          const { line1, line2, startTime, endTime, rightsHolders, id, rightsHoldersConnection } = event;
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
        

        dispatch(setSplashEventList(filteredEvents));
      }
    },
    onError: error => {
      console.log('error splash : ', error);
    },
  });

  useEffect(() => {
    if (
      !loading &&
      reduxData?.splashEventList &&
      reduxData?.splashEventList.length > 0
    ) {
      setTimeout(() => {
        navigation.replace('Root');
      }, 1000);
    }
    if (!loading) {
      setTimeout(() => {
        navigation.replace('Root');
      }, 1000);
    }
  }, [loading, reduxData?.splashEventList]);

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
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: height / 4,
          }}>
          <Image
            source={Images.LogoText}
            style={{ height: 230, width: 230, alignSelf: 'center' }}
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

          <Text style={styles.versionTxt}>v {version}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
