import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import {Images, Colors, Fonts, Strings} from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setGuest, setToken, setUser, setUserData} from 'src/store/types';
import {userLogin} from 'src/services/authLogin';
import {loginValidation} from 'src/common/authValidation';
import LoaderModal from 'src/components/LoaderModal';
import {ShowMessage} from 'src/components/ShowMessage';
import { confirmPasswordReset } from 'src/services/authForgotPassword';

export default function ResetPassword(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState(true);
  const [loadingLocal, setLoadingLocal] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleConfirmPassword = async () => {
    try {
      if (otp && password) {
        const resetSuccess = await confirmPasswordReset(props?.route?.params?.email, password, otp);
        if (resetSuccess) {
          ShowMessage('Password reset successful. You can now log in with your new password.');
          navigation.replace('Login')
        }
      } else {
        ShowMessage('Please enter verification code and new password.');
      }
    } catch (error) {
      ShowMessage(error);
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
        headerContainer={{marginTop: 10}}
        SimpleView
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.loginTxt}>{Strings.resetPassword}</Text>
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
          <CustomButton
            onpress={handleConfirmPassword}
            blue={true}
            title={Strings.submit}
            Contianer={styles.blueButtonContainer}
            txt={styles.blueButtonTxt}
          />
        </View>
      </ScrollView>
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground>
  );
}
