import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';



export default function Home() {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("User => ", user)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ color: "black" }}>This is Home Screen</Text>
        <Text style={{ color: "black" }}>{user.email}</Text>
      </ScrollView>
    </View>
  );
}
