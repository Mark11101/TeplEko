import { StyleSheet } from "react-native";

import { colors, text } from "../../styles/variables.styles";

const styles = StyleSheet.create({
	closeBtnView: {
    display: 'flex',
    alignItems: 'flex-end',
    marginVertical: 18,
    marginRight: 14,
  },
  scrollView: {
    paddingHorizontal: 14,
  },
	block: {
    marginBottom: 28,
  },
  title: {
    marginLeft: 11,
    marginBottom: 8,
  },
  panelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  panelItemText: {
    ...text.footnote,
    fontSize: 15,
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
  },
  saveBtn: {
    marginBottom: 28
  },
  deleteBtn: {
    marginBottom: 20,
  },
  errorPanel: {
    marginBottom: 100,
    backgroundColor: colors.error
  },
  errorPanelText: {
    ...text.default,
    padding: 10,
    textAlign: 'center',
    color: colors.white,
  }
});

export default styles
