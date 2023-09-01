import {Platform} from 'react-native';
import {Colors} from 'src/utils';
import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  headerContainer: {
    height: Platform.OS === 'ios' ? '95@ms0.3' : '85@ms0.3',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    paddingTop: Platform.OS === 'ios' ? '35@ms0.3' : '22@ms0.3',
  },
  leftArrowIcon: {
    width: '24@ms0.3',
    height: '24@ms0.3',
    resizeMode: 'cover',
  },
  rightIcon: {
    width: '20@ms0.3',
    height: '20@ms0.3',
    resizeMode: 'cover',
  },

  headerCenterContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centerImage: {
    height: '24@ms0.3',
    width: '134@ms0.3',
  },
  iconContainer: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
