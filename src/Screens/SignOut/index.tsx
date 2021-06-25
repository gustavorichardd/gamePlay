import React from 'react';
import { View, Text, Alert } from 'react-native';
import { SmallButton } from '../../components/SmallButton';
import { theme } from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

export const SignOut = () => {
  const { user, signOut } = useAuth();
  const { primary, secondary30 } = theme.colors

  async function handleSignOut() {
    // await signOut();
    console.log('asd')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Deseja Sair do Game<Text style={styles.textPlay}>Play</Text>?</Text>

      <View style={styles.buttons}>
        <SmallButton title='Não' color={secondary30} onPress={handleSignOut} />

        <SmallButton title='Sim' color={primary} onPress={handleSignOut} />
      </View>
    </View>
  );
}