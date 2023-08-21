import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Images } from 'src/utils';

const GreenButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onpress}
      style={[styles.container, props.Contianer]}>
      <View style={[styles.innerContainer, props.innerContainer]}>
        <Text style={[styles.btnTxt,props.btnTxt]}>{props.title}</Text>
        {props.rightIcon &&
          <View style={styles.iconContainer}>
            <Image
              source={Images.PlayIcon}
              style={styles.eyeIcon}
              resizeMode={'contain'}
            />
          </View>}
      </View>
    </TouchableOpacity>
  );
};

export default GreenButton;
