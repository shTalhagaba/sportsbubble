import {Colors, Fonts} from 'src/utils';
import {ScaledSheet} from 'react-native-size-matters';

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
  },
  timeContainer: {
    backgroundColor: '#213651',
    paddingHorizontal: '20@ms0.3',
    marginHorizontal: '15@ms0.3',
    borderRadius: '20@ms0.3',
    height: '30@ms0.3',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 3,
  },
  timeSliderContainer: {
    flexDirection: 'row',
    paddingVertical: '10@ms0.3',
  },
  timeSliderInnerContainer: {
    width: '75%',
  },
  nextContainer: {
    backgroundColor: Colors.brandBlue,
    paddingHorizontal: '20@ms0.3',
    marginHorizontal: '20@ms0.3',
    borderRadius: '20@ms0.3',
    height: '30@ms0.3',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rightIcon: {
    height: '10@ms0.3',
    width: '16@ms0.3',
  },
  imageContainer: {
    height: '67@ms0.3',
    width: '67@ms0.3',
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
    fontSize: '13@ms0.3',
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
    flex: 1,
    marginHorizontal: '5@ms0.3',
    marginVertical: 5,
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
    width: '90@ms0.3',
  },
  sliderIcon: {
    height: '32@ms0.3',
    width: '32@ms0.3',
    paddingVertical: '15@ms0.3',
    tintColor: Colors.white,
  },
  sliderTxt: {
    fontSize: '14@ms0.3',
    fontWeight: '800',
    lineHeight: '24@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Bold,
    fontStyle: 'italic',
  },
});
