import React, { useState} from "react";
import estilos from "../style sheets/estilos";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { VentaDAO } from "../dao/VentaDAO";
import { BarChart } from "react-native-chart-kit";

const FinanzasScreen = () => {
  const [ventasObtenidas, setVentasObtenidas] = useState([]);
  const [date, setDate] = useState(new Date());
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

  async function obtenerVentas(mes) {
    
    const ventas = await VentaDAO.ventasXFecha(new Date(2023, mes, 1));
    setVentasObtenidas(ventas);
    console.log(ventas + 'ventas encontradas ');
  }

  async function ingresosXVentas(){
    await obtenerVentas(mesSeleccionado)
    console.log(ventasObtenidas + 'ventas obtenidas ');
    const total = ventasObtenidas.reduce((sum, venta) => sum+venta.precioTotal, 0);
    setIngresosXMes(total );
    console.log(total + 'ventas totales ');
  }
  const [data, setData] = React.useState({
    labels: ["Enero", "Febrero", "Marzo", "Abril"],
    datasets: [
      {
        data: [20, 45, 28, 80],
      },
    ],
  });

  const handleIncomes = () => {
    ingresosXVentas();
    console.log(ingresosXMes);
  };

  const handleExpenses = () => {
    // Aquí puedes actualizar los datos del gráfico para mostrar los gastos
  };
  const elegirMes = ({ item }) => (
    <View>
      <TouchableOpacity
        style={{ ...estilos.item }}
        onPress={() => {
          setMesSeleccionado(item.id);
          setMostrarListaMeses(false);
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
          Mes solicitado: {mesSeleccionado}
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
      <Button title="Gastos" onPress={handleExpenses} />
      <BarChart
        data={data}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
      {/* Aquí puedes agregar un selector para el mes y año */}
    </View>
  );
};

export { FinanzasScreen };
