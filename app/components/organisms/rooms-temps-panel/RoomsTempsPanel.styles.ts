import { StyleSheet, Platform } from "react-native";

import { text, colors } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  roomsPanel: {
    width: '100%'
  },
  roomsWrapper: {
    padding: 12,
  },
  room: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  title: {
    padding: 12,
  },
  temp: {
    display: 'flex',
    flexDirection: 'row',
    top: Platform.OS === 'ios' ? 0 : 3,
  },
  bigValue: {
    ...text.default,
    color: '#454460',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 20,
    opacity: 0.5,
  },
  smallValue: {
    ...text.default,
    color: '#454460',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 11,
    opacity: 0.5,
  },
  roomName: text.h3,
  disabledText: {
    color: colors.disabled
  },
});

export default styles
