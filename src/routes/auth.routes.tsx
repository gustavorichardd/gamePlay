import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../Screens/Home';
import { SignIn } from '../Screens/SignIn';

const { Navigator, Screen } = createStackNavigator();
import { theme } from '../global/styles/theme';

export const AuthRoutes = () => {
  return (
    <Navigator
      headerMode='none'
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent'
        }
      }}
    >
      <Screen name='SignIn' component={SignIn} />
      <Screen name='Home' component={Home} />
    </Navigator>
  );
}

