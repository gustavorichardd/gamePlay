import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: 108,
    flexDirection: 'row',
    // justifyContent: 'center'
  },
  textInput: {
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 21
  },
  divider: {
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
  },
  contentDivider: {
    justifyContent: 'center',
    marginRight: 4,
  },
  content: {
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: theme.colors.secondary50,
    width: 48,
    height: 48,
    backgroundColor: theme.colors.secondary40,
    marginRight: 4,
    borderWidth: 1,
  },
  contentText: {
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    textAlign: 'center',
  }
})
