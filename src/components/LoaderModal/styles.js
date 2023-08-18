import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
        // backgroundColor: 'rgba(255, 255, 255, 0.13)'
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center'
    },
    loadingText: {
        backgroundColor: '#1A0167',
        height: 35,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        top: 40

    }
})
export default styles