import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flex: 1,
    width: 328,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 23,
  },
  text: {
    color: theme.colors.heading,
    fontFamily: theme.fonts.title700,
    fontSize: 20,
    marginVertical: 24
  },
  textPlay: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.title700,
    fontSize: 20
  }
})