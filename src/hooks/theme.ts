import { useColorScheme } from 'react-native-appearance'

export const useTheme = () => {
  const colorScheme = useColorScheme()

  return { colorScheme }
}
