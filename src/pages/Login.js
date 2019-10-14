import React, { useState, useEffect } from 'react'
import { StyleSheet, AsyncStorage, View, KeyboardAvoidingView, Platform, Text, Image, TextInput, TouchableOpacity } from 'react-native'

import api from '../services/api'

import logo from '../assets/logo.png'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [techs, setTechs] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List')
      }
    })
  }, [])

  async function handleSubmit() {
    
    const response = await api.post('/sessions', {
      email,
      name
    })
    
    const { _id } = response.data

    await AsyncStorage.setItem('user', _id)
    await AsyncStorage.setItem('techs', techs)
    await AsyncStorage.setItem('name', name) 

    navigation.navigate('List')
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>E-mail:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Seu email"
          placeholderTextColor="#999"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Nome:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#999"
          textContentType="name"
          keyboardType="default"
          autoCapitalize="words"
          autoCorrect={true}
          value={name}
          onChangeText={setName}
        />
        
        <Text style={styles.label}>Tecnologias:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Tecnologias do seu interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontre Spots</Text>
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
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
  
})