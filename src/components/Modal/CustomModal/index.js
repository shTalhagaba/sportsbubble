import React from 'react';
import {View, Modal, Text, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import CustomButton from 'src/components/CustomButton';

const CustomModal = props => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <TouchableWithoutFeedback style={styles.mainView}>
        <View style={styles.mainView}>
          <View style={styles.checkBoxContainer}>
            {props.headerTxt && (
              <Text style={styles.headerTxt}>{props?.headerTxt}</Text>
            )}
            <Text style={[styles.desTxt, props.dexTxtStyle]}>
              {props?.desTxt}
            </Text>
            {props.btn && (
              <View style={props.rowStyle ? styles.rowBtn : styles.columnBtn}>
                {props.orangrBTn ? (
                  <CustomButton
                    title={props.orangeBtnTxt}
                    Contianer={
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
                    Contianer={props.rowStyle ? {flex: 1} : null}
                    title={props.otherBtnTxt}
                    onpress={props.otherBtnPress}
                  />
                )}
                <CustomButton
                  title={props.blackBtnTxt}
                  Contianer={
                    props.rowStyle
                      ? styles.blackBtnContainer
                      : styles.blackBtnContainer2
                  }
                  onpress={props.blackBtnPress}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
