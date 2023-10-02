import React, { useState } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, StatusBar, TextInput } from 'react-native';
import styles from './styles';
import { Colors } from 'src/utils';
import CustomButton from 'src/components/CustomButton';

const CustomVeriificationModal = props => {
  const [isFocused, setIsFocused] = useState(true);
  const [searchText, setSearchText] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleInputChange = text => {
    setSearchText(text);
  };

  const handleDone = () => {
    setIsFocused(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      <TouchableWithoutFeedback style={styles.mainView}>
        <View style={styles.mainView}>
          <View style={styles.checkBoxContainer}>
            <Text style={[styles.desTxt, props.dexTxtStyle]}>
              {props?.desTxt}
            </Text>
            <View
              style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                onFocus={handleFocus}
                autoFocus={true}
                placeholder={'Code'}
                placeholderTextColor={Colors.white}
                maxLength={6}
                value={props.otpValue}
                onChangeText={props.onChangeText}
                onSubmitEditing={handleDone}
              />
            </View>
            <View style={styles.columnBtn}>
              <CustomButton
                blue={props.blue}
                Container={styles.greenButtonContainer}
                title={props.otherBtnTxt}
                onpress={props.otherBtnPress}
                txt={styles.greenButtonTxt}
              />
              <CustomButton
                title={props.blackBtnTxt}
                Container={styles.blackBtnContainer2}
                txt={styles.greenButtonTxt}
                onpress={props.blackBtnPress}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomVeriificationModal;
