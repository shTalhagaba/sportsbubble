import {Colors} from 'src/utils';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const CustomButton = props => {
  return (
    <TouchableOpacity
      disabled={props?.disabled}
      onPress={props.onpress}
      style={[
        styles.container,
        props.Container,
        props.blue ? {backgroundColor: props?.disabled ? Colors.greyText50 : Colors.brandBlue} : {},
      ]}>
      <View style={[styles.innerContainer, props.innerContainer]}>
        <Text style={[styles.txt, props.txt]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
