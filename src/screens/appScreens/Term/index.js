import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { privacyPolicy, privacyPolicyCA, termsOfUse } from 'src/utils/term';
import RenderHTML from 'react-native-render-html';

export default function Term(props) {
  const { width } = useWindowDimensions();
  let source = {
    html:
      props?.route?.params?.selected === Strings.termUse
        ? termsOfUse
        : props?.route?.params?.selected === Strings.privacyPolicy
          ? privacyPolicy
          : props?.route?.params?.selected === Strings.californiaPolicy
            ? privacyPolicyCA
            : termsOfUse,
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
      {/* Header with Logo and back icon  */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView
      />

      {/* Main tabs  */}
      <View style={styles.mainTabContainer}>
        <Text style={styles.loginTxt}>
          {props?.route?.params?.selected || Strings.termUse}
        </Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1, marginVertical: 25 }}>
          <View>
            <RenderHTML source={source} contentWidth={width} />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
