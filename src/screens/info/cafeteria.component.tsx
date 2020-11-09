import React, { ReactElement, useEffect } from 'react'
import { ListRenderItemInfo, View } from 'react-native'
import {
  Layout,
  ListElement,
  StyleService,
  useStyleSheet,
  Text
} from '@ui-kitten/components'
import { useCafeteria } from '../../hooks/info'

export const InfoCafeteriaScreen = (props): ReactElement => {
  const styles = useStyleSheet(themedStyles)
  const { cafeteriaState, fetchCafeteria } = useCafeteria()

  useEffect(() => {
    fetchCafeteria()
  }, [])

  return (
    <Layout style={styles.container}>
      {/* {cafeteriaState.message && <Text>Error</Text>} */}
      {cafeteriaState.data?.map((item, index) => (
        <View key={index}>
          <Text>{item.DDISH_NM}</Text>
        </View>
      ))}
      <Text>asdf</Text>
    </Layout>
  )
}

const themedStyles = StyleService.create({
  container: {
    flex: 1
  }
})
