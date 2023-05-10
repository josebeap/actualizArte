import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { onSnapshot } from "firebase/firestore";
import { MateriaPrimaDAO } from "../dao/MateriaPrimaDAO";
import { Producto } from "../models/ProductoModel";
import { ProductoDAO } from "../dao/ProductoDAO";
import { MateriaPrima } from "../models/MateriaPrimaModel";

const ElementosInvenDisponible = (props) => {
  const [materiasP, setMateriasP] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cantStock, setCantStock] = useState("");

  useEffect(() => {
    const materiaPRef = MateriaPrimaDAO.getCollection();
    const subs = onSnapshot(materiaPRef, {
      next: (snapshot) => {
        const materiasP = [];
        snapshot.forEach((doc) => {
          if (doc.data().cantidadStock >= 0) {
            const materiaPrim = new MateriaPrima(
              doc.id,
              doc.data().nombre,
              doc.data().precio,
              doc.data().cantidadStock
            );

          }

          (materiaPrim) =>
            materiaPrim.setCantidadUsadaTotal(doc.data().cantidadUsadaTotal);
          (materiaPrim) =>
            materiaPrim.setUsadaUltimoTrimestre(
              doc.data().usadaUltimoTrimestre
            );
          materiasP.push(materiaPrim);
        });
        setMateriasP(materiasP);
      },
    });

    const productoRef = ProductoDAO.getCollection();
    const subsProducto = onSnapshot(productoRef, {
      next: (snapshot) => {
        const productos = [];
        snapshot.forEach((doc) => {

          if (doc.data().cantidadStock >= 0) {

            const productoSnap = new Producto(
              doc.id,
              doc.data().nombre,
              doc.data().descripcion,
              doc.data().imagen,
              doc.data().categoria,
              doc.data().precio,
              doc.data().cantidadStock
            );

          }

          (productoSnap) =>
            productoSnap.setCantidadVendidaTotal(
              doc.data().cantidadVendidaTotal
            );
          (productoSnap) =>
            productoSnap.setVendidoUltimoTrimestre(
              doc.data().vendidoUltimoTrimestre
            );
          productos.push(productoSnap);
        });
        setProductos(productos);
      },
    });
    return () => {
      subs(), subsProducto();
    };
  }, []);


  return (
    <ScrollView style={styles.container}>
      <Text>Lista de Productos:</Text>
      {productos.map((producto) => (
        <View key={producto.getId} style={styles.view}>
          <Text>Nombre: {producto.getNombre}</Text>
          <Text>Descripción: {producto.getDescripcion}</Text>
          <Text>Precio: {producto.getPrecio}</Text>
          <Text>Stock: {producto.getCantidadStock}</Text>

        </View>
      ))}

      <Text>Lista de Materias Primas:</Text>
      {materiasP.map((materia) => (
        <View key={materia.getId} style={styles.view}>
          <Text>Nombre: {materia.getNombre}</Text>
          <Text>Precio: {materia.getPrecio}</Text>
          <Text>Stock: {materia.getCantidadStock}</Text>

          <TextInput
            placeholder='Cantidad'
            onChangeText={(value) => setCantStock({ cantStock: value })}
          />  


        </View>
      ))}
    </ScrollView>
  );
};

export { ElementosInvenDisponible };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },

  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },

  view: {
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});


