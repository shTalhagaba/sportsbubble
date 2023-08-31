import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import styles from './styles';
import {Colors} from 'src/utils';

import CustomButton from 'src/components/CustomButton';

const CustomModal = props => {
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
            {props.headerTxt && (
              <Text style={[styles.headerTxt, props.headerTxtStyle]}>
                {props?.headerTxt}
              </Text>
            )}
            <Text style={[styles.desTxt, props.dexTxtStyle]}>
              {props?.desTxt}
            </Text>
            {props.btn && (
              <View style={props.rowStyle ? styles.rowBtn : styles.columnBtn}>
                {props.fillBefore && (
                  <CustomButton
                    title={props.blackBtnTxt}
                    Container={
                      props.rowStyle
                        ? styles.blackBtnContainer
                        : styles.blackBtnContainer2
                    }
                    onpress={props.blackBtnPress}
                  />
                )}
                {props.orangrBTn ? (
                  <CustomButton
                    title={props.orangeBtnTxt}
                    Container={
                      props.rowStyle
                        ? styles.orangeBtnContainer
                        : styles.blackBtnContainer2
                    }
                    onpress={props.ornageBtnPress}
                    txt={styles.orangeTxt}
                  />
                ) : (
                  <CustomButton
                    blue={props.blue}
                    Container={props.rowStyle ? {flex: 1} : null}
                    title={props.otherBtnTxt}
                    onpress={props.otherBtnPress}
                  />
                )}
                {!props.fillBefore && (
                  <CustomButton
                    title={props.blackBtnTxt}
                    Container={
                      props.rowStyle
                        ? styles.blackBtnContainer
                        : styles.blackBtnContainer2
                    }
                    onpress={props.blackBtnPress}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
