import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from 'src/screens/authScreens/Signup';
import Login from 'src/screens/authScreens/Login';
import ForgotPassword from 'src/screens/authScreens/ForgotPassword';
import WelcomeAccount from 'src/screens/authScreens/WelcomeAccount';
import WelcomeScreen from 'src/screens/authScreens/WelcomeScreen';
import Splash from 'src/screens/authScreens/Splash';
import ResetPassword from 'src/screens/authScreens/ResetPassword';
import Term from 'src/screens/appScreens/Term';

const AuthNavigator = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <AuthNavigator.Navigator
            screenOptions={{
                headerShown: false
            }} >
            <AuthNavigator.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <AuthNavigator.Screen name="Login" component={Login} />
            <AuthNavigator.Screen name="Signup" component={Signup} />
            <AuthNavigator.Screen name="ForgotPassword" component={ForgotPassword} />
            <AuthNavigator.Screen name="ResetPassword" component={ResetPassword} />
            <AuthNavigator.Screen name="WelcomeAccount" component={WelcomeAccount} />
            <AuthNavigator.Screen name="Term" component={Term} />
        </AuthNavigator.Navigator>
    );
}

export default AuthNavigation;