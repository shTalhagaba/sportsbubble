import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { Images } from 'src/utils';

const ContactHeaderTextInput = props => {
  return (
    <View style={[styles.container, props.Container]}>
      <View style={[styles.innerContainer, props.innerContainer]}>
        <View style={[styles.headerContainer, props.headerContainer]}>
          <Image
            source={props.leftImage}
            style={styles.leftIcon}
            resizeMode={'contain'}
          />
          <Text style={styles.headerTxt}>{props.headerName}</Text>
        </View>
        <TextInput
          {...props}
          style={[styles.inputField, props.customInputStyle]}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          multiline={props.multiline}
          value={props.value}
          underlineColorAndroid="transparent"
          editable={props.editable}
          secureTextEntry={props.secureTextEntry}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          textAlignVertical={props.textAlignVertical}
          maxLength={props.maxLength} ss
          autoCapitalize={props.autoCapitalize}
          returnKeyType={props.returnKeyType}
          onSubmitEditing={props.onSubmitEditing}
          blurOnSubmit={props.blurOnSubmit}
          ref={props.refInner}
          numberOfLines={props.numberOfLines}
        />
      </View>
      {props.secureText && (
        <TouchableOpacity onPress={props.onPress} style={styles.iconContainer}>
          <Image
            source={props.eyeOpen ? Images.EyeOpen : Images.EyeClose}
            style={styles.eyeIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
      {props.rightImage && (
        <TouchableOpacity
          onPress={props.pressRightImage}
          style={styles.iconContainer}>
          <Image
            source={props.rightImage}
            style={[styles.eyeIcon, props.iconStyle]}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ContactHeaderTextInput;
