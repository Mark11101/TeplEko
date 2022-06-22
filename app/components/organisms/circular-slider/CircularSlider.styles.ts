import { StyleSheet } from "react-native";

import { colors, borderRadius} from "../../../styles/variables.styles";

const styles = StyleSheet.create({
  list: {
    position: 'absolute',
    top: -160,
    left: 110,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  listItemTime: {
    marginRight: 10,
  },
  listItemButton: {
    color: 'red',
  },
  deleteAllBtn: {
    position: 'absolute',
  },
  allDayBtn: {
    position: 'absolute',
    top: 30,
  },
  circleSlider: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 22,
    borderRadius: borderRadius,
  },
  background: {
    position: 'absolute',
    zIndex: 500,
  },
  sliders: {
    zIndex: 900,
  },
  marks: {
    position: 'absolute',
    zIndex: 500,
    borderRadius: 100,
  },
  temperatures: {
    position: 'absolute',
    zIndex: 900,
  },
  day: {
		color: colors.grey,
		fontSize: 30,
		fontFamily: 'Inter-Regular',
    zIndex: 900,
  }
});

export default styles
