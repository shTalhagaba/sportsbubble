import {Colors} from 'src/utils';
import {ScaledSheet} from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.appColorBackground,
    backgroundColor: '#0D131A',
  },
  sbContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    alignContent: 'center',
    alignSelf: 'center',
  },
  leftArrowIcon: {
    width: '45@ms0.3',
    height: '45@ms0.3',
    resizeMode: 'cover',
  },
  powerImage: {
    width: '165@ms0.3',
    height: '75@ms0.3',
    resizeMode: 'cover',
    tintColor: Colors.white,
  },
});
