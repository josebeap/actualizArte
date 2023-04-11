import  React, { useState, useEffect} from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";


const Home = (props) => {

    const handleProps = nombre => {
        props.navigation.navigate(nombre);
    };

    return (
        <ScrollView style={styles.container}>
            <Button title="Categoria" onPress={() => handleProps('Categoria')} />
        </ScrollView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },

    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export { Home }