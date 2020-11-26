import React, { ReactElement, ReactFragment } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { light, dark, mapping } from '@eva-design/eva'
import { AppearanceProvider } from 'react-native-appearance'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import 'react-native-gesture-handler'
// import Navigation from './src/routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppNavigator } from './src/navigation/app.navigator'
import { AppRoute } from './src/navigation/app-routes'

import { useTheme } from './src/hooks/theme'

import { Provider } from 'react-redux'
import { store } from './src/store'

export default (): ReactFragment => (
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
)

const App = (): ReactElement => {
  const isAuthorized: boolean = true
  const { colorScheme } = useTheme()

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={mapping}
        theme={colorScheme === 'light' ? light : dark}>
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
