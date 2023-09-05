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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Signup() {
  const navigation = useNavigation();
  // State variables for user input and UI state
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
  const [client, setClient] = useState('');

  // Refs for input fields
  const fullNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // Function to show the verification modal
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
        setClient(user?.pool?.clientId)
        setLoadingLocal(false);
        setVerifyModal(!verifyModal);
        setEmailOptCheck(false)
        setTermsCheck(false)
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
  // Function to handle verification
  const handleVerify = async () => {
    if (otpValidation(otp)) {
      try {
        setLoadingLocal(true);
        const user = await userOTP(email, otp);
        if (user === 'SUCCESS') {
          setVerifyModal(false);
          navigation.navigate('WelcomeAccount', {
            fullName: fullName,
            email: email,
            password: password,
            client: client
          });
          setFullName('')
          setLastName('')
          setEmail('')
          setPassword('')
          setClient('')
          setConfirmPassword('')
          setOTP("")
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
  };
  // Function to handle resending verification code
  const handleResendCode = async () => {
    try {
      setLoadingLocal(true);
      const user = await resendCode(email);
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
  };

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
        headerContainer={{ marginTop: 10 }}
        SimpleView
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View style={styles.innerContainer}>
          <Text style={styles.signupTxt}>{Strings.signUp}</Text>
          {/* Input field for full name */}
          <ContactTextInput
            leftImage={Images.UserIcon}
            refInner={fullNameRef}
            Container={{ marginTop: 40 }}
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
          {/* Input field for last name */}
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

          {/* Input field for email */}
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
          {/* Input field for password */}
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
          {/* Input field for confirming password */}
          <ContactTextInput
            leftImage={Images.LockIcon}
            refInner={confirmPasswordRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.confirmPassword}
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
          {/* Checkbox for email opt-in */}
          <View style={[styles.checkboxContainer, { marginTop: 30 }]}>
            <TouchableOpacity
              onPress={() => setEmailOptCheck(!emailOptCheck)}
              style={styles.uncheckBox}>
              {emailOptCheck && (
                <Image
                  source={Images.Tick}
                  style={{
                    tintColor: Colors.white,
                    height: 10,
                    width: 10,
                  }}
                />
              )}
            </TouchableOpacity>
            <Text style={[styles.checkBoxTxt, { marginStart: 10 }]}>
              {Strings.signupTerm}
            </Text>
          </View>
          {/* Checkbox for terms and conditions */}
          <View style={[styles.checkboxContainer]}>
            <TouchableOpacity
              onPress={() => setTermsCheck(!termsCheck)}
              style={styles.uncheckBox}>
              {termsCheck && (
                <Image
                  source={Images.Tick}
                  style={{
                    tintColor: Colors.white,
                    height: 10,
                    width: 10,
                  }}
                />
              )}
            </TouchableOpacity>

            <View style={styles.termConditionContainer}>
              <Text style={styles.termsCondition}>
                {Strings.haveRead}
                <Text
                  onPress={() => navigation.navigate('Term', { selected: Strings.termUse })}
                  style={styles.termsConditionBold}>
                  {' ' + Strings.termsofService}
                </Text>{' '}
                and{' '}
                <Text
                  onPress={() => navigation.navigate('Term', { selected: Strings.privacyPolicy })}
                  style={styles.termsConditionBold}>
                  {Strings.privacyPolicy2}
                </Text>
              </Text>
            </View>
          </View>
          {/* Button to continue to verification */}
          <CustomButton
            title={Strings.continue}
            onpress={() => showVerifyModal()}
          />
          <Text style={styles.accountTxt}>{Strings.alreadyAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupTxt}>{Strings.login}</Text>
          </TouchableOpacity>
          {/* Verification Modal */}
          <CustomVeriificationModal
            visible={verifyModal}
            desTxt={Strings.pleaseCheckInbox}
            dexTxtStyle={styles.modalContainer}
            btn={true}
            otherBtnTxt={'Verify'}
            blackBtnTxt={'Resend Code'}
            otherBtnPress={() => handleVerify()}
            blackBtnPress={() => handleResendCode()}
            onChangeText={txt => setOTP(txt)}
            otpValue={otp}
          />
        </View>
      </KeyboardAwareScrollView>
      {/* Loading modal */}
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground >
  );
}
