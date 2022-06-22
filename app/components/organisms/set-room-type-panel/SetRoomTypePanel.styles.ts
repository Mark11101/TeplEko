import { StyleSheet, Platform } from "react-native";

import { text, colors } from "../../../styles/variables.styles";

const isIos = Platform.OS === 'ios';

const styles = StyleSheet.create({
  title: {
    marginLeft: 11,
    marginBottom: 8,
  },
  roomsWrapper: {
    padding: 12,
    backgroundColor: 'white',
  },
  divider: {
    marginVertical: 12,
  },
	button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
	text: text.default,
	selectedText: {
    color: colors.primary,
  },
  newRoomGroupInput: {
    borderWidth: 0,
    height: isIos ? 'fit-content' : '100%',
    marginTop: isIos ? 0 : -10,
    paddingLeft: 0,
    marginBottom: isIos ? 20 : 0,
  }
});

export default styles
