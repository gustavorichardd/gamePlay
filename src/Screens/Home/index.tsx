import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { RectButton } from 'react-native-gesture-handler';

import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Profile } from '../../components/Profile';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { SignOut } from '../SignOut';

import { Background } from '../../components/Background';

import { styles } from './styles';
import { ModalViewSignOut } from '../../components/ModalViewSignOut';

export const Home = () => {
  const [category, setCategory] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {

    navigation.navigate('AppointmentDetails', { guildSelected })

  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const storage: AppointmentProps[] = response ? JSON.parse(response) : []

    if (category) {
      setAppointments(storage.filter(item => item.category === category))
    } else {
      setAppointments(storage)
    }

    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]));

  function handleOpenSignOutModal() {
    setShowSignOutModal(true);
  }
  function handleCloseSignOutModal() {
    setShowSignOutModal(false)
  }

  return (
    <Background>
      <View style={styles.header}>
        <RectButton onPress={handleOpenSignOutModal}>
          <Profile />
        </RectButton>
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {
        loading ? <Load /> :
          <>
            <ListHeader title='Partidas agendadas' subtitle={`total ${appointments.length}`} />
            <FlatList
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Appointment data={item}
                  onPress={() => handleAppointmentDetails(item)}
                />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              contentContainerStyle={{ paddingBottom: 69 }}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
            />
          </>
      }

      <ModalViewSignOut visible={showSignOutModal} closeModal={handleCloseSignOutModal}>
        <SignOut />
      </ModalViewSignOut>
    </Background>
  );
}

