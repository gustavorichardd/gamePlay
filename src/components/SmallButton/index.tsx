import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { Text } from 'react-native';

import { styles } from './styles';

type Props = RectButtonProps & {
  title: string,
  color?: string
}

export const SmallButton = ({ color, title, ...rest }: Props,) => {
  return (
    <RectButton style={[styles.container, { backgroundColor: color }]} {...rest} >
      <Text style={styles.title}>
        {title}
      </Text>
    </RectButton>
  );
}