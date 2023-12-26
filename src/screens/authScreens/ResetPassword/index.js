import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Strings } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { resetPasswordValidation } from 'src/common/authValidation';
import LoaderModal from 'src/components/LoaderModal';
import { ShowMessage } from 'src/components/ShowMessage';
import { confirmPasswordReset } from 'src/services/authForgotPassword';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ResetPassword(props) {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState(true);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  // Function to handle password reset confirmation
  const handleConfirmPassword = async () => {
    try {
      if (resetPasswordValidation(otp, password)) {
        setLoadingLocal(true);
        const resetSuccess = await confirmPasswordReset(
          props?.route?.params?.email,
          password,
          otp,
        );
        if (resetSuccess) {
          ShowMessage(Strings.passwordResetSuccessfully);
          setLoadingLocal(false);
          navigation.replace('Login'); // Navigate to the login screen
        }
        setLoadingLocal(false);
      }
    } catch (error) {
      ShowMessage(error);
      setLoadingLocal(false);
    }
  };

  return (
    <ImageBackground
      source={Images.Background3}
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
        headerContainer={{ marginTop: 10 }}
        SimpleView
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View style={styles.innerContainer}>
          <Text style={styles.loginTxt}>{Strings.resetPassword}</Text>
          {/* Input field for OTP */}
          <ContactTextInput
            leftImage={Images.EmailIcon}
            refInner={emailRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.code}
            multiline={false}
            value={otp}
            maxLength={6}
            onChangeText={txt => setOtp(txt)}
            keyboardType={'phone-pad'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
          />
          {/* Input field for new password */}
          <ContactTextInput
            leftImage={Images.LockIcon}
            refInner={passwordRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.newPassword}
            multiline={false}
            value={password}
            maxLength={50}
            onChangeText={txt => setPassword(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            secureText
            secureTextEntry={displayPassword}
            eyeOpen={displayPassword}
            onPress={() => setDisplayPassword(!displayPassword)}
          />
          {/* Button to submit the password reset */}
          <CustomButton
            onpress={handleConfirmPassword}
            blue={true}
            title={Strings.submit}
            Container={styles.blueButtonContainer}
            txt={styles.blueButtonTxt}
          />
        </View>
      </KeyboardAwareScrollView>
      {/* Loading modal */}
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground>
  );
}
