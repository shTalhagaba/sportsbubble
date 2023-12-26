import React, { useRef } from 'react';
import { View, Modal, Image, FlatList, StatusBar } from 'react-native';
import styles from './styles';
import { Colors, Images } from 'src/utils';
import { TouchableWithoutFeedback } from 'react-native';

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
const Tooltip = (props) => {
    const listRef = useRef(null);
    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.renderItemContainer}>
                {item?.TooltipImage && <Image source={item?.TooltipImage} style={styles.tooltipImage} resizeMode={"contain"} />}
            </View>
        )
    }
    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
    }

    return (
        <Modal transparent={true} visible={props.visible}>
            <StatusBar
                backgroundColor={Colors.transparent}
                translucent
                barStyle="light-content"
            />
            <View style={{ backgroundColor: "#17202c" }}>
                <TouchableWithoutFeedback onPress={props.closePress}>
                    <Image source={Images.TooltipClose} style={{ height: 36, width: 36, marginVertical: 10, alignSelf: "flex-end", marginRight: 29 }} />
                </TouchableWithoutFeedback>
                <FlatList
                    scrollEnabled={true}
                    pagingEnabled={true}
                    ref={listRef}
                    horizontal
                    data={DATA}
                    keyExtractor={(item, index) => `${item.id}_${index}`}
                    scrollEventThrottl={1900}
                    onMomentumScrollEnd={(e) => onScrollEnd(e)}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </Modal>
    );
};
export default Tooltip;

