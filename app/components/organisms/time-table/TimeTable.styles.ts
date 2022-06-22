import { StyleSheet } from "react-native";

import { text } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  timeTable: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
  },
  timeWrapper: {
    paddingVertical: 6,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  day: {
    opacity: 0.4,
    ...text.default,
  },
  divider: { 
    marginBottom: 12 
  },
});

export default styles
