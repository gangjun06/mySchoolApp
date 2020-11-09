import React, { ReactFragment } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { light, dark, mapping } from '@eva-design/eva'
import { StyleSheet, Text, View } from 'react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import 'react-native-gesture-handler'
// import Navigation from './src/routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppNavigator } from './src/navigation/app.navigator'
import { AppRoute } from './src/navigation/app-routes'

import { Provider } from 'react-redux'
import { store } from './src/store'

export default (): ReactFragment => {
  const isAuthorized: boolean = true
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={light}>
        <SafeAreaProvider>
          <Provider store={store}>
            <NavigationContainer>
              <AppNavigator
                initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH}
              />
            </NavigationContainer>
          </Provider>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  )
}
