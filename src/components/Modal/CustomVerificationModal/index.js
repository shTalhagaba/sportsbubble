import React from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, StatusBar, TextInput } from 'react-native';
import styles from './styles';
import { Colors } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CustomVerificationModal = (props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      <TouchableWithoutFeedback style={styles.mainView}>
        <View style={styles.mainView}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.checkBoxContainer}>
              <Text style={[styles.desTxt, props.dexTxtStyle]}>
                {props?.desTxt}
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputField}
                  autoFocus={true}
                  placeholder={'Code'}
                  placeholderTextColor={Colors.white}
                  keyboardType={'number-pad'}
                  returnKeyType='done'
                  maxLength={6}
                  value={props.otpValue}
                  onChangeText={props.onChangeText}
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
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomVerificationModal;
