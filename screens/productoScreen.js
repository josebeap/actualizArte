import  React, { useState, useEffect } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity} from "react-native";
import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import {  collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import Ionicons from '@expo/vector-icons/Ionicons';
import estilos from "../style sheets/estilos";

const ProductoScreen = () => {
    const [recursos, setRecursos] = useState([])
    const [recurso, setRecurso] = useState({
        nombre: '',
        precio: '',
        cantidadStock: ''
    });

    useEffect(() => {
        const recursoRef = collection(FIRESTORE_DB, 'Recurso');

        const subscriber = onSnapshot(recursoRef, {
            next: (snapshot) => {
                console.log('UPDATE');
                
                const recursos = [];
                snapshot.docs.forEach((doc) => {
                    recursos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                setRecursos(recursos);
            }
        });
        return () => subscriber()
    }, [])
 
    /*para mandarle la informacion a la FlatList */
    const renderRecurso = ({item}) => {

        const ref = doc(FIRESTORE_DB, `Recurso/${item.id}`);

        /* se debe sumar 10000 al precio al apretar en el icono */
        const toggleDone = async() => {
            let precio = {precio: item.precio};
            precio = Number.parseFloat(precio.precio) + 10000;
            updateDoc(ref, {precio: precio});
        }
        const deleteItem = async() => {
           deleteDoc(ref);
        }
        return (
            <View>
                <TouchableOpacity onPress={toggleDone}>
                    <Ionicons name="add-circle" size={24} color="black" />
                </TouchableOpacity>
                
                <Text>Id: {item.id}</Text>
                <Text>Nombre: {item.nombre}</Text>
                <Text>Precio: {item.precio}</Text>
                <Text>Cantidad en Stock:{item.cantidadStock}</Text>
            
                <Ionicons name="trash" size={24} color="black" onPress={deleteItem}/>
            </View>    
        )
    }

    return (
        <ScrollView style={estilos.containerScrollView}>
            <View> 
                <FlatList data={recursos} renderItem={renderRecurso} keyExtractor={recurso.id}/>
            </View>
        </ScrollView>
        );
}


export {ProductoScreen}