import { StyleSheet } from "react-native";

import { colors, text, borderRadius } from "../../styles/variables.styles";

const styles = StyleSheet.create({
	modal: {
		paddingHorizontal: 14,
	},
	header: {
		flexDirection: 'row',
		paddingTop: 25,
		marginBottom: 18,
	},
	cancelBtnText: {
		color: colors.primary,
		fontSize: 17,
		fontFamily: 'Inter-Regular',
	},
	headerTitle: {
		position: 'absolute',
		left: '46%',
		top: 25,
		fontSize: 16,
		fontFamily: 'Inter-Regular',
	},
	saveBtnText: {
		color: colors.primary,
		fontSize: 17,
		fontFamily: 'Inter-Regular',
	},
	atHomePanel: {
		paddingVertical: 7,
		paddingHorizontal: 12,
		marginBottom: 15,
	},
	atHomePanelHeader: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	atHome: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	atHomeIcon: {
		marginRight: 13,
	},
	atHomeText: {
		color: colors.info,
		fontSize: 16,
		fontFamily: 'Inter-Regular',
	},
	outHomeText: {
		color: colors.grey,
		fontSize: 16,
		fontFamily: 'Inter-Regular',
	},
	helpPanelDescription: {
		...text.footnote,
		color: colors.helpText
	},
	scrollView: {
		borderRadius,
	},
	switchesPanel: {
		marginBottom: 10,
		paddingHorizontal: 12,
	},
	switchItem: {
		paddingVertical: 13,
	},
	switchItemText: {
		fontSize: 15,
		fontFamily: 'Inter-Regular',
	},
	switchItemTextDisabled: {
		color: colors.grey,
	},
});

export default styles
