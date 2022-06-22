import { StyleSheet, Platform } from "react-native";

import { colors, text, borderRadius } from '../../../styles/variables.styles';

const styles = StyleSheet.create({
	homeScreen: {
		paddingVertical: Platform.OS === 'android' ? 20 : 70,
		paddingHorizontal: 14,
		backgroundColor: colors.screen,
	},
	navLeftIcons: {
		flexDirection: 'row',
	},
	plusIcon: {
		marginRight: 15,
	},
	divider: {
		top: Platform.OS === 'ios' ? 50 : 4,
		zIndex: 1000,
		marginBottom: 0,
	},
	panel: {
		paddingHorizontal: 12,
		marginBottom: 30,
		minHeight: 40,
	},
	dragged: {
		opacity: 0.5,
	},
	draggedItem: {
		backgroundColor: colors.white,
		width: '100%',
		borderRadius,
		paddingHorizontal: 12,
		justifyContent: 'center',
		alignContent: 'center',
		height: 60,
	},
	roomBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
	},
	roomBtnText: text.h3,
	showDescriptionBtn: {
		marginRight: 5,
		transform: [{ rotate: '270deg' }]
	},
	rotateArrowToUp: {
		transform: [{ rotate: '90deg' }]
	},
	block: {
		marginBottom: 20,
	},
	separatedRooms: {
		marginBottom: 150,
	},
	title: {
		padding: 12,
	},
	functionalBtn: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 12,
		backgroundColor: colors.white,
	},
	functionalBtnFirstLine: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
	},
	functionalBtnLeftSide: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	functionalBtnIcon: {
		marginRight: 16,
	},
	atHomeBtn: {
		marginBottom: 10,
	},
	notAtHomeBtnText: {
		fontSize: 16,
		color: colors.grey,
	},
	atHomeBtnText: {
		fontSize: 16,
		color: colors.info,
	},
	notOnPauseBtnText: {
		fontSize: 16,
		color: colors.grey,
	},
	onPauseBtnText: {
		fontSize: 16,
		color: colors.error,
	},
	helpPanelDescription: {
		...text.footnote,
		color: colors.helpText,
		marginTop: 10,
	},
	viewPort: {
    flex: 1,
    overflow: 'hidden',
    top: 12,
    marginBottom: 20,
  },
	textBox: {
    flex: 1,
    position: 'absolute',
  },
	bottomPadding: {
		paddingBottom: 150,
	},
	draxBlock: {
    width: '100%',
	},
	draxPanel: {
		padding: 12,
	},
	dragItem: {
		display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
		paddingVertical: 5
	}
});

export default styles
