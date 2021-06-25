import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { Header } from '../../components/Header';
import { ModalView } from '../../components/ModalView';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { Background } from '../../components/Background';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export const AppointmentCreate = () => {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false)
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  function handleOpenGuildsModal() {
    setOpenGuildsModal(true)
  }

  function handleCloseGuildsModal() {
    setOpenGuildsModal(false)
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setOpenGuildsModal(false)
    setGuild(guildSelect)
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    };
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify([...appointments, newAppointment]));

    navigation.navigate('Home')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Background>
        <ScrollView>
          <Header title='Agendar Partida' />

          <Text style={[styles.label, {
            marginLeft: 24, marginTop: 36, marginBottom: 18
          }]}> Categoria </Text>

          <CategorySelect
            hasCheckbox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton
              onPress={handleOpenGuildsModal}
            >
              <View style={styles.select}>
                {
                  guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> : <View style={styles.image} />

                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>{guild.name ? guild.name : 'Selecione um servidor'}</Text>
                </View>

                <Feather name='chevron-right' color={theme.colors.heading} size={18} />
              </View>
            </RectButton>

            <View style={styles.field}>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>Dia e mês</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setDay} value={day} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} onChangeText={setMonth} value={month} />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>Hora e minuto</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setHour} value={hour} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} onChangeText={setMinute} value={minute} />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>

              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caracterLimit}>Max 100 caracteres</Text>
            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
              value={description}
            />


            <View style={styles.footer}>
              <Button title='Agendar' onPress={handleSave} />
            </View>
          </View>

        </ScrollView>
      </Background>

      <ModalView visible={openGuildsModal} closeModal={handleCloseGuildsModal} >
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}

