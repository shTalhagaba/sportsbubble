import { StyleSheet } from 'react-native';
import { Colors, Fonts } from 'src/utils';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground
  },
  listContiner: {
    paddingRight: 0,
    marginVertical: 6,
    paddingVertical: 5,
  },
  innerContainer: {
    flexDirection: "row"
  },
  timeContainer: {
    backgroundColor: "#213651",
    paddingHorizontal: 20,
    marginHorizontal: 15,
    borderRadius: 20,
    height: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  timeSliderContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  timeSliderInnerContainer: {
    width: "75%"
  },
  nextContainer: {
    backgroundColor: Colors.buttonBlue,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    height: 30,
    justifyContent: "center",
    alignSelf: "center"
  },
  rightIcon: {
    height: 15,
    width: 22
  },
  imageContainer: {
    height: 80,
    width: 80,
    backgroundColor: "#22364f",
    justifyContent: "center",
    alignItems: "center"
  },
  imageIcon: {
    height: 50,
    width: 50
  },
  userNameContainer: {
    paddingStart: 13,
    height: 80,
    justifyContent: "center",
    position: 'absolute',
    left: 80
  },
  leftContainer: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: Colors.blueGrey,
  },
  titleTxt: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 1,
    backgroundColor: Colors.blueGrey,
    padding: 10,
  },
  sliderInnerContainer: {
    flex: 1,
    backgroundColor: '#21334b',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 2,
    marginHorizontal: 6,
    borderRadius: 20,
  },
  sliderIcon: {
    height: 35,
    width: 35,
    paddingVertical: 15,
    tintColor: Colors.white
  },
  sliderTxt: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 24,
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
});
