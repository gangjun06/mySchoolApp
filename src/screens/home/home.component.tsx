import React, { ReactElement, useEffect } from 'react'
import { Text } from '@ui-kitten/components'
import { PageWrapper } from '../../components/page-wrapper.component'
import { DrawerHomeScreenProps } from '../../navigation/home.navigator'

export const HomeScreen = (props): ReactElement => {
  useEffect(() => {
    console.log(props.route)
  }, [])

  return (
    <PageWrapper text='오상중학교' toggleDrawer={props.navigation.toggleDrawer}>
      <Text>Home</Text>
    </PageWrapper>
  )
}
