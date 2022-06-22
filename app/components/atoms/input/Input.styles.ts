import { StyleSheet } from "react-native";

import { text, colors, borderRadius } from "../../../styles/variables.styles"; 

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    paddingLeft: 12,
    paddingRight: 35,
    borderWidth: 1,
    borderRadius,
    backgroundColor: '#fff',
    borderColor: '#e7e5ef',
    ...text.default,
  },
  icon: {
    position: 'absolute',
    right: 13,
    width: 16.5,
    padding: 20,
  },
  error: {
    color: colors.error,
    borderColor: colors.error,
  }
});

export default styles
