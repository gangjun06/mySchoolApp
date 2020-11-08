import React from 'react'
import {
  Divider,
  Tab,
  TabBar,
  TabElement,
  MenuItem
} from '@ui-kitten/components'
import { TodoScreenProps } from '../../navigation/todo.navigator'
import { AppRoute } from '../../navigation/app-routes'
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset
} from '../../components/safe-area-layout.component'
import { Toolbar, ToolbarMenuItem } from '../../components/toolbar.component'
import { InfoIcon, LogoutIcon, MenuIcon } from '../../assets/icons'

export const InfoTabBar = (props: TodoScreenProps): SafeAreaLayoutElement => {
  const toolbarMenu: ToolbarMenuItem[] = [{ title: 'Plus', icon: InfoIcon }]

  const onMenuItemSelect = (index: number): void => {
    if (index === 1) {
      props.navigation.navigate(AppRoute.AUTH)
    }
  }

  const onTabSelect = (index: number): void => {
    const selectedTabRoute: string = props.state.routeNames[index]
    props.navigation.navigate(selectedTabRoute)
  }

  const createNavigationTabForRoute = (route): TabElement => {
    const { options } = props.descriptors[route.key]
    return (
      <Tab
        key={route.key}
        title={options.title}
        // @ts-ignore
        icon={options.tabBarIcon}
      />
    )
  }

  const renderToolbarMenu = (): React.ReactElement => (
    <React.Fragment>
      <MenuItem title='About' accessoryLeft={InfoIcon} />
      <MenuItem title='Log Out' accessoryLeft={LogoutIcon} />
    </React.Fragment>
  )

  return (
    <SafeAreaLayout insets={SaveAreaInset.TOP}>
      <Toolbar
        title='Home'
        onMenuItemSelect={onMenuItemSelect}
        menu={toolbarMenu}
      />
      <TabBar selectedIndex={props.state.index} onSelect={onTabSelect}>
        {props.state.routes.map(createNavigationTabForRoute)}
      </TabBar>
      <Divider />
    </SafeAreaLayout>
  )
}
