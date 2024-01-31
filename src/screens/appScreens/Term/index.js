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
      const termUse = await fetchContentFulContent('64plgJDecqRVW4KQX9PgQ8');
      const privacyPolicy = await fetchContentFulContent('52UJuQgc1nZAm8kLrkAlke');
      const californiaPolicy = await fetchContentFulContent('4QghRl8LFoRAvWRNyTDeX4');
      setContent({
        termUse: termUse?.fields,
        privacyPolicy: privacyPolicy?.fields,
        californiaPolicy: californiaPolicy?.fields
      });
    }
    fetchPromotionContent()
  }, [])
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
                      style={{ color: 'white', fontWeight: linkText?.marks?.[0]?.type === 'bold' ? '700' : '500' }}
                    >
                      {linkText?.value}
                    </Text>
                  ))}
                </Hyperlink>
              );
            } else if (textNode?.nodeType === 'text') {
              // Handle plain text
              return (
                <Text key={index} style={{ color: 'white', fontWeight: textNode?.marks?.[0]?.type === 'bold' ? '700' : '500' }}>
                  {textNode?.value}
                </Text>
              );
            }
            return null;
          })}
        </Text>
      );
    } else if (node?.node?.nodeType === 'table') {
      // Handle tables
      return (
        <View style={styles.tableContainer}>
          {node.node.content.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {row.content.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.tableCell}>
                  {cell?.content.map((contentNode, contentIndex) => (
                    <RenderContentNode key={contentIndex} node={contentNode} />
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      );
    } else if (node?.node?.nodeType === 'unordered-list' || node?.node?.nodeType === 'ordered-list') {
      // Handle unordered list
      return (
        <View style={styles.unorderedListContainer}>
          {node.node.content.map((listItem, listItemIndex) => (
            <View key={listItemIndex} style={styles.listItemContainer}>
              {listItem.content.map((contentNode, contentIndex) => {
                if (contentNode?.nodeType === 'paragraph') {
                  return (
                    <Text style={styles.contentTxtBulltetTop}>
                      {contentNode?.content.map((textNode, index) => {
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
                                  style={{ color: 'white', fontWeight: linkText?.marks?.[0]?.type === 'bold' ? '700' : '500' }}
                                >
                                  {linkText?.value}
                                </Text>
                              ))}
                            </Hyperlink>
                          );
                        } else if (textNode?.nodeType === 'text') {
                          // Handle plain text
                          return (
                            <>
                              {contentIndex === 0 ?
                                <Text style={styles.bullet}>•</Text>
                                : null}
                              <Text key={index} style={{ color: 'white', fontWeight: textNode?.marks?.[0]?.type === 'bold' ? '700' : '500'}}>
                                {textNode?.value}
                              </Text>
                            </>
                          );
                        }
                        return null;
                      })}
                    </Text>
                  );
                }
              })}
            </View>
          ))}
        </View>
      );
    }

    // Handle other content node types here if needed
    return null; // Return null for unsupported content node types
  };


  let source =
    props?.route?.params?.selected === Strings.termUse
      ? content?.termUse
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
            {(
              source !== null && typeof source === 'object' ?
                <>
                  {/* <Text style={styles.contentTxt}>
                      {source?.title} 
                    </Text> */}
                  {source?.description?.content.map((contentNode, index) => (
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
