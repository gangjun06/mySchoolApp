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
import { Toolbar } from '../../components/toolbar.component'
import { MenuIcon } from '../../assets/icons'
import {
  SafeAreaLayout,
  SaveAreaInset
} from '../../components/safe-area-layout.component'

export const InfoCafeteriaScreen = (props): ReactElement => {
  const styles = useStyleSheet(themedStyles)
  const { cafeteriaState, fetchCafeteria } = useCafeteria()

  useEffect(() => {
    fetchCafeteria()
  }, [])

  return (
    <SafeAreaLayout style={{ flex: 1 }} insets={SaveAreaInset.TOP}>
      <Layout style={styles.container}>
        {/* {cafeteriaState.message && <Text>Error</Text>} */}
        <Toolbar
          title='Cafeteria🐱'
          backIcon={MenuIcon}
          onBackPress={props.navigation.toggleDrawer}
        />
        {cafeteriaState.data?.map((item, index) => (
          <View key={index}>
            <Text>{item.DDISH_NM}</Text>
          </View>
        ))}
        <Text>asdf</Text>
      </Layout>
    </SafeAreaLayout>
  )
}

const themedStyles = StyleService.create({
  container: {
    flex: 1
  }
})
