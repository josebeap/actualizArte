import React, { useState, useEffect } from "react";
import estilos from "../style sheets/estilos";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { VentaDAO } from "../dao/VentaDAO";

const FinanzasScreen = () => {
  const [ventasObtenidas, setVentasObtenidas] = useState([]);
  const [primeraVista, setPrimeraVista] = useState(true);
  const [mostrarListaMeses, setMostrarListaMeses] = useState(false);
  const months = [
    { id: 0, name: "Enero" },
    { id: 1, name: "Febrero" },
    { id: 2, name: "Marzo" },
    { id: 3, name: "Abril" },
    { id: 4, name: "Mayo" },
    { id: 5, name: "Junio" },
    { id: 6, name: "Julio" },
    { id: 7, name: "Agosto" },
    { id: 8, name: "Septiembre" },
    { id: 9, name: "Octubre" },
    { id: 10, name: "Noviembre" },
    { id: 11, name: "Diciembre" },
  ];
  const [mesSeleccionado, setMesSeleccionado] = useState(0);
  const [ingresosXMes, setIngresosXMes] = useState(0);
  const [nombreMes, setNombreMes] = useState("mes");

  if (primeraVista) {
    modificarMes();
  }

  async function modificarMes(numeroMes) {
    const fechaActual = new Date();
    if (primeraVista) {
      setNombreMes(fechaActual.toLocaleString("es-ES", { month: "long" }));
      setPrimeraVista(false);
    } else {
      const year = fechaActual.getFullYear();
      const fechaSolicitada = new Date(year, numeroMes);
      setNombreMes(fechaSolicitada.toLocaleString("es-ES", { month: "long" }));
    }
  }

  async function obtenerVentas(mes) {
    const ventas = await VentaDAO.ventasXFecha(new Date(2023, mes, 1));
    if (JSON.stringify(ventasObtenidas) !== JSON.stringify(ventas)) {
      await setVentasObtenidas(ventas);
    }
    return ventas;
  }

  async function ingresosXVentas() {
    const ventas = await obtenerVentas(mesSeleccionado);
    let contadorventas =0;
    let precios = [];
    let numeroVenta = [];
    ventas.forEach((venta) => {
      console.log(venta.getPrecioTotal);
      precios.push(venta.getPrecioTotal);
      numeroVenta.push(contadorventas);
      contadorventas= contadorventas +1;
    });
    setIngresosXMes(actualizarIngresosXMes(ventas));
  }

  function actualizarIngresosXMes(ventas){
    const total = ventas.reduce(
      (sum, venta) => sum + venta.getPrecioTotal,0);
    return total;
  }

  const handleIncomes = () => {
    ingresosXVentas();
    console.log(ingresosXMes);
    actualizarDatosTabla();
  };

  const elegirMes = ({ item }) => (
    <View>
      <TouchableOpacity
        style={{ ...estilos.item }}
        onPress={() => {
          setMesSeleccionado(item.id);
          setMostrarListaMeses(false);
          modificarMes(item.id);
        }}
      >
        <Text style={{ ...estilos.textItems }}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

 
  return (
    <View>
      <View style={{ ...estilos.containerOptions }}>
        <Text style={{ ...estilos.textItems }}>
          Mes solicitado: {nombreMes}
        </Text>
        <Button
          title="Seleccionar Mes"
          onPress={() => setMostrarListaMeses(true)}
        />
        {mostrarListaMeses && (
          <View>
            <FlatList
              data={months}
              renderItem={elegirMes}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>

      <Button title="Ingresos" onPress={handleIncomes} />
      <Text style={{...estilos.totalText}}>Total: ${ingresosXMes}</Text>
    </View>
  );
};

export { FinanzasScreen };
