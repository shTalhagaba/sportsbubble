import React, { useRef, useState } from 'react';
import { Button, Image, ImageBackground, StatusBar, Text, View } from 'react-native';
import styles from './styles';
import { Images, Colors, Fonts } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import AppHeader from 'src/components/AppHeader';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import DeviceInfo from 'react-native-device-info';

export default function Setting() {
  const navigation = useNavigation();
  const version = DeviceInfo.getVersion();

  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        backgroundColor={Colors.darkGrey} />
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView
      />
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <Text style={styles.loginTxt}>Settings</Text>
        <ButtonWithIcon title={'Legal'} />
        <ButtonWithIcon title={'Report a Problem'} />
      </View>
      <View style={{ height: '25%', alignItems: 'center' }}>
        <Image source={Images.Sports} style={styles.leftArrowIcon} resizeMode={"contain"} />
        <Image source={Images.PoweredSB} style={styles.powerImage} resizeMode={"contain"} />
        <Text style={styles.versionTxt}>v {version}</Text>

      </View>
    </ImageBackground>
  );
}
