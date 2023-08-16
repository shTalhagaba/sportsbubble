import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions, Platform } from 'react-native';
const width = Dimensions.get('window').width;
const { fontScale } = Dimensions.get('window');

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
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
  listContiner: {
    paddingRight: '0@ms0.3',
    marginVertical: '0@ms0.3',
    paddingVertical: '4@ms0.3',
  },
  innerContainer: {
    flexDirection: 'row',
    height: fontScale > 1 ? 65 * fontScale : '69@ms0.3',
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    backgroundColor: '#00000010', // Set a semi-transparent background color
    borderRadius: '44@ms0.3',
    overflow: 'visible',
  },
  timeContainer: {
    backgroundColor: '#21365110', // Set a semi-transparent background color
    alignSelf: 'center',
    paddingHorizontal: '18@ms0.3',
    borderRadius: '20@ms0.3',
    height: fontScale > 1 ? 24 * fontScale : '26@ms0.3',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 1,
    marginLeft: Platform.OS === 'android' ? '31@ms0.3' : '36@ms0.3',
  },
  fvrtIcon: {
    height: '23@ms0.3',
    width: '23@ms0.3',
    marginRight: '20@ms0.3',
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  liveMainContainer: {
    width: fontScale > 1 ? (width / 5) * fontScale : width / 5,
  },
  liveTimeContainer: {
    backgroundColor: '#21365110', // Set a semi-transparent background color
    paddingHorizontal: '18@ms0.3',
    marginLeft: '8@ms0.3',
    borderRadius: '20@ms0.3',
    height: fontScale > 1 ? 23 * fontScale : '26@ms0.3',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  timeSliderContainer: {
    flexDirection: 'row',
    paddingVertical: '10@ms0.3',
  },
  timeSliderInnerContainer: {
    flex: 1,
  },
  nextContainer: {
    backgroundColor: Colors.brandBlue,
    paddingHorizontal: '18@ms0.3',
    marginRight: '5@ms0.3',
    marginLeft: '5@ms0.3',
    borderRadius: '20@ms0.3',
    width: fontScale > 1 ? 24 * fontScale : '26@ms0.3',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rightIcon: {
    height: '10@ms0.3',
    width: '16@ms0.3',
  },
  imageContainer: {
    height: fontScale > 1 ? 65 * fontScale : '69@ms0.3',
    width: '69@ms0.3',
    backgroundColor: Colors.mediumBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '1@ms0.3',
  },
  imageIcon: {
    height: '48@ms0.3',
    width: '48@ms0.3',
  },
  userNameContainer: {
    paddingStart: '13@ms0.3',
    position: 'absolute',
    left: '60@ms0.3',
    width: '82%',
  },
  leftContainer: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: Colors.blueGrey,
  },
  sliderActiveTimeTxt: {
    fontSize: '14@ms0.3',
    fontWeight: '800',
    lineHeight: '25@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontStyle: 'italic',
  },
  sliderInactiveTimeTxt: {
    fontSize: '14@ms0.3',
    // fontWeight: "500",
    lineHeight: '25@ms0.3',
    color: Colors.white,
    // fontFamily: Fonts.Regular,
  },
  titleTxt: {
    fontSize: '18@ms0.3',
    fontWeight: '800',
    lineHeight: '21@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  eventTxt: {
    fontSize: '14@ms0.3',
    fontWeight: '400',
    lineHeight: '20@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  eventDateTxt: {
    fontSize: '14@ms0.3',
    fontWeight: '400',
    lineHeight: '20@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.mediumBlue,
    // height: '120@ms0.3',
    height: fontScale > 1 ? (width / 4.2) * fontScale : '120@ms0.3',
  },
  sliderInnerContainer: {
    // flex: 1,
    marginHorizontal: '3@ms0.3',
    marginVertical: '5@ms0.3',
    justifyContent: 'center',
  },
  sliderImageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex:999
  },
  sliderInnerMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '2@ms0.3',
    borderColor: '#004EBC',
    // height: '90@ms0.3',
    height: fontScale > 1 ? (width / 4.5) * fontScale : width / 4.5,
    borderRadius: fontScale > 1 ? 21 * fontScale : '22@ms0.3',
    width: fontScale > 1 ? (width / 4 - 12) * fontScale : width / 4 - 12,
    overflow: 'visible',
  },
  sliderIcon: {
    height: fontScale > 1 ? 32 * fontScale : '35@ms0.3',
    width: fontScale > 1 ? 32 * fontScale : '35@ms0.3',
    paddingVertical: '12@ms0.3',
    tintColor: Colors.white,
  },
  sliderTxt: {
    fontSize: '16@ms0.3',
    fontWeight: '900',
    lineHeight: '24@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Bold,
    fontStyle: 'italic',
    elevation: 3,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
    textShadowColor: '#000000',
    marginTop: '6@ms0.3',
  },
  rectangle2: {
    position: 'absolute',
    left: Platform.OS === 'android' ? -4 : -4,
    top: -4,
    // height: '94@ms0.3',
    height: fontScale > 1 ? (width / 4.4) * fontScale : width / 4.3,
    // width: width / 4.3,
    width: fontScale > 1 ? (width / 4 - 10) * fontScale : width / 4 - 8,
    borderRadius: fontScale > 1 ? 21 * fontScale : '22@ms0.3',
    borderWidth: 2,
    borderColor: '#004EBC',
    opacity: 0.5,
  },
});
