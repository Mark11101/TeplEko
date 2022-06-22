import { StyleSheet, Platform } from "react-native";

import { text, borderRadius, colors } from "../../styles/variables.styles";

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
    marginBottom: 10,
  },
  title: {
    marginLeft: 11,
    marginBottom: 8,
  },
  temperaturePicker: {
    height: Platform.OS === 'ios' ? 60 : 70,
    width: 120,
    // marginRight: -9,
    borderWidth: 5,
    borderRadius: borderRadius,
    borderColor: colors.white,
  },
  panelItemText: {
    ...text.footnote,
    fontSize: 15,
  },
  panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    height: Platform.OS === 'ios' ? 51 : 120,
    // marginBottom: Platform.OS === 'ios' ? 0 : -1,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  switchPanel: {
    paddingRight: 12,
    height: 51,
  },
  helpText: {
    ...text.footnote,
    padding: 12,
    marginBottom: 10,
    width: '100%',
    color: colors.helpText,
  },
  lastBlock: {
    marginBottom: 30,
  }
});

export default styles
