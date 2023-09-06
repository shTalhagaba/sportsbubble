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
  listContainer: {
    paddingRight: '0@ms0.3',
    marginVertical: '0@ms0.3',
    paddingVertical: '4@ms0.3',
  },
  fvrtIcon: {
    height: '21@ms0.3',
    width: '21@ms0.3',
    marginRight: '15@ms0.3',
  },
  innerContainer: {
    flexDirection: 'row',
    height: fontScale > 1 ? 57 * fontScale : '59@ms0.3',
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
    paddingHorizontal: '10@ms0.3',
    borderRadius: '20@ms0.3',
    height: fontScale > 1 ? 24 * fontScale : '24@ms0.3',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 1,
    marginTop: '0@ms0.3',
    // marginLeft: fontScale > 1.3 ? 12 * fontScale :
    //   fontScale > 1 ? 20 * fontScale :
    //     Platform.OS === 'android' ? '25@ms0.3' : '28@ms0.3',
  },
  liveMainContainer: {
    width: fontScale > 1 ? (width / 5) * fontScale : width / 4,
    justifyContent: 'center',
    alignContent: 'center',
    height: fontScale > 1 ? 30 * fontScale : '40@ms0.3',
    marginTop: fontScale > 1 ? 5 * fontScale : '0@ms0.3'
  },
  liveTimeContainer: {
    backgroundColor: '#21365110', // Set a semi-transparent background color
    paddingHorizontal: '16@ms0.3',
    marginLeft: '8@ms0.3',
    borderRadius: '20@ms0.3',
    height: fontScale > 1 ? 24 * fontScale : '24@ms0.3',
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
    justifyContent: 'center',
    alignContent: 'center',
    height: fontScale > 1 ? 37 * fontScale : '42@ms0.3',
  },
  timeSliderInnerContainer: {
    flex: 1,
  },
  rightIconStyle: {
    width: width / 5,
    justifyContent: 'center',
    alignContent: 'center',
    height: fontScale > 1 ? 20 * fontScale : '38@ms0.3',
    marginTop: fontScale > 1 ? 6 * fontScale : '1@ms0.3',
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
    height: fontScale > 1 ? 10 * fontScale : '13@ms0.3',
    width: fontScale > 1 ? 16 * fontScale : '19@ms0.3',
  },
  imageContainer: {
    height: fontScale > 1 ? 57 * fontScale : '59@ms0.3',
    width: fontScale > 1 ? 55 * fontScale : '57@ms0.3',
    backgroundColor: Colors.greyBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '1@ms0.3',
  },
  imageIcon: {
    height: Platform.OS === "ios" ? '44@ms0.3' : '48@ms0.3',
    width: Platform.OS === "ios" ? '44@ms0.3' : '47@ms0.3',
  },
  userNameContainer: {
    paddingStart: '6@ms0.3',
    position: 'absolute',
    left: '60@ms0.3',
    width: '72%',
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
    fontSize: fontScale > 1 ? 15 * fontScale : '15@ms0.3',
    fontWeight: '900',
    lineHeight: '22@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontStyle: 'italic',
  },
  sliderInactiveTimeTxt: {
    fontSize: fontScale > 1 ? 13 * fontScale : '15@ms0.3',
    fontWeight: '700',
    lineHeight: '23@ms0.3',
    color: Colors.white,
  },
  titleTxt: {
    fontSize: '16@ms0.3',
    fontWeight: '800',
    // lineHeight: '18@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    marginStart: Platform.OS === "android" ? fontScale > 1 ? "20@ms0.3" : "0@ms0.3" : "0@ms0.3"
  },
  eventTxt: {
    fontSize: '13@ms0.3',
    fontWeight: '400',
    lineHeight: '15@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    marginTop: '2@ms0.3',
    marginStart: Platform.OS === "android" ? fontScale > 1 ? "20@ms0.3" : "0@ms0.3" : "0@ms0.3"

  },
  eventDateTxt: {
    fontSize: '13@ms0.3',
    fontWeight: '400',
    lineHeight: '16@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    marginStart: Platform.OS === "android" ? fontScale > 1 ? "20@ms0.3" : "0@ms0.3" : "0@ms0.3"

  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.greyBackground,
    height: fontScale > 1 ? (width / 4.4) * fontScale : '100@ms0.3',
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
});
