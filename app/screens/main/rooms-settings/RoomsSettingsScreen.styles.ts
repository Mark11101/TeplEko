import { StyleSheet, Platform } from "react-native";

import { colors, text } from "../../../styles/variables.styles";

const isIos = Platform.OS === 'ios';

const styles = StyleSheet.create({
	navbar: {
		marginBottom: isIos ? 60 : 20,
	},
	headerRightSideText: {
		...text.default,
		fontSize: 15,
	},
	roomSettingsScreen: {
		flex: 1,
	},
	scrollbar: {
		marginLeft: 14,
		marginBottom: 22,
		height: isIos ? 34 : 33,
	},
	scrollbarTextView: {
		height: 27,
		marginRight: 15,
	},
	verticalDivider: {
		height: 27,
		marginRight: 15,
		color: colors.grey,
	},
	selectedScrollbarTextView: {
		borderBottomWidth: 1,
		borderBottomColor: colors.info
	},
	scrollbarText: {
		fontSize: 16,
		color: colors.grey
	},
	activeScrollbarText: {
		color: colors.info,
	},
	scrollableView: {
		height: '100%',
		width: '100%',
    alignSelf: 'center',
		paddingHorizontal: 14,
	},
	circleSlider: {
		width: '100%',
		// paddingHorizontal: 100,
	},
	contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
	},
	weekDaysSchedule: {
		width: '100%',
		marginBottom: 10,
	},
	weekDaysScheduleTitle: {
		marginBottom: 8,
	},
	weekDaysScheduleDivider: {
		marginBottom: 8,
	},
	helpText: {
		...text.footnote,
		width: '100%',
		color: colors.helpText,
	},
	bottomPadding: {
		paddingBottom: 100,
	}
});

export default styles
