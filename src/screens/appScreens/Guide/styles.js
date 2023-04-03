import { StyleSheet } from 'react-native';
import { Colors, Fonts } from 'src/utils';
import { moderateScale, ScaledSheet } from "react-native-size-matters";



export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground
  },
  listContiner: {
    paddingRight: "0@ms0.3",
    marginVertical: "1@ms0.3",
    paddingVertical: "5@ms0.3",
  },
  innerContainer: {
    flexDirection: "row"
  },
  timeContainer: {
    backgroundColor: "#213651",
    paddingHorizontal: "20@ms0.3",
    marginHorizontal: "15@ms0.3",
    borderRadius: "20@ms0.3",
    height: "30@ms0.3",
    justifyContent: "center",
    alignSelf: "center",
  },
  timeSliderContainer: {
    flexDirection: "row",
    paddingVertical: "10@ms0.3",
  },
  timeSliderInnerContainer: {
    width: "75%"
  },
  nextContainer: {
    backgroundColor: Colors.brandBlue,
    paddingHorizontal: "20@ms0.3",
    marginHorizontal: "20@ms0.3",
    borderRadius: "20@ms0.3",
    height: "30@ms0.3",
    justifyContent: "center",
    alignSelf: "center"
  },
  rightIcon: {
    height: "10@ms0.3",
    width: "16@ms0.3",
  },
  imageContainer: {
    height: "80@ms0.3",
    width: "80@ms0.3",
    backgroundColor: Colors.mediumBlue,
    justifyContent: "center",
    alignItems: "center"
  },
  imageIcon: {
    height: "48@ms0.3",
    width: "48@ms0.3",
  },
  userNameContainer: {
    paddingStart: "13@ms0.3",
    height: "80@ms0.3",
    justifyContent: "center",
    position: 'absolute',
    left: "80@ms0.3",
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
    fontSize: "14@ms0.3",
    fontWeight: "800",
    lineHeight: "25@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontStyle: 'italic'

  },
  sliderInactiveTimeTxt: {
    fontSize: "14@ms0.3",
    fontWeight: "500",
    lineHeight: "25@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  titleTxt: {
    fontSize: "18@ms0.3",
    fontWeight: "800",
    lineHeight: "25@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  eventTxt: {
    fontSize: "13@ms0.3",
    fontWeight: "400",
    lineHeight: "20@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.mediumBlue,
    height: "120@ms0.3",

  },
  sliderInnerContainer: {
    flex: 1,
    marginHorizontal: "5@ms0.3",
  },
  sliderImageBackground: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  sliderIcon: {
    height: "32@ms0.3",
    width: "32@ms0.3",
    paddingVertical: "15@ms0.3",
    tintColor: Colors.white
  },
  sliderTxt: {
    fontSize: "14@ms0.3",
    fontWeight: "600",
    lineHeight: "24@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
});
