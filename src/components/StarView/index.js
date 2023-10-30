import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { Colors, Images } from 'src/utils';

const StarView = props => {
  return (
    <View style={styles.starView}>
      <Image
        source={props?.isFavorite ? Images.FilledFvrt : Images.Favorite}
        style={[styles.fvrtIcon, props?.isFavorite ? { tintColor: Colors.darkOrange } : {}]}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default StarView;
