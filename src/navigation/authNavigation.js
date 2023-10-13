import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from 'src/screens/authScreens/Signup';
import Login from 'src/screens/authScreens/Login';
import ForgotPassword from 'src/screens/authScreens/ForgotPassword';
import WelcomeAccount from 'src/screens/authScreens/WelcomeAccount';
import WelcomeScreen from 'src/screens/authScreens/WelcomeScreen';
import ResetPassword from 'src/screens/authScreens/ResetPassword';
import Term from 'src/screens/appScreens/Term';
import { setUserVerifiedFlag, setUserEmail } from 'src/store/types';
import { useDispatch, useSelector } from 'react-redux';

const AuthNavigator = createNativeStackNavigator();

const AuthNavigation = () => {
    const dispatch = useDispatch();

    const [appState, setAppState] = useState(AppState.currentState);
    const reduxData = useSelector(state => state.user);
    const memoizedReduxData = React.useMemo(() => reduxData, [reduxData]);


    const initialRouteName = memoizedReduxData?.userVerified === null
        ? "WelcomeScreen"
        : memoizedReduxData?.userVerified === false
            ? "Signup"
            : "WelcomeScreen";
    console.log("initialRouteName =>", initialRouteName)
    console.log("memoizedReduxData?.userVerified =>", memoizedReduxData?.userVerified)


    return (
        <AuthNavigator.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{
                headerShown: false
            }}
        >
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
