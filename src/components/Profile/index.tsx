import React from 'react';
import { Text, View, Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { Avatar } from '../Avatar';

import { styles } from './styles';

import { messages } from '../../utils/messages';


export const Profile = ({ ...rest }: RectButtonProps) => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Avatar urlImage={user.avatar} />
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>

          <Text style={styles.username}>
            {user.firstName}
          </Text>
        </View>

        <Text style={styles.message}>{messages[Math.floor(Math.random() * messages.length)]}</Text>
      </View>
    </View>
  );
}

