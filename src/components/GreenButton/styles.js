import { Colors, Fonts } from 'src/utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.mediumGreen,
        paddingStart: 10,
        marginTop: 10,
        borderRadius: 15,
        height: 55,
        width: 280,
        alignSelf:'center'
    },
    innerContainer: {
        height: 30,
        flex: 1,
        flexDirection: "row",
        borderRadius: 12,
        alignSelf:'center',
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
        fontFamily: Fonts.Regular,
        fontSize: 17,
        fontWeight: "700",
        lineHeight: 22,
        color: Colors.white,
        alignSelf:'center',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    iconContainer: {
        justifyContent: "center",
    },
    eyeIcon: {
        height: 28,
        width: 28,
        // tintColor: Colors.white,
        marginLeft: 12
    },
})

export default styles