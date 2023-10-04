import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Strings } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { forgotPasswordValidation } from 'src/common/authValidation';
import { initiateForgotPassword } from 'src/services/authForgotPassword';
import LoaderModal from 'src/components/LoaderModal';
import ShowMessage from 'src/components/ShowMessage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(false);
  const emailRef = useRef();

  // Function to handle forgot password request
  const handleForgotPassword = async () => {
    if (forgotPasswordValidation(email)) {
      try {
        setLoadingLocal(true);
        const user = await initiateForgotPassword(email);
        if (user === 'SUCCESS' || user) {
          setLoadingLocal(false);
          ShowMessage(Strings.passwordResetInitiation);
          navigation.replace('ResetPassword', {
            email: email,
          });
        }
        setLoadingLocal(false);
      } catch (error) {
        console.log('Error => ', error);
        ShowMessage(error);
      } finally {
        setLoadingLocal(false);
      }
    }
  };

  return (
    <ImageBackground
      source={Images.Background}
      resizeMode="cover"
      style={styles.container}
    >
      {/* Status bar */}
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      {/* Header */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        headerContainer={{ marginTop: 10 }}
        SimpleView
      />
      {/* Scrollable content */}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View style={{ marginHorizontal: 20 }}>
          {/* Forgot Password text */}
          <Text style={styles.loginTxt}>{Strings.forgotPassword}</Text>
          {/* Email input */}
          <ContactTextInput
            leftImage={Images.EmailIcon}
            refInner={emailRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.email}
            multiline={false}
            value={email}
            maxLength={50}
            onChangeText={txt => setEmail(txt)}
            keyboardType={'email-address'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={true}
          />
          {/* Submit button */}
          <CustomButton
            blue={true}
            title={Strings.submit}
            Container={styles.blueButtonContainer}
            txt={styles.blueButtonTxt}
            onpress={() => handleForgotPassword()}
          />
          <Text style={styles.accountTxt}>{Strings.dontAccount}</Text>
          {/* Sign Up button */}
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupTxt}>{Strings.signUp}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {/* Loader modal */}
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground>
  );
}
