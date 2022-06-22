import { StyleSheet, Platform } from "react-native";

import { text, colors } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  navbar: {
    marginBottom: Platform.OS === 'ios' ? 60 : 28,
  },
  screen: {
    padding: 14,
    backgroundColor: colors.screen,
  },
  screenWrapper: {
    marginBottom: 100,
  },
  text: {
    marginBottom: 12,
    ...text.default,
  },
});

export default styles
