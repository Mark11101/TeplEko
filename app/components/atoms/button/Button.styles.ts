import { StyleSheet } from "react-native";

import { text, colors, borderRadius } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  button_text: text.h2,
  link_text: text.link,

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius,
  },
  button_default: {
    backgroundColor: 'white',
    borderRadius,
  },
  button_primary: {
    backgroundColor: colors.primary,
    borderRadius,
  },
  button_secondary: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius,
  },
  button_text_with_icon: {
    justifyContent: 'flex-start',
    paddingVertical: 0,
  },
  button_delete: {
    backgroundColor: colors.white,
  },
  bg_disabled: {
    backgroundColor: '#e7e6ec',
  },
  border_disabled: {
    borderColor: colors.disabled,
  },
  icon: {
    marginRight: 12,
  },
  black_text: {
    color: 'black',
  },
  white_text: {
    color: 'white',
  },
  grey_text: {
    color: colors.disabled,
  },
  blue_text: {
    color: colors.primary,
  },
  red_text: {
    color: colors.error,
  }
});

export default styles;
