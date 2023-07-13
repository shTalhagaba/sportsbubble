import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";
import { Platform } from 'react-native';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground
  },

  itemListContainer: {
    paddingRight: "0@ms0.3",
    marginVertical: "1@ms0.3",
    paddingVertical: "5@ms0.3",
  },
  listContainer: {
    paddingRight: "0@ms0.3",
    marginVertical: "1@ms0.3",
    paddingVertical: "5@ms0.3",
  },
  listBottomContainer: {
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
    justifyContent: "center",
    alignItems: "center"
  },
  backImageContainer: {
    marginRight: "16@ms0.3",
    borderRadius: "22@ms0.3",
    borderWidth: "2@ms0.3",
    overflow: "hidden",

  },
  imageContainer: {
    backgroundColor: Colors.mediumBlue,
    justifyContent: "center",
    alignItems: "center",
    margin: "0.3@ms0.3",
    paddingVertical: "20@ms0.3",
    paddingHorizontal: Platform.OS === "android" ? 15 : 18,
    overflow: "hidden",
    borderRadius: "16@ms0.3"
  },
  bottomImageContainer: {
    marginRight: 16,
    borderRadius: 16,
  },
  image2Container: {
    backgroundColor: Colors.mediumBlue,
    justifyContent: "center",
    alignItems: "center",
    margin: "2@ms0.3",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: Platform.OS === "android" ? 15 : 18
  },
  imageIcon: {
    height: "65@ms0.3",
    width: "65@ms0.3",
  },
  imageRightsIcon: {
    height: "47@ms0.3",
    width: "47@ms0.3",
  },
  imageBottomIcon: {
    height: "47@ms0.3",
    width: "47@ms0.3",
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
    fontSize: "13@ms0.3",
    fontWeight: "500",
    lineHeight: "20@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    marginTop: 8,
    marginStart: -10,
    width: '80%',
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
    width: '85%',
  },
  eventTxt: {
    fontSize: "14@ms0.3",
    fontWeight: "400",
    lineHeight: "20@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
    width: '85%',
  },
  dateEventTxt: {
    fontSize: "14@ms0.3",
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
    marginTop: "40@ms0.3",
    textAlign: "center"
  },
  wayToWatch: {
    fontSize: "22@ms0.3",
    fontWeight: "800",
    lineHeight: "30@ms0.3",
    color: Colors.lightGreen,
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
    textAlign: "center",
    color: 'white',
    marginTop: "12@ms0.3",
    marginBottom: "12@ms0.3",
    fontStyle: 'italic'
  },
  conectTxt: {
    fontSize: "18@ms0.3",
    fontWeight: "800",
    lineHeight: "24@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
    marginVertical: "16@ms0.3",
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
    height: "110@ms0.3",
    alignItems: 'center',
    paddingHorizontal: "15@ms0.3",
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
    marginTop: "10@ms0.3",
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
