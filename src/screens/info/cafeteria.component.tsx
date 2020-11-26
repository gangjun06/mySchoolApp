import React, { ReactElement, useEffect } from 'react'
import { View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { useCafeteria } from '../../hooks/info'
import { PageWrapper } from '../../components/page-wrapper.component'
export const InfoCafeteriaScreen = (props): ReactElement => {
  const { cafeteriaState, fetchCafeteria } = useCafeteria()

  useEffect(() => {
    fetchCafeteria()
  }, [])

  return (
    <PageWrapper text='급식' toggleDrawer={props.navigation.toggleDrawer}>
      {cafeteriaState.data?.map((item, index) => (
        <View key={index}>
          <Text>{item.DDISH_NM}</Text>
        </View>
      ))}
      <Text>asdf</Text>
    </PageWrapper>
  )
}
