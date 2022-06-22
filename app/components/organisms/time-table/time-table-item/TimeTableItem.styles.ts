import { StyleSheet } from "react-native";

import { text } from "../../../../styles/variables.styles";

const styles = StyleSheet.create({
  time: {
    paddingVertical: 6,
    display: 'flex',
    flexDirection: 'row',
  },
  text: text.default,
  disabled: {
    color: '#444B60',
    opacity: 0.4,
  },
  bar: text.footnote,
  light: {
    opacity: 0.1,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center', 
  },
  deleteBtn: {
    position: 'absolute',
    paddingHorizontal: 35,
    paddingVertical: 15,
  }
});

export default styles
