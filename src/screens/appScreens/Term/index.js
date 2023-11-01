import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
  Linking,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { fetchContentFulContent } from 'src/utils/contentful';
import Hyperlink from 'react-native-hyperlink';

export default function Term(props) {
  const [content, setContent] = useState({
    termUse: null,
    privacyPolicy: null,
    californiaPolicy: null
  });

  useEffect(() => {
    async function fetchPromotionContent() {
      const termUse = await fetchContentFulContent('XuhxvmlTfU1MCjuELLHvY');
      const privacyPolicy = await fetchContentFulContent('52UJuQgc1nZAm8kLrkAlke');
      const californiaPolicy = await fetchContentFulContent('4QghRl8LFoRAvWRNyTDeX4');
      setContent({
        termUse: termUse.fields.description.content[0].content[0].value,
        privacyPolicy: privacyPolicy.fields,
        californiaPolicy: californiaPolicy.fields.description.content[0].content[0].value
      });
    }
    fetchPromotionContent()
  }, [])
  const RenderContentNode = (node) => {
    if (node.node.nodeType === 'paragraph') {
      return (
        <Text style={styles.contentTxtTop}>
          {node.node.content.map((textNode, index) => {
            if (textNode.nodeType === 'hyperlink') {
              // Handle hyperlinks
              return (
                <Hyperlink
                  key={index}
                  linkStyle={{ color: Colors.blue, textDecorationLine: 'underline' }}
                  onPress={(url) => Linking.openURL(url)}
                >
                  {textNode.content.map((linkText, linkIndex) => (
                    <Text
                      key={linkIndex}
                      style={{ fontWeight: linkText.marks[0]?.type === 'bold' ? '700' : '500' }}
                    >
                      {linkText.value}
                    </Text>
                  ))}
                </Hyperlink>
              );
            } else if (textNode.nodeType === 'text') {
              // Handle plain text
              return (
                <Text key={index} style={{ fontWeight: textNode.marks[0]?.type === 'bold' ? '700' : '500' }}>
                  {textNode.value}
                </Text>
              );
            }
            return null;
          })}
        </Text>
      );
    }
    // Handle other content node types here if needed
    return null; // Return null for unsupported content node types
  };

  let source =
    props?.route?.params?.selected === Strings.termUse
      ? content.termUse
      : props?.route?.params?.selected === Strings.privacyPolicy
        ? content?.privacyPolicy
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
          indicatorStyle={'white'}
          style={{ flex: 1, marginVertical: 25 }}>
          <View>
            {
              content.termUse && (
                props?.route?.params?.selected === Strings.privacyPolicy ?
                  <>
                    <Text style={styles.contentTxt}>
                      {source.title} {/* Display the title */}
                    </Text>
                    {source.description.content.map((contentNode, index) => (
                      <RenderContentNode key={index} node={contentNode} />
                    ))}
                  </>
                  :
                  <Text style={styles.contentTxt}>{source}</Text>
              )
            }
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
