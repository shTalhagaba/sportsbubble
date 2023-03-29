import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Images, Colors} from 'src/utils';

const ButtonWithIcon = props => {
  return (
    <TouchableOpacity
      onPress={props.onpress}
      style={[styles.container, props.Contianer]}>
      <View style={[styles.innerContainer, props.innerContainer]}>
        <Text style={[styles.inputField]}>{props.title}</Text>
        <View style={styles.iconContainer}>
          <Image
            source={Images.RightArrow}
            style={styles.eyeIcon}
            resizeMode={'contain'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
