import {Colors, Fonts} from 'src/utils';
import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.mediumGreen,
    marginTop: '20@ms0.3',
    marginHorizontal: '5@ms0.3',
    borderRadius: '15@ms0.3',
    height: '55@ms0.3',
  },
  innerContainer: {
    height: '30@ms0.3',
    flex: 1,
    flexDirection: 'row',
    borderRadius: '12@ms0.3',
  },
  txt: {
    fontSize: '16@ms0.3',
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.white,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontStyle: 'italic',
  },
});

export default styles;
