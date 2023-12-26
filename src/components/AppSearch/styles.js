import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    height: '58@ms0.3',
    borderRadius: '16@ms0.3',
    alignItems: 'center',
    backgroundColor: Colors.mediumBlue,
    marginVertical: '10@ms0.3',
  },
  focus: {
    borderWidth: '2@ms0.3',
    borderColor: Colors.lightBlue,
  },
  blur: {
    borderWidth: '1@ms0.3',
    borderColor: Colors.lightGreen,
  },
  searchImage: {
    height: '18@ms0.3',
    width: '18@ms0.3',
    marginHorizontal: '10@ms0.3',
    tintColor: Colors.white,
  },
  crossImage: {
    height: '12@ms0.3',
    width: '12@ms0.3',
    marginHorizontal: '10@ms0.3',
    tintColor: Colors.white,
  },
  inputField: {
    letterSpacing: 0.75,
    color: Colors.white,
    fontSize: '16@ms0.3',
    flex: 1,
    fontWeight: '600',
    padding: '0@ms0.3',
    fontFamily: Fonts.Regular,
  },
});

export default styles;
