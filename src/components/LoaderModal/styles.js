import { Colors } from 'src/utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black50
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center'
    },
    loadingText: {
        backgroundColor: Colors.loadingColor,
        height: 35,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        top: 40
    }
})
export default styles
