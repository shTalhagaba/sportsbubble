import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Strings } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import ShowMessage from 'src/components/ShowMessage';
import LoaderModal from 'src/components/LoaderModal';
import { completeProfileValidation, otpValidation } from 'src/common/authValidation';
import dayjs from 'dayjs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useMutation } from '@apollo/client';
import { CREATE_CONSUMER } from 'src/graphQL';
import { optionsList } from 'src/utils/list';
import { useDispatch, useSelector } from 'react-redux';
import { userSignup, signupComplete } from 'src/services/authSignup';
import { resendCode, userOTP } from 'src/services/authOTP';
import CustomVerificationModal from 'src/components/Modal/CustomVerificationModal';
import {
  setUserVerifiedFlag, setUserEmail,
  setUserLoginVerified,
  setUserSignupData,
  setUser,
  setGuest,
  setToken,
  setJwtToken,
  setUserData
} from 'src/store/types';
import { userLogin } from 'src/services/authLogin';

export default function WelcomeAccount(props) {
  const [createConsumerMutation, { loading, error }] = useMutation(CREATE_CONSUMER);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.user);
  const reduxDataSignup = useSelector(state => state.signup);
  const [zipCode, setZipCode] = useState('');
  const [birthday, setBirthday] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [date, setDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [email, setEmail] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [firstName, setFirstName] = useState(
    props?.route?.params?.fullName
      ? props?.route?.params?.fullName
      : reduxData?.userSignupData?.fullName
        ? reduxData?.userSignupData?.fullName : 'First Name',
  );
  const zipCodeRef = useRef();
  const birthdayRef = useRef();
  const pronounsRef = useRef();
  const [dob, setDOB] = useState('');
  const [client, setClient] = useState('');
  const [verifyModal, setVerifyModal] = useState(false);
  const [otp, setOTP] = useState();

  useEffect(() => {
    setTimeout(() => {
      handleCheckVerify()
    }, 500)
  }, [])

  const handleCheckVerify = async () => {
    if (reduxDataSignup?.userVerified === false) {
      setVerifyModal(true)
      setEmail(reduxData?.userSignupData?.email)
    }
    if (reduxData?.userLoginVerified) {
      setVerifyModal(true)
      setEmail(reduxData?.userEmail)
    }
  }

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // Handle the selection of an item in the dropdown menu
  const handleSelect = item => {
    setPronouns(item?.label);
    toggleDropdown();
  };

  const handleSubmitAPI = async () => {
    const inputData = {
      cognitoId: client,
      cognitoZip: zipCode,
    };
    await handleFormSubmit(inputData)
    try {
      setLoadingLocal(true);
      ShowMessage(Strings.profileCompleted);
      setZipCode('')
      setDOB('')
      setPronouns('')
      setDate('')
      const user = await userLogin(reduxData?.userSignupData?.email, reduxData?.userSignupData?.password);
      user.id = user?.accessToken?.payload?.sub ?? '';
      // Check if user login was successful
      if (user?.idToken?.payload) {
        dispatch(setUser(true));
        dispatch(setGuest(false));
        dispatch(setToken(user?.idToken?.jwtToken));
        dispatch(setJwtToken(user?.accessToken?.jwtToken));
        dispatch(setUserData(user?.idToken?.payload));
        await AsyncStorage.setItem('accessToken',JSON.stringify(user?.idToken?.jwtToken));
        await AsyncStorage.setItem('refreshToken',JSON.stringify(user?.refreshToken?.token));
        setLoadingLocal(false);
        navigation.replace('Root'); // Navigate to the 'Root' screen
      }
    } catch (error) {
      if (error.message.includes(':')) {
        const myArray = error.message.split(':');
      } else {
        ShowMessage(error.message);
      }
      setLoadingLocal(false);
    } finally {
      setLoadingLocal(false);
    }

  }
  // Handle the submission of the complete profile form
  const submitButton = async () => {
    if (completeProfileValidation(zipCode, dob)) {
      dispatch(setUserSignupData({
        ...reduxData?.userSignupData,
        zipCode: zipCode,
        dob: dayjs(dob).format('DD/MM/YYYY'),
        pronouns: pronouns
      }))
      setLoadingLocal(true);
      try {
        const user = await userSignup(reduxData?.userSignupData?.fullName,
          reduxData?.userSignupData?.lastName, reduxData?.userSignupData?.email
          , reduxData?.userSignupData?.password, zipCode, dayjs(dob).format('DD/MM/YYYY'), pronouns);
        setClient(user?.userSub)
        dispatch(setUserVerifiedFlag(user?.userConfirmed))
        setVerifyModal(!verifyModal);
      } catch (error) {
        if (error.message.includes(':')) {
          const myArray = error.message.split(':');
        } else {
          ShowMessage(error.message);
        }
      } finally {
        setLoadingLocal(false);
      }
      setLoadingLocal(false);
    }
  };
  // Function to handle verification
  const handleVerify = async () => {
    if (otpValidation(otp)) {
      try {
        setLoadingLocal(true);
        const user = await userOTP(reduxData?.userSignupData?.email, otp);
        if (user === 'SUCCESS') {
          setVerifyModal(false);
          dispatch(setUserVerifiedFlag(true))
          setClient('')
          setOTP("")
          dispatch(setUserEmail(''))
          dispatch(setUserLoginVerified(false))
          setLoadingLocal(false);
          handleSubmitAPI()
        }
      } catch (error) {
        setLoadingLocal(false);
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
      ShowMessage('Verification code sent successfully!');
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
  // Define the function to handle the form submission
  const handleFormSubmit = async (inputData) => {
    try {
      const { data } = await createConsumerMutation({
        variables: { input: inputData },
      });
      console.log('Consumer created:', data);
    } catch (err) {
      console.error('Error creating consumer:', err);
    }
  };
  const handleShowDatePicker = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date) => {
    // const selectedDate = moment(date).format('DD MMMM YYYY');
    setDate(date)
    setDOB(date.toDateString())
    hideDatePicker();
  };

  const minimumDOB = new Date();
  minimumDOB.setFullYear(minimumDOB.getFullYear() - 14); // Minimum age of 14 years

  return (
    <View style={{ flex: 1, backgroundColor: Colors.appColorBackground, }}>
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
            <Text style={styles.welcomeTxt}>
              {Strings.welcomeName.replace('__NAME__', firstName)}
            </Text>
            <Text style={styles.accountTxt}>{Strings.weJustNeed}</Text>
            {/* Zip Code Input */}
            <ContactTextInput
              leftImage={Images.Location}
              refInner={zipCodeRef}
              Container={{ marginTop: 30 }}
              placeholderTextColor={Colors.white}
              placeholder={Strings.zipCode}
              multiline={false}
              value={zipCode}
              // maxLength={6}
              onChangeText={txt => setZipCode(txt)}
              keyboardType={'number-pad'}
              autoCapitalize="none"
              returnKeyType={'next'}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                birthdayRef.current.focus();
              }}
            />
            <Text style={styles.sideTxt}>{Strings.sharingYourLocation}</Text>
            {/* Date of Birth Input */}
            <ContactTextInput
              leftImage={Images.Birthday}
              refInner={birthdayRef}
              Container={{ marginTop: 30 }}
              placeholderTextColor={Colors.white}
              placeholder={Strings.birthdate}
              multiline={false}
              editable={false}
              value={dob}
              maxLength={50}
              onChangeText={txt => setBirthday(txt)}
              keyboardType={'default'}
              autoCapitalize="none"
              returnKeyType={'next'}
              blurOnSubmit={false}
              rightImage={Images.Calendar}
              pressRightImage={() => {
                Keyboard.dismiss();
                handleShowDatePicker();
              }}
              onSubmitEditing={() => {
                pronounsRef.current.focus();
              }}
            />
            <Text style={styles.sideTxt}>{Strings.youMustBe}</Text>
            {/* Pronouns Input */}
            <ContactTextInput
              leftImage={Images.Pronouns}
              Container={{ marginTop: 30 }}
              refInner={pronounsRef}
              placeholderTextColor={Colors.white}
              placeholder={Strings.pronouns}
              multiline={false}
              editable={false}
              value={pronouns}
              maxLength={50}
              onChangeText={txt => setPronouns(txt)}
              keyboardType={'default'}
              autoCapitalize="none"
              returnKeyType={'done'}
              rightImage={Images.DownArrow}
              pressRightImage={toggleDropdown}
            />
            {isOpen && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 1,
                  zIndex: 999,
                  width: '98%',
                }}>
                <FlatList
                  data={optionsList}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSelect(item)}
                      style={styles.dropdownItem}>
                      <Text style={styles.itemTitle}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            <Text style={styles.sideTxt}>{Strings.preferredPronouns}</Text>
            <View style={styles.btnContainer}>
              <CustomButton
                title={Strings.continue}
                Container={styles.blueButtonContainer}
                txt={styles.blueButtonTxt}
                onpress={() => submitButton()}
              />
            </View>
          </View>
          {/* Verification Modal */}
          <CustomVerificationModal
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
        </KeyboardAwareScrollView>
        <LoaderModal visible={loadingLocal} loadingText={''} />
        {date && isDatePickerVisible?
        <DateTimePickerModal
          date={date}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
        />:null}
      </ImageBackground>
    </View>

  );
}
