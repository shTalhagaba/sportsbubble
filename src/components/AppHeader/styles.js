import { Dimensions, Platform } from 'react-native';
import { Colors } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';
import DeviceInfo from 'react-native-device-info';
const { fontScale } = Dimensions.get('window');
const DEVICES = [
    'iPhone 4',
    'iPhone 4s',
    'iPhone 5',
    'iPhone 5c',
    'iPhone 5s',
    'iPhone 6',
    'iPhone 6 Plus',
    'iPhone 6s',
    'iPhone 6s Plus',
    'iPhone SE (1st generation)',
    'iPhone 7',
    'iPhone 7 Plus',
    'iPhone 8',
    'iPhone 8 Plus',
    'iPhone X',
    'iPhone XS',
    'iPhone XS Max',
    'iPhone XR',
    'iPhone SE (2nd generation)',
    'iPhone 11',
    'iPhone 11 Pro',
    'iPhone 11 Pro Max',
    'iPhone 12',
    'iPhone 12 mini',
    'iPhone 12 Pro',
    'iPhone 12 Pro Max',
    'iPhone 13',
    'iPhone 13 mini',
    'iPhone 13 Pro',
    'iPhone 13 Pro Max',
    'iPhone 14',
    'iPhone 14 mini',
    'iPhone 14 Pro',
    'iPhone 14 Pro Max',
];

// Your existing DEVICE_STANDARD_HEIGHTS object
const DEVICE_STANDARD_HEIGHTS = {
    'iPhone 4': 480,
    'iPhone 4s': 480,
    'iPhone 5': 568,
    'iPhone 5c': 568,
    'iPhone 5s': 568,
    'iPhone 6': 667,
    'iPhone 6 Plus': 736,
    'iPhone 6s': 667,
    'iPhone 6s Plus': 736,
    'iPhone SE (1st generation)': 568,
    'iPhone 7': 667,
    'iPhone 7 Plus': 736,
    'iPhone 8': 667,
    'iPhone 8 Plus': 736,
    'iPhone X': 812,
    'iPhone XS': 812,
    'iPhone XS Max': 896,
    'iPhone XR': 896,
    'iPhone SE (2nd generation)': 667,
    'iPhone 11': 896,
    'iPhone 11 Pro': 812,
    'iPhone 11 Pro Max': 896,
    'iPhone 12': 844,
    'iPhone 12 mini': 812,
    'iPhone 12 Pro': 844,
    'iPhone 12 Pro Max': 926,
    'iPhone 13': 844,
    'iPhone 13 mini': 812,
    'iPhone 13 Pro': 844,
    'iPhone 13 Pro Max': 926,
    'iPhone 14': 844,
    'iPhone 14 mini': 812,
    'iPhone 14 Pro': 852,
    'iPhone 14 Pro Max': 932
};

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
                    24 * fontScale : "24@ms0.3" : "24@ms0.3",
        height: is_zoomed ? '40@ms0.3' : '24@ms0.3',
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
                        24 * fontScale : '24@ms0.3'
                    : "24@ms0.3",
        width:
            Platform.OS === "ios" ?
                is_zoomed ? '230@ms0.3' : '134@ms0.3' :
                Platform.OS === "android" ?
                    fontScale > 1 ?
                        130 * fontScale : '134@ms0.3' : '134@ms0.3',
    },
    iconContainer: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
