import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import {Images, Colors, Strings} from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {signupComplete} from 'src/services/authSignup';
import ShowMessage from 'src/components/ShowMessage';
import LoaderModal from 'src/components/LoaderModal';
import { completeProfileValidation } from 'src/common/authValidation';
import dayjs from 'dayjs';

export default function WelcomeAccount(props) {
  const navigation = useNavigation();
  const [zipCode, setZipCode] = useState('');
  const [birthday, setBirthday] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [firstName, setFirstName] = useState(
    props?.route?.params?.fullName
      ? props?.route?.params?.fullName
      : 'First Name',
  );
  const zipCodeRef = useRef();
  const birthdayRef = useRef();
  const pronounsRef = useRef();
  const [dob, setDOB] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const options = [
    {id: 1, label: 'he/him', value: 'he/him'},
    {id: 2, label: 'she/her', value: 'she/her'},
    {id: 3, label: 'they/them', value: 'they/them'},
    {id: 4, label: 'other', value: 'other'},
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = item => {
    setPronouns(item?.label);
    toggleDropdown();
  };

  const handleDOBChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setShowDatePicker(false);
    setDOB(currentDate);
  };

  const submitButton = async () => {
    if (completeProfileValidation(zipCode, dob, pronouns)) {
      setLoadingLocal(true);
      const user = await signupComplete(
        props?.route?.params?.email,
        props?.route?.params?.password,
        zipCode,
        dayjs(dob).format('dd-mm-yyyy'),
        pronouns,
      );
      if (user === 'SUCCESS') {
        setLoadingLocal(false);
        ShowMessage('Profile Completed Successfully!! Login to Continue.');
        navigation.replace('Login');
      }
      setLoadingLocal(false);
    }
  };

  const minimumDOB = new Date();
  minimumDOB.setFullYear(minimumDOB.getFullYear() - 14); // Minimum age of 14 years

  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="contain"
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
          <Text style={styles.welcomeTxt}>
            {Strings.welcomeName.replace('__NAME__', firstName)}
          </Text>
          <Text style={styles.accountTxt}>{Strings.wejustneed}</Text>
          <ContactTextInput
            leftImage={Images.Location}
            refInner={zipCodeRef}
            Contianer={{marginTop: 30}}
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
          <Text style={styles.sideTxt}>{Strings.sharingyourlocation}</Text>
          <ContactTextInput
            leftImage={Images.Birthday}
            refInner={birthdayRef}
            Contianer={{marginTop: 30}}
            placeholderTextColor={Colors.white}
            placeholder={Strings.birthdate}
            multiline={false}
            editable={false}
            value={dob.toDateString()}
            maxLength={50}
            onChangeText={txt => setBirthday(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            rightImage={Images.Calendar}
            pressRightImage={() => setShowDatePicker(!showDatePicker)}
            onSubmitEditing={() => {
              pronounsRef.current.focus();
            }}
          />
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              maximumDate={minimumDOB} // Restrict selecting future dates
              onChange={handleDOBChange}
            />
          )}
          <Text style={styles.sideTxt}>{Strings.youmustbe}</Text>
          <ContactTextInput
            leftImage={Images.Pronouns}
            Contianer={{marginTop: 30}}
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
                data={options}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={styles.dropdownItem}>
                    <Text style={styles.itemTitle}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <Text style={styles.sideTxt}>{Strings.wordingforthistk}</Text>
          <View style={styles.btnContainer}>
            <CustomButton
              title={Strings.continue}
              Contianer={styles.blueButtonContainer}
              txt={styles.blueButtonTxt}
              onpress={() => submitButton()}
            />
          </View>
        </View>
      </ScrollView>
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground>
  );
}
