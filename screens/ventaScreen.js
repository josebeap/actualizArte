import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  CheckBox,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import { FIRESTORE_DB } from "../persistence/firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import estilos from "../style sheets/estilos";

const windowWidth = Dimensions.get("window").width;

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
  const [mostrarLista, setMostrarLista] = useState("");
  const [busqueda, setBusqueda] = useState("");

  //obtenemos los productos desde la base
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

  //Metodo que calcula el precio total
  const calcularTotal = () => {
    const resultado = cantidad * precio;
    setTotal(resultado);
  };

  //funcion para filtrar los productos segun el nombre ingresado
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  console.log(productosFiltrados);

  return (
    <View style={estilos.container}>
      <Text style={estilos.title}>Ventas</Text>

      <View style={{...estilos.form}}>
        <Text style={estilos.label}>Fecha: {fecha}</Text>
        <Text style={estilos.label}>Nombre del cliente:</Text>
        <TextInput
          style={estilos.input}
          placeholder="Nombre del cliente"
          keyboardType="default"
          value={nombreCliente}
          onFocus={() => setNombreCliente("")}
          onChangeText={setNombreCliente}
        />
        <Text style={estilos.label}>Documento del cliente:</Text>
        <TextInput
          style={estilos.input}
          placeholder="Documento del cliente"
          keyboardType="numeric"
          value={documentoCliente}
          onFocus={() => setDocumentoCliente("")}
          onChangeText={(text) => {
            // Verificar si el texto ingresado es un número
            if (/^\d+$/.test(text) || text === "") {
              setDocumentoCliente(text);
            }
          }}
        />

        <TextInput
          placeholder="Buscar productos por nombre"
          value={busqueda}
          onChangeText={setBusqueda}
        />

        <View style={{
              ...estilos.container,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
        <Text style={{ ...estilos.label, width: "50%",justifyContent: "space-between", }}>Productos: </Text>
        <Text style={{ ...estilos.label, width: "50%",justifyContent: "space-between", }}>Precio: </Text>

        </View>
        
        {productosFiltrados.map((producto) => (
          <View
            key={producto.id}
            style={{
              ...estilos.container,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...estilos.label, flexDirection: "row", width: "50%",justifyContent: "space-between", }}>Productos: </Text>
            <Text style={{ width: "50%" }}>{producto.nombre}</Text>
            <Text style={{ width: "50%", textAlign: "right" }}>
              {producto.precio}
            </Text>
          </View>
        ))}

        <Text style={estilos.label}>Cantidad:</Text>
        <TextInput
          style={[estilos.input, { fontSize: 16, height: 20 }]}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={cantidad}
          onFocus={() => setCantidad("")}
          onChangeText={(text) => {
            // Verificar si el texto ingresado es un número
            if (/^\d+$/.test(text) || text === "") {
              setCantidad(text);
            }
          }}
        />
        <Text style={estilos.label}>Precio:</Text>
        <TextInput
          style={[estilos.input, { fontSize: 16, height: 20 }]}
          placeholder="Precio"
          keyboardType="numeric"
          value={precio}
          onFocus={() => setPrecio("")}
          onChangeText={(text) => {
            // Verificar si el texto ingresado es un número
            if (/^\d+$/.test(text) || text === "") {
              setPrecio(text);
            }
          }}
        />
      </View>

      <TouchableOpacity style={estilos.button} onPress={calcularTotal}>
        <Text style={styles.buttonText}>Calcular Total</Text>
      </TouchableOpacity>

      <Text style={estilos.totalText}>Total: ${total}</Text>
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
