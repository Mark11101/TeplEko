import { StyleSheet, Platform } from "react-native";

import { colors, text } from "../../../../styles/variables.styles";

const styles = StyleSheet.create({
  text: text.default,
  burgerMenuList: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 60,
    right: 6,
    zIndex: 100,
  },
  burgerMenuItem: {
    width: '100%',
    padding: 12,
  },
  bigDivider: {
    height: 14,
    width: '100%',
    backgroundColor: '#e7e5ef',
  },
  disabledText: {
    color: colors.disabled
  }
});

export default styles
