import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Strings } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import CustomButton from 'src/components/CustomButton';
import ContactTextInput from 'src/components/ContactTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function UpgradeAccount() {
  const navigation = useNavigation();
  const [montlyFlag, setMonthlyFlag] = useState(false);
  const [yearlyFlag, setYearlyFlag] = useState(false);
  const [smsFlag, setSmsFlag] = useState(false);
  const [mobile, setMobile] = useState('');
  const [monthly, setMonthly] = useState(0.99);
  const [yearly, setYearly] = useState(10);

  const handleMonth = () => {
    setMonthlyFlag(true);
    setYearlyFlag(false);
  };
  const handleYear = () => {
    setMonthlyFlag(false);
    setYearlyFlag(true);
  };

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
      <AppHeader centerImage={Images.Logo} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View style={styles.innerContainer}>
          <Text style={styles.upgradeTxt}>{Strings.upgradeAccount}</Text>
          <View style={styles.filterContainer}>
            <Image
              source={Images.Filter}
              resizeMode={'contain'}
              style={styles.filterImage}
            />
            <Text style={styles.filterTxt}>{Strings.filterFvrt}</Text>
          </View>
          <Text style={styles.choosePlanTxt}>{Strings.choosePlan}</Text>
          <View style={styles.planContainer}>
            <TouchableOpacity
              onPress={() => handleMonth()}
              activeOpacity={0.8}
              style={[
                styles.planInnerLeftContainer,
                { borderColor: montlyFlag ? Colors.darkOrange : Colors.mediumBlue },
              ]}>
              {montlyFlag ? (
                <Image source={Images.FilledTick} style={styles.checkBox} />
              ) : (
                <View style={styles.uncheckBox}></View>
              )}
              <Text style={styles.priceTxt}>
                {Strings.month.replace('__amount__', monthly)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleYear()}
              activeOpacity={0.8}
              style={[
                styles.planInnerRightContainer,
                { borderColor: yearlyFlag ? Colors.darkOrange : Colors.mediumBlue },
              ]}>
              {yearlyFlag ? (
                <Image source={Images.FilledTick} style={styles.checkBox} />
              ) : (
                <View style={styles.uncheckBox}></View>
              )}
              <Text style={styles.priceTxt}>
                {Strings.year.replace('__amount__', yearly)}
              </Text>
            </TouchableOpacity>
          </View>
          {yearlyFlag || montlyFlag ? (
            <View style={{ marginHorizontal: 20 }}>
              <ContactTextInput
                leftImage={Images.Mobile}
                placeholderTextColor={Colors.white}
                placeholder={Strings.mobileNumber}
                multiline={false}
                value={mobile}
                maxLength={20}
                onChangeText={txt => setMobile(txt)}
                keyboardType={'phone-pad'}
                autoCapitalize="none"
                returnKeyType={'done'}
              />
              <TouchableOpacity
                onPress={() => setSmsFlag(!smsFlag)}
                activeOpacity={0.8}
                style={styles.smsContainer}>
                {smsFlag ? (
                  <Image source={Images.FilledTick} style={styles.checkBox} />
                ) : (
                  <View style={styles.uncheckBox}></View>
                )}
                <Text style={styles.priceTxt}>{Strings.opthere}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.btnContainer}>
            <CustomButton
              title={Strings.upgrade}
              onpress={() =>
                navigation.navigate('withoutBottomtab', { screen: 'Payment' })
              }
            />
            <CustomButton
              title={Strings.noThanks}
              Container={styles.blackBtnContainer}
              onpress={() => navigation.goBack()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
