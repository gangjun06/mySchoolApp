import React from 'react'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationProp
} from '@react-navigation/drawer'
import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { TodoNavigator } from './todo.navigator'
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

type HomeBottomTabsNavigatorParams = {
  [AppRoute.TODO]: undefined
  [AppRoute.MORE]: undefined
}

export type TodoTabNavigationProp = BottomTabNavigationProp<
  HomeBottomTabsNavigatorParams,
  AppRoute.TODO
>

export type MoreTabNavigationProp = BottomTabNavigationProp<
  HomeBottomTabsNavigatorParams,
  AppRoute.MORE
>

export type BottomHomeScreenProps = BottomTabBarProps & {
  navigation: TodoTabNavigationProp
}

const BottomTab = createBottomTabNavigator<HomeBottomTabsNavigatorParams>()

export const HomeNavigator = (): React.ReactElement => (
  // @ts-ignore: `tabBar` also contains a DrawerNavigationProp
  <BottomTab.Navigator tabBar={HomeTabBar}>
    <BottomTab.Screen
      name={AppRoute.TODO}
      component={TodoNavigator}
      options={{ title: 'TODO', tabBarIcon: LayoutIcon }}
    />
    <BottomTab.Screen
      name={AppRoute.MORE}
      component={ProfileNavigator}
      options={{ title: 'More', tabBarIcon: MoreIcon }}
    />
  </BottomTab.Navigator>
)
