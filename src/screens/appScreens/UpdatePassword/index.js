import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Strings from 'src/utils/strings';
import { changePassword } from 'src/services/userProfile';
import { useDispatch, useSelector } from 'react-redux';
import LoaderModal from 'src/components/LoaderModal';
import ShowMessage from 'src/components/ShowMessage';
import { updatePasswordValidation } from 'src/common/authValidation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signOut } from 'src/services/authOTP';
import { setJwtToken, setRefreshToken, setSportsList, setToken, setUser, setUserData } from 'src/store/types';

export default function UpdatePassword() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector(state => state.user);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newConfirmPasswordRef = useRef();
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [displayCurrentPassword, setDisplayCurrentPassword] = useState(true);
  const [displayNewPassword, setDisplayNewPassword] = useState(true);
  const [displayNewConfirmPassword, setDisplayNewConfirmPassword] = useState(true);

  const updatePassword = async () => {
    if (
      updatePasswordValidation(currentPassword, newPassword, newConfirmPassword)
    ) {
      try {
        setLoadingLocal(true);
        const user = await changePassword(
          data?.userData?.email,
          currentPassword,
          newPassword,
        );
        if (user === 'SUCCESS') {
          signOut()
          .then((response) => {
            console.error('response', response);
            dispatch(setUser(false));
            dispatch(setUserData({}));
            dispatch(setToken(''));
            dispatch(setJwtToken(''));
            dispatch(setRefreshToken(''));
            dispatch(setSportsList([]));
            navigation.replace('Auth');
            ShowMessage('Password changed successfully.')
          })
          .catch(error => {
            console.error('Error signing out:', error.message);
            ShowMessage(error.message)
            if (error?.message === 'User not authenticated.') {
              dispatch(setUser(false));
              dispatch(setUserData({}));
              dispatch(setJwtToken(''));
              dispatch(setRefreshToken(''));
              dispatch(setToken(''));
              navigation.replace('Auth');
            }
          });
        }
        setLoadingLocal(false);
      } catch (error) {
        if (error.message.includes(':')) {
          const myArray = error.message.split(':');
        } else {
          console.log('error.message =>>', error.message);
          if (error.message == 'Incorrect username or password.') {
            ShowMessage('Please enter valid current password');
          } else {
            ShowMessage(error?.message);
          }
        }
        setLoadingLocal(false);
      } finally {
        setLoadingLocal(false);
      }
    }
  };

  return (
    <ImageBackground
      source={Images.Background}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.darkOrange }}
        SimpleView
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View style={styles.innerContainer}>
          <Text style={styles.loginTxt}>{Strings.updatePassword}</Text>
          <ContactTextInput
            leftImage={Images.LockIcon}
            refInner={currentPasswordRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.currentPassword}
            multiline={false}
            value={currentPassword}
            maxLength={50}
            Container={{ marginTop: 24 }}
            onChangeText={txt => setCurrentPassword(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            secureText
            secureTextEntry={displayCurrentPassword}
            eyeOpen={displayCurrentPassword}
            onPress={() => setDisplayCurrentPassword(!displayCurrentPassword)}
            onSubmitEditing={() => {
              newPasswordRef.current.focus();
            }}
          />
          <ContactTextInput
            leftImage={Images.LockIcon}
            refInner={newPasswordRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.newPassword}
            multiline={false}
            value={newPassword}
            maxLength={50}
            Container={{ marginTop: 32 }}
            onChangeText={txt => setNewPassword(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'done'}
            secureText
            secureTextEntry={displayNewPassword}
            eyeOpen={displayNewPassword}
            onPress={() => setDisplayNewPassword(!displayNewPassword)}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              newConfirmPasswordRef.current.focus();
            }}
          />
          <ContactTextInput
            leftImage={Images.LockIcon}
            refInner={newConfirmPasswordRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.confirmNewPassword}
            multiline={false}
            value={newConfirmPassword}
            maxLength={50}
            Container={{ marginTop: 16 }}
            onChangeText={txt => setNewConfirmPassword(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'done'}
            secureText
            secureTextEntry={displayNewConfirmPassword}
            eyeOpen={displayNewConfirmPassword}
            onPress={() =>
              setDisplayNewConfirmPassword(!displayNewConfirmPassword)
            }
          />
          <CustomButton
            title={Strings.saveChanges}
            Container={styles.saveBtnContainer}
            onpress={() => updatePassword()}
            txt={styles.btnContainerTxt}
          />
          <CustomButton
            title={Strings.cancel}
            Container={styles.cancelBtnContainer}
            txt={styles.btnTxt}
            onpress={() => navigation.goBack(null)}
          />
        </View>
      </KeyboardAwareScrollView>
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground>
  );
}
