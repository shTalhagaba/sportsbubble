import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Strings } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { signupValidation } from 'src/common/authValidation';
import LoaderModal from 'src/components/LoaderModal';
import { ShowMessage } from 'src/components/ShowMessage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import {
  setUserSignupData
} from 'src/store/types';

export default function Signup() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsCheck, setTermsCheck] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [displayPassword,] = useState(true);
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(true);
  // Refs for input fields
  const fullNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  // Function to show the verification modal
  const handleContinue = async () => {
    if (
      signupValidation(
        fullName,
        lastName,
        email,
        password,
        confirmPassword,
        termsCheck,
      )
    ) {
      try {
        dispatch(setUserSignupData({ fullName: fullName, lastName: lastName, email: email, password: password }))
        navigation.navigate('WelcomeAccount')
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
        keyboardShouldPersistTaps={'handled'}
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
          {/* Checkbox for terms and conditions */}
          <View style={[styles.checkboxContainer]}>
            <TouchableOpacity
              activeOpacity={0.8}
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
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.termsCondition}>
                  {Strings.haveRead}
                </Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Term', { selected: Strings.termUse })}>
                  <Text style={styles.termsConditionBold}>
                    {' '}{Strings.termsofService}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.termsCondition}>
                  and{' '}
                </Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Term', { selected: Strings.privacyPolicy })}>
                  <Text style={styles.termsConditionBold}>
                    {Strings.privacyPolicy2}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Button to continue to verification */}
          <CustomButton
            title={Strings.continue}
            onpress={() => handleContinue()}
          />
          <Text style={styles.accountTxt}>{Strings.alreadyAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginTxt}>{Strings.login}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {/* Loading modal */}
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground >
  );
}
