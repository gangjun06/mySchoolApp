import React from 'react'
import { ImageProps } from 'react-native'
import {
  IconElement,
  IndexPath,
  OverflowMenu,
  StyleType,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionElement,
  TopNavigationProps,
  MenuItem
} from '@ui-kitten/components'
import { BackIcon, MoreVerticalIcon } from '../assets/icons'

export interface ToolbarProps extends TopNavigationProps {
  backIcon?: (style: StyleType) => React.ReactElement<ImageProps>
  menuIcon?: (style: StyleType) => React.ReactElement<ImageProps>
  onBackPress?: () => void
  onMenuItemSelect?: (index: number) => void
  menu?: ToolbarMenuItem[]
}

export type ToolbarMenuItem = {
  title: string
  icon: (props: any) => IconElement
}

export const Toolbar = (props: ToolbarProps): TopNavigationActionElement => {
  const {
    menu,
    backIcon,
    menuIcon,
    onBackPress,
    onMenuItemSelect,
    ...topNavigationProps
  } = props
  const [menuVisible, setMenuVisible] = React.useState(false)

  const onMenuSelect = (index: IndexPath) => {
    onMenuItemSelect && onMenuItemSelect(index.row)
    setMenuVisible(false)
  }

  const onMenuActionPress = () => {
    setMenuVisible(!menuVisible)
  }

  const renderMenuAnchorAction = (): TopNavigationActionElement => (
    <TopNavigationAction
      // @ts-ignore
      icon={props.menuIcon || MoreVerticalIcon}
      onPress={onMenuActionPress}
    />
  )

  const renderMenuAction = (): TopNavigationActionElement => (
    <OverflowMenu
      visible={menuVisible}
      anchor={renderMenuAnchorAction}
      placement='bottom end'
      onSelect={onMenuSelect}
      onBackdropPress={onMenuActionPress}>
      {menu &&
        menu.map((item, index) => (
          <MenuItem key={index} title={item.title} accessoryLeft={item.icon} />
        ))}
    </OverflowMenu>
  )

  const renderBackAction = (): TopNavigationActionElement => (
    <TopNavigationAction
      // @ts-ignore
      icon={props.backIcon || BackIcon}
      onPress={onBackPress}
    />
  )

  return (
    <TopNavigation
      {...topNavigationProps}
      alignment='center'
      accessoryLeft={onBackPress && renderBackAction}
      accessoryRight={menu && renderMenuAction}
    />
  )
}
