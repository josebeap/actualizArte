import  React, { useState } from "react";
import { View, TextInput, ScrollView, StyleSheet,Text, TouchableOpacity,} from "react-native";
import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection } from "firebase/firestore";
import estilos from "../style sheets/estilos";


const RecursoScreen = (props) => {

    const [state, setState] = useState({
        nombre: '',
        precio: '',
        cantidadStock: ''
    });

    const addRecurso = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'Recurso'), 
            {nombre: state.nombre, precio: state.precio, cantidadStock: state.cantidadStock});
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

                
               
               
                <TouchableOpacity
                style={estilos.botonHome}
                onPress={() => addRecurso()}
                >
                    <Text style={estilos.buttonText}>ACTUALIZAR</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor:"#f2e1c6",
    },

    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    view: {
        backgroundColor:"#f4c67f",
        flex: 1,
        paddingBottom: 20,
        paddingLeft: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
      },
})

export { RecursoScreen }