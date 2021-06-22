import React from 'react';
import { Text, Image } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles';


export const GuildIcon = () => {
  const uri = 'https://logodownload.org/wp-content/uploads/2017/11/discord-logo-5.png'

  return (
    <Image
      source={{ uri }}
      style={styles.image}
      resizeMode='cover'
    />
  );
}

