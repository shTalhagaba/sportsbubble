import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Images, Colors } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import AppHeader from 'src/components/AppHeader';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import DeviceInfo from 'react-native-device-info';
import Strings from 'src/utils/strings';
import CustomModalView from 'src/components/Modal/CustomModal'

export default function Setting() {
  const navigation = useNavigation();
  const version = DeviceInfo.getVersion();

  const [logoutModal, setLogoutModal] = useState(false)

  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar backgroundColor={Colors.mediumBlue} />
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
          <ButtonWithIcon title={Strings.personalInfo} />
          <ButtonWithIcon title={Strings.changePassword} onpress={() => navigation.navigate('withoutBottomtab', { screen: "UpdatePassword" })} />
          <ButtonWithIcon title={Strings.sportsStreamingApps} />
          <ButtonWithIcon title={Strings.aboutWatchSports} />
          <ButtonWithIcon title={Strings.legal} onpress={() => navigation.navigate('Legal')} />
          <ButtonWithIcon title={Strings.reportProblem} />
          <TouchableOpacity onPress={() => setLogoutModal(!logoutModal)}
            style={{ flexDirection: "row", marginTop: 24, alignItems: "center" }}>
            <Image source={Images.LeftArrowIcon} style={styles.logoutIcon} />
            <Text style={styles.logoutTxt}>Logout</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <CustomModalView
        visible={logoutModal}
        headerTxt={"Logout"}
        desTxt={"Are you sure you want to logut?"}
        blackBtnTxt={"No"}
        orangeBtnTxt={"Yes"}
        btn
        orangrBTn
        rowStyle={true}
        blackBtnPress={() => setLogoutModal(!logoutModal)}
        ornageBtnPress={() => setLogoutModal(!logoutModal)}
        Contianer={{ backgroundColor: Colors.black }}
      />
      {/* Powered by sports bubble */}
      {/* <View style={styles.sbContainer}>
        <Image source={Images.Sports} style={styles.leftArrowIcon} resizeMode={"contain"} />
        <Image source={Images.PoweredSB} style={styles.powerImage} resizeMode={"contain"} />
        <Text style={styles.versionTxt}>v {version}</Text>
      </View> */}
    </ImageBackground>
  );
}
