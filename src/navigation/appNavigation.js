import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connect from 'src/screens/appScreens/Connect';

const AppNavigator = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <AppNavigator.Navigator
            screenOptions={{
                headerShown: false
            }} >
            {/* <AppNavigator.Screen name="Connect" component={Connect} /> */}
        </AppNavigator.Navigator>
    );
}

export default AppNavigation;