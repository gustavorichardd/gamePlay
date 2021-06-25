import React from 'react';
import { Text, Image, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import DiscordSvg from '../../assets/discord.svg'
import { styles } from './styles';

const { CDN_IMAGE } = process.env

type Props = {
  guildId: string,
  iconId: string | null;
}

export const GuildIcon = ({ guildId, iconId }: Props) => {
  // const uri = 'https://logodownload.org/wp-content/uploads/2017/11/discord-logo-5.png'
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`

  return (
    <View>
      {
        iconId ?
          <Image
            source={{ uri }}
            style={styles.image}
            resizeMode='cover'
          />
          : <DiscordSvg width={40} height={40} />
      }
    </View>

  );
}

