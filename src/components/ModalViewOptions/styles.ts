import { StyleSheet, StatusBar } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 70,
    position: 'absolute',
    right: 5,
    top: Number(StatusBar.currentHeight) + 5,
    justifyContent: 'center',
    borderRadius: 20

  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlayTotal,
  },
})
