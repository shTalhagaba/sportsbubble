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
import {setGuest, setUser} from 'src/store/types';
import {Auth, JS} from 'aws-amplify';
import {userLogin} from 'src/services/authLogin';

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  const [displayPassword, setDisplayPassword] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  const buttonSignin = () => {
    login();
  };

  async function login() {
    setPasswordMessage(false);
    setEmailMessage(false);
    if (email !== '' && password !== '') {
      try {
        const user = await userLogin(email, password);
        user.id = user?.accessToken?.payload?.sub ?? '';
        console.log(user?.accessToken?.payload);
        if (user?.accessToken?.payload) {
          dispatch(setUser(true));
          dispatch(setGuest(false));
          setEmail('');
          setPassword('');
        }
        // dispatch(setToken(user?.signInUserSession?.idToken?.jwtToken))
        // props.navigation.navigate("start")
      } catch (error) {
        console.log('error : ', error);
        if (error.message.includes(':')) {
          const myArray = error.message.split(':');
        } else {
          alert(error.message);
          setloading(false);
        }
      }
    } else {
      if (email === '' && password === '') {
        setPasswordMessage(true);
        setEmailMessage(true);
      }
      if (email === '') setEmailMessage(true);
      if (password === '') setPasswordMessage(true);
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
        headerContainer={{marginTop: 10}}
        SimpleView
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.loginTxt}>{Strings.login}</Text>
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
          />
          <CustomButton
            onpress={buttonSignin}
            blue={true}
            title={Strings.signIn}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotTxt}>{Strings.forgotPassword}</Text>
          </TouchableOpacity>

          <Text style={styles.accountTxt}>{Strings.dontAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupTxt}>{Strings.signUp}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
