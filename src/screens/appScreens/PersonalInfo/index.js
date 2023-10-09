import React, { useState, useRef, useEffect } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { Images, Colors } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import AppHeader from 'src/components/AppHeader';
import Strings from 'src/utils/strings';
import ContactHeaderTextInput from 'src/components/ContactHeaderTextInput';
import CustomButton from 'src/components/CustomButton';
import CustomModalView from 'src/components/Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, userUpdateProfile } from 'src/services/updateProfile';
import LoaderModal from 'src/components/LoaderModal';
import { ShowMessage } from 'src/components/ShowMessage';
import { updateProfileValidation } from 'src/common/authValidation';
import { setToken, setUser, setUserData } from 'src/store/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { optionsList } from 'src/utils/list';

export default function PersonalInfo() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [firstName, setFirstName] = useState('Example');
  const [lastName, setLastName] = useState('Example');
  const [zipCode, setZipcode] = useState('');
  const [dob, setDob] = useState('22-12-1977');
  const [pronouns, setPronouns] = useState('');
  const [email, setEmail] = useState('example@sportsbubble.io');
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [cancelAccountModal, setCancelAccountModal] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const zipCodeRef = useRef();
  const dobRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    if (data?.userData) {
      const user = data?.userData;
      setFirstName(user?.name);
      setLastName(user?.family_name);
      setDob(user?.birthdate ? user?.birthdate : '22-12-1977');
      setZipcode(user?.locale);
      setPronouns(user?.gender);
      setEmail(user?.email);
    }
  }, [data?.userData]);

  useEffect(() => {
    const user = data?.userData;
    if (user?.name === firstName && user?.family_name === lastName
      && user?.locale === zipCode && user?.gender === pronouns) {
      setButtonDisable(true)
    } else {
      setButtonDisable(false)
    }
  }, [firstName, lastName, zipCode, pronouns, buttonDisable]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = item => {
    setPronouns(item?.label);
    toggleDropdown();
  };

  const handleUpdateProfile = async () => {
    if (updateProfileValidation(firstName, lastName, zipCode)) {
      const user = data?.userData;
      if (user?.name === firstName && user?.family_name === lastName
        && user?.locale === zipCode && user?.gender === pronouns) {
        // ShowMessage('Not saving any data successfully');
        Alert.alert(
          'Changes not saved',
          'Do you want to leave changes?',
          [
            {
              text: 'No',
              // onPress: () => resolve(false), // User clicked 'No', resolve with false
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => navigation.goBack(), // User clicked 'Yes', resolve with true
            },
          ],
          { cancelable: false }
        );
      } else {
        try {
          setLoadingLocal(true);
          const test = await userUpdateProfile(
            // email,
            firstName,
            lastName,
            zipCode,
            dob,
            pronouns,
          );
          if (test === 'SUCCESS') {
            const updatedProfile = {
              ...data?.userData,
              name: firstName,
              family_name: lastName,
              locale: zipCode,
              gender: pronouns,
            };
            dispatch(setUserData(updatedProfile));
            ShowMessage('Profile updated successfully!!');
            setButtonDisable(true)
            // navigation.goBack();
          }
          setLoadingLocal(false);
        } catch (error) {
          if (error.message.includes(':')) {
            const myArray = error.message.split(':');
          } else {
            ShowMessage(error.message);
            console.log('error.message=>', error.message);
          }
          setLoadingLocal(false);
        }
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoadingLocal(true);
      const user = await deleteUser();
      if (user === 'SUCCESS') {
        dispatch(setUser(false));
        dispatch(setUserData({}));
        dispatch(setToken(''));
        setLoadingLocal(false);
        setCancelAccountModal(!cancelAccountModal);
        navigation.replace('Auth');
      }
      setLoadingLocal(false);
      setCancelAccountModal(!cancelAccountModal);
    } catch (error) {
      if (error.message.includes(':')) {
        const myArray = error.message.split(':');
      } else {
        ShowMessage(error.message);
        console.log('error.message=>', error.message);
        setCancelAccountModal(!cancelAccountModal);
      }
    } finally {
      setLoadingLocal(false);
      setCancelAccountModal(!cancelAccountModal);
    }
  };

  const handleBack = () => {
    if (!buttonDisable) {
      Alert.alert(
        'Changes not saved',
        'Do you want to leave changes?',
        [
          {
            text: 'No',
            // onPress: () => resolve(false), // User clicked 'No', resolve with false
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => navigation.goBack(), // User clicked 'Yes', resolve with true
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.goBack()
    }
  }

  return (
    <ImageBackground
      source={Images.Background}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      {/* Header with Logo and back icon  */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView
        onPressBack={handleBack}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerTxt}>{Strings.personalInfo}</Text>
          <ContactHeaderTextInput
            leftImage={Images.UserIcon}
            headerName={Strings.firstName}
            Container={{ marginTop: 24 }}
            customInputStyle={{ marginBottom: 5 }}
            refInner={firstNameRef}
            headerTxtStyle={styles.headerTxtStyle}
            multiline={false}
            value={firstName}
            maxLength={50}
            onChangeText={txt => setFirstName(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              lastNameRef.current.focus();
            }}
          />
          <ContactHeaderTextInput
            leftImage={Images.UserIcon}
            headerName={Strings.lastName}
            refInner={lastNameRef}
            customInputStyle={{ marginBottom: 5 }}
            multiline={false}
            headerTxtStyle={styles.headerTxtStyle}
            value={lastName}
            maxLength={50}
            onChangeText={txt => setLastName(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              zipCodeRef.current.focus();
            }}
          />
          <ContactHeaderTextInput
            leftImage={Images.Location}
            headerName={Strings.zipCode}
            refInner={zipCodeRef}
            headerTxtStyle={styles.headerTxtStyle}
            customInputStyle={{ marginBottom: 5 }}
            multiline={false}
            value={zipCode}
            // maxLength={6}
            onChangeText={txt => setZipcode(txt)}
            keyboardType={'number-pad'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              dobRef.current.focus();
            }}
          />
          <ContactHeaderTextInput
            leftImage={Images.Birthday}
            headerName={Strings.birthdate}
            refInner={dobRef}
            headerTxtStyle={styles.headerTxtStyle}
            customInputStyle={{ marginBottom: 5, opacity: 0.7 }}
            multiline={false}
            value={dob}
            editable={false}
            maxLength={20}
            onChangeText={txt => setDob(txt)}
            keyboardType={'number-pad'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            rightImage={Images.LockIcon}
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
          />
          <View
            style={{
              zIndex: 999,
            }}>
            <ContactHeaderTextInput
              leftImage={Images.Pronouns}
              headerName={Strings.pronouns}
              placeholderTextColor={Colors.white}
              placeholder={Strings.pronouns}
              customInputStyle={{ marginBottom: 5 }}
              multiline={false}
              value={pronouns}
              headerTxtStyle={styles.headerTxtStyle}
              onChangeText={txt => setPronouns(txt)}
              autoCapitalize="none"
              editable={false}
              blurOnSubmit={false}
              rightImage={Images.DownArrow}
              pressRightImage={toggleDropdown}
            />
            {isOpen && (
              <View style={styles.openStyle}>
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
          </View>
          <ContactHeaderTextInput
            leftImage={Images.EmailIcon}
            headerName={Strings.email}
            refInner={emailRef}
            headerTxtStyle={styles.headerTxtStyle}
            multiline={false}
            value={email}
            maxLength={50}
            onChangeText={txt => setEmail(txt)}
            keyboardType={'email-address'}
            autoCapitalize="none"
            returnKeyType={'done'}
            customInputStyle={{ marginBottom: 5, opacity: 0.7 }}
            editable={false}
          />
          <CustomButton
            title={Strings.saveChanges}
            onpress={() => handleUpdateProfile()}
            Container={styles.btnContainer}
            txt={styles.btnContainerTxt}
            disabled={buttonDisable}
            greennDisable={true}
          />
          <TouchableOpacity
            onPress={() => setCancelAccountModal(!cancelAccountModal)}>
            <Text style={styles.cancelAccountTxt}>{Strings.cancelAccount}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <CustomModalView
        visible={cancelAccountModal}
        headerTxt={Strings.alert}
        desTxt={Strings.alertDes}
        blackBtnTxt={Strings.no}
        orangeBtnTxt={Strings.yes}
        fillBefore={true}
        btn
        orangrBTn
        rowStyle={true}
        blackBtnPress={() => setCancelAccountModal(!cancelAccountModal)}
        ornageBtnPress={() => handleDeleteAccount()}
        Container={{ backgroundColor: Colors.backBlack }}
      />
      <LoaderModal visible={loadingLocal} loadingText={''} />
    </ImageBackground>
  );
}
