import { StatusBar } from 'expo-status-bar'
import React from 'react'
import * as eva from '@eva-design/eva'
import { StyleSheet, Text, View } from 'react-native'
import { ApplicationProvider } from '@ui-kitten/components'

export default function App() {
  return <ApplicationProvider {...eva} theme={eva.light}></ApplicationProvider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
