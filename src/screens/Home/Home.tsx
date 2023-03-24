import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../common/colors/Colors';
import styles from './styles';

export interface NavigationProps {
  navigation: any;
  route?: any;
}

export default function Home(props: NavigationProps) {
  const {navigation} = props;
const user = useSelector((state:any) => state.user);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>This is Home Screen</Text>
        <Text>{user.email}</Text>
      </ScrollView>
    </View>
  );
}
