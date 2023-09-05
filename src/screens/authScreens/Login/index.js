import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Strings } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  setGuest,
  setJwtToken,
  setToken,
  setUser,
  setUserData,
} from 'src/store/types';
import { userLogin } from 'src/services/authLogin';
import { loginValidation } from 'src/common/authValidation';
import LoaderModal from 'src/components/LoaderModal';
import { ShowMessage } from 'src/components/ShowMessage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // State variables to store user input and UI state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState(true);
  const [loadingLocal, setLoadingLocal] = useState(false);

  // Refs for input fields
  const emailRef = useRef();
  const passwordRef = useRef();

  // Function to handle sign-in button press
  const buttonSignin = () => {
    login();
  };

  // Async function to handle user login
  async function login() {
    if (loginValidation(email, password)) {
      try {
        setLoadingLocal(true);
        const user = await userLogin(email, password);
        user.id = user?.accessToken?.payload?.sub ?? '';
        setLoadingLocal(false);
        // Check if user login was successful
        if (user?.idToken?.payload) {
          dispatch(setUser(true));
          dispatch(setGuest(false));
          dispatch(setToken(user?.idToken?.jwtToken));
          dispatch(setJwtToken(user?.accessToken?.jwtToken));
          dispatch(setUserData(user?.idToken?.payload));
          setEmail('');
          setPassword('');
          navigation.replace('Root'); // Navigate to the 'Root' screen
        }
      } catch (error) {
        console.log('error : ', error);
        // Handle different types of error messages
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
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View style={styles.innerContainer}>
          <Text style={styles.loginTxt}>{Strings.login}</Text>
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
          />
          {/* Sign-in button */}
          <CustomButton
            onpress={buttonSignin}
            blue={true}
            title={Strings.signIn}
            Container={styles.blueButtonContainer}
            txt={styles.blueButtonTxt}
          />
          {/* Forgot password link */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotTxt}>{Strings.forgotPassword}</Text>
          </TouchableOpacity>

          <Text style={styles.accountTxt}>{Strings.dontAccount}</Text>
          {/* Sign-up link */}
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupTxt}>{Strings.signUp}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {/* Loading modal */}
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground>
  );
}
