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
import { Images, Colors } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import AppHeader from 'src/components/AppHeader';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import Strings from 'src/utils/strings';
import CustomModalView from 'src/components/Modal/CustomModal';
import Instabug, { InvocationEvent } from 'instabug-reactnative';
import { useDispatch, useSelector } from 'react-redux';
import { setSportsList, setToken, setUser, setUserData } from 'src/store/types';
import { signOut } from 'src/services/authOTP';
import ShowMessage from 'src/components/ShowMessage';

export default function Setting() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState(false);
  const data = useSelector(state => state.user);

  useEffect(() => {
    Instabug.init({
      // token: '02e02ab36f08bb8372ad6966cd83bf8a',  // own instabug
      token: 'fa2bfcf8ea1c455d74b12f36846eb929', // stage
      invocationEvents: [InvocationEvent.shake],
    });
  }, []);

  return (
    <ImageBackground
      source={Images.Background}
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
          {data?.user && (
            <>
              <ButtonWithIcon
                title={Strings.personalInfo}
                onpress={() =>
                  navigation.navigate('withoutBottomtab', {
                    screen: 'PersonalInfo',
                  })
                }
              />
              <ButtonWithIcon
                title={Strings.changePassword}
                onpress={() =>
                  navigation.navigate('withoutBottomtab', {
                    screen: 'UpdatePassword',
                  })
                }
              />
              <ButtonWithIcon
                title={Strings.sportsStreamingApps}
                onpress={() =>
                  navigation.navigate('withoutBottomtab', {
                    screen: 'SportStreaming',
                  })
                }
              />
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
          {data?.user && (
            <TouchableOpacity
              onPress={() => setLogoutModal(!logoutModal)}
              style={{
                flexDirection: 'row',
                marginTop: 24,
                alignItems: 'center',
                marginLeft: 24,
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
              dispatch(setUser(false));
              dispatch(setUserData({}));
              dispatch(setToken(''));
              dispatch(setSportsList([]));
              navigation.replace('Auth');
            })
            .catch(error => {
              console.error('Error signing out:', error.message);
              ShowMessage(error.message)
              if (error?.message === 'User not authenticated.') {
                dispatch(setUser(false));
                dispatch(setUserData({}));
                dispatch(setToken(''));
                navigation.replace('Auth');
              }
            });
        }}
        Container={{ backgroundColor: Colors.backBlack }}
      />

    </ImageBackground>
  );
}
