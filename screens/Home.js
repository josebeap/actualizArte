import { Button, ScrollView, StyleSheet } from "react-native";

const Home = (props) => {
  const handleProps = (nombre) => {
    props.navigation.navigate(nombre);
  };

  return (
    <ScrollView style={styles.container}>
      <Button title='Categoria'    onPress={() => handleProps("Categoria")} />
      <Button title='Venta'        onPress={() => handleProps("Venta")} />
      <Button title='Agregar Manualidad'     onPress={() => handleProps("AgregarManualidad")} />
      <Button title='Recurso'      onPress={() => handleProps("Recurso")} />
      <Button title='Notificacion' onPress={() => handleProps("Notificacion")} />
      <Button title='Finanzas'     onPress={() => handleProps("Finanzas")} />
      <Button title='Elementos Inventario' onPress={() => handleProps("InventarioDisponible")} />
      <Button title='Actualizar Inventario' onPress={() => handleProps("ActualizarInventario")} />
    </ScrollView>
  );
};

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
});

export { Home };
