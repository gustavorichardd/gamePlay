import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from '../global/styles/theme';

import { Home } from '../Screens/Home';
import { AppointmentDetails } from '../Screens/AppointmentDetails';
import { AppointmentCreate } from '../Screens/AppointmentCreate';

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator
      headerMode='none'
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.secondary100
        }
      }}
    >
      <Screen name='Home' component={Home} />
      <Screen name='AppointmentDetails' component={AppointmentDetails} />
      <Screen name='AppointmentCreate' component={AppointmentCreate} />
    </Navigator>
  );
}