import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from 'src/screens/authScreens/Signup';
import Login from 'src/screens/authScreens/Login';
import ForgotPassword from 'src/screens/authScreens/ForgotPassword';

const AuthNavigator = createNativeStackNavigator();

const authNavigation = () => {
    return (
        <AuthNavigator.Navigator
            screenOptions={{
                headerShown: false
            }} >
            <AuthNavigator.Screen name="Login" component={Login} />
            <AuthNavigator.Screen name="Signup" component={Signup} />
            <AuthNavigator.Screen name="ForgotPassword" component={ForgotPassword} />
        </AuthNavigator.Navigator>
    );
}

export default authNavigation;