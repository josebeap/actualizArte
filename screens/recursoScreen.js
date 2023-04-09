import  React, { useState } from "react";
import { View, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection } from "firebase/firestore";

const RecursoScreen = (props) => {

    const [state, setState] = useState({
        nombre: '',
        precio: '',
        cantidadStock: ''
    });

    /* agregar un Recurso */
    const addRecurso = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'Recurso'), 
            {nombre: state.nombre, precio: state.precio, cantidadStock: state.cantidadStock});
        /* cambiar de screen */
        props.navigation.navigate('Producto');
    }

    const handleChangeText = (attribute, value) => {
        setState({ ...state, [attribute]: value})
    }

    return (
        <ScrollView style={styles.container}>
            <View> 
                <TextInput style={styles.inputGroup} 
                    onChangeText={(value) => handleChangeText("nombre", value)} 
                    placeholder="Nombre"/>

                <TextInput style={styles.inputGroup} 
                    onChangeText={(value) => handleChangeText("precio", value)} 
                    placeholder="Precio"/>

                <TextInput style={styles.inputGroup} 
                    onChangeText={(value) => handleChangeText("cantidadStock", value)} 
                    placeholder="Cantidad en Stock"/>

                <Button title="Actualizar" onPress={() => addRecurso()}/>
            </View>
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

export {RecursoScreen}