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
    paddingBottom: '40@ms0.3',
    borderRadius: 16,
    elevation: 5,
    shadowColor: Colors.black50,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 1,
    shadowRadius: 8,
    marginBottom: 6, // Adjust this value as needed
  },
  matchTeam: {
    height: '240@ms0.6',
    width: '100%',
    borderTopRightRadius: '16@ms0.3',
    borderTopLeftRadius: '16@ms0.3',
    resizeMode: 'cover',
  },
  logoImage: {
    height: '24@ms0.6',
    width: '28.33%',
    resizeMode: 'contain',
  },
  liveTxt: {
    fontSize: '24@ms0.3',
    color: Colors.white,
    fontStyle: 'italic',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: '20@ms0.3',
    marginTop: '16@ms0.3',
    lineHeight: '31@ms0.3',
  },
  matchNameTxt: {
    fontSize: '23@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontWeight: '800',
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: '20@ms0.3',
    marginTop: '8@ms0.3',
    lineHeight: '33@ms0.3',
    maxWidth: '85%',
  },
  crossImage: {
    position: 'absolute',
    right: -10,
    zIndex: 999,
    top: -10,
  },
  logoContainer: {
    flexDirection: 'row',
    marginVertical: '20@ms0.3',
    alignSelf: 'center',
  },
  greenButtonContainer: {
    height: '53@ms0.3',
  },
  greenButtonTxt: {
    fontSize: '17@ms0.3',
    fontWeight: '800',
    fontFamily: Fonts.Regular,
  }
});

export default styles;
