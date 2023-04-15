import React, { useState, useEffect } from "react";
import {
  collection,
  connectFirestoreEmulator,
  getDocs,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../persistence/firebase/Firebase";
import { View, Text, StyleSheet } from "react-native";
import { VentaDAO } from "../dao/VentaDAO";
import { onSnapshot } from "firebase/firestore";

const FinanzasScreen = () => {
  //almacenamiento de las ganancias del mes
  const [gananciasMensuales, setGananciasMensuales] = useState(0);
  const [ventasMensuales, setventasMensuales] = useState(0);
  const [totalVendido, settotalVendido] = useState(0);

  useEffect(() => {
    const fetchVenta = async () => {
      const mesPedido = new Date().getMonth() + 1;
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "Venta"));
      let acumulado = 0;
      querySnapshot.forEach((doc) => {
        const venta = doc.data();
        const fechaVenta = venta.fecha;
        const fechaParts = fechaVenta.split("/");
        const mesVenta = parseInt(fechaParts[1], 10);
        if (mesVenta === mesPedido) {
          acumulado += parseInt(venta.precioTotal);
          console.log("Estamos en el if");
          console.log(venta.precioTotal);
          console.log("El acumulado es");
        }
      });

      settotalVendido(acumulado);
    };
    fetchVenta();
  }, []);

  //efecto para actualizar el valor de totalvendido
  useEffect(() => {}, [totalVendido]);

  return (
    <div className="finanzas-container">
      <h1 className="finanzas-titulo">Finanzas</h1>
      <h2 className="finanzas-subtitulo">{new Date().toLocaleString('default', { month: 'long' })}</h2>
      <h2 className="finanzas-subtitulo">Ganancias: {totalVendido}</h2>
    </div>
  );

  const styles = StyleSheet.create({

  })
};
export { FinanzasScreen };
