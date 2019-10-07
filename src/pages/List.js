import React, { useState, useEffect } from 'react'
import {  AsyncStorage, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native'

import SpotList from '../components/SpotList'
import api from '../services/api'

import logo from '../assets/logo.png'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([])
  const [email] = useState('')

  async function handleLogout() {
    const response = await api.post('/sessions', {
      email
    })

    const {_id } = response.data

    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('techs') 

    navigation.navigate('Login')
  }

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim())

      setTechs(techsArray)
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
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