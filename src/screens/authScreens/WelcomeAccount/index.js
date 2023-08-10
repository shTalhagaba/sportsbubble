import React, {useRef, useState} from 'react';
import {View, Text, ScrollView, ImageBackground, StatusBar} from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import {Images, Colors, Strings} from 'src/utils';
import CustomButton from 'src/components/CustomButton';

export default function WelcomeAccount() {
  const [zipCode, setZipCode] = useState('');
  const [birthday, setBirthday] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [firstName, setFirstName] = useState('First Name');
  
  const zipCodeRef = useRef();
  const birthdayRef = useRef();
  const pronounsRef = useRef();

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
          <Text style={styles.welcomeTxt}>{Strings.welcomeName.replace('__NAME__',firstName)}</Text>
          <Text style={styles.accountTxt}>{Strings.wejustneed}</Text>
          <ContactTextInput
            leftImage={Images.Location}
            refInner={zipCodeRef}
            Contianer={{marginTop: 40}}
            customInputStyle={{marginLeft: 10}}
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
            Contianer={{marginTop: 40}}
            customInputStyle={{marginLeft: 10}}
            placeholderTextColor={Colors.white}
            placeholder={Strings.birthdate}
            multiline={false}
            value={birthday}
            maxLength={50}
            onChangeText={txt => setBirthday(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={false}
            rightImage={Images.Calendar}
            pressRightImage={() => console.log('Calendar')}
            onSubmitEditing={() => {
              pronounsRef.current.focus();
            }}
          />
          <Text style={styles.sideTxt}>{Strings.youmustbe}</Text>
          <ContactTextInput
            leftImage={Images.Pronouns}
            Contianer={{marginTop: 40}}
            customInputStyle={{marginLeft: 10}}
            refInner={pronounsRef}
            placeholderTextColor={Colors.white}
            placeholder={Strings.pronouns}
            multiline={false}
            value={pronouns}
            maxLength={50}
            onChangeText={txt => setPronouns(txt)}
            keyboardType={'default'}
            autoCapitalize="none"
            returnKeyType={'done'}
            rightImage={Images.DownArrow}
            pressRightImage={() => console.log('pronouns')}
          />
          <Text style={styles.sideTxt}>{Strings.wordingforthistk}</Text>
          <View style={styles.btnContainer}>
            <CustomButton title={Strings.continue} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
