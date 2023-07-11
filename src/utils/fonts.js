import {Platform} from 'react-native';
const fonts = {
  Black: Platform.OS == 'ios' ? 'Lato-Black' : 'Lato-Black',
  BlackItalic: Platform.OS == 'ios' ? 'Lato-BlackItalic' : 'Lato-BlackItalic',
  Bold: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato-Bold',
  BoldItalic: Platform.OS == 'ios' ? 'Lato-BoldItalic' : 'Lato-BoldItalic',
  Italic: Platform.OS == 'ios' ? 'Lato-Italic' : 'Lato-Italic',
  Light: Platform.OS == 'ios' ? 'Lato-Light' : 'Lato-Light',
  LightItalic: Platform.OS == 'ios' ? 'Lato-LightItalic' : 'Lato-LightItalic',
  Regular: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato-Regular',
  Thin: Platform.OS == 'ios' ? 'Lato-Thin' : 'Lato-Thin',
  ThinItalic: Platform.OS == 'ios' ? 'Lato-ThinItalic' : 'Lato-ThinItalic',
};

export default fonts;
