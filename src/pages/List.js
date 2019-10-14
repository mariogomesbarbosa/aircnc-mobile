import React, { useState, useEffect } from 'react'
import { Alert, AsyncStorage, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import socketio from 'socket.io-client'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([])
  const [name, setName] = useState('')

  async function handleLogout() {

    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('techs') 

    navigation.navigate('Login')
  }

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('https://aircnc-back-end.herokuapp.com/', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} para ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}`)
      })
    })

  }, [])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim())

      setTechs(techsArray)
    })

    AsyncStorage.getItem('name').then(storagedName => {
      const nameString = storagedName

      setName(nameString)
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView style={styles.scrollView}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Olá <Text style={styles.bold}>{name}</Text> Tudo bem?</Text>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
      
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    // marginTop: 20,
    marginBottom: 5,
  },

  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
  },

  title: {
    fontSize: 26,
    color: '#444',
    paddingHorizontal: 20,
    marginTop: 30,
  },

  bold: {
    fontWeight: 'bold',
    color: '#444',
  },

  button: {
    height: 52,
    borderWidth: 1,
    borderColor: '#7259C1',
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: '#7259C1',
    fontWeight: 'bold',
    fontSize: 16,
  },
})