import { StyleSheet, StatusBar } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Number(StatusBar.currentHeight) + 26,
    marginBottom: 42,
  },
  content: {
    marginTop: 42
  },
  matches: {
    marginTop: 24,
    marginLeft: 24
  }

})

