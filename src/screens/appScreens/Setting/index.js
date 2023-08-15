import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from 'src/utils';
import {useNavigation} from '@react-navigation/native';
import AppHeader from 'src/components/AppHeader';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import DeviceInfo from 'react-native-device-info';
import Strings from 'src/utils/strings';
import CustomModalView from 'src/components/Modal/CustomModal';
import Instabug, {InvocationEvent} from 'instabug-reactnative';

export default function Setting() {
  const navigation = useNavigation();
  const version = DeviceInfo.getVersion();
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    Instabug.init({
      // token: '02e02ab36f08bb8372ad6966cd83bf8a',  // own instabug
      token: 'fa2bfcf8ea1c455d74b12f36846eb929', // stage
      invocationEvents: [InvocationEvent.shake],
      // invocationEvents: [InvocationEvent.shake, InvocationEvent.screenshot],
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
        customLeftImage={{tintColor: Colors.orange}}
        SimpleView
      />
      {/* Main tabs  */}
      <ScrollView style={styles.mainTabContainer}>
        <Text style={styles.loginTxt}>{Strings.settings}</Text>
        <View style={styles.innerContainer}>
          {/* changes for next version */}
          {/* <ButtonWithIcon title={Strings.personalInfo} onpress={() => navigation.navigate("withoutBottomtab", { screen: "PersonalInfo" })} />
          <ButtonWithIcon title={Strings.changePassword} onpress={() => navigation.navigate('withoutBottomtab', { screen: "UpdatePassword" })} />
          <ButtonWithIcon title={Strings.sportsStreamingApps} onpress={() => navigation.navigate('withoutBottomtab', { screen: "SportStreaming" })} />
          <ButtonWithIcon title={Strings.aboutWatchSports} /> */}
          <ButtonWithIcon
            title={Strings.legal}
            onpress={() => navigation.navigate('Legal')}
          />
          <ButtonWithIcon
            title={Strings.reportProblem}
            onpress={() => Instabug.show()}
          />
          {/* <TouchableOpacity onPress={() => setLogoutModal(!logoutModal)}
            style={{ flexDirection: "row", marginTop: 24, alignItems: "center" }}>
            <Image source={Images.LeftArrowIcon} style={styles.logoutIcon} />
            <Text style={styles.logoutTxt}>{Strings.logout}</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* log out pop up */}
      <CustomModalView
        visible={logoutModal}
        headerTxt={Strings.logout}
        desTxt={Strings.wantToLogout}
        blackBtnTxt={Strings.no}
        orangeBtnTxt={Strings.yes}
        btn
        orangrBTn
        rowStyle={true}
        blackBtnPress={() => setLogoutModal(!logoutModal)}
        ornageBtnPress={() => setLogoutModal(!logoutModal)}
        Contianer={{backgroundColor: Colors.black}}
      />
      {/* Powered by sports bubble */}
      <View style={styles.sbContainer}>
        <Image
          source={Images.Sports}
          style={styles.leftArrowIcon}
          resizeMode={'contain'}
        />
        <Image
          source={Images.PoweredSB}
          style={styles.powerImage}
          resizeMode={'contain'}
        />
        <Text style={styles.versionTxt}>v {version}</Text>
      </View>
    </ImageBackground>
  );
}
