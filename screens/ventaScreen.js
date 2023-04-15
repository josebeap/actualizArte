import  React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { QuerySnapshot, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import Ionicons from '@expo/vector-icons/Ionicons';

// Creacion de la venta
const VentaScreen = () => {
    //definimos los atributos de la venta
    const [fecha, setFecha] = useState('');
    const [nombreCliente, setNombreCliente] = useState(0);
    const [documentoCliente, setdocumentoCliente] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [total, setTotal] = useState(0);

    //Metodo que calcula el rpecio total
    const calcularTotal = () => {
        const resultado = cantidad * precio;
        setTotal(resultado);
      };
    
      return (
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Ventas</Text>
          //ingreso de la cantidad y precio
          <TextInput
            style={{ marginBottom: 16 }}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />
          <TextInput
            style={{ marginBottom: 16 }}
            placeholder="Precio"
            keyboardType="numeric"
            value={precio}
            onChangeText={setPrecio}
          />

          //boton para ejecutar el calculo del precio total
          <Button title="Calcular Total" onPress={calcularTotal} />

          //Mostramos el resultado del precio total
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16 }}>Total: ${total}</Text>
        </View>
      );
    };
    
export {VentaScreen}