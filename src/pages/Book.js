import React, { useState } from 'react'
import { AsyncStorage, Alert, SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, DatePickerAndroid } from 'react-native'

import { TextInputMask } from 'react-native-masked-text'

import api from '../services/api'

export default function Book({ navigation }) {
  const [date, setDate] = useState('')
  const id = navigation.getParam('id')

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user')

    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    })

    Alert.alert('Solicitação de reserva enviada.')

    navigation.navigate('List')
  }
  
  function handleCancel() {
    navigation.navigate('List')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Data de Interesse:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Qual data você quer reservar?"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={date}
          onChangeText={setDate}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Solicitar Reserva</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel} style={styles.buttonSecond}>
          <Text style={styles.buttonTextSecond}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    fontSize: 16,
    marginBottom: 8,
    marginHorizontal: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    marginHorizontal: 10,
  },

  button: {
    height: 52,
    backgroundColor: '#7259C1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 10,
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonSecond: {
    height: 42,
    // borderWidth: 1,
    borderColor: '#7259C1',
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  buttonTextSecond: {
    color: '#7259C1',
    fontWeight: 'bold',
    fontSize: 16,
  },
});