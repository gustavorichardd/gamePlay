import React from 'react';
import { Text, View, FlatList } from 'react-native';

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
}

export const Guilds = ({ handleGuildSelect }: Props) => {
  const guilds = [
    {
      id: '1',
      name: 'Chamberlaus',
      icon: 'image.png',
      owner: true
    },
    {
      id: '2',
      name: 'Ticatica',
      icon: null,
      owner: false
    },
    {
      id: '3',
      name: 'RocketSeat',
      icon: null,
      owner: false
    },
    {
      id: '4',
      name: 'Algum nome',
      icon: null,
      owner: false
    },
    {
      id: '5',
      name: 'Que seja diferente',
      icon: null,
      owner: false
    }
  ]
  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        ListHeaderComponent={() => <ListDivider isCentered />}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
      />
    </View>
  );
}

