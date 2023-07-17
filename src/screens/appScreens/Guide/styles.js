import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions, Platform } from 'react-native';
const width = Dimensions.get('window').width;

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  listContiner: {
    paddingRight: '0@ms0.3',
    marginVertical: '0@ms0.3',
    paddingVertical: '4@ms0.3',
  },
  innerContainer: {
    flexDirection: 'row',
    height: '69@ms0.3',
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
    // paddingLeft: '10@ms0.3',
    // marginLeft: '50@ms0.3',
    // borderRadius: '15@ms0.3',
    // height: '26@ms0.3',
    // width: '54@ms0.3',
    alignSelf: 'center',

    paddingHorizontal: '18@ms0.3',
    // marginLeft: '8@ms0.3',
    borderRadius: '20@ms0.3',
    height: '26@ms0.3',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 1,
    marginLeft: Platform.OS === "android" ? "30@ms0.3" : "36@ms0.3"
  },
  liveTimeContainer: {
    backgroundColor: '#21365110', // Set a semi-transparent background color
    paddingHorizontal: '18@ms0.3',
    marginLeft: '8@ms0.3',
    borderRadius: '20@ms0.3',
    height: '26@ms0.3',
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
    // marginHorizontal: 20,
  },
  nextContainer: {
    backgroundColor: Colors.brandBlue,
    paddingHorizontal: '18@ms0.3',
    marginRight: '5@ms0.3',
    marginLeft: '5@ms0.3',
    borderRadius: '20@ms0.3',
    height: '26@ms0.3',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rightIcon: {
    height: '10@ms0.3',
    width: '16@ms0.3',
  },
  imageContainer: {
    height: '69@ms0.3',
    width: '69@ms0.3',
    backgroundColor: Colors.mediumBlue,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '120@ms0.3',
  },
  sliderInnerContainer: {
    // flex: 1,
    marginHorizontal: '5@ms0.3',
    marginVertical: '5@ms0.3',
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
    height: '90@ms0.3',
    borderRadius: '20@ms0.3',
    width: width / 4 - 11,
    overflow: "visible"


  },
  sliderIcon: {
    height: '35@ms0.3',
    width: '35@ms0.3',
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

    // elevation: 3,
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.6,
    // shadowRadius: 3,
    // shadowColor: 'rgba(0, 0, 0, 0.4)',
    // backgroundColor: '#00000010', // Set a semi-transparent background color
    // borderRadius: '44@ms0.3',
    // overflow: 'visible',
  },
  rectangle2: {
    position: 'absolute',
    left: Platform.OS === "android" ? -6 : -4,
    top: -4,
    height: '94@ms0.3',
    width: '94@ms0.3',
    borderRadius: '20@ms0.3',
    borderWidth: 2,
    borderColor: '#004EBC',
    opacity: 0.5,
  },
});
