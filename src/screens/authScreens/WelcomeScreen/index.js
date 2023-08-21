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
import { useDispatch } from 'react-redux';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
        <Text style={styles.welcomeTxt}>{Strings.welcome}</Text>
        <Image source={Images.Logo} style={styles.logoImage} />
        <Text style={styles.liveSportTxt}>{Strings.liveSportsEventGuide}</Text>
        <Text style={styles.liveSportDesTxt}>
          {Strings.welcomeCreateAccount}
        </Text>
        <View style={styles.btnContainer}>
          <CustomButton
            Contianer={styles.freeBtnContainer}
            title={Strings.createFreeAccount}
            txt={styles.freeBtnTxt}
            onpress={() => navigation.navigate('Signup')}
          />
          <CustomButton
            blue={true}
            Contianer={styles.loginBtnContainer}
            txt={styles.loginBtnTxt}
            title={Strings.login}
            onpress={() => navigation.navigate('Login')}
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(setGuest(true));
              dispatch(setUser(true));
              navigation.replace('Root')
            }}
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
