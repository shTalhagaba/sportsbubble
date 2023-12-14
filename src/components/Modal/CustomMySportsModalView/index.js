import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import styles from './styles';
import {Colors, Images} from 'src/utils';
import CustomButton from 'src/components/CustomButton';

const CustomMySportsModalView = props => {
  return (
    <Modal transparent={true} visible={props.visible}>
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      <View style={styles.viewContainer}>
        <ImageBackground
          source={Images.BackgroundMySportsGuide}
          resizeMode={Platform.OS === 'android' ? 'stretch' : 'contain'}
          style={styles.container}>
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
                  <View
                    style={props.rowStyle ? styles.rowBtn : styles.columnBtn}>
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
                        Container={
                          props.rowStyle ? {flex: 1} : styles.buttonStyle
                        }
                        title={props.otherBtnTxt}
                        txt={styles.buttonTxt}
                        onpress={props.otherBtnPress}
                      />
                    )}
                    <CustomButton
                      title={props.blackBtnTxt}
                      Container={
                        props.rowStyle
                          ? styles.blackBtnContainer
                          : styles.blackBtnContainer2
                      }
                      txt={styles.buttonTxt}
                      onpress={props.blackBtnPress}
                    />
                  </View>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </View>
    </Modal>
  );
};
export default CustomMySportsModalView;
