import { Colors } from 'src/utils';
import React from 'react';
import { Dimensions, View } from 'react-native';
import WebView from 'react-native-webview';
const screenWidth = Dimensions.get('window').width;

const SvgRenderer = ({ url,flag }) => {
    return (
        flag?
        <View style={{
            width: screenWidth / 2.5,
            height: screenWidth / 4,
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
                    width: screenWidth / 2.5,
                    height: screenWidth / 4,
                    backgroundColor: 'transparent', // Set background to transparent
                }}
                containerStyle={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 15,
                    backgroundColor: 'transparent',
                }}
            />
        </View>:
        <View style={{
            backgroundColor: Colors.mediumBlue,
            borderWidth: 2,
            borderRadius: 16,
            overflow: 'hidden',
            borderColor: Colors.mediumBlue,
            justifyContent: 'center',
            width: screenWidth / 4.6,
            height: screenWidth / 4.6,
        }}>
            <View style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: Colors.black15,
            }} />
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
                style={{
                    width: screenWidth / 6,
                    height: screenWidth / 6,
                    backgroundColor: 'transparent', // Set background to transparent
                }}
                containerStyle={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 15,
                    backgroundColor: Colors.mediumBlue,
                }}
            />
        </View>
    );
};

export default SvgRenderer;
