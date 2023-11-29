import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tooltip from 'src/screens/appScreens/Tooltip';

const ToolNavigator = createNativeStackNavigator();

const ToolNavigation = () => {
    return (
        <ToolNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <ToolNavigator.Screen name="Tooltip" component={Tooltip} />
        </ToolNavigator.Navigator>
    );
}

export default ToolNavigation;
