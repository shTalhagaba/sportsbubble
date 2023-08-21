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

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState(true);
  const [loadingLocal, setLoadingLocal] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const buttonSignin = () => {
    login();
  };

  async function login() {
    if (loginValidation(email, password)) {
      try {
        setLoadingLocal(true);
        const user = await userLogin(email, password);
        user.id = user?.accessToken?.payload?.sub ?? '';
        setLoadingLocal(false);
        console.log(user)
        if (user?.idToken?.payload) {
          dispatch(setUser(true));
          dispatch(setGuest(false));
          dispatch(setToken(user?.idToken?.jwtToken))
          dispatch(setUserData(user?.idToken?.payload))
          setEmail('');
          setPassword('');
          navigation.replace('Root')
        }
      } catch (error) {
        console.log('error : ', error);
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
            Contianer={styles.blueButtonContainer}
            txt={styles.blueButtonTxt}
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
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground>
  );
}
