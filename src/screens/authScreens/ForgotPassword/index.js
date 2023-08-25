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
import { forgotPasswordValidation } from 'src/common/authValidation';
import { forgoatPassword } from 'src/services/authForgotPassword';
import LoaderModal from 'src/components/LoaderModal';


export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(false);

  const emailRef = useRef();

  const handleForgotPassword = async () => {
    if (forgotPasswordValidation(email)) {
      try {
        setLoadingLocal(true);
        const user = await forgoatPassword(email);
        console.log("updatePassword => ", user)
        if (user === 'SUCCESS') {
          // navigation.goBack(null)
        }
        setLoadingLocal(false);
      } catch (error) {
        console.log("Error => ", error)

      } finally {
        setLoadingLocal(false);
      }
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
            placeholder={Strings.email}
            multiline={false}
            value={email}
            maxLength={50}
            onChangeText={txt => setEmail(txt)}
            keyboardType={'email-address'}
            autoCapitalize="none"
            returnKeyType={'next'}
            blurOnSubmit={true}
          />
          <CustomButton blue={true} title={Strings.submit}
            Contianer={styles.blueButtonContainer}
            txt={styles.blueButtonTxt}
            onpress={() => handleForgotPassword()}
          />

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
