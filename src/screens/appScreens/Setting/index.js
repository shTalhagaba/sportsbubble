import React, { useEffect } from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, Text, View } from 'react-native';
import styles from './styles';
import { Images, Colors } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import AppHeader from 'src/components/AppHeader';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import DeviceInfo from 'react-native-device-info';
import Strings from 'src/utils/strings';
import Instabug, { InvocationEvent } from 'instabug-reactnative';

export default function Setting() {
  const navigation = useNavigation();
  const version = DeviceInfo.getVersion();

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
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView
      />
      {/* Main tabs  */}
      <ScrollView style={styles.mainTabContainer}>
        <Text style={styles.loginTxt}>{Strings.settings}</Text>
        <View style={styles.innerContainer}>
          <ButtonWithIcon
            title={Strings.legal}
            onpress={() => navigation.navigate('Legal')}
          />
          <ButtonWithIcon
            title={Strings.reportProblem}
            onpress={() => Instabug.show()}
          />
        </View>
      </ScrollView>

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
