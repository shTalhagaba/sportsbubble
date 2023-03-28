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
    signupTxt: {
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.greenText,
        marginVertical: 5
    },
    forgotTxt: {
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
        color: Colors.white,
        marginVertical: 30
    },
    accountTxt: {
        fontSize: 14,
        textAlign: "center",
        color: Colors.white,
        marginVertical: 30
    }
});
