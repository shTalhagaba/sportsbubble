import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
const width = Dimensions.get('window').width;
const { fontScale } = Dimensions.get('window');

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  listContainer: {
    marginVertical: '8@ms0.3',
    paddingVertical: '5@ms0.3',
    borderRadius: '16@ms0.3',
    backgroundColor: '#2B3B50',
    marginHorizontal: '20@ms0.3',
    paddingHorizontal: '4@ms0.3',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mangeFvrtContainer: {
    paddingVertical: '16@ms0.3',
  },
  imageIcon: {
    height: '48@ms0.3',
    width: '48@ms0.3',
  },
  userNameContainer: {
    paddingStart: '9@ms0.3',
    justifyContent: 'center',
    flex: 1,
  },
  mangeFavTxt: {
    fontSize: '20@ms0.3',
    fontWeight: '800',
    lineHeight: '25@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    textAlign: 'center',
  },
  titleTxt: {
    fontSize: '15@ms0.3',
    fontWeight: '800',
    lineHeight: '22@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.greyBackground,
    height: DeviceInfo.isTablet() ? "130@ms0.3" : fontScale > 1 ? 100 * fontScale : '85@ms0.3',
  },
  sliderImageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    height: '20@ms0.3',
    width: '20@ms0.3',
    marginRight: '12@ms0.3',
  },
  fvrtIcon: {
    height: '21@ms0.3',
    width: '21@ms0.3',
    marginRight: '15@ms0.3',
  },
  sliderInnerContainer: {
    // flex: 1,
    marginHorizontal: '7@ms0.3',
    marginVertical: '10@ms0.3',
    justifyContent: 'center',
  },
  sliderImageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderInnerMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '2@ms0.3',
    borderColor: '#004EBC',
    height: fontScale > 1 ? (width / 4.8) * fontScale : width / 5.1,
    borderRadius: fontScale > 1 ? 21 * fontScale : '18@ms0.3',
    width: fontScale > 1 ? (width / 4.8) * fontScale : width / 5.1,
    overflow: 'visible',
  },
  sliderIcon: {
    height: fontScale > 1 ? 25 * fontScale : '28@ms0.3',
    width: fontScale > 1 ? 25 * fontScale : '28@ms0.3',
    paddingVertical: '12@ms0.3',
    tintColor: Colors.white,
    marginTop: '10@ms0.3',
  },
  sliderTxt: {
    fontSize: '12@ms0.3',
    fontWeight: '900',
    lineHeight: '24@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Bold,
    fontStyle: 'italic',
    elevation: 3,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
    textShadowColor: '#000000',
    marginBottom: '3@ms0.3',
  },
  rectangle2: {
    position: 'absolute',
    left: Platform.OS === 'android' ? -5 : -5,
    top: -4.5,
    // height: '94@ms0.3',
    height: fontScale > 1 ? (width / 4.9) * fontScale : width / 4.7 - 1,
    // width: width / 4.3,
    width: fontScale > 1 ? (width / 4.9) * fontScale : width / 4.71,
    borderRadius: fontScale > 1 ? 19 * fontScale : '20@ms0.3',
    borderWidth: '3@ms0.3',
    borderColor: Colors.brandBlue,
    opacity: 0.3,
  },
  headerTxtStyle: {
    fontSize: '22@ms0.3',
  },
  dexTxtStyle: {
    fontSize: '24@ms0.3',
    fontWeight: '400',
  },

  dexNotiTxtStyle: {
    fontSize: '20@ms0.3',
    fontWeight: '400',
  },

  emptyTxt: {
    letterSpacing: 0.75,
    color: Colors.white,
    fontSize: '20@ms0.3',
    flex: 1,
    fontWeight: '600',
    padding: '0@ms0.3',
    fontFamily: Fonts.Regular,
    alignContent: 'center',
    textAlign: 'center',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '40@ms0.3',
  },
});
