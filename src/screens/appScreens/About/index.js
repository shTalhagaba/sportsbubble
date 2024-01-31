import React, { useState, useEffect } from 'react';
import { ImageBackground, ScrollView, StatusBar, Text, View } from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { fetchContentFulContent } from 'src/utils/contentful';
import Hyperlink from 'react-native-hyperlink';

export default function About(props) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function fetchAboutContent() {
      const about = await fetchContentFulContent('549YiMQUWzYZxR1qpstDYd');
      setContent(about.fields);
    }
    fetchAboutContent();
  }, []);

  const RenderContentNode = (node) => {
    if (node?.node?.nodeType === 'paragraph') {
      return (
        <Text style={styles.contentTxtTop}>
          {node.node.content.map((textNode, index) => {
            if (textNode?.nodeType === 'hyperlink') {
              // Handle hyperlinks
              return (
                <Hyperlink
                  key={index}
                  linkStyle={{ color: Colors.blue, textDecorationLine: 'underline' }}
                  onPress={(url) => Linking.openURL(url)}
                >
                  {textNode?.content.map((linkText, linkIndex) => (
                    <Text
                      key={linkIndex}
                      style={{ fontWeight: linkText?.marks?.[0]?.type === 'bold' ? '700' : '500' }}
                    >
                      {linkText?.value}
                    </Text>
                  ))}
                </Hyperlink>
              );
            } else if (textNode?.nodeType === 'text') {
              // Handle plain text
              return (
                <Text key={index} style={{ fontWeight: textNode?.marks?.[0]?.type === 'bold' ? '700' : '500' }}>
                  {textNode?.value}
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
        <Text style={styles.loginTxt}>{Strings.aboutWatchSports}</Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          indicatorStyle={'white'}
          style={{ flex: 1, marginVertical: 25 }}>
          <View>
            {content && content !== null && typeof content === 'object' ?
                  <>
                    {/* <Text style={styles.contentTxt}>
                      {content?.title}
                    </Text> */}
                    {content?.description?.content.map((contentNode, index) => (
                      <RenderContentNode key={index} node={contentNode} />
                    ))}
                  </>
                  : <Text style={styles.contentTxt}>{content}</Text>}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
