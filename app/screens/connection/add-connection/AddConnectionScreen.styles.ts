import { StyleSheet } from "react-native";

import { text } from '../../../styles/variables.styles'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  search: {
    display: 'flex',
    alignItems: 'center',
  },
  pulse: {
    height: 250,
    width: 250,
    marginVertical: 35,
  },
  title: {
    color: 'white',
  },
  helpText: {
  ...text.footnote,
    textAlign: 'center',
    marginVertical: 42,
    color: 'white',
  },
  controlBtns: {
    width: '100%',
  },
  addManuallyBtn: {
    marginBottom: 12,
  },
});

export default styles

