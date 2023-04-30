import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SectionListRenderItem,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Button,
  SafeAreaView,
  SectionList,
  StatusBar,
  Select,
} from "react-native";
import PickerSelect from "react-native-picker-select";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FIRESTORE_DB } from "../persistence/firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import estilos from "../style sheets/estilos";
import { AntDesign } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

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

  const [precio, setPrecio] = useState(0);
  const [total, setTotal] = useState(0);
  const [productos, setProductos] = useState([]);
  const [mostrarLista, setMostrarLista] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [elementoSeleccionado, setElementoSeleccionado] = useState("1");
  const [productosAVender, setproductosAVender] = useState({ "": 0 });
  const [inputValue, setInputValue] = useState("");
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
  const calcularTotal = () => {};

  //funcion para filtrar los productos segun el nombre ingresado
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  

  const renderProductosSeleccionados = ({ item }) => {
    
    if (!productosAVender.hasOwnProperty(item.nombre)) {
      setproductosAVender((prevState) => ({
        ...prevState,
        [item.nombre]: 0,
      }));
    }
    
      console.log(productosAVender);
    
//    console.log(productosAVender);

    const aumentarCantidad = () => {};
    const disminuirCantidad = () => {};
    const calcularPrecioVenta = () => {};

    return (
      <View style={{ ...estilos.containerOptions }}>
        <Text>{item.nombre}</Text>
        <View style={{ ...estilos.containerAccionesEnListas }}>
          <TouchableOpacity
            onPress={aumentarCantidad}
            style={{ ...estilos.botonesEnListas }}
          >
            <AntDesign name="pluscircleo" size={24} color="green" />
          </TouchableOpacity>
          <TextInput
            style={estilos.inputCantidades}
            placeholder={"0"}
            keyboardType="numeric"
            value={productosAVender[item.nombre]|| ""}
            onChangeText={(text) => {
              // Verificar si el texto ingresado es un número
              if (/^\d+$/.test(text) || text === "") {
                setproductosAVender((prevState) => ({
                  ...prevState,
                  [item.nombre]: text,
                }));
                
              }
            }}
            min="0"
          />
          <TouchableOpacity
            onPress={disminuirCantidad}
            style={{ ...estilos.botonesEnListas }}
          >
            <AntDesign name="minuscircle" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const mostrarDicc = ()=>{
    for (let i in productosAVender) {
      console.log(productosAVender[i]);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.title}>Ventas</Text>

      <View style={{ ...estilos.form }}>
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
      </View>

      <View>
        <TextInput
          style={estilos.input}
          placeholder="Buscar productos por nombre"
          value={busqueda}
          onChangeText={(texto) => {
            // Filtrar solo letras
            let textoFiltrado = texto.replace(/[^a-zA-Z]/g, "");
            // Actualizar el estado de busqueda
            setBusqueda(textoFiltrado.toString());
          }}
          keyboardType="default"
        />

        {busqueda != "" && (
          <View>
            <FlatList
              data={productosFiltrados}
              renderItem={renderProductosSeleccionados}
              key={(index) => index.toString()}
            ></FlatList>
            <TouchableOpacity
              style={estilos.button}
              onPress={mostrarDicc}
            >
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>


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
