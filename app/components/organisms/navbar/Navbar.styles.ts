import { StyleSheet, Platform } from "react-native";

import { text, colors } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
    width: '100%',
    paddingHorizontal: 14,
    top: Platform.OS === 'ios' ? 50 : 4,
    backgroundColor: colors.screen,
    zIndex: 1000,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  title: {
    ...text.h1,
    position: 'absolute',
    left: '30%',
    right: '50%',
    textAlign: 'center',
    width: 185
  },
  side: {
  },
  sideBtn: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center', 
  },
  arrowBtn: {
    padding: 10,
    paddingLeft: 0,
    justifyContent: 'flex-start', 
  },
  arrowBtnText: {
    marginLeft: 10,
    ...text.default,
  },
  burgerBtn: {
    justifyContent: 'flex-end',   
    paddingVertical: 20,
    paddingLeft: 20,
  },
  burgerMenu: {
    position: 'absolute',
    top: 52,
    zIndex: 99,
    width: '100%',
    height: '100%',
    backgroundColor: '#505050',
    opacity: 0.25,
  },
  light: {
    color: 'white',
  },
  rightSide: {
  }
});

export default styles

