import { StyleSheet } from "react-native";

import { text } from "../../../styles/variables.styles";

const styles = StyleSheet.create({
	clock: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	day: {
		position: 'absolute',
    ...text.default
	},
	notActive: {
		opacity: 0.4,
	}
});

export default styles;
