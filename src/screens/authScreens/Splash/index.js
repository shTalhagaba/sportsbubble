import React, { useRef, useState } from 'react';
import { ImageBackground, StatusBar, TouchableOpacity, View, Image, Text } from 'react-native';
import styles from './styles';
import AppHeader from 'src/components/AppHeader'
import { Images, Colors, Fonts } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';


export default function Splash() {
    const dispatch = useDispatch();
    const navigation = useNavigation()

    return (

        <View style={styles.container}>
            <ImageBackground source={Images.SplahBackTop} style={{ height: 400, }} resizeMode={"cover"}>
                <StatusBar backgroundColor={Colors.transparent} translucent />

            </ImageBackground>
            <View style={{ flex: 1, alignSelf: "center", position: "absolute", justifyContent: "center", alignItems: "center" }}>

                <Image source={Images.LogoText} style={{ height: 200, width: 200, alignSelf: "center" }} resizeMode={"contain"} />
            </View>


        </View>

    );
}
