import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = {
  title: string,
  action?: ReactNode
}

export const Header = ({ title, action }: Props) => {
  const { heading, secondary100, secondary40 } = theme.colors
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <LinearGradient colors={[secondary100, secondary40]} style={styles.container} >
      <BorderlessButton
        onPress={handleGoBack}
      >
        <Feather name='arrow-left' size={24} color={heading} />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {
        action &&
        <View>{action}</View>
      }
    </LinearGradient>
  );
}

