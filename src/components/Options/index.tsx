import React, { useEffect, useState } from 'react';
import { View, Platform, Share, TouchableOpacity, Alert } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { AppointmentProps } from '../Appointment';
import { MemberProps } from '../Member';

import { styles } from './styles'
import { theme } from '../../global/styles/theme';


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

type OptionsProps = {
  data: GuildWidgetProps;
}

export const Options = ({ data }: OptionsProps) => {
  const navigation = useNavigation()

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${data.name}`
      : data.instant_invite
    Share.share({
      message,
      url: data.instant_invite
    });
    navigation.navigate('Home')

  }


  async function handleRemove() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    console.log('@@@@@@@@@@')
    console.log(storage)
    console.log('##########')
    console.log(data)
    console.log(data)
    console.log('@@@@@@@@@@')
    // navigation.navigate('Home')
  }



  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={handleShareInvitation} >
        <Fontisto name='share' size={24} color={theme.colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRemove} >
        <Fontisto name='trash' size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
}