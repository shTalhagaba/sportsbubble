import React, {useState} from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

const AppSearch = props => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View
      style={[
        styles.container,
        props.customContainer,
        isFocused ? styles.focus : styles.blur,
      ]}>
      {props.searchImage ? (
        <Image
          source={props.searchImage}
          style={styles.searchImage}
          resizeMode={'contain'}
        />
      ) : null}
      <TextInput
        style={[styles.inputField, props.customInputStyle]}
        placeholder={props.placeHolder}
        placeholderTextColor={props.placeHolderColor}
        multiline={props.multiline}
        value={props.value}
        editable={props.editable}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        textAlignVertical={props.textAlignVertical}
        maxLength={props.maxLength}
        autoCapitalize={props.autoCapitalize}
        returnKeyType={props.returnKeyType}
        onSubmitEditing={props.onSubmitEditing}
        blurOnSubmit={props.blurOnSubmit}
        ref={props.refInner}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {props.closeImage ? (
        <TouchableOpacity onPress={props.onPressCloseImage}>
          <Image
            source={props.closeImage}
            style={styles.crossImage}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default AppSearch;
