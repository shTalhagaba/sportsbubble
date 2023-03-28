import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from 'src/screens/authScreens/Signup';

const AuthNavigator = createNativeStackNavigator();

const authNavigation = () => {
    return (
        <AuthNavigator.Navigator
            screenOptions={{
                headerShown: false
            }} >
            <AuthNavigator.Screen name="Signup" component={Signup} />
        </AuthNavigator.Navigator>
    );
}

export default authNavigation;