import React from 'react';
import { Dimensions, View } from 'react-native';
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
                        html: `
            <html style="background:transparent;">
            <body>
              <div style="height:100vh; width:100vw; background:transparent;">
                <img src="${url}" height="100%" width="100%" style="background:transparent;" />
              </div>
            </body>
            </html>`
                    }}
                    style={{
                        width: width ? width : screenWidth / 2.5,
                        height: height ? height : screenWidth / 4,
                        backgroundColor: 'transparent', // Set background to transparent
                    }}
                    containerStyle={styles.container}
                />
            </View> :
            <View style={styles.innerContainer}>
                <View style={styles.innerWebContainer} />
                <WebView
                    source={{
                        html: `
            <html style="background:#3F5B80;">
            <body>
              <div style="height:100vh; width:100vw; background:#3F5B80;">
                <img src="${url}" height="100%" width="100%" style="background:#3F5B80;" />
              </div>
            </body>
            </html>`
                    }}
                    style={styles.htmlContainer}
                    containerStyle={styles.htmlInnerContainer}
                />
            </View>
    );
};

export default SvgRenderer;
