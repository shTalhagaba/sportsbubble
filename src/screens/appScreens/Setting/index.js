import React from 'react';
import { ImageBackground } from 'react-native';
import styles from './styles';
import { Images, Colors, Fonts } from 'src/utils';




export default function Setting() {
    return (
        <ImageBackground source={Images.Background2}
            resizeMode="cover"
            style={styles.container}>

        </ImageBackground>
    );
}