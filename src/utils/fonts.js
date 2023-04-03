import { Platform } from 'react-native'
const fonts = {
    Regular: Platform.OS == "ios" ? "AvenirLTStd-Black" : "AvenirLTStd-Black",
    Book: Platform.OS == "ios" ? "AvenirLTStd-Book" : "AvenirLTStd-Book",
    Roman: Platform.OS == "ios" ? "AvenirLTStd-Roman" : "AvenirLTStd-Roman",

}

export default fonts