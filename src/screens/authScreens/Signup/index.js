import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Strings } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { signupValidation, otpValidation } from 'src/common/authValidation';
import LoaderModal from 'src/components/LoaderModal';
import { ShowMessage } from 'src/components/ShowMessage';
import { userSignup } from 'src/services/authSignup';
import { resendCode, userOTP } from 'src/services/authOTP';
import CustomVeriificationModal from 'src/components/Modal/CustomVeriificationModal';

export default function Signup() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailOptCheck, setEmailOptCheck] = useState(false);
  const [termsCheck, setTermsCheck] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [otp, setOTP] = useState();

  const [displayPassword, setDisplayPassword] = useState(true);
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(true);

  const fullNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const showVerifyModal = async () => {
    if (
      signupValidation(
        fullName,
        lastName,
        email,
        password,
        confirmPassword,
        emailOptCheck,
        termsCheck,
      )
    ) {
      try {
        setLoadingLocal(true);
        const user = await userSignup(fullName, lastName, email, password);
        setLoadingLocal(false);
        setVerifyModal(!verifyModal)
      } catch (error) {
        if (error.message.includes(':')) {
          const myArray = error.message.split(':');
        } else {
          ShowMessage(error.message);
        }
      } finally {
        setLoadingLocal(false);
      }
    }
  };
  const handleVerify = async () => {
    if (otpValidation(otp)) {
      try {
        setLoadingLocal(true);
        const user = await userOTP(email, otp);
        if(user === 'SUCCESS'){
          setVerifyModal(false)
        }
        setLoadingLocal(false);
      } catch (error) {
        if (error.message.includes(':')) {
          const myArray = error.message.split(':');
        } else {
          ShowMessage(error.message);
        }
      } finally {
        setLoadingLocal(false);
      }
    }
  }
  const handleResendCode = async () => {
    console.log('handleResendCode : ')
      try {
        setLoadingLocal(true);
        const user = await resendCode(email);
        console.log("Userr => ", user)
        setLoadingLocal(false);
      } catch (error) {
        if (error.message.includes(':')) {
          const myArray = error.message.split(':');
        } else {
          ShowMessage(error.message);
        }
      } finally {
        setLoadingLocal(false);
      }
  }

  return (
    <ImageBackground
      source={Images.Background2}
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
        SimpleView
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.signupTxt}>{Strings.signUp}</Text>
          <ContactTextInput
            leftImage={Images.UserIcon}
            refInner={fullNameRef}
            Contianer={{ marginTop: 40 }}
            placeholderTextColor={Colors.white}
            placeholder={Strings.firstName}
            multiline={false}
            value={fullName}
            maxLength={50}
            onChangeText={txt => setFullName(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              lastNameRef.current.focus();
            }}
          />
          <ContactTextInput
            leftImage={Images.UserIcon}
            refInner={lastNameRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.lastName}
            multiline={false}
            value={lastName}
            maxLength={50}
            onChangeText={txt => setLastName(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
          />
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
            blurOnSubmit={false}
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
          />
          <ContactTextInput
            leftImage={Images.LockIcon}
            refInner={passwordRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.password}
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
            onSubmitEditing={() => {
              confirmPasswordRef.current.focus();
            }}
          />
          <ContactTextInput
            leftImage={Images.LockIcon}
            refInner={confirmPasswordRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.confrimPassword}
            multiline={false}
            value={confirmPassword}
            maxLength={50}
            onChangeText={txt => setConfirmPassword(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'done'}
            secureText
            secureTextEntry={displayConfirmPassword}
            eyeOpen={displayConfirmPassword}
            onPress={() => setDisplayConfirmPassword(!displayConfirmPassword)}
          />
          <View style={styles.chekboxContainer}>
            <TouchableOpacity
              onPress={() => setEmailOptCheck(!emailOptCheck)}
              style={styles.uncheckBox}>
              {emailOptCheck && (
                <Image
                  source={Images.Tick}
                  style={{ tintColor: Colors.white, height: 10, width: 10 }}
                />
              )}
            </TouchableOpacity>
            <Text style={[styles.checkBoxTxt, { marginStart: 10 }]}>
              {Strings.signupTerm}
            </Text>
          </View>
          <View style={styles.chekboxContainer}>
            <TouchableOpacity
              onPress={() => setTermsCheck(!termsCheck)}
              style={styles.uncheckBox}>
              {termsCheck && (
                <Image
                  source={Images.Tick}
                  style={{ tintColor: Colors.white, height: 10, width: 10 }}
                />
              )}
            </TouchableOpacity>

            <View style={styles.termConditionContainer}>
              <Text style={styles.termsCondition}>
                {Strings.haveRead}
                <Text
                  onPress={() => console.log('temrs')}
                  style={styles.termsConditionBold}>
                  {' ' + Strings.termsofService}
                </Text>
                {''} and {''}
                <Text
                  onPress={() => console.log('privacy policy')}
                  style={styles.termsConditionBold}>
                  {Strings.privacyPolicy2}
                </Text>
              </Text>
            </View>
          </View>
          <CustomButton
            title={Strings.continue}
            onpress={() => showVerifyModal()}
          />
          <CustomVeriificationModal
            visible={verifyModal}
            desTxt={Strings.pleaseCheckInbox}
            dexTxtStyle={styles.modalContainer}
            btn={true}
            otherBtnTxt={'Verify'}
            blackBtnTxt={'Resend Code'}
            otherBtnPress={() => handleVerify()}
            blackBtnPress={() => handleResendCode()}
            onChangeText={(txt) => setOTP(txt)}
            otpValue={otp}
          />
        </View>
      </ScrollView>
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground>
  );
}
