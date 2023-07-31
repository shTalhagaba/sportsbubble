import React, {useRef, useState} from 'react';
import {View, Text, ScrollView, ImageBackground, StatusBar} from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import {Images, Colors} from 'src/utils';
import CustomButton from 'src/components/CustomButton';

export default function WelcomeAccount() {
  const [zipCode, setZipCode] = useState('');
  const [birthday, setBirthday] = useState('');
  const [pronouns, setPronouns] = useState('');

  const zipCodeRef = useRef();
  const birthdayRef = useRef();
  const pronounsRef = useRef();

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
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        headerContainer={{marginTop: 10}}
        SimpleView
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeTxt}>Welcome, FirstName!</Text>
          <Text style={styles.accountTxt}>
            We just need a few more details to configure your account
          </Text>
          <ContactTextInput
            leftImage={Images.Location}
            refInner={zipCodeRef}
            Contianer={{marginTop: 40}}
            placeholderTextColor={Colors.white}
            placeholder={'Zip Code'}
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
          <Text style={styles.sideTxt}>
            Sharing your location allows us to surface the most relevant event
            listings in your area
          </Text>
          <ContactTextInput
            leftImage={Images.Birthday}
            refInner={birthdayRef}
            Contianer={{marginTop: 40}}
            placeholderTextColor={Colors.white}
            placeholder={'Birthdate'}
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
          <Text style={styles.sideTxt}>
            You must be at least 14 years of age of register.
          </Text>
          <ContactTextInput
            leftImage={Images.Pronouns}
            Contianer={{marginTop: 40}}
            refInner={pronounsRef}
            placeholderTextColor={Colors.white}
            placeholder={'Pronouns'}
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
          <Text style={styles.sideTxt}>Wording for this tk</Text>
          <View style={styles.btnContainer}>
            <CustomButton title={'Continue'} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
