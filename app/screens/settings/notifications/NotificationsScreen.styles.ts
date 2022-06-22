import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    notificationScreen: {
        paddingTop: Platform.OS === 'ios' ? 66 : 28,
        paddingHorizontal: 13,
    },
    panel: {
        padding: 12,
    },
    panelItem: {
        // width: '100%'
    },
    divider: {
        paddingTop: 12,
        marginBottom: 12,
    }
});

export default styles
