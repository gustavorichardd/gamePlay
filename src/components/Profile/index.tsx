import React from 'react';
import { Text, View } from 'react-native';

import { Avatar } from '../Avatar';

import { styles } from './styles';

export const Profile = () => {
  return (
    <View style={styles.container}>

      <Avatar urlImage='https://github.com/gustavorichardd.png' />

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>

          <Text style={styles.username}>
            Gustavo Richard
          </Text>
        </View>

        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
    </View>
  );
}

