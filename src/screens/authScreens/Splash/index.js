import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  Dimensions,
  View,
  Image,
  Text,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from 'src/utils';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {useQuery} from '@apollo/client';
import {GET_SORTED_EVENTS} from 'src/screens/appScreens/Guide/queries';
import dayjs from 'dayjs';
import {setSplashEventList} from 'src/store/types';
import {useDispatch, useSelector} from 'react-redux';
import Config from 'react-native-config';

export default function Splash() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.user);
  const [startTime, setStartTime] = useState(dayjs(new Date()).toISOString());
  const height = Dimensions.get('window').height;
  const version = DeviceInfo.getVersion();

  const {loading, refetch, error} = useQuery(GET_SORTED_EVENTS, {
    variables: {
      startTime: startTime,
      endTime: dayjs(startTime).add(4, 'hours').set('minute', 0).set('second', 0).toISOString(),
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    context: {
      headers: {
        authorization: Config?.BEARER_TOKEN
          ? `Bearer ${Config.BEARER_TOKEN}`
          : '',
      },
    },
    onCompleted: data => {
      if (data && data?.sortedEvents) {
        const filteredEvents = data?.sortedEvents.filter(event => {
          const {line1, line2, startTime, endTime, logo1, rightsHolders} =
            event;
          // Check if all required properties exist
          if (
            !line1 ||
            !line2 ||
            !startTime ||
            !endTime ||
            !logo1 ||
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
    if (!loading && reduxData?.splashEventList && reduxData?.splashEventList.length>0) {
      setTimeout(() => {
        navigation.replace('Root');
      }, 1000);
    }if (!loading) {
        setTimeout(() => {
          navigation.replace('Root');
        }, 1000);
      }
  }, [loading, reduxData?.splashEventList]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.Background2}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        <ImageBackground
          source={Images.SplashBackTop}
          style={{height: height / 2.5}}
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
            style={{height: 230, width: 230, alignSelf: 'center'}}
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
