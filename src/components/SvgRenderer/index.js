import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import styles from './styles';

const SvgRenderer = ({ url, flag }) => {
    return (
        flag ?
            <View style={styles.container}>
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
                    style={styles.innerContainer}
                    containerStyle={styles.webContainer} />
            </View> :
            <View style={styles.webMainContainer}>
                <View style={styles.webInnerContainer} />
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
