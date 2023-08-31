import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Images } from 'src/utils';

const ButtonWithIcon = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onpress}
      style={[styles.container, props.Container]}>
      <View style={[styles.innerContainer, props.innerContainer]}>
        <Text style={[styles.headingTxt]}>{props.title}</Text>
        <Image
          source={Images.RightArrow}
          style={styles.rightArrowIcon}
          resizeMode={'contain'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
