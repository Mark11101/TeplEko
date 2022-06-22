import { StyleSheet, Platform } from "react-native";

import { text , colors } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  navbar: {
    marginBottom: Platform.OS === 'ios' ? 60 : 28,
  },
  screen: {
    height: '100%',
    padding: 14,
    backgroundColor: colors.screen,
  },
  list: {
    padding: 12,
  },
  version: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  divider: {
    marginVertical: 12,
  },
  text: text.default,
  muted: {
    color: colors.helpText,
  },
  identifier: {
    marginTop: 6,
  }
});

export default styles
