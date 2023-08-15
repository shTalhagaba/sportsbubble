import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Strings } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
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

      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        headerContainer={{ marginTop: 10 }}
        SimpleView
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.loginTxt}>{Strings.forgotPassword}</Text>
          <ContactTextInput
            leftImage={Images.EmailIcon}
            refInner={emailRef}
            placeholderTextColor={Colors.white}
            placeholder={'Email'}
            multiline={false}
            value={email}
            maxLength={50}
            onChangeText={txt => setEmail(txt)}
            keyboardType={'email-address'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={true}
          />
          <CustomButton blue={true} title={'Submit'} />

          <Text style={styles.accountTxt}>{Strings.dontAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupTxt}>{Strings.signUp}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
