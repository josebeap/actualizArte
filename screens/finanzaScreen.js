import React, { useState, useEffect } from "react";
import {
  collection,
  connectFirestoreEmulator,
  getDocs,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../persistence/firebase/Firebase";
import { View, Text, StyleSheet,Button  } from "react-native";
import { VentaDAO } from "../dao/VentaDAO";
import { onSnapshot } from "firebase/firestore";
//import { BarChart } from 'react-native-chart-kit';


const FinanzasScreen = () => {
  const prueba = VentaDAO.ventasXFecha(new Date().toLocaleDateString());
  console.log(prueba)
  const [data, setData] = React.useState({
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [
      {
        data: [20, 45, 28, 80]
      }
    ]
  });

  const handleIncomes = () => {
    // Aquí puedes actualizar los datos del gráfico para mostrar los ingresos
  };

  const handleExpenses = () => {
    // Aquí puedes actualizar los datos del gráfico para mostrar los gastos
  };

  return (
    <View>
      <Button title="Ingresos" onPress={handleIncomes} />
      <Button title="Gastos" onPress={handleExpenses} />
      <BarChart
        data={data}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
      {/* Aquí puedes agregar un selector para el mes y año */}
    </View>
  );
};
export { FinanzasScreen };
