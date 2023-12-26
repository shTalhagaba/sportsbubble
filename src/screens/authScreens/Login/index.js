import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Strings } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGuest,
  setJwtToken,
  setRefreshToken,
  setToken,
  setUser,
  setUserData,
  setUserEmail,
  setUserLoginVerified,
  setUserSignupData
} from 'src/store/types';
import { userLogin } from 'src/services/authLogin';
import { loginValidation } from 'src/common/authValidation';
import LoaderModal from 'src/components/LoaderModal';
import { ShowMessage } from 'src/components/ShowMessage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_FAVOURITE_SPORTS } from 'src/graphQL';
import { subscribeInterest, initializePusher } from "src/components/Pusher/PusherBeams";
import {
  checkNotifications,
  requestNotifications
} from 'react-native-permissions';


export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // State variables to store user input and UI state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState(true);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const user = useSelector(state => state.user)

  // To Intialize Pusher on Login
  const [userSports, { loading, data: userSportsData }] = useLazyQuery(GET_USER_FAVOURITE_SPORTS, {
    fetchPolicy: 'no-cache'
  })

  // Function to handle sign-in button press
  const buttonSignin = () => {
    login();
  };

  const checkUserState = async () => {
    if (user?.userData?.email) {
      await userSports({
        variables: {
          cognitoId: user?.userData?.sub
        }
      })
    }
  }
  const handleSports = async () => {
    if (userSportsData) {
      await handleInitialPusher()
      navigation.replace('Root')
    }
  }
  useEffect(() => {
    handleSports()
  }, [userSportsData])

  useEffect(() => {
    checkUserState()
  }, [user?.userData])


  const subscribeToInterests = async (interestList) => {
    try {
      for (const interest of interestList) {
        await subscribeInterest(interest);
      }
      console.log('All interests subscribed successfully');
    } catch (error) {
      console.error('Error subscribing to interests:', error);
    }
  };
  // Function to Initialize Interest
  const handleInitialPusher = async () => {
    setLoadingLocal(true);
    const interestList = userSportsData?.consumers?.[0]?.favoriteSports?.flatMap(favoriteSport => {
      if (!favoriteSport?.notifications) return []
      
      if (!['pro', 'esports', 'college']?.includes(favoriteSport?.categories?.[0]?.name)) {
        return `others-${favoriteSport?.sport?.name?.replaceAll(/[^A-Z0-9]+/ig, '')}`
      } else {
        return `${favoriteSport?.categories?.[0]?.name}-${favoriteSport?.sport?.name?.replaceAll(/[^A-Z0-9]+/ig, '')}`
      }
    })
    if( interestList && interestList?.length > 0 ){ 
      initializePusher()
      const { status } = await checkNotifications()
      if (status === 'granted') {
        subscribeToInterests(interestList)
      }

      else if (status === 'denied') {
        await requestNotifications(['alert', 'sound'])
      }
    }
    setLoadingLocal(false);
  };

  // Async function to handle user login
  async function login() {
    if (loginValidation(email, password)) {
      try {
        setLoadingLocal(true);
        const user = await userLogin(email, password);
        user.id = user?.accessToken?.payload?.sub ?? '';
        // Check if user login was successful
        if (user?.idToken?.payload) {
          dispatch(setUser(true));
          dispatch(setGuest(false));
          dispatch(setToken(user?.idToken?.jwtToken));
          dispatch(setJwtToken(user?.accessToken?.jwtToken));
          dispatch(setRefreshToken(user?.refreshToken));
          dispatch(setUserData(user?.idToken?.payload));
          setEmail('');
          setPassword('');
          await AsyncStorage.setItem('accessToken',JSON.stringify(user?.idToken?.jwtToken));
          await AsyncStorage.setItem('refreshToken',JSON.stringify(user?.refreshToken?.token));
          await handleInitialPusher();
          setLoadingLocal(false);
        }
      } catch (error) {
        setLoadingLocal(false);
        // Handle different types of error messages
        if (error.message.includes(':')) {
          const myArray = error.message.split(':');
        } else {
          if (error.message === "User is not confirmed.") {
            dispatch(setUserSignupData({ email: email, password: password }))
            dispatch(setUserEmail(email))
            dispatch(setUserLoginVerified(true))
            dispatch(setGuest(false));
            navigation.navigate('WelcomeAccount');
          }
          ShowMessage(error.message);
        }
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
        keyboardShouldPersistTaps={'handled'}
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
