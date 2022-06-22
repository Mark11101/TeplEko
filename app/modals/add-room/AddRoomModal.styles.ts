import { StyleSheet } from "react-native";

import { text, colors } from "../../styles/variables.styles";

const styles = StyleSheet.create({
	closeBtnView: {
    display: 'flex',
    alignItems: 'flex-end',
    marginVertical: 18,
    marginRight: 14,
  },
	roomNameView: {
    marginBottom: 28,
  },
  title: {
    marginLeft: 11,
    marginBottom: 8,
  },
  helpText: {
    ...text.footnote,
    padding: 12,
    marginBottom: 10,
    color: colors.helpText,
  },
  saveBtn: {
    marginBottom: 150,
  },
  scrollView: {
    paddingHorizontal: 14,
  },
  errorText: {
    ...text.footnote,
    position: 'absolute',
    bottom: -22,
    left: 10,
    color: colors.error,
  },
  errorRoomGroupText: {
    position: 'relative',
    left: 0,
    top: -5,
    padding: 12,
    marginBottom: 28,
  },
});

export default styles
