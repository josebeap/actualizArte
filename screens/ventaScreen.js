import React, { useState, useEffect } from "react";
import {View,Text,TextInput,FlatList,TouchableOpacity,} from "react-native";
import { VentaDAO } from "../dao/VentaDAO";
import { Venta } from "../models/VentaModel";
import { FIRESTORE_DB } from "../persistence/firebase/Firebase";
import { collection, getDocs,Timestamp } from "firebase/firestore";
import estilos from "../style sheets/estilos";
import { useNavigation } from '@react-navigation/native';


const VentaScreen = () => {
  
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

  //por que obtenemos las opciones seleccionadas en la venta
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
    if (options.productosList){
      try {
        const nuevaVenta = generacionNuevaVenta(options);
        await VentaDAO.insertarNuevaVenta(nuevaVenta.toObject());
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  function generacionNuevaVenta(options){
    const fechaActual = new Date();
    const timestampActual = Timestamp.fromDate(fechaActual);
    const nuevaventa = new Venta({
          ...options,
          fecha: timestampActual,
    });
    return nuevaventa;
  }

  //obtenemos los productos desde la base
  //porque debemos obtenemos los productos para seleccionar
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

  //se limpia el diccionario 
  //para tener solo los productos seleccionados
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

  const renderProductosSeleccionados = ({ item }) => {
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
              
              let textoFiltrado = texto.replace(/[^a-zA-Z]/g, "");
              
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

export { VentaScreen };
