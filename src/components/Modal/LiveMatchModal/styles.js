import {Colors, Fonts} from 'src/utils';
import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: Colors.darkBlue,
    width: '90%',
    alignSelf: 'center',
    borderRadius: '16@ms0.3',
    paddingBottom: '30@ms0.3',
  },
  matchTeam: {
    height: '240@ms0.6',
    width: '100%',
    borderTopRightRadius: '16@ms0.3',
    borderTopLeftRadius: '16@ms0.3',
    resizeMode: 'cover',
  },
  liveTxt: {
    fontSize: '24@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: '20@ms0.3',
    marginTop: '16@ms0.3',
    lineHeight: '33@ms0.3',
  },
  matchNameTxt: {
    fontSize: '24@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontWeight: '800',
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: '20@ms0.3',
    marginTop: '8@ms0.3',
    lineHeight: '33@ms0.3',
    maxWidth: '70%',
  },
});

export default styles;
