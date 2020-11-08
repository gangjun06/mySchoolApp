import React, { ReactElement } from 'react'
import { ListRenderItemInfo } from 'react-native'
import {
  Layout,
  ListElement,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components'

export const InfoScheduleScreen = (props): ReactElement => {
  const styles = useStyleSheet(themedStyles)

  return <Layout style={styles.container}></Layout>
}

const themedStyles = StyleService.create({
  container: {
    flex: 1
  }
})
