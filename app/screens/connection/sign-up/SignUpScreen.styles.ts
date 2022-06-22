import { StyleSheet, Platform } from "react-native";

import { text, colors, borderRadius } from "../../../styles/variables.styles";

const isIos = Platform.OS === 'ios';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: isIos ? 0 : 20
  },
  screenView: {
    flex: 1,
    padding: 14,
  },
  formWrapper: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  form: {
    padding: 12,
  },
  inputWrapper: {
    marginVertical: 16,
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
  signUpBtn: {
    marginVertical: 16,
  },
  errorWrapper: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  error: {
    padding: 12,
    marginBottom: 10,
  },
  errorMessage: {
    ...text.footnote,
    color: colors.error,
    fontWeight: '500',
  },
  errorDivider: {
    borderBottomColor: colors.error,
  },
  policy: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footnote: text.footnote,
  blueText: {
    color: colors.primary,
  },
  navbar: {
    marginBottom: 20,
  }
});

export default styles
