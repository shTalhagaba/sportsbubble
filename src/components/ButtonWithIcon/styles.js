import { Colors, Fonts } from 'src/utils'
import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.blueGrey,
        paddingStart: 10,
        marginTop: 20,
        borderRadius: 15,
        height: 55,
    },
    innerContainer: {
        height: 30,
        flex: 1,
        flexDirection: "row",
        borderRadius: 12


    },
    headingTxt: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 24,
        color: Colors.blackGrey,
        fontFamily: Fonts.Regular,
    },
    inputContainer: {
        borderRadius: 38,
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        borderColor: Colors.lightGrey,
        borderWidth: 1,
    },
    inputField: {
        flex: 1,
        fontFamily: Fonts.Regular,
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 21,
        padding: 8,
        color: Colors.white,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
    iconContainer: {
        justifyContent: "center",

    },
    eyeIcon: {
        height: 16,
        width: 16,
        marginRight: 17,
        // tintColor: Colors.white,
    },







})

export default styles