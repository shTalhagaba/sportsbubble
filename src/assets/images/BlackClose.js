import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BlackClose = () => {
  return (
    <View style={styles.container}>
      <Svg width={32} height={32} viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M13.0554 0.5C6.13885 0.5 0.588623 6.11707 0.588623 13C0.588623 19.9311 6.14012 25.5 13.0554 25.5C19.9226 25.5 25.5221 19.9324 25.5221 13C25.5221 6.11579 19.9239 0.5 13.0554 0.5Z" fill="#161F2A" stroke="white" />
        <Path d="M8.82455 17.2426C8.43511 16.8521 8.43511 16.2189 8.82455 15.8284L15.876 8.75736C16.2655 8.36683 16.8969 8.36683 17.2863 8.75736C17.6758 9.14788 17.6758 9.78104 17.2863 10.1716L10.2348 17.2426C9.84541 17.6332 9.214 17.6332 8.82455 17.2426Z" fill="white" />
        <Path d="M17.2863 17.2426C16.8969 17.6332 16.2655 17.6332 15.876 17.2426L8.82455 10.1716C8.43511 9.78104 8.43511 9.14788 8.82455 8.75736C9.214 8.36683 9.84541 8.36683 10.2348 8.75736L17.2863 15.8284C17.6758 16.2189 17.6758 16.8521 17.2863 17.2426Z" fill="white" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add any styles if needed
  },
});

export default BlackClose;
