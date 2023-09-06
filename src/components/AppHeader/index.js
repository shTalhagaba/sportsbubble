import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const AppHeader = props => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, props.headerContainer, props?.connect ? styles.headerContainer2 : {}]}>
      {props.LeftImage ? (
        <TouchableOpacity
          onPress={
            props?.onPressBack ? props.onPressBack : () => navigation.goBack()
          }
          style={styles.iconContainer}>
          <Image
            source={props.LeftImage}
            style={[styles.leftArrowIcon, props.customLeftImage]}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ) : null}
      <View style={styles.headerCenterContainer}>
        {props.centerImage ? (
          <Image
            source={props.centerImage}
            style={[styles.centerImage, props.centerImageStyle]}
            resizeMode={'contain'}
          />
        ) : null}
      </View>
      {props.RightImage ? (
        <TouchableOpacity
          onPress={props.rightIconPress}
          style={styles.iconContainer}>
          <Image
            source={props.RightImage}
            style={[styles.leftArrowIcon, props.customLeftImage]}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ) : null}
      {props.SimpleView ? <View style={styles.iconContainer}></View> : null}
    </View>
  );
};
export default AppHeader;


