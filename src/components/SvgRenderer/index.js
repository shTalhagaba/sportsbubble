import React from 'react';
import { Dimensions, Platform, View } from 'react-native';
import WebView from 'react-native-webview';
import styles from './styles';

const screenWidth = Dimensions.get('window').width;

const SvgRenderer = ({ url, flag, width, height }) => {
  const viewportMetaTag =
    Platform.OS === 'android'
      ? '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover" />'
      : '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />';

  return flag ? (
    <View
      style={{
        width: width ? width : screenWidth / 2.5,
        height: height ? height : screenWidth / 4,
      }}>
      <WebView
        source={{
          html: `
            <html>
              <head>
                ${viewportMetaTag}
              </head>
              <body style="background: transparent; margin-left: 20vw; margin-top: 7vw; padding: 0; justify-content: center; align-items: center; height: 100vh; overflow: hidden;">
                <div style="height: 60vh; width: 60vw; background: transparent;">
                  <img src="${url}" height="100%" width="100%" style="background: transparent; display: block;"/>
                </div>
              </body>
            </html>
          `,
        }}
        style={styles.innerContainer}
        containerStyle={styles.webContainer}
        scrollEnabled={false} // Disable scrolling
      />
    </View>
  ) : (
    <View style={styles.webMainContainer}>
      <View style={styles.webInnerContainer} />
      <WebView
        source={{
          html: `
            <html>
              <head>
                ${viewportMetaTag}
              </head>
              <body style="background: #3F5B80; margin-left: 1vw; padding: 0; justify-content: center; align-items: center; height: 100vh; overflow: hidden;">
                <div style="height: 25vh; width: 25vw; background: #3F5B80; display: flex; align-items: center; justify-content: center;">
                  <img src="${url}" height="100%" width="100%" style="background: transparent; object-fit: contain;" />
                </div>
              </body>
            </html>
          `,
        }}
        style={styles.htmlContainer}
        containerStyle={styles.htmlInnerContainer}
        scrollEnabled={false} // Disable scrolling
      />
    </View>
  );
};

export default SvgRenderer;
