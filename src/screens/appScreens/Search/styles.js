import { StyleSheet } from 'react-native';
import { Colors } from 'src/utils';


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
  userNameContainer: {
    flex: 1,
    marginStart: 13,
    alignSelf: "center"
  },
});
