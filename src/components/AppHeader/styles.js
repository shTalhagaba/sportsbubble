import { Dimensions, Platform } from 'react-native';
import { Colors } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';
import DeviceInfo from 'react-native-device-info';
const { fontScale } = Dimensions.get('window');
import { DEVICE_STANDARD_HEIGHTS, DEVICES } from 'src/utils/devices';


const { height } = Dimensions.get('window');
const device_name = DeviceInfo.getModel();
let is_zoomed = false;
if (DEVICES.includes(device_name)) {
    console.log('is_zoomed : ', DEVICE_STANDARD_HEIGHTS[device_name], height)
    if (DEVICE_STANDARD_HEIGHTS[device_name] > height) {
        // because when display is zoomed height is less than the standard display
        is_zoomed = true;
    }
}

const styles = ScaledSheet.create({
    headerContainer: {
        height: is_zoomed ? '105@ms0.3' : '95@ms0.3',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.transparent,
        paddingTop: Platform.OS === 'ios' ? '35@ms0.3' : '22@ms0.3',
    },
    headerContainer2: {
        height: is_zoomed ? '115@ms0.3' : '105@ms0.3',
    },
    leftArrowIcon: {
        width: Platform.OS === "ios" ?
            is_zoomed ? '40@ms0.3' : '24@ms0.3'
            : Platform.OS === "android" ?
                fontScale > 1 ?
                26 * fontScale : "24@ms0.3" : "24@ms0.3",
        height: is_zoomed ? '40@ms0.3' : Platform.OS === "android" ?
            fontScale > 1 ?
            26 * fontScale : "24@ms0.3" : "24@ms0.3",
        resizeMode: 'cover',
        marginRight: Platform.OS === 'ios' ? '25@ms0.3' : '12@ms0.3',
    },
    rightIcon: {
        width: '20@ms0.3',
        height: '20@ms0.3',
        resizeMode: 'cover',
    },

    headerCenterContainer: {
        flex: 1,
        alignItems: 'center',
    },
    centerImage: {
        height:
            Platform.OS === "ios" ?
                is_zoomed ? '40@ms0.3'
                    : '24@ms0.3'
                : Platform.OS === "android" ?
                    fontScale > 1 ?
                        28 * fontScale : '24@ms0.3'
                    : "24@ms0.3",
        width:
            Platform.OS === "ios" ?
                is_zoomed ? '230@ms0.3' : '134@ms0.3' :
                Platform.OS === "android" ?
                    fontScale > 1 ?
                        134 * fontScale : '134@ms0.3' : '134@ms0.3',
    },
    iconContainer: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
