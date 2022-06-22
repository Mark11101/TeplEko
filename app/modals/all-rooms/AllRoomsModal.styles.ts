import { StyleSheet } from "react-native";

import { text, borderRadius, colors } from "../../styles/variables.styles";

const styles = StyleSheet.create({
	navbar: {
		top: 25,
		marginBottom: 46,
	},
	navbarSideText: {
		...text.default,
		fontSize: 17,
		color: colors.primary,
	},
	scrollView: {
		paddingHorizontal: 14,
	},
	title: {
		marginLeft: 12,
		marginBottom: 8,
	},
	panel: {
		paddingHorizontal: 12,
		marginBottom: 30,
		minHeight: 40,
	},
	dragged: {
		opacity: 0.5,
	},
	editPanel: {
		paddingHorizontal: 12,
		borderRadius: 0,
	},
	firstRoom: {
		marginTop: 10,
		borderTopLeftRadius: borderRadius,
		borderTopRightRadius: borderRadius,
	},
	lastRoom: {
		marginBottom: 10,
		borderBottomLeftRadius: borderRadius,
		borderBottomRightRadius: borderRadius,
	},
	roomBtn: {
		backgroundColor: 'white',
		paddingVertical: 13,
		paddingRight: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: borderRadius,
	},
	dragItem: {

	},
	roomBtnText: {
		fontSize: 16,
		fontFamily: 'Inter-Regular',
	},
	addBtn: {
		paddingVertical: 13,
	},
	rowItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
	rightSideBtn: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	helpText: {
		...text.footnote,
		marginRight: 20,
	},
});

export default styles
