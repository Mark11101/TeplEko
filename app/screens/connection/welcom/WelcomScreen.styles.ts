import { StyleSheet, Platform } from "react-native";

import { text, colors } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 100 : 0,
  },
  image: {
    marginBottom: 46,
    paddingHorizontal: 50,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
    ...text.h1,
    color: colors.white,
  },
  footnote: {
    ...text.footnote,
    maxWidth: 290,
    marginBottom: 54,
    textAlign: 'center',
    color: colors.white,
  },
  signInBtn: {
    marginBottom: 25,
  },
  btnText: {
    ...text.default,
    fontWeight: '500',
    color: colors.white,
  }
});

export default styles
