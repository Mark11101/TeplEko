import { StyleSheet } from "react-native";

import { text, colors } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    padding: 14,
  },
  noEvents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
  },
  title: {
    marginBottom: 20,
  },
  helpText: {
    ...text.default,
    textAlign: 'center',
    color: colors.helpText,
  },
});

export default styles
