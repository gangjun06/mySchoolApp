import React from 'react'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp
} from '@react-navigation/material-top-tabs'
import { TodoTabNavigationProp } from './home.navigator'
import { AppRoute } from './app-routes'
import {
  InfoCalendarScreen,
  InfoCafeteriaScreen,
  InfoScheduleScreen,
  InfoTabBar
} from '../screens/info'
import {
  CalendarIcon,
  DoneAllIcon,
  GridIcon,
  ListIcon,
  BookIcon
} from '../assets/icons'

type TodoNavigatorParams = {
  [AppRoute.INFO]: undefined
}

type TodoTabsNavigatorParams = {
  [AppRoute.INFO_CAFETERIA]: undefined
  [AppRoute.INFO_CALENDER]: undefined
  [AppRoute.INFO_SCHEDULE]: undefined
}

export type TodoScreenProps = MaterialTopTabBarProps & {
  navigation: TodoTabNavigationProp
}

const Stack = createStackNavigator<TodoNavigatorParams>()
const TopTab = createMaterialTopTabNavigator<TodoTabsNavigatorParams>()

const TodoTabsNavigator = (): React.ReactElement => (
  // @ts-ignore
  <TopTab.Navigator tabBar={(props) => <InfoTabBar {...props} />}>
    <TopTab.Screen
      name={AppRoute.INFO_CAFETERIA}
      component={InfoCafeteriaScreen}
      options={{ title: '급식', tabBarIcon: ListIcon }}
    />
    <TopTab.Screen
      name={AppRoute.INFO_SCHEDULE}
      component={InfoScheduleScreen}
      options={{ title: '시간표', tabBarIcon: BookIcon }}
    />
    <TopTab.Screen
      name={AppRoute.INFO_CALENDER}
      component={InfoCalendarScreen}
      options={{ title: '학사일정', tabBarIcon: CalendarIcon }}
    />
  </TopTab.Navigator>
)

export const TodoNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.INFO} component={TodoTabsNavigator} />
  </Stack.Navigator>
)
