import { StyleSheet, Platform } from "react-native";

import { text, colors } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  navbar: {
    marginBottom: Platform.OS === 'ios' ? 60 : 0,
  },
  screen: {
    height: '100%',
    paddingTop: 30,
    padding: 14,
    backgroundColor: colors.screen,
  },
  text: text.default,
  button: {
    marginTop: 14,
  },
});

export default styles
