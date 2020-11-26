import React from 'react'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import { AppRoute } from './app-routes'
import { HomeScreen } from '../screens/home'
import { HomeIcon, ListIcon } from '../assets/icons'
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationProp
} from '@react-navigation/drawer'
import { HomeDrawer } from '../components/drawer.component'
import { InfoCafeteriaScreen } from '../screens/info'

type HomeDrawerNavigatorParams = {
  [AppRoute.HOME]: undefined
  [AppRoute.INFO_CAFETERIA]: undefined
}

export type DrawerHomeScreenProps = DrawerContentComponentProps & {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>,
    DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.INFO_CAFETERIA>
  >
}

const Drawer = createDrawerNavigator<HomeDrawerNavigatorParams>()

export const HomeNavigator = (): React.ReactElement => (
  // @ts-ignore: `drawerContent` also contains a DrawerNavigationProp
  <Drawer.Navigator drawerContent={HomeDrawer}>
    <Drawer.Screen
      name={AppRoute.HOME}
      component={HomeScreen}
      options={{ title: '홈', drawerIcon: HomeIcon }}
    />
    <Drawer.Screen
      name={AppRoute.INFO_CAFETERIA}
      component={InfoCafeteriaScreen}
      options={{ title: '급식정보', drawerIcon: ListIcon }}
    />
  </Drawer.Navigator>
)
