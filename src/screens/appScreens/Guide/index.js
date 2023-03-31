import React from 'react';
import { ImageBackground, Text, View, Image } from 'react-native';
import styles from './styles';
import { Images, Colors, Fonts } from 'src/utils';
import AppHeader from 'src/components/AppHeader'




export default function Guide() {
    return (
        <ImageBackground source={Images.Background2}
            resizeMode="cover"
            style={styles.container}>
            <AppHeader centerImage={Images.Logo} />
            <View style={{ flex: 1, marginHorizontal: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 10 }}>
                    <View style={{ flex: 1, backgroundColor: "red", alignItems: "center", paddingVertical: 12, }}>
                        <Image source={Images.Search} style={{ height: 20, width: 20 }} resizeMode={"contain"} />
                        <Text style={{ marginTop: 5 }}>ALL</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "green", alignItems: "center", paddingVertical: 12, }}>
                        <Image source={Images.Search} style={{ height: 20, width: 20 }} resizeMode={"contain"} />

                        <Text>PRO</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "red", alignItems: "center", paddingVertical: 12 }}>
                        <Image source={Images.Search} style={{ height: 20, width: 20 }} resizeMode={"contain"} />

                        <Text>Helo</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "green", alignItems: "center", paddingVertical: 12 }}>
                        <Image source={Images.Search} style={{ height: 20, width: 20 }} resizeMode={"contain"} />

                        <Text>Helo</Text>
                    </View>
                </View>
            </View>



        </ImageBackground>
    );
}