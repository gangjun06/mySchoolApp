import React from 'react'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack'
import { MoreTabNavigationProp } from './home.navigator'
import { AppRoute } from './app-routes'
import { EtcScreen } from '../screens/more'

type MoreNavigatorParams = {
  [AppRoute.MORE]: undefined
}

export interface ProfileScreenProps {
  navigation: CompositeNavigationProp<
    MoreTabNavigationProp,
    StackNavigationProp<MoreNavigatorParams, AppRoute.MORE>
  >
  route: RouteProp<MoreNavigatorParams, AppRoute.MORE>
}

const Stack = createStackNavigator<MoreNavigatorParams>()

export const ProfileNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.MORE} component={EtcScreen} />
  </Stack.Navigator>
)
