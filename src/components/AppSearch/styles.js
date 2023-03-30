import { StyleSheet } from "react-native";
import { Colors, Fonts } from "src/utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#22364f",
    borderWidth: 1,
    borderColor: "#6a88b2",
    marginVertical: 10
  },
  searchImage: {
    height: 18,
    width: 18,
    marginHorizontal: 10,
    tintColor: Colors.white
  },
  crossImage: {
    height: 12,
    width: 12,
    marginHorizontal: 10,
    tintColor: Colors.white
  },
  inputField: {
    letterSpacing: 0.75,
    color: Colors.white,
    fontSize: 16,
    flex: 1,
    fontWeight: "600",
    padding: 0,
    fontFamily: Fonts.Regular,
  },
});

export default styles;
