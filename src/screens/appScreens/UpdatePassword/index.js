import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StatusBar } from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Strings from 'src/utils/strings';
import { changePassword } from 'src/services/userProfile';
import { useSelector } from 'react-redux';
import LoaderModal from 'src/components/LoaderModal';
import ShowMessage from 'src/components/ShowMessage';
import { updatePasswordValidation } from 'src/common/authValidation';


export default function UpdatePassword() {
  const navigation = useNavigation();
  const data = useSelector((state) => state.user);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newConfirmPasswordRef = useRef();
  const [loadingLocal, setLoadingLocal] = useState(false);

  const [displayCurrentPassword, setDisplayCurrentPassword] = useState(true);
  const [displayNewPassword, setDisplayNewPassword] = useState(true);
  const [displayNewConfirmPassword, setDisplayNewConfirmPassword] =
    useState(true);

  const updatePassword = async () => {
    if (updatePasswordValidation(currentPassword, newPassword, newConfirmPassword)) {
      try {
        setLoadingLocal(true);
        const user = await changePassword(data?.userData?.email, currentPassword, newPassword);
        console.log("updatePassword => ", user)
        if (user === 'SUCCESS') {
          navigation.goBack(null)
        }
        setLoadingLocal(false);
      } catch (error) {
        if (error.message.includes(':')) {
          const myArray = error.message.split(':');
        } else {
          console.log("error.message =>>", error.message)
          if (error.message == "Incorrect username or password.") {
            ShowMessage("Please enter valid current password");
          } else {
            ShowMessage(error?.message);
          }
        }
      } finally {
        setLoadingLocal(false);
      }
    }

  }

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.loginTxt}>{Strings.updatePassword}</Text>
          <ContactTextInput
            leftImage={Images.LockIcon}
            refInner={currentPasswordRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.currentPassword}
            multiline={false}
            value={currentPassword}
            maxLength={50}
            Contianer={{ marginTop: 24 }}
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
            Contianer={{ marginTop: 32 }}
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
            Contianer={{ marginTop: 16 }}
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
            Contianer={styles.saveBtnContainer}
            onpress={() => updatePassword()}
            txt={styles.btnContainerTxt}
          />
          <CustomButton
            title={Strings.cancel}
            Contianer={styles.cancelBtnContainer}
            txt={styles.btnTxt}
            onpress={() => navigation.goBack(null)}
          />
        </View>
      </ScrollView>
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground>
  );
}
