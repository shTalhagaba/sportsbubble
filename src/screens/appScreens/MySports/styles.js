import {Colors, Fonts} from 'src/utils';
import {ScaledSheet} from 'react-native-size-matters';
import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  listContiner: {
    marginVertical: '8@ms0.3',
    paddingVertical: '5@ms0.3',
    borderRadius: '16@ms0.3',
    backgroundColor: '#2B3B50',
    marginHorizontal: '20@ms0.3',
    paddingHorizontal: '4@ms0.3',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mangeFvrtContainer: {
    paddingVertical: '16@ms0.3',
  },
  imageIcon: {
    height: '48@ms0.3',
    width: '48@ms0.3',
  },
  userNameContainer: {
    paddingStart: '13@ms0.3',
    justifyContent: 'center',
    flex: 1,
  },
  mangeFavTxt: {
    fontSize: '22@ms0.3',
    fontWeight: '800',
    lineHeight: '25@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    textAlign: 'center',
  },
  titleTxt: {
    fontSize: '16@ms0.3',
    fontWeight: '800',
    lineHeight: '25@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.mediumBlue,
    height: '120@ms0.3',
  },
  sliderInnerContainer: {
    flex: 1,
    marginHorizontal: '5@ms0.3',
    marginVertical: 5,
  },
  sliderImageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fvrtIcon: {
    height: '24@ms0.3',
    width: '21@ms0.3',
    marginRight: '20@ms0.3',
  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.mediumBlue,
    height: '120@ms0.3',
  },
  sliderInnerContainer: {
    // flex: 1,
    marginHorizontal: '3@ms0.3',
    marginVertical: '5@ms0.3',
    justifyContent: 'center',
  },
  sliderImageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex:999
  },
  sliderInnerMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '2@ms0.3',
    borderColor: '#004EBC',
    height: '90@ms0.3',
    borderRadius: '22@ms0.3',
    width: width / 4 - 12,
    overflow: 'visible',
  },
  sliderIcon: {
    height: '35@ms0.3',
    width: '35@ms0.3',
    paddingVertical: '12@ms0.3',
    tintColor: Colors.white,
  },
  sliderTxt: {
    fontSize: '16@ms0.3',
    fontWeight: '900',
    lineHeight: '24@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Bold,
    fontStyle: 'italic',
    elevation: 3,
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 8,
    textShadowColor: Colors.black,
    marginTop: '6@ms0.3',
  },
  rectangle2: {
    position: 'absolute',
    left: Platform.OS === 'android' ? -4 : -4,
    top: -4,
    height: '94@ms0.3',
    width: width / 4 - 8,
    borderRadius: '22@ms0.3',
    borderWidth: 2,
    borderColor: '#004EBC',
    opacity: 0.5,
  },
  headerTxtStyle: {
    fontSize: '22@ms0.3',
  },
  dexTxtStyle: {
    fontSize: '24@ms0.3',
    fontWeight: '400',
  },
});
