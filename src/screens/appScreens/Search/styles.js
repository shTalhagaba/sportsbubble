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
    flex: 1,
    marginStart: 13,
    alignSelf: "center"
  },
  titleTxt: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: Colors.white,
    fontFamily: Fonts.Regular,
  }
});
