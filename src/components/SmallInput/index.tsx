import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { styles } from './styles';

type SmallInputProps = {
  pickerType: 'date' | 'time',
  state: Date,
  setState: (value: Date) => void,
};

export const SmallInput = ({ state, setState, pickerType }: SmallInputProps) => {
  const [showPicker, setShowPicker] = useState(false)
  const [date, setDate] = useState(new Date())

  function selectNewDate(event: Event, value: Date | undefined) {
    setShowPicker(false);
    !value ? setDate(date) : setDate(value);
    setState(value as Date)
  }

  function handleShowPicker() {
    setShowPicker(true)

  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleShowPicker}
      activeOpacity={1}
    >
      <View style={styles.content}>
        <Text style={styles.contentText}>{pickerType === 'time' ? date.getHours() : date.getDate()}</Text>
      </View>
      <View style={styles.contentDivider}>
        <Text style={styles.divider}>/</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>{pickerType === 'time' ? date.getMinutes() : date.getMonth() + 1}</Text>
      </View>
      {
        showPicker &&
        <DateTimePicker
          value={date}
          style={styles.container}
          mode={pickerType}
          display='spinner'
          onChange={selectNewDate}
        />
      }
    </TouchableOpacity>
  );
}
