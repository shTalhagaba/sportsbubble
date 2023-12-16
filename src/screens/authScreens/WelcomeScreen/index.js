import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { setGuest, setUser } from 'src/store/types';
import { useDispatch, useSelector } from 'react-redux';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.user);
  const flags = useSelector(state => state?.feature?.flags);

  return (
    <View style={styles.containerTop}>
      <ImageBackground
        source={Images.HomeScreen}
        resizeMode="contain"
        style={styles.container}>
        <StatusBar
          backgroundColor={Colors.transparent}
          translucent
          barStyle="light-content"
        />
        <View style={styles.innerContainer}>
          {/* Welcome Text */}
          <Text style={styles.welcomeTxt}>{Strings.welcome}</Text>
          {/* Logo */}
          <Image source={Images.Logo} style={styles.logoImage} />
          {/* Live Sports Event Text */}
          <Text style={styles.liveSportTxt}>
            {Strings.liveSportsEventGuide}
          </Text>
          {/* Welcome Description Text */}
          <Text style={styles.liveSportDesTxt}>
            {Strings.welcomeCreateAccount}
          </Text>
          <View style={styles.btnContainer}>
            {/* Create Free Account Button */}
            <CustomButton
              Container={styles.freeBtnContainer}
              title={Strings.createFreeAccount}
              txt={styles.freeBtnTxt}
              onpress={() => navigation.navigate('Signup')}
            />
            {/* Login Button */}
            <CustomButton
              blue={true}
              Container={styles.loginBtnContainer}
              txt={styles.loginBtnTxt}
              title={Strings.login}
              onpress={() => navigation.navigate('Login')}
            />
            {/* Continue as Guest Button */}
            <TouchableOpacity
              onPress={() => {
                dispatch(setGuest(true));
                dispatch(setUser(false));
                if ((!flags?.WEB3 || !flags?.V_2_03_TOOL_TIPS) && reduxData?.tooltipStatus) {
                  navigation.replace("Tooltip")
                } else {
                  navigation.replace('Root')
                }
              }
              }
              style={styles.guestContainer}>
              <Text style={styles.guestTxt}>{Strings.continueGuest}</Text>
              <Image
                source={Images.RightArrow}
                style={styles.rightArrowImage}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
