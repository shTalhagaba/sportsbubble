import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Images, Colors } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import AppHeader from 'src/components/AppHeader';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import Strings from 'src/utils/strings';
import CustomModalView from 'src/components/Modal/CustomModal';
import Instabug, { InvocationEvent } from 'instabug-reactnative';
import { useDispatch, useSelector } from 'react-redux';
import { setJwtToken, setRefreshToken, setSportsList, setToken, setUser, setUserData } from 'src/store/types';
import { signOut } from 'src/services/authOTP';
import { checkNotifications } from 'react-native-permissions';
import { initializePusher, unsubscribeInterest } from "src/components/Pusher/PusherBeams";


export default function Setting() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState(false);
  const data = useSelector(state => state.user);
  const flags = useSelector(state => state?.feature?.flags);
  const sportsList = data?.sportsList
  // Function to remove notification 
  const handleInitialPusher = () => {
    const interestList = sportsList?.flatMap(favoriteSport => {
      if (!favoriteSport?.notifications) return []
      if (!['pro', 'esports', 'college']?.includes(favoriteSport?.categories?.[0]?.name)) {
        return `others-${favoriteSport?.sport?.name?.replaceAll(/[^A-Z0-9]+/ig, '')}`
      } else {
        return `${favoriteSport?.categories?.[0]?.name}-${favoriteSport?.sport?.name?.replaceAll(/[^A-Z0-9]+/ig, '')}`
      }
    })
    checkNotifications().then(({ status, settings }) => {
      if (status === 'granted') {
        initializePusher()
        interestList && interestList?.length > 0 && interestList.forEach(interest => unsubscribeInterest(interest))
      }
    })
  };

  const removeAsyncStorage = async () => {
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('accessToken');
  }

  useEffect(() => {
    Instabug.init({
      token: 'fa2bfcf8ea1c455d74b12f36846eb929', // stage
      invocationEvents: [InvocationEvent.shake],
    });
  }, []);

  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      {/* Header with Logo and back icon  */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView
      />
      {/* Main tabs  */}
      <ScrollView style={styles.mainTabContainer}>
        <Text style={styles.loginTxt}>{Strings.settings}</Text>
        <View style={styles.innerContainer}>
          {/* changes for next version */}
          {(flags?.WEB2  || flags?.V_2_02) && data?.user && (
            <>
              {flags?.WEB3 ?
                <ButtonWithIcon
                  title={Strings.personalInfo}
                  onpress={() =>
                    navigation.navigate('withoutBottomtab', {
                      screen: 'PersonalInfo',
                    })
                  }
                /> : null}
              <ButtonWithIcon
                title={Strings.changePassword}
                onpress={() =>
                  navigation.navigate('withoutBottomtab', {
                    screen: 'UpdatePassword',
                  })
                }
              />
              {flags?.WEB4 ?
                <ButtonWithIcon
                  title={Strings.sportsStreamingApps}
                  onpress={() =>
                    navigation.navigate('withoutBottomtab', {
                      screen: 'SportStreaming',
                    })
                  }
                /> : null}
            </>
          )}
          <ButtonWithIcon
            title={Strings.aboutWatchSports}
            onpress={() => navigation.navigate('About')}
          />
          <ButtonWithIcon
            title={Strings.legal}
            onpress={() => navigation.navigate('Legal')}
          />
          <ButtonWithIcon
            title={Strings.reportProblem}
            onpress={() => Instabug.show()}
          />
          {(flags?.WEB2 || flags?.V_2_02) && data?.user && (
            <TouchableOpacity
              onPress={() => setLogoutModal(!logoutModal)}
              style={{
                flexDirection: 'row',
                marginTop: 24,
                marginLeft: 24,
                height: 35
              }}>
              <Image source={Images.LeftArrowIcon} style={styles.logoutIcon} />
              <Text style={styles.logoutTxt}>{Strings.logout}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* log out pop up */}
      <CustomModalView
        visible={logoutModal}
        headerTxt={Strings.logout}
        desTxt={Strings.wantToLogout}
        blackBtnTxt={Strings.no}
        orangeBtnTxt={Strings.yes}
        fillBefore={true}
        btn
        orangrBTn
        rowStyle={true}
        blackBtnPress={() => setLogoutModal(!logoutModal)}
        ornageBtnPress={() => {
          setLogoutModal(!logoutModal);
          signOut()
            .then((response) => {
              console.error('response', response);
              handleInitialPusher();
              dispatch(setUser(false));
              dispatch(setUserData({}));
              dispatch(setToken(''));
              dispatch(setJwtToken(''));
              dispatch(setRefreshToken(''));
              removeAsyncStorage();
              dispatch(setSportsList([]));
              navigation.replace('Auth');
            })
            .catch(error => {
              console.error('Error signing out:', error.message);
              // ShowMessage(error.message)
              if (error?.message === 'User not authenticated.') {
                dispatch(setUser(false));
                dispatch(setUserData({}));
                dispatch(setToken(''));
                dispatch(setJwtToken(''));
                dispatch(setRefreshToken(''));
                removeAsyncStorage();
                navigation.replace('Auth');
              }
            });
        }}
        Container={{ backgroundColor: Colors.backBlack }}
      />
    </ImageBackground>
  );
}
