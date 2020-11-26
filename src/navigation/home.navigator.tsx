import React from 'react'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { TodoNavigator } from './info.navigation'
import { ProfileNavigator } from './profile.navigator'
import { AppRoute } from './app-routes'
import { HomeTabBar } from '../screens/home'
import {
  HomeIcon,
  InfoIcon,
  LayoutIcon,
  MoreIcon,
  PersonIcon
} from '../assets/icons'
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationProp
} from '@react-navigation/drawer'
import { HomeDrawer } from '../components/drawer.component'
import { InfoCafeteriaScreen } from '../screens/info'

type HomeBottomTabsNavigatorParams = {
  [AppRoute.INFO]: undefined
  [AppRoute.MORE]: undefined
}

type HomeDrawerNavigatorParams = {
  [AppRoute.HOME]: undefined
  [AppRoute.INFO]: undefined
}

export type TodoTabNavigationProp = BottomTabNavigationProp<
  HomeBottomTabsNavigatorParams,
  AppRoute.INFO
>

export type MoreTabNavigationProp = BottomTabNavigationProp<
  HomeBottomTabsNavigatorParams,
  AppRoute.MORE
>

export type BottomHomeScreenProps = BottomTabBarProps & {
  navigation: TodoTabNavigationProp
}

export type DrawerHomeScreenProps = DrawerContentComponentProps & {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
}

const BottomTab = createBottomTabNavigator<HomeBottomTabsNavigatorParams>()
const Drawer = createDrawerNavigator<HomeDrawerNavigatorParams>()

// export const HomeNavigator = (): React.ReactElement => (
//   // @ts-ignore: `tabBar` also contains a DrawerNavigationProp
//   <BottomTab.Navigator tabBar={HomeTabBar}>
//     <BottomTab.Screen
//       name={AppRoute.INFO}
//       component={TodoNavigator}
//       options={{ title: 'Info', tabBarIcon: LayoutIcon }}
//     />
//     <BottomTab.Screen
//       name={AppRoute.MORE}
//       component={ProfileNavigator}
//       options={{ title: 'More', tabBarIcon: MoreIcon }}
//     />
//   </BottomTab.Navigator>
// )

export const HomeNavigator = (): React.ReactElement => (
  // @ts-ignore: `drawerContent` also contains a DrawerNavigationProp
  <Drawer.Navigator drawerContent={HomeDrawer}>
    <Drawer.Screen
      name={AppRoute.HOME}
      component={InfoCafeteriaScreen}
      options={{ title: 'Home', drawerIcon: HomeIcon }}
    />
    {/* <Drawer.Screen
      name={AppRoute.INFO}
      component={InfoCafeteriaScreen}
      options={{ title: 'About', drawerIcon: InfoIcon }}
    /> */}
  </Drawer.Navigator>
)
