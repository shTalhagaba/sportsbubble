import { View, Text, Image } from "react-native";
import React from "react";
import { Fonts, Colors } from "src/utils";
const toastConfig = {
  message: ({ props }) => (
    <View
      style={{
        height: 40,
        width: "auto",
        // backgroundColor: "rgba(0,0,0,0.5)",
        backgroundColor: Colors.blueGrey,
        borderRadius: 30,
        shadowRadius: 2,
        justifyContent: "center",
        paddingHorizontal: 15,
        marginBottom: 40
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Regular,
          fontSize: 14,
          lineHeight: 21,
          color: Colors.white,
          textAlign: "center",
          padding: 0,
        }}
        numberOfLines={1}
      >
        {props.body}
      </Text>
    </View>
  ),
};
export { toastConfig };
