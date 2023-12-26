import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  loginTxt: {
    fontSize: '20@ms0.3',
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
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
  versionTxt: {
    fontSize: '18@ms0.3',
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontStyle: 'italic',
  },
  sbContainer: {
    height: '25%',
    alignItems: 'center',
  },
  mainTabContainer: {
    marginHorizontal: '20@ms0.3',
    flex: 1,
  },
  btnContainer: {
    marginTop: '24@ms0.3',
  },
  contentTxt: {
    color: Colors.white,
    marginVertical: '2@ms0.3',
  },
  contentTxtTop: {
    color: Colors.white,
    marginTop: '15@ms0.3',
  },
  contentTxtBulltetTop: {
    color: Colors.white,
    marginTop: '10@ms0.3',
  },
  tableContainer: {
    borderWidth: '1@ms0.3',
    borderColor: 'white',
    marginVertical: '10@ms0.3',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    borderWidth: '1@ms0.3',
    borderColor: 'white',
    padding: '8@ms0.3',
    flex: 1,
  },
  unorderedListContainer: {
    marginLeft: '10@ms0.3',
  },
  listItemContainer: {
    alignItems: 'flex-start',
    marginBottom: '5@ms0.3',
  },
  bullet: {
    fontSize: '20@ms0.3',
    color: 'white',
    lineHeight: '20@ms0.3',
  },
  listItemContentContainer: {
    flex: 1,
  },
});
