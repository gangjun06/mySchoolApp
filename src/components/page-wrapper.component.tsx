import { Layout } from '@ui-kitten/components'
import React, { ReactChildren, ReactElement } from 'react'
import { StyleSheet } from 'react-native'
import { MenuIcon } from '../assets/icons'
import { SafeAreaLayout, SaveAreaInset } from './safe-area-layout.component'
import { Toolbar } from './toolbar.component'

type props = {
  children: ReactChildren
  text: string
  toggleDrawer: () => void
}

export const PageWrapper = ({
  children,
  toggleDrawer,
  text
}): ReactElement<props> => {
  return (
    <SafeAreaLayout style={{ flex: 1 }} insets={SaveAreaInset.TOP}>
      <Layout style={{ flex: 1 }}>
        {/* {cafeteriaState.message && <Text>Error</Text>} */}
        <Toolbar title={text} backIcon={MenuIcon} onBackPress={toggleDrawer} />
        {children}
      </Layout>
    </SafeAreaLayout>
  )
}
