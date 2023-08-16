/**
 * @format
 */

import { AppRegistry, Text, TextInput, Dimensions, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
const screenHeight = Dimensions.get('window').height;
if (parseInt(screenHeight) < 400) {
  if (Text.defaultProps) {
    Text.defaultProps.allowFontScaling = false;
  } else {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  // Override Text scaling in input fields
  if (TextInput.defaultProps) {
    TextInput.defaultProps.allowFontScaling = false;
  } else {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }
}
AppRegistry.registerComponent(appName, () => App);