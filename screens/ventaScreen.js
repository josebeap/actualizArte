import  React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, FlatList, TouchableOpacity} from "react-native";
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
        <View style={styles.container}>
          <Text style={styles.title}>Ventas</Text>
    
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Cantidad:</Text>
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              keyboardType="numeric"
              value={cantidad}
              onChangeText={setCantidad}
            />
          <Text style={styles.label}>Precio:</Text>
            <TextInput
              style={styles.input}
              placeholder="Precio"
              keyboardType="numeric"
              value={precio}
              onChangeText={setPrecio}
            />
          </View>
    
          <TouchableOpacity style={styles.button} onPress={calcularTotal}>
            <Text style={styles.buttonText}>Calcular Total</Text>
          </TouchableOpacity>
    
          <Text style={styles.totalText}>Total: ${total}</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
      },
      label: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 16,
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 8,
        marginRight: 16,
      },
      button: {
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
      },
    });
    
export {VentaScreen}