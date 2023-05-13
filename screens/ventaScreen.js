import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  
  } from "react-native";
import { VentaDAO } from "../dao/VentaDAO";
import { Venta } from "../models/VentaModel";
import { FIRESTORE_DB } from "../persistence/firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import estilos from "../style sheets/estilos";
import { useNavigation } from '@react-navigation/native';
import { Timestamp } from 'firebase/firestore';
// Creacion de la venta
const VentaScreen = () => {
  const [venta, setVenta] = useState([]);
  //definimos los atributos de la venta
  const [fecha, setFecha] = useState(new Date().toLocaleDateString()); // obtener la fecha actual y darle formato
  const [nombreCliente, setNombreCliente] = useState(
    "Ingresa el nombre del cliente"
  );
  const [documentoCliente, setDocumentoCliente] = useState(
    "Ingresa el documento del cliente"
  );
  const navigation = useNavigation();
  const [precioVenta, setprecioVenta] = useState(0);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [productosAVender, setproductosAVender] = useState({ "": 0 });

  const terminarVenta = () => {
    calcularPrecioVenta();
    setBusqueda("");
  };

  //obtension de las opciones seleccionadas en la venta
  const getOption = async () => {
    const codigo = await VentaDAO.getNumeroVentas()+1;
    const productosVendidos = await limpiarDiccionario(productosAVender)

    const options = {
      cliente: nombreCliente,
      codigo: codigo,
      fecha: new Date(),
      precioTotal: precioVenta,
      productosList: productosVendidos
    };
    return options;
  };

  //guardado de la venta nueva en la base
  const GuardarVenta = async () => {
    const options = await getOption();
    console.log(options)
    if (options.productosList){
      try {
        const fechaActual = new Date();
        const timestampActual = Timestamp.fromDate(fechaActual);
        const nuevaventa = new Venta({
          ...options,
          fecha: timestampActual,
        });
  
        console.log(nuevaventa + "venta nueva");
        await VentaDAO.insertarNuevaVenta(nuevaventa.toObject());
  
        navigation.goBack();
      } catch (error) {
        // manejar el error
        console.error(error);
      }
    }
  };

  const fechaValida = async(options) => {
    
  }


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

  //funcion para filtrar los productos segun el nombre ingresado
  const productosFiltrados = productos.filter((producto) => {
    if (!productosAVender.hasOwnProperty(producto.nombre)) {
      setproductosAVender((prevState) => ({
        ...prevState,
        [producto.nombre]: ["", ""],
      }));
    }
    return producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
  });

  function limpiarDiccionario(dict) {
    const cleanedDict = {};
  for (const [key, value] of Object.entries(dict)) {
    if (
      key !== null &&
      key !== '' &&
      value !== null &&
      value !== '' &&
      (value[0] || value[1] != '')
    ) {
      cleanedDict[key] = value;
    }
  }
  
    return cleanedDict;
  }

  //Calculo del precio de la venta
  const calcularPrecioVenta = () => {
    let total = 0;
    for (let i in productosAVender) {
      if (i != "") {
        let calvexProducto = productosAVender[i];
        let valor =
          parseFloat(calvexProducto[0]) * parseFloat(calvexProducto[1]);
        if (valor > 0) {
          total = valor + total;
        }
      }
    }
    setprecioVenta(total);
    limpiarDiccionario(productosAVender);
  };

  //renderizacion del diccionario con los productos filtrados
  const renderProductosSeleccionados = ({ item }) => {
    console.log(productosAVender);
    return (
      <View style={{ ...estilos.containerOptions }}>
        <Text>{item.nombre}</Text>
        <View style={{ ...estilos.containerAccionesEnListas }}>
          <TextInput
            style={estilos.inputCantidades}
            placeholder={"0"}
            keyboardType="numeric"
            value={productosAVender[item.nombre][0] || ""}
            onChangeText={(text) => {
              // Verificar si el texto ingresado es un número
              if (/^\d+$/.test(text) || text === "") {
                setproductosAVender((prevState) => ({
                  ...prevState,
                  [item.nombre]: [text, item.precio],
                }));
              }
            }}
            min="0"
          />
        </View>
      </View>
    );
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
                keyExtractor={(item) => item.nombre.toString()}
                ListFooterComponent={
                  <TouchableOpacity
                    style={estilos.button}
                    onPress={terminarVenta}
                  >
                    <Text style={estilos.buttonText}>Aceptar</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          )}
        </View>

        <Text style={estilos.totalText}>Total: ${precioVenta}</Text>
        <TouchableOpacity style={estilos.button} onPress={GuardarVenta}>
          <Text style={estilos.buttonText}>Guardar venta</Text>
        </TouchableOpacity>
        
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
