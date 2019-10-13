import React, { useState, useEffect } from 'react'
import {  AsyncStorage, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, ScrollView } from 'react-native'

import SpotList from '../components/SpotList'
import api from '../services/api'

import logo from '../assets/logo.png'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([])
  // const [name, setName] = useState('')

  async function handleLogout() {

    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('techs') 

    navigation.navigate('Login')
  }

  useEffect(() => {
    async function getTechs() {
      const response = await api.get('/spots', {})

      let techArray = []
      response.data.map(async data => {
        let prom = await data.techs.map(d => {
          if(techArray.indexOf(d)== -1){
            techArray.push(d)
          }
        })

        Promise.all(prom).then(() => {
          console.log(techArray)
          setTechs(techArray)
        })
      })

    }
    getTechs()
    console.log(techs)
    // AsyncStorage.getItem('techs').then(storagedTechs => {
    //   const techsArray = storagedTechs.split(',').map(tech => tech.trim())

    //   setTechs(techsArray)
    // })

    // AsyncStorage.getItem('name').then(storagedName => {
    //   const nameString = storagedName

    //   setName(nameString)
    // })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView style={styles.scrollView}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Olá Tudo bem?</Text>
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