import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  safeAreaView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loggedSafeAreaView: {
    flex: 1,
    backgroundColor: '#f1f2f7'
  },
  unLoggedSafeAreaView: {
    flex: 1,
  }
});

export default styles
