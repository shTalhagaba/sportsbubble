import {Colors, Fonts} from 'src/utils';
import {ScaledSheet} from 'react-native-size-matters';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const {fontScale} = Dimensions.get('window');

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  listContainer: {
    paddingRight: '5@ms0.3',
    marginVertical: '10@ms0.3',
    paddingVertical: '5@ms0.3',
    alignItems: 'center',
  },
  itemListContainer: {
    paddingRight: '0@ms0.3',
    marginVertical: '1@ms0.3',
    paddingVertical: '5@ms0.3',
  },
  itemInnerContainer: {
    flexDirection: 'row',
  },
  rightIcon: {
    height: '10@ms0.3',
    width: '16@ms0.3',
  },
  itemContainer: {
    height: fontScale > 1 ? 74 * fontScale : '78@ms0.3',
    width: fontScale > 1 ? 74 * fontScale : '78@ms0.3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImageContainer: {
    height: '75@ms0.3',
    // width: "75@ms0.3",
    justifyContent: 'center',
    alignSelf: 'center',
    margin: '10@ms0.3',
    borderRadius: 16,
  },
  imageContainer: {
    height: '70@ms0.3',
    width: '70@ms0.3',
    backgroundColor: Colors.mediumBlue,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 16,
  },
  imageIcon: {
    height: '65@ms0.3',
    width: '64@ms0.3',
  },
  titleTxt: {
    fontSize: '15@ms0.3',
    fontWeight: '800',
    lineHeight: '23@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    width: Platform.OS === 'android' ? screenWidth - 110 :  screenWidth - 110 ,
  },
  eventTxt: {
    fontSize: '13@ms0.3',
    fontWeight: '400',
    lineHeight: '18@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    width: Platform.OS === 'android' ? screenWidth - 110 :  screenWidth - 110 ,
  },
  dateEventTxt: {
    fontSize: '13@ms0.3',
    fontWeight: '400',
    lineHeight: '18@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  watchOptions: {
    fontSize: '22@ms0.3',
    fontWeight: '800',
    lineHeight: '30@ms0.3',
    color: Colors.lightGreen,
    fontFamily: Fonts.Regular,
    textTransform: 'uppercase',
    marginTop: 40,
    textAlign: 'center',
  },
  wayToWatch: {
    fontSize: '20@ms0.3',
    fontWeight: '800',
    lineHeight: '30@ms0.3',
    color: Colors.lightGreen,
    fontFamily: Fonts.Regular,
    textTransform: 'uppercase',
    marginTop: 40,
    textAlign: 'center',
  },
  connectingText: {
    fontSize: '16@ms0.3',
    fontWeight: '400',
    lineHeight: '20@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    marginTop: '20@ms0.3',
    textAlign: 'center',
    maxWidth: '70%',
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.greyBackground,
    height: fontScale > 1 ? 90 * fontScale : '90@ms0.3',
    alignItems: 'center',
    paddingHorizontal: '13@ms0.3',
  },
  sliderInnerContainer: {
    flex: 1,
    marginHorizontal: '5@ms0.3',
  },
  sliderImageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderIcon: {
    height: '32@ms0.3',
    width: '32@ms0.3',
    paddingVertical: '15@ms0.3',
    tintColor: Colors.white,
  },
  sliderTxt: {
    fontSize: '14@ms0.3',
    fontWeight: '600',
    lineHeight: '24@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  sbContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  sbImage: {
    height: '150@ms0.3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20@ms0.3',
  },
  flexOnly: {
    flex: 1,
  },
  leftArrowIcon: {
    width: '44@ms0.3',
    height: '44@ms0.3',
    resizeMode: 'cover',
  },
  powerImage: {
    width: '160@ms0.3',
    height: '72@ms0.3',
    resizeMode: 'cover',
    tintColor: Colors.white,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: '30@ms0.3',
    marginHorizontal: '20@ms0.3',
  },
  imageStyle: {
    height: '45@ms0.3',
    marginTop: '30@ms0.3',
  },
  logoImageStyle: {
    height: '100@ms0.3',
    width: '163@ms0.3',
  },
  flexRow: {
    flexDirection: 'row',
  },
  userNameContainer: {
    paddingStart: '13@ms0.3',
    height: fontScale > 1 ? 76 * fontScale : '80@ms0.3',
    justifyContent: 'center',
    position: 'absolute',
    left: '65@ms0.3',
    alignSelf: 'center',
  },
  headerContainer: {
    height: Platform.OS === 'ios' ? '100@ms0.3' : '70@ms0.3',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    paddingTop: Platform.OS === 'ios' ? '40@ms0.3' : '22@ms0.3',
  },
});
