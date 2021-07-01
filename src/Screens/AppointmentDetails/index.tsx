import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, FlatList, Alert, Share, Platform } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import * as Linking from 'expo-linking'

import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon'
import { Load } from '../../components/Load';
import { ModalViewOptions } from '../../components/ModalViewOptions';
import { Options } from '../../components/Options';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import BannerImg from '../../assets/banner.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidgetProps = {
  id: string,
  name: string,
  instant_invite: string;
  members: MemberProps[];
  presence_count: number
}

export const AppointmentDetails = () => {
  const route = useRoute();
  const { guildSelected } = route.params as Params;
  const navigation = useNavigation();
  const [showOptionsModal, setShowOptionsModal] = useState(false)

  const [widget, setWidget] = useState<GuildWidgetProps>({} as GuildWidgetProps)
  const [loading, setLoading] = useState(true)

  async function fecthGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
      setLoading(false);
    } catch (err) {
      Alert.alert('Ops!', 'Problemas ao conectar. O Widget pode estar desabilitado. Deseja remover o agendamento?', [
        {
          text: 'Sim!',
          onPress: () => handleRemove()
        },
        {
          text: 'Não',
          onPress: () => { }
        }
      ]);
      setWidget({
        id: '',
        name: '',
        instant_invite: '',
        members: [],
        presence_count: 0
      })
      setLoading(false);
    }
  }

  useEffect(() => {
    fecthGuildWidget();
  }, [])

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite
    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  async function handleRemove() {
    try {
      const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
      const appointments = storage ? JSON.parse(storage) : [];
      const newAppointments = appointments.filter((item: AppointmentProps) => item.id != guildSelected.id)
      await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify(newAppointments));
    } catch (err) {
      console.log('Erro ao remover item do storage:', err)
    } finally {
      navigation.navigate('Home')
    }
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite)
  }

  function handleOpenOptionsModal() {
    setShowOptionsModal(true)
  }


  function handleCloseOptionsModal() {
    setShowOptionsModal(false)
  }


  return (
    <Background>
      <Header title='Detalhes'
        action={
          <BorderlessButton onPress={handleOpenOptionsModal} >
            <SimpleLineIcons name='options-vertical' size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>

        </View>
      </ImageBackground>

      {
        loading ? <Load /> :
          <>
            <ListHeader title='Jogadores' subtitle={`Total ${widget.members.length}`} />

            <FlatList
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />
          </>
      }


      {
        guildSelected.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon title='Entrar na partida' onPress={handleOpenGuild} />
        </View>
      }

      <ModalViewOptions visible={showOptionsModal} closeModal={handleCloseOptionsModal}>
        <Options data={widget} idAppointment={guildSelected.id} />
      </ModalViewOptions>
    </Background>
  );
}

