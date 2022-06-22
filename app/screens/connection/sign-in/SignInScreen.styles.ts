import { StyleSheet, Platform } from "react-native";

import { text, colors, borderRadius } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 20
  },
  signInFormView: {
    flex: 1,
    paddingHorizontal: 14,
  },
  formWrapper: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  form: {
    padding: 12,
  },
  upperInput: {
    borderRadius: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  lowerInput: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },

  signInBtn: {
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
  errorDivider: {
    borderBottomColor: colors.error,
  },
});

export default styles

