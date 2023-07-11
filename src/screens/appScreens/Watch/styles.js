import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";
import { Platform } from 'react-native';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground
  },

  itemListContiner: {
    paddingRight: "0@ms0.3",
    marginVertical: "1@ms0.3",
    paddingVertical: "5@ms0.3",
  },
  listContiner: {
    paddingRight: "0@ms0.3",
    marginVertical: "1@ms0.3",
    paddingVertical: "5@ms0.3",
  },
  itemInnerContainer: {
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
  itemContainer: {
    height: "80@ms0.3",
    width: "80@ms0.3",
    backgroundColor: Colors.mediumBlue,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    backgroundColor: Colors.mediumBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginRight: 16,
    paddingVertical: 20,
    paddingHorizontal: Platform.OS === "android" ? 15 : 18
  },
  image2Container: {
    backgroundColor: Colors.mediumBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginRight: 16,
    paddingVertical: 18,
    paddingHorizontal: Platform.OS === "android" ? 15 : 18
  },
  imageIcon: {
    height: "46@ms0.3",
    width: "46@ms0.3",
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
  listTitleTxt: {
    fontSize: "14@ms0.3",
    fontWeight: "500",
    lineHeight: "20@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
    textAlign:'center',
    marginTop: 8,
    marginStart: -16
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
    width:'98%',
  },
  eventTxt: {
    fontSize: "13@ms0.3",
    fontWeight: "400",
    lineHeight: "20@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  watchOptions: {
    fontSize: "22@ms0.3",
    fontWeight: "800",
    lineHeight: "30@ms0.3",
    color: Colors.lightGreen,
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
    marginTop: 40,
    textAlign: "center"
  },
  wayToWatch: {
    fontSize: "20@ms0.3",
    fontWeight: "800",
    lineHeight: "30@ms0.3",
    color: Colors.lightGreen,
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
    textAlign: "center",
    color: 'white',
    marginTop: "12@ms0.3",
  },
  conectTxt: {
    fontSize: "18@ms0.3",
    fontWeight: "800",
    lineHeight: "24@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
    marginTop: "16@ms0.3",
    textAlign: "center",
    maxWidth: "70%",
    alignSelf: "center",
    fontStyle: 'italic'
  },
  orangeTxt: {
    fontSize: "18@ms0.3",
    fontWeight: "500",
    lineHeight: "24@ms0.3",
    color: Colors.darkOrange,
    fontFamily: Fonts.Regular,
    marginTop: "36@ms0.3",
    textAlign: "center",
    maxWidth: "70%",
    alignSelf: "center",
    fontStyle: 'italic'
  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.mediumBlue,
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
  flatlistContainer: {
    marginTop: "40@ms0.3",
    marginHorizontal: "15@ms0.3",
  },
  menuBtn: {
    width: "32@ms0.3",
    height: "12@ms0.3"
  },
  largeMenuImage: {
    width: '100%',
    height: "220@ms0.3",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: "20@ms0.3",
  },
  smallMenuImage: {
    width: '100%',
    height: "80@ms0.3",
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexOnly: {
    flex: 1
  }
});
