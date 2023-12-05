import React from 'react';
import { Image, ImageBackground, StatusBar, Text, View } from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function Legal() {
  const navigation = useNavigation();
  const flags = useSelector(state => state?.feature?.flags);

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
      <View style={styles.mainTabContainer}>
        <Text style={styles.loginTxt}>{Strings.legal}</Text>
        <View style={styles.btnContainer}>
          <ButtonWithIcon
            title={Strings.termUse}
            onpress={() =>
              navigation.navigate('withoutBottomtab', {
                screen: 'Term',
                params: { selected: Strings.termUse },
              })
            }
          />
          <ButtonWithIcon
            title={Strings.privacyPolicy}
            onpress={() =>
              navigation.navigate('withoutBottomtab', {
                screen: 'Term',
                params: { selected: Strings.privacyPolicy },
              })
            }
          />
          <ButtonWithIcon
            title={Strings.californiaPolicy}
            onpress={() =>
              navigation.navigate('withoutBottomtab', {
                screen: 'Term',
                params: { selected: Strings.californiaPolicy },
              })
            }
          />
        </View>
      </View>
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
        <Text style={styles.versionTxt}>v {flags?.V_2_04 ? '2.04' : flags?.WEB3 || flags?.V_2_03 ? '2.03' : (flags?.WEB2 || flags?.V_2_02) ? '2.02' : "2.01"}</Text>
      </View>
    </ImageBackground>
  );
}
