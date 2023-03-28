import { Colors, Fonts } from 'src/utils'
import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.buttonGreen,
        marginTop: 20,
        marginHorizontal: 5,
        borderRadius: 15,
        height: 55,
    },
    innerContainer: {
        height: 30,
        flex: 1,
        flexDirection: "row",
        borderRadius: 12,
    },
    txt: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white,
        alignSelf:'center',
        justifyContent:'center',
        alignContent:'center',
        alignItems:"center",
        width:'100%'
    }

})

export default styles