import { StyleSheet } from "react-native";

import { text, colors } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    padding: 14,
  },
  emailInput: {
    marginVertical: 16,
  },
  errorWrapper: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  error: {
    padding: 12,
    marginBottom: 16,
  },
  errorMessage: {
    ...text.footnote,
    color: colors.error,
    fontWeight: '500',
  },
  formWrapper: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  form: {
    padding: 12,
  },
  text: {
    textAlign: 'center',
    ...text.default,
  }
});

export default styles
