import { StyleSheet } from "react-native";

import { text, colors } from '../../../styles/variables.styles'

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }, 
  text: {
    ...text.footnote,
    fontSize: 13,
    maxWidth: '80%'
  },
  toggle: {
    marginLeft: 12,
  },
  disabledText: {
    color: colors.disabled,
  },
  boldText: {
    fontWeight: 'bold'
  }
});

export default styles;

  
