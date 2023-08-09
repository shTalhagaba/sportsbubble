import React, {useState, useRef} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from 'src/utils';
import {useNavigation} from '@react-navigation/native';
import AppHeader from 'src/components/AppHeader';
import Strings from 'src/utils/strings';
import ContactHeaderTextInput from 'src/components/ContactHeaderTextInput';
import ContactTextInput from 'src/components/ContactTextInput';
import CustomButton from 'src/components/CustomButton';
import CustomModalView from 'src/components/Modal/CustomModal';

export default function PersonalInfo() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('Matthew');
  const [lastName, setLastName] = useState('Dichter');
  const [zipCode, setZipcode] = useState('91364');
  const [dob, setDob] = useState('05/22/1977');
  const [pronouns, setPronouns] = useState('');
  const [email, setEmail] = useState('mattyd@sportsbubble.io');
  const [cancelAccountModal, setCancelAccountModal] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const zipCodeRef = useRef();
  const dobRef = useRef();
  const emailRef = useRef();

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
        customLeftImage={{tintColor: Colors.orange}}
        SimpleView
      />
      <ScrollView style={styles.innerContainer}>
        <Text style={styles.headerTxt}>{Strings.personalInfo}</Text>
        <ContactHeaderTextInput
          leftImage={Images.UserIcon}
          headerName={Strings.firstName}
          Contianer={{marginTop: 24}}
          customInputStyle={{marginBottom: 5}}
          refInner={firstNameRef}
          // placeholderTextColor={Colors.white}
          // placeholder={Strings.firstName}
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
          // placeholder={Strings.lastName}
          // placeholderTextColor={Colors.white}
          customInputStyle={{marginBottom: 5}}
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
          // placeholderTextColor={Colors.white}
          // placeholder={Strings.zipCode}
          headerTxtStyle={styles.headerTxtStyle}
          customInputStyle={{marginBottom: 5}}
          multiline={false}
          value={zipCode}
          maxLength={6}
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
          // placeholderTextColor={Colors.white}
          // placeholder={Strings.birthdate}
          headerTxtStyle={styles.headerTxtStyle}
          customInputStyle={{marginBottom: 5}}
          multiline={false}
          value={dob}
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
        <ContactTextInput
          leftImage={Images.Pronouns}
          headerName={Strings.prounouns}
          placeholderTextColor={Colors.white}
          placeholder={Strings.prounouns}
          multiline={false}
          value={pronouns}
          headerTxtStyle={styles.headerTxtStyle}
          maxLength={20}
          onChangeText={txt => setPronouns(txt)}
          keyboardType={'number-pad'}
          autoCapitalize="none"
          returnKeyType={'next'}
          editable={false}
          blurOnSubmit={false}
          rightImage={Images.DownArrow}
          onSubmitEditing={() => {
            emailRef.current.focus();
          }}
        />
        <ContactHeaderTextInput
          leftImage={Images.EmailIcon}
          headerName={Strings.email}
          refInner={emailRef}
          // placeholderTextColor={Colors.white}
          // placeholder={Strings.email}
          headerTxtStyle={styles.headerTxtStyle}
          customInputStyle={{marginBottom: 8}}
          multiline={false}
          value={email}
          maxLength={50}
          onChangeText={txt => setEmail(txt)}
          keyboardType={'email-address'}
          autoCapitalize="none"
          returnKeyType={'done'}
        />
        <CustomButton
          title={Strings.saveChanges}
          onpress={() => navigation.goBack(null)}
          Contianer={styles.btnContainer}
        />

        <TouchableOpacity
          onPress={() => setCancelAccountModal(!cancelAccountModal)}>
          <Text style={styles.cancelAccountTxt}>{Strings.cancelAccount}</Text>
        </TouchableOpacity>
      </ScrollView>
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
        ornageBtnPress={() => setCancelAccountModal(!cancelAccountModal)}
        Contianer={{backgroundColor: Colors.backBlack}}
      />
    </ImageBackground>
  );
}
