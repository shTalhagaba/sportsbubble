import React from 'react';
import { Dimensions, Platform, View } from 'react-native';
import WebView from 'react-native-webview';
import styles from './styles';

const screenWidth = Dimensions.get('window').width;

const SvgRenderer = ({ url, flag, width, height, sportFlag }) => {
  const viewportMetaTag =
    Platform.OS === 'android'
      ? '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover" />'
      : '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />';
  const viewportMetaTagWatch = '<meta name="viewport" content="width=device-width, initial-scale=1">';

  return flag ? (
    <View
      style={{
        width: width ? width : screenWidth / 2.5,
        height: height ? height : screenWidth / 4,
      }}>
      <WebView
        source={{
          html: Platform.OS === 'android'
            ? ` <html>
              <head>
                ${viewportMetaTag}
              </head>
              <body style="background: transparent; margin-left: 20vw; margin-top: 7vw; padding: 0; justify-content: center; align-items: center; height: 100vh; overflow: hidden;">
                <div style="height: 60vh; width: 60vw; background: transparent;">
                  <img src="${url}" height="100%" width="100%" style="background: transparent; display: block;"/>
                </div>
              </body>
            </html>
          `:
            `<html style="background:transparent;">
          <body>
          <div style="height:100vh; width:100vw; background:transparent;">
              <img src="${url}" height="100%" width="100%" style="background:transparent;" />
          </div>
          </body>
          </html>`
        }}
        style={styles.innerContainer}
        containerStyle={styles.webContainer}
        scrollEnabled={false} // Disable scrolling
      />
    </View>
  ) : (
    <View style={[sportFlag ? styles.webMainContainerFlag : styles.webMainContainer]}>
      <View style={styles.webInnerContainer} />
      <WebView
        source={{
          html: Platform.OS === 'android'
            ? `
            <html>
            <head>
              ${viewportMetaTag}
            </head>
            <body style="background: #3F5B80; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden;">
              <div style="height: 75vh; width: 75vw; background: #3F5B80; display: flex; align-items: center; justify-content: center;">
                <img src="${url}" style="height: 100%; width: 100%; object-fit: contain;" />
              </div>
            </body>
          </html>
            `
            :
            `<html style="background:#3F5B80;">
                    <body>
                      <div style="height:90vh; width:90vw; background:#3F5B80; display: flex; align-items: center; justify-content: center;">
                        <img src="${url}" style="width: 100%; height: 100%; object-fit: contain; background:#3F5B80;" />
                      </div>
                    </body>
                    </html>`,
        }}
        style={sportFlag ? styles.htmlContainerSport : styles.htmlContainer}
        containerStyle={[styles.htmlInnerContainer, { borderRadius: sportFlag ? 0 : 16 }]}
        scrollEnabled={false} // Disable scrolling
      />
    </View>
  );
};

export default SvgRenderer;
