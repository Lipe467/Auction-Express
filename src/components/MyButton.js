import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MyButton = ({ title, onPressButton }) => {
    return (
        <TouchableOpacity onPress={onPressButton}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#421454',
        margin: 4,
    },
    buttonTitle: {
        color: '#fff',
        fontSize: 18,
    }
});

export default MyButton;