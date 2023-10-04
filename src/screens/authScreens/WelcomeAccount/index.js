import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Strings } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { signupComplete } from 'src/services/authSignup';
import ShowMessage from 'src/components/ShowMessage';
import LoaderModal from 'src/components/LoaderModal';
import { completeProfileValidation } from 'src/common/authValidation';
import dayjs from 'dayjs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useMutation } from '@apollo/client';
import { CREATE_CONSUMER } from 'src/graphQL';
import { optionsList } from 'src/utils/list';

export default function WelcomeAccount(props) {
  const [createConsumerMutation, { loading, error }] = useMutation(CREATE_CONSUMER);
  const navigation = useNavigation();
  const [zipCode, setZipCode] = useState('');
  const [birthday, setBirthday] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [date, setDate] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [firstName, setFirstName] = useState(
    props?.route?.params?.fullName
      ? props?.route?.params?.fullName
      : 'First Name',
  );
  const zipCodeRef = useRef();
  const birthdayRef = useRef();
  const pronounsRef = useRef();
  const [dob, setDOB] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // Handle the selection of an item in the dropdown menu
  const handleSelect = item => {
    setPronouns(item?.label);
    toggleDropdown();
  };
  // Handle the submission of the complete profile form
  const submitButton = async () => {
    if (completeProfileValidation(zipCode, dob)) {
      setLoadingLocal(true);
      const inputData = {
        cognitoId: props?.route?.params?.client,
        cognitoZip: zipCode,
      };
      await handleFormSubmit(inputData)
      const user = await signupComplete(
        props?.route?.params?.email,
        props?.route?.params?.password,
        zipCode,
        dayjs(dob).format('DD/MM/YYYY'),
        pronouns,
      );
      if (user === 'SUCCESS') {
        setLoadingLocal(false);
        ShowMessage(Strings.profileCompleted);
        navigation.replace('Login');
        setZipCode('')
        setDOB('')
        setPronouns('')
        setDate('')
      }
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
              maxLength={6}
              onChangeText={txt => setZipCode(txt)}
              keyboardType={'default'}
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
              pressRightImage={() => handleShowDatePicker()}
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
            <Text style={styles.sideTxt}>{Strings.wordingForThisTk}</Text>
            <View style={styles.btnContainer}>
              <CustomButton
                title={Strings.continue}
                Container={styles.blueButtonContainer}
                txt={styles.blueButtonTxt}
                onpress={() => submitButton()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <LoaderModal visible={loadingLocal} loadingText={''} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={minimumDOB}
        />
      </ImageBackground>
    </View>

  );
}
