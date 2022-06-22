import { StyleSheet } from "react-native";

import { text } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    padding: 14,
  },
  content: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  preview: {
    marginBottom: 46,
  },
  helpText: {
    textAlign: 'center',
    color: 'white',
    ...text.default,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  finishBtn: {
    marginTop: 12,
  },
});

export default styles

