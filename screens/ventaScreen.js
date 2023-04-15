import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  CheckBox,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { FIRESTORE_DB } from "../persistence/firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";

// Creacion de la venta
const VentaScreen = () => {
  //definimos los atributos de la venta
  const [fecha, setFecha] = useState(new Date().toLocaleDateString()); // obtener la fecha actual y darle formato
  const [nombreCliente, setNombreCliente] = useState(
    "Ingresa el nombre del cliente"
  );
  const [documentoCliente, setDocumentoCliente] = useState(
    "Ingresa el documento del cliente"
  );
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [total, setTotal] = useState(0);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "Producto"));
      const productosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosData);
    };
    fetchProductos();
  }, []);

  //Metodo que calcula el rpecio total
  const calcularTotal = () => {
    const resultado = cantidad * precio;
    setTotal(resultado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ventas</Text>

      <View style={styles.form}>
        <Text style={styles.title}>Fecha: {fecha}</Text>
        <Text style={styles.label}>Nombre del cliente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del cliente"
          keyboardType="default"
          value={nombreCliente}
          onFocus={() => setNombreCliente("")}
          onChangeText={setNombreCliente}
        />
        <Text style={styles.label}>Documento del cliente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Documento del cliente"
          keyboardType="numeric"
          value={documentoCliente}
          onFocus={() => setDocumentoCliente("")}
          onChangeText={(text) => {
            // Verificar si el texto ingresado es un número
            if (/^\d+$/.test(text) || text === '') {
              setDocumentoCliente(text);
            }
          }}
        />
        <Text style={styles.label}>Cantidad:</Text>
        <TextInput
          style={[styles.input, { fontSize: 16, height: 20 }]}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={cantidad}
          onFocus={() => setCantidad("")}
          onChangeText={(text) => {
            // Verificar si el texto ingresado es un número
            if (/^\d+$/.test(text) || text === '') {
              setCantidad(text);
            }
          }}
        />
        <Text style={styles.label}>Precio:</Text>
        <TextInput
          style={[styles.input, { fontSize: 16, height: 20 }]}
          placeholder="Precio"
          keyboardType="numeric"
          value={precio}
          onFocus={() => setPrecio("")}
          onChangeText={(text) => {
            // Verificar si el texto ingresado es un número
            if (/^\d+$/.test(text) || text === '') {
              setPrecio(text);
            }
          }}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularTotal}>
        <Text style={styles.buttonText}>Calcular Total</Text>
      </TouchableOpacity>

      <Text style={styles.totalText}>Total: ${total}</Text>

      <View style={styles.containerList}>
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemid}>${item.id}</Text>
              <Text style={styles.itemName}>{item.nombre}</Text>
              <Text style={styles.itemPrice}>${item.precio}</Text>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    padding: 16,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  form: {
    marginBottom: 16,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 16,
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    paddingHorizontal: 10,
    padding: 8,
    marginRight: 16,
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
});

export { VentaScreen };
