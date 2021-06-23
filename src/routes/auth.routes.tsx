import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from '../global/styles/theme';

import { Home } from '../Screens/Home';
import { SignIn } from '../Screens/SignIn';
import { AppointmentDetails } from '../Screens/AppointmentDetails';
import { AppointmentCreate } from '../Screens/AppointmentCreate';

const { Navigator, Screen } = createStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator
      headerMode='none'
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.secondary100
        }
      }}
    >
      <Screen name='SignIn' component={SignIn} />
      <Screen name='Home' component={Home} />
      <Screen name='AppointmentDetails' component={AppointmentDetails} />
      <Screen name='AppointmentCreate' component={AppointmentCreate} />
    </Navigator>
  );
}