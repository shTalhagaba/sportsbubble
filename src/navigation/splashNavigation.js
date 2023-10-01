import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from 'src/screens/authScreens/Splash';

const AppNavigator = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <AppNavigator.Navigator
            screenOptions={{
                headerShown: false
            }} >
            <AppNavigator.Screen name="Splash" component={Splash} />
        </AppNavigator.Navigator>
    );
}

export default AppNavigation;