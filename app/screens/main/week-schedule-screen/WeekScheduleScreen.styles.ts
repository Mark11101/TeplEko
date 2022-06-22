import { StyleSheet, Platform } from "react-native";

import { colors, text } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
    weekScheduleScreen: {
			paddingHorizontal: 10,
		},
    navbar: {
			marginBottom: Platform.OS === 'ios' ? 80 : 40,
    },
		panel: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'center',
			paddingVertical: 2,
			marginBottom: 10,
		},
		clock: {
			paddingHorizontal: 10,
			paddingVertical: 12,
		},
		helpText: {
			...text.footnote,
			color: colors.helpText,
			marginBottom: 40,
		},
});

export default styles
