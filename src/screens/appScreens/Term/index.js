import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import {Images, Colors, Strings} from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { fetchContentFulContent } from 'src/utils/contentful';

export default function Term(props) {
  const [content, setContent] = useState({
    termUse: null,
    privacyPolicy: null,
    californiaPolicy: null
  });

  useEffect(() => {
    async function fetchPromotionContent () {
      const termUse = await fetchContentFulContent('XuhxvmlTfU1MCjuELLHvY');
      const privacyPolicy = await fetchContentFulContent('52UJuQgc1nZAm8kLrkAlke');
      const californiaPolicy = await fetchContentFulContent('4QghRl8LFoRAvWRNyTDeX4');
      
      setContent({ 
        termUse: termUse.fields.description.content[0].content[0].value,
        privacyPolicy: privacyPolicy.fields.description.content[0].content[0].value,
        californiaPolicy: californiaPolicy.fields.description.content[0].content[0].value
      });
    }

    fetchPromotionContent()
  }, [])

  let source = 
      props?.route?.params?.selected === Strings.termUse
        ? content.termUse
        : props?.route?.params?.selected === Strings.privacyPolicy
        ? content.privacyPolicy
        : props?.route?.params?.selected === Strings.californiaPolicy
        ? content.californiaPolicy
        : content.termUse
  ;
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

      {/* Main tabs  */}
      <View style={styles.mainTabContainer}>
        <Text style={styles.loginTxt}>
          {props?.route?.params?.selected || Strings.termUse}
        </Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{flex: 1, marginVertical: 25}}>
          <View>
            {
              content.termUse && (
                <Text style={styles.contentTxt}>{source}</Text>
              )
            }
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
