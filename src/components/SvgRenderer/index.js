import React from 'react';
import { Dimensions, Platform, View } from 'react-native';
import WebView from 'react-native-webview';
import styles from './styles';
const screenWidth = Dimensions.get('window').width;

const SvgRenderer = ({ url, flag, width, height }) => {
    return (
        flag ?
        <View style={{
            width: width ? width : screenWidth / 2.5,
            height: height ? height : screenWidth / 4,
        }}>
                <WebView
                    source={{
                        html: Platform.OS === 'android'?
                        `
                        <html style="background:transparent;">
                        <body>
                        <div style="height:60vh; width:60vw; background:transparent;">
                            <img src="${url}" height="100%" width="100%" style="background:transparent;" />
                        </div>
                        </body>
                        </html>`
                        :`
                        <html style="background:transparent;">
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
            </View> :
            <View style={styles.webMainContainer}>
                <View style={styles.webInnerContainer} />
                <WebView
                source={{
                  html: `
                    <html style="background:#3F5B80;">
                    <body>
                      <div style="height:90vh; width:90vw; background:#3F5B80; display: flex; align-items: center; justify-content: center;">
                        <img src="${url}" style="width: 100%; height: 100%; object-fit: contain; background:#3F5B80;" />
                      </div>
                    </body>
                    </html>`
                }}
                style={styles.htmlContainer}
                containerStyle={styles.htmlInnerContainer}
                scrollEnabled={false} // Disable scrolling
              />
              
            </View>
    );
};

export default SvgRenderer;
