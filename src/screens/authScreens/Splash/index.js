import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  Dimensions,
  View,
  Image,
  Text,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from 'src/utils';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

export default function Splash() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const height = Dimensions.get('window').height;

  useEffect(() => {
    setTimeout(() => {
    //    navigation.replace('Login')
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.Background2}
        style={{ height: '100%', width: '100%' }}
        resizeMode="cover"
      >
        <ImageBackground
          source={Images.SplashBackTop}
          style={{ height:height/2.5,}}
          resizeMode="cover"
        >
          <StatusBar
            backgroundColor={Colors.transparent}
            translucent
            barStyle="light-content"
          />
                  </ImageBackground>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: height / 4,
            }}
          >
            <Image
              source={Images.LogoText}
              style={{ height: 230, width: 230, alignSelf: 'center' }}
              resizeMode="contain"
            />
          </View>
          {/* Powered by sports bubble */}
          <View style={styles.sbContainer}>
            <Image
              source={Images.Sports}
              style={styles.leftArrowIcon}
              resizeMode="contain"
            />
            <Image
              source={Images.PoweredSB}
              style={styles.powerImage}
              resizeMode="contain"
            />
          </View>
      </ImageBackground>
    </View>
  );
  
}
