import React from 'react';
import { Image, ImageBackground, StatusBar, Text, View } from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import AppHeader from 'src/components/AppHeader';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import DeviceInfo from 'react-native-device-info';

export default function Legal() {
  const navigation = useNavigation();
  const version = DeviceInfo.getVersion();

  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        backgroundColor={Colors.darkGrey} />
      {/* Header with Logo and back icon  */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView
      />
      {/* Main tabs  */}
      <View style={styles.mainTabContainer}>
        <Text style={styles.loginTxt}>{Strings.legal}</Text>
        <ButtonWithIcon title={Strings.termUse} />
        <ButtonWithIcon title={Strings.privacyPolicy} />
        <ButtonWithIcon title={Strings.californiaPolicy} />
      </View>
      {/* Powered by sports bubble */}
      <View style={styles.sbContainer}>
        <Image source={Images.Sports} style={styles.leftArrowIcon} resizeMode={"contain"} />
        <Image source={Images.PoweredSB} style={styles.powerImage} resizeMode={"contain"} />
        <Text style={styles.versionTxt}>v {version}</Text>
      </View>
    </ImageBackground>
  );
}
