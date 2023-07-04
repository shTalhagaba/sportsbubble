import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import AppHeader from 'src/components/AppHeader'
import { Images, Colors } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import Strings from 'src/utils/strings';
import AppSearch from 'src/components/AppSearch';

const data = [
    {
        id: 1,
        img: Images.BaseBall,
        title: 'Baseball',
        selected: true,
    },
    {
        id: 2,
        img: Images.BasketBall,
        title: 'Basketball',
        selected: false,
    },
    {
        id: 3,
        img: Images.BaseBall,
        title: 'Boxing',
        selected: false,
    },
    {
        id: 4,
        img: Images.BasketBall,
        title: 'Baseball',
        selected: false,
    },
    {
        id: 5,
        img: Images.BaseBall,
        title: 'Basketball',
        selected: false,
    },
    {
        id: 6,
        img: Images.BasketBall,
        title: 'Basketball',
        selected: false,
    },
    {
        id: 7,
        img: Images.BaseBall,
        title: 'Boxing',
        selected: false,
    },
    {
        id: 8,
        img: Images.BasketBall,
        title: 'Baseball',
        selected: false,
    },
    {
        id: 9,
        img: Images.BaseBall,
        title: 'Basketball',
        selected: false,
    },
];


export default function SportStreaming() {
    const navigation = useNavigation()

    const [mySportData, setSportData] = useState(data);

    const handleSelectSports = (item, index) => {
        let list = [...mySportData]
        list[index].selected = !list[index].selected
        setSportData(list)
    }

    return (
        <ImageBackground source={Images.Background2}
            resizeMode="cover"
            style={styles.container}>
            <StatusBar backgroundColor={Colors.mediumBlue} />

            <AppHeader
                centerImage={Images.Logo}
                LeftImage={Images.LeftIcon}
                customLeftImage={{ tintColor: Colors.darkOrange }}
                SimpleView />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.headerTxt}>{Strings.sportStreaming}</Text>
                <Text style={styles.desTxt}>{Strings.sportStreamingDes}</Text>
                {/* Search text box */}
                <View style={styles.innerContainer}>

                    <AppSearch
                        searchImage={Images.Search}
                        placeHolderColor={Colors.white}
                        placeHolder={"Search..."}
                        closeImage={Images.Cross} />
                    {/* main list */}
                    <FlatList
                        data={mySportData}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View style={styles.listContiner}>
                                <View style={styles.innerListContainer}>
                                    <Image
                                        source={item?.img}
                                        style={styles.imageIcon}
                                        resizeMode={'contain'} />
                                    <View style={styles.userNameContainer}>
                                        <Text style={styles.titleTxt}>{item?.title}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleSelectSports(item, index)}
                                        style={styles.uncheckBox} >
                                        {item?.selected && <Image source={Images.Tick} style={styles.tickImage} />}
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )}
                    />
                </View>

            </ScrollView>
        </ImageBackground>
    );
}
