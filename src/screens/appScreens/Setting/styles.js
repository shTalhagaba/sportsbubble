import { StyleSheet } from 'react-native';
import { Colors } from 'src/utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    loginTxt: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white
    },
    leftArrowIcon: {
        width: 45,
        height: 45,
        resizeMode: "cover",
    },
    powerImage: {
        width: 165,
        height: 75,
        resizeMode: "cover",
        tintColor: Colors.white
    },
    versionTxt: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white
    },
    sbContainer: {
        height: '25%', 
        alignItems: 'center'
    },
    mainTabContainer: {
        marginHorizontal: 20, 
        flex: 1 
    }
});
