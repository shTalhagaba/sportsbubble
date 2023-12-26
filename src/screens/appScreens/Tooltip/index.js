import React, { useRef, useState } from 'react';
import { View, Image, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles';
import { Images } from 'src/utils';
import { TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import {
    setTooltipStatus
} from 'src/store/types';

const DATA = [
    {
        id: 1,
        TooltipImage: Images.TooltipOne,
    },
    {
        id: 2,
        TooltipImage: Images.TooltipTwo,
    },
    {
        id: 3,
        TooltipImage: Images.TooltipThree,
    },
    {
        id: 4,
        TooltipImage: Images.TooltipFour,
    },
    {
        id: 5,
        TooltipImage: Images.TooltipFive,
    },
    {
        id: 6,
        TooltipImage: Images.TooltipSix,
    },
    {
        id: 6,
        TooltipImage: Images.TooltipSeven,
    },
]
const Tooltip = () => {
    const listRef = useRef(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [indicator, setIndicator] = useState(0)
    const [totalIndicators, setTotalIndicators] = useState(7)

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View key={index} style={styles.renderItemContainer}>
                    {item?.TooltipImage && <Image source={item?.TooltipImage} style={[styles.tooltipImage,
                    index === 6 ? { height: Platform.OS === "ios" ? Dimensions.get('screen').height - 25 : Dimensions.get('screen').height - 90, } : {},
                    index === 4 ? { height: Platform.OS === 'ios' ? Dimensions.get('screen').height - 25 : Dimensions.get('screen').height - 90, marginTop: Platform.OS === 'ios' ? 0 : 50 } : {},
                    index === 3 ? { zIndex: 999, } : {},
                    index === 2 ? { marginTop: Platform.OS === "android" ? 40 : 0 } : {}
                    ]}
                        resizeMode={"contain"} />}
                </View>
                <View style={{
                    position: "absolute", bottom: 112,
                    // position: "absolute", bottom: index === 0 ? 168 :
                    //     index === 6 ?
                    //         128 :
                    //         index === 5 ?
                    //             138 : 75,
                    flexDirection: "row", alignItems: "center",
                }}>
                    <TouchableWithoutFeedback onPress={() => handleBackIndicator()}>
                        <Image source={Images.LeftArrow} style={{ height: 16, width: 14, marginRight: 6 }} />
                    </TouchableWithoutFeedback>
                    <Image source={index === 0 ?
                        Images.SliderOne :
                        index === 1 ?
                            Images.SliderTwo : index === 2 ?
                                Images.SliderThree : index === 3 ?
                                    Images.SliderFour : index === 4 ?
                                        Images.SliderFive : index === 5 ?
                                            Images.SliderSix : index === 6 ?
                                                Images.SliderSeven : null
                    } style={{ height: 40, width: 152, }} resizeMode={"contain"} />
                    <TouchableWithoutFeedback onPress={() => handleNextIndicator()}>
                        <Image source={Images.RightSlider} style={{ height: 16, width: 14, marginLeft: 6 }} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setIndicator(pageNum)
    }
    const handleNextIndicator = () => {
        const nextIndicator = indicator + 1;
        if (nextIndicator < totalIndicators) {
            setIndicator(nextIndicator);
            listRef.current.scrollToIndex({
                animated: true,
                index: nextIndicator,
                viewPosition: 0.5, // Set viewPosition to 0.5 to center the item
            });
        } else {
            handleClose()
            console.log("Reached the last indicator");
        }
    };
    const handleBackIndicator = () => {
        const previousIndicator = indicator - 1;
        if (previousIndicator >= 0) {
            setIndicator(previousIndicator);
            listRef.current.scrollToIndex({
                animated: true,
                index: previousIndicator,
                viewPosition: 0.5,
            });
        } else {
            console.log("Reached the first indicator");
        }
    };
    const handleClose = () => {
        dispatch(setTooltipStatus(false))
        navigation.replace("Root")
    }

    return (
        <View style={{ backgroundColor: "#3F5B80", flex: 1, zIndex: 0 }}>
            <SafeAreaView style={{ backgroundColor: "rgba(13, 19, 26, 0.8)", flex: 1, zIndex: 0 }}>
                <StatusBar backgroundColor={"rgba(13, 19, 26, 0.8)"} barStyle="light-content" />
                <TouchableOpacity onPress={handleClose} style={{ position: 'absolute', right: 20, top: Platform.OS === "ios" ? 60 : 20, zIndex: 999 }}>
                    <Image source={Images.TooltipClose} style={{ height: 36, width: 36, marginTop: 1 }} />
                </TouchableOpacity>
                <FlatList
                    scrollEnabled={true}
                    pagingEnabled={true}
                    ref={listRef}
                    horizontal
                    data={DATA}
                    keyExtractor={(item, index) => `${item.id}_${index}`}
                    scrollEventThrottle={1900}
                    onMomentumScrollEnd={(e) => onScrollEnd(e)}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>
        </View>
    );
};
export default Tooltip;

