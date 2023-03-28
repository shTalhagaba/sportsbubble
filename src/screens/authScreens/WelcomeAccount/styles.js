import { StyleSheet } from 'react-native';
import { Colors } from 'src/utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    signupTxt: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white
    },
    accountTxt: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        color: Colors.white,
        marginTop: 25,
        letterSpacing: 0.5
    },
    sideTxt: {
        fontSize: 13,
        color: Colors.greyText,
        marginTop: 5,
    },
});
